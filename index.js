import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { port } from './config';
import typeDefs from './graphql/combinedTypes';
import resolvers from './graphql/combinedResolvers';
import models from './models';
import { getUser } from './utils';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    }

    return {
      checkAccess: (authScope) => {
        if (!authScope || !authScope.user)
          throw new Error('Unauthorized!');
      },
      authScope: await getUser(req.headers.authorization),
      models
    };
  }
});

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
});