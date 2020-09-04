import { gql } from 'apollo-server-express';

const userType = gql`
  type User {
    id: String
    name: String
    email: String
  }

  type UserAuth {
    token: String
    refreshToken: String
  }

  type RefreshToken {
    token: String
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!): UserAuth
    login(email: String!, password: String!): UserAuth
    refreshAccessToken(refreshToken: String!): RefreshToken
  }
`;

export default userType;
