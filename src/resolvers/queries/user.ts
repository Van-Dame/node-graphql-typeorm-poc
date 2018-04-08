import { User } from '../../entities/User';

export default {
  user: async (_, { id }) => User.findOneById(id, { relations: ['profile'] }),
  users: async () => User.find({ relations: ['profile'] })
};
