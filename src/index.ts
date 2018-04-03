import { GraphQLServer } from 'graphql-yoga';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
createConnection().then(() => server.start(() => console.log('Server is running on localhost:4000')));
