import { gql } from 'apollo-server-express';

const postTypes = gql`
  type Todo {
    id: Int
    title: String
    completed: Boolean
  }

  extend type Query {
    listTodos (limit: Int): [Todo]
  }

  extend type Mutation {
    createTodo(title: String!): Todo
    updateTodo(id: Int!, isCompleted: Boolean!): Boolean
    deleteTodo(id: Int!): Boolean
  }
`;

export default postTypes;
