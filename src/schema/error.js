import { gql } from 'apollo-server-express';

export default `
extend type Error {
    path: String!
    message: String!
}
`;
