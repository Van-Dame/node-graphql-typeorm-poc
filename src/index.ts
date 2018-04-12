import 'reflect-metadata';

import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

import typeDefs from './typedefs';
import resolvers from './resolvers';
import context from './context';

dotenv.config();

if (typeof process.env.JWT_SECRET_KEY === 'undefined') {
  console.warn('WARNING: JWT_SECRET_KEY is not defined!');
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: async params => context(params.request.headers, process.env)
});
createConnection().then(() => server.start(() => console.log('Server is running on localhost:' + server.options.port)));
