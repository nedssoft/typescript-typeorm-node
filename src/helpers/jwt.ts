import * as jwt from 'jsonwebtoken';
require('dotenv').config();


const SECRET = process.env.JWT_SECRET;
/**
 *
 *
 * @param {*} payload from id and username
 * @returns token
 */
export const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, SECRET, {
        expiresIn: 60 * 60 * 1440,
      });
      return token;
  } catch (error) {
      throw error;
  }
};

/**
 * Decodes user token
 *
 * @param {*} token
 * @returns decoded token
 */
export const decodeToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, SECRET);
    if (decoded) {
      return decoded;
    }
    return null;
  } catch (error) {
    throw error;
  }
};