import { GraphQLDateTime } from 'graphql-iso-date';

import { IResolverMap } from '../types/ResolverType';

import Query from './queries';
import Mutation from './mutations';

const resolvers: IResolverMap = {
  DateTime: GraphQLDateTime,
  Query,
  Mutation
};

export default resolvers;
