import { GraphQLScalarType } from 'graphql';

const customScalars = {
  Password: new GraphQLScalarType({
    name: 'Password',
    description: 'Password scalar type',
    parseValue(value) { // value from the client
      if (!value || value.length < 6)
        throw new Error("Password must have minimum 6 characters");

      return value;
    }
  }),
  Email: new GraphQLScalarType({
    name: "Email",
    description: 'Email scalar type',
    parseValue(value) { // value from the client
      if (!/[a-z0-9._%-]+@[a-z0-9._%-]+\.[a-z]{2,4}/.test(value))
        throw new Error("Email is not valid");

      return value;
    }
  }),
  // @Feedback: GraphQL has it's own inbuilt Boolean type. 
  Boolean: new GraphQLScalarType({
    name: "Boolean",
    description: "Boolean scalar type",
    parseValue(value) { // value from the client
      return Boolean(value);
    }
  })
};

export default customScalars;
