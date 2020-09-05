import { gql } from 'apollo-server-express';

const postTypes = gql`
  type Todo {
    id: Int
    title: String
    completed: Boolean
  }

  extend type Query {
    listTodos (isCompleted: Boolean, limit: Int): [Todo] @authenticated
  }

  extend type Mutation {
    createTodo(title: String!): Todo @authenticated
    updateTodo(id: Int!, isCompleted: Boolean!): Boolean @authenticated
    deleteTodo(id: Int!): Boolean @authenticated
  }
`;

export default postTypes;
