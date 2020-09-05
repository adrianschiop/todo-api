import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import models from '../models';

export const authenticate = (plainTextPass, password) => {
  if (!plainTextPass) return false;

  return bcrypt.compareSync(plainTextPass, password);
};

// @Feedback: Using a computation heaby method like `bcrypt.hash` in sync, could block the thread for some milliseconds.
export const encryptPassword = password => bcrypt.hashSync(password, 8);

export const generateToken = user => `JWT ${jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' })}`;

export const generateRefreshToken = user => `JWT ${jwt.sign({ id: user.id, email: user.email, refresh: true }, jwtSecret, { expiresIn: '30 days' })}`;

// @Feedback: Name of the method is a bit missleading. By the name I would expect it get's a user by id. 
// It could be getUserByRefreshToken, or maybe even better there should be one function for decoding the access token, and another one
// for getting the user by id
export const getUser = async (token, refresh = null) => {
  if (!token) {
    return {
      user: null
    };
  }

  try {
    const decodedToken = jwt.verify(token.substring(4), jwtSecret);

    if (refresh && !decodedToken.refresh) {
      throw new Error('This is not a refresh token!');
    }

    if (!refresh && decodedToken.refresh) {
      throw new Error('This is a refresh token! Can\'t be used for auth');
    }

    const user = await models.User.findOne({ where: { id: decodedToken.id } });

    return {
      user
    };
  } catch (err) {
    return {
      user: null
    };
  }
};
