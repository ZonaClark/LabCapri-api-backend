import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

import pubsub, { EVENTS } from '../subscription';
import { isAuthenticated, isImageOwner } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    images: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor),
              },
            },
          }
        : {};

      const images = await models.Image.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });

      const hasNextPage = images.length > limit;
      const edges = hasNextPage ? images.slice(0, -1) : images;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    image: async (parent, { id }, { models }) => {
      return await models.Image.findById(id);
    },
  },

  Mutation: {
    createImage: combineResolvers(
      isAuthenticated,
      async (parent, { diagnosis }, { models, me }) => {
        const image = await models.Image.create({
          diagnosis,
          userId: me.id,
        });

        pubsub.publish(EVENTS.IMAGE.CREATED, {
          imageCreated: { image },
        });

        return image;
      },
    ),

    deleteImage: combineResolvers(
      isAuthenticated,
      isImageOwner,
      async (parent, { id }, { models }) => {
        return await models.Image.destroy({ where: { id } });
      },
    ),
  },

  Image: {
    user: async (image, args, { loaders }) => {
      return await loaders.user.load(image.userId);
    },
  },

  Subscription: {
    imageCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.IMAGE.CREATED),
    },
  },
};
