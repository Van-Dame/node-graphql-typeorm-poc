import { Post } from '../../entities/Post';

export default {
  createPost: async (_, args) => {
    const post = Post.create(args);
    await post.save();

    return post;
  },
  updatePost: async (_, { id, ...args }) => {
    try {
      await Post.updateById(id, args);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  deletePost: async (_, { id }) => {
    try {
      await Post.removeById(id);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
};
