import { gql } from 'apollo-server-express';

import userSchema from './user';
import imageSchema from './image';
import errorSchema from './error';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Error {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, imageSchema, errorSchema];
