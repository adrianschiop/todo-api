import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { port } from './config';
import typeDefs from './graphql/combinedTypes';
import resolvers from './graphql/combinedResolvers';
import { AuthenticatedDirective } from './graphql/directives';
import models from './models';
import { getUser } from './utils';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    authenticated: AuthenticatedDirective
  },
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    }

    return {
      authScope: await getUser(req.headers.authorization),
      models
    };
  }
});

const app = express();
server.applyMiddleware({
  app,
  cors: {
    origin(origin, callback) {
      callback(null, true); // TODO: Check against a whiteList (now all are accepted)
    },
    credentials: true
  }
});

app.listen({ port }, async () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);

  try {
    await models.sequelize.authenticate();
    console.log('Connection to db has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});