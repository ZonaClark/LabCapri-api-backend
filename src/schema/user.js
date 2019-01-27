import { gql } from 'apollo-server-express';

import Error from './error';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp (
      username: String!
      email: String!
      password: String!
    ): LoginResponse!

    signIn(login: String!, password: String!): LoginResponse!
    updateUser(username: String!): User!
    deleteUser(id: ID!): Boolean!
  }

  type LoginResponse {
    success: Boolean!
    errors: [Error!]
    token: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String
    images: [Image!]
  }
`;
