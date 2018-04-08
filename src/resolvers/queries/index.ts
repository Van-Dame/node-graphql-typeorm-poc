import helloQueries from './hello';
import userQueries from './user';
import postQueries from './post';

export default {
  ...helloQueries,
  ...userQueries,
  ...postQueries
};
