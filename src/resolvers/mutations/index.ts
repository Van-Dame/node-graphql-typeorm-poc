import userMutations from './users';
import postMutations from './posts';

export default {
  ...userMutations,
  ...postMutations
};
