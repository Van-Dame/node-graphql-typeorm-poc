import { GraphQLDateTime } from 'graphql-iso-date';

import { IResolverMap } from '../types/ResolverType';

import Query from './query';
import Mutation from './mutation';

const resolvers: IResolverMap = {
  DateTime: GraphQLDateTime,
  Query,
  Mutation
};

export default resolvers;
