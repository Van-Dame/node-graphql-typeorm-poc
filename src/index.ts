import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import { IResolverMap } from './types/ResolverType';

import 'reflect-metadata';
import { User } from './entity/User';

const typeDefs = `
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    isAdmin: Boolean
  }

  type Query {
    hello(name: String): String!
    user(id: Int!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, isAdmin: Boolean): User!
    updateUser(id: Int!, firstName: String, localhost: String, email: String, isAdmin: Boolean): Boolean
    deleteUser(id: Int!): Boolean
  }
`;

const resolvers: IResolverMap = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    user: (_, { id }) => User.findOneById(id),
    users: () => User.find()
  },
  Mutation: {
    createUser: async (_, args) => await User.create(args).save(),
    updateUser: async (_, { id, ...args }) => {
      try {
        await User.updateById(id, args);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        await User.removeById(id);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
createConnection().then(() => server.start(() => console.log('Server is running on localhost:4000')));
