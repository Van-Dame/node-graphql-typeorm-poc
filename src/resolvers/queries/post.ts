import { Post } from '../../entities/Post';

export default {
  post: async (_, { id }) => Post.findOneById(id, { relations: ['user', 'votes'] }),
  posts: async (_, { id }) => Post.find({ relations: ['user', 'votes'] })
};
