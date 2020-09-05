// @flow
import { gql } from 'apollo-server-express';
import userTypes from './user/types';
import todoTypes from './todo/types';

const queryTypes = gql`
  directive @authenticated on QUERY | FIELD_DEFINITION

  scalar Password
  scalar Email

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const combinedTypes = [userTypes, todoTypes, queryTypes];

export default combinedTypes;
