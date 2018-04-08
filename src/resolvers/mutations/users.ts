import { User } from '../../entities/User';
import { Profile } from '../../entities/Profile';

export default {
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
