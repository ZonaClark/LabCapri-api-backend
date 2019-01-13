import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import imageResolvers from './image';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  imageResolvers,
];
