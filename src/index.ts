import 'reflect-metadata';

import { GraphQLServer } from 'graphql-yoga';
import { GraphQLDateTime } from 'graphql-iso-date';
import { createConnection } from 'typeorm';

import typeDefs from './typedefs';
import resolvers from './resolvers';

const server = new GraphQLServer({ typeDefs, resolvers });
createConnection().then(() => server.start(() => console.log('Server is running on localhost:4000')));
