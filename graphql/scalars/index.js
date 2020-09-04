import { GraphQLScalarType } from 'graphql';

const customScalars = {
  Password: new GraphQLScalarType({
    name: 'Password',
    description: 'Password scalar types',
    parseValue(value) { // value from the client
      if (!value || value.length < 6)
        throw new Error("Password must have minimum 6 characters");

      return value;
    }
  }),
  Email: new GraphQLScalarType({
    name: "Email",
    description: 'Email scalar types',
    parseValue(value) { // value from the client
      if (!/[a-z0-9._%-]+@[a-z0-9._%-]+\.[a-z]{2,4}/.test(value))
        throw new Error("Email is not valid");

      return value;
    }
  })
};

export default customScalars;
