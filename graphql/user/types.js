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
    signUp(name: String!, email: Email!, password: Password!): UserAuth
    login(email: Email!, password: Password!): UserAuth
    refreshAccessToken(refreshToken: String!): RefreshToken
  }
`;

export default userType;
