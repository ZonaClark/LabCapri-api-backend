import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    images(cursor: String, limit: Int): ImageConnection!
    image(id: ID!): Image!
  }

  extend type Mutation {
    createImage(diagnosis: String, imageUrl: String!): Image!
    deleteImage(id: ID!): Boolean!
  }

  type ImageConnection {
    edges: [Image!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Image {
    id: ID!
    diagnosis: String!
    imageUrl: String!
    createdAt: Date!
    user: User!
  }

  extend type Subscription {
    imageCreated: ImageCreated!
  }

  type ImageCreated {
    image: Image!
  }
`;
