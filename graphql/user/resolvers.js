import { encryptPassword, authenticate, generateToken, generateRefreshToken, getUser } from '../../utils';

const userResolvers = {
  Mutation: {
    signUp: async (root, { name, email, password }, { models: { User } }) => {
      try {
        const user = await User.create({
          name,
          email,
          password: encryptPassword(password)
        });

        return {
          token: generateToken(user),
          refreshToken: generateRefreshToken(user)
        };
      } catch (error) {
        throw new Error(error.errors[0].message);
      }
    },

    login: async (root, { email, password }, { models: { User } }) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const correctPassword = authenticate(password, user.password);

      if (!correctPassword) {
        throw new Error('Invalid email or password');
      }

      return {
        token: generateToken(user),
        refreshToken: generateRefreshToken(user)
      };
    },

    refreshAccessToken: async (root, { refreshToken }, { models: { User } }) => {
      const { user } = await getUser(refreshToken, true);

      if (!user)
        throw new Error('Invalid refresh token');

      return {
        token: generateToken(user)
      };
    }
  }
};

export default userResolvers;
