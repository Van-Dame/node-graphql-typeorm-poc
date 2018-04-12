import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../../entities/User';
import { Profile } from '../../entities/Profile';
import { Token } from '../../entities/Token';
import { ISecrets } from '../../types/AuthTypes';

// Creates a new JWT
async function createToken(user: User, secrets: ISecrets): Promise<Token> {
  const payload = {
    uid: user.id,
    email: user.email,
    name: user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : user.email
  };

  const userJwt = jwt.sign(payload, secrets.JWT_SECRET_KEY, {
    issuer: secrets.ISSUER,
    expiresIn: secrets.TOKEN_EXPIRY
  });
  const token = await Token.create({ value: userJwt, userId: user.id });
  await token.save();

  token.user = user;

  return token;
}

export default {
  register: async (_, { email, password, profile }, { secrets }) => {
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      throw new Error('This email is already registered!');
    }

    const prf = await Profile.create({ ...profile });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ email, salt, passwordHash, profile: prf });
    await user.save();

    const token = await createToken(user, secrets);

    return token;
  },

  login: async (_, { email, password }, { secrets }) => {
    const user = await User.findOne({ where: { email }, relations: ['profile'] });
    if (!user) {
      throw new Error('The email/password provided is incorrect!');
    }

    const valid = bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error('The email/password provided is incorrect!');
    }

    const token = await createToken(user, secrets);

    return token;
  },

  logout: async (_, args, context, info) => {
    console.dir(_, args, context, info);
  },

  createUser: async (_, args) => {
    const profile = Profile.create({ ...args.profile });
    await profile.save();

    const user = User.create(args);
    user.profile = profile;
    await user.save();

    return user;
  },
  updateUser: async (_, { profile, ...args }) => {
    try {
      const user = await User.preload(args);
      if (!user) {
        return false;
      }

      await user.save();

      if (!user.profileId) {
        console.log('Creating Profile ', user.profileId, profile);
        const newProfile = Profile.create({ ...profile });
        await newProfile.save();
        user.profile = newProfile;
        await user.save();
      } else {
        console.log('Updating Profile ', user.profileId, profile);
        await Profile.updateById(user.profileId, { ...profile });
      }

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
};
