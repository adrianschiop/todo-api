import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import models from '../models';

export const authenticate = (plainTextPass, password) => {
  if (!plainTextPass) return false;

  return bcrypt.compareSync(plainTextPass, password);
};

export const encryptPassword = password => bcrypt.hashSync(password, 8);

export const generateToken = user => `JWT ${jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn.token })}`;

export const generateRefreshToken = user => `JWT ${jwt.sign({ id: user.id, email: user.email, refresh: true }, config.jwt.secret, { expiresIn: config.jwt.expiresIn.refreshToken })}`;

export const getUser = async (token, refresh = null) => {
  if (!token) {
    return {
      user: null,
    };
  }

  try {
    const decodedToken = jwt.verify(token.substring(4), config.jwt.secret);

    if (refresh && !decodedToken.refresh) {
      throw new Error('This is not a refresh token!');
    }

    if (!refresh && decodedToken.refresh) {
      throw new Error('This is a refresh token! Can\'t be used for auth');
    }

    const user = await models.User.findOne({ where: { id: decodedToken.id } });

    return {
      user,
    };
  } catch (err) {
    return {
      user: null,
    };
  }
};
