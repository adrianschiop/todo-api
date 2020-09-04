import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { port } from './config';
import models from './models';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port }, async () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);

  try {
    await models.sequelize.authenticate();
    console.log('Connection to db has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
);