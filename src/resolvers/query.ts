import { User } from '../entity/User';

export default {
  hello: (_, { name }) => `Hello ${name || 'World'}`,
  user: async (_, { id }) => User.findOneById(id, { relations: ['profile'] }),
  users: async () => User.find({ relations: ['profile'] })
};
