import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { User } from '../database/entities/User';
import {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_CREATED,
  HTTP_UNAUTHORIZED,
} from '../helpers/httpStatusCode';
import { respondWithError, respondWithSuccess } from '../helpers/helpers';
import { generateToken } from '../helpers/jwt'
export class AuthController {
  static async signUp(req: Request, res: Response) {
    try {
      const { firstName, lastName, password, email } = req.body;
      const userRepository = getRepository(User);
      const user = await userRepository.create({
        firstName,
        lastName,
        email,
        password
      });
      const created = await userRepository.save(user);
      if (created) {
        respondWithSuccess(res, user, HTTP_CREATED);
      } else {
        throw new Error('Failed to create')
      }
    } catch (error) {
      respondWithError(
        res,
        HTTP_INTERNAL_SERVER_ERROR,
        'Internal server error',
        error,
      );
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { password, email } = req.body;

      const userRepository = getRepository(User);

      const [user] = await userRepository.find({ where: { email } });

      if (user && user.validatePassword(password)) {
        const token = await generateToken({ id: user.id })
        respondWithSuccess(res, { user, token});
      } else {
        respondWithError(res, HTTP_UNAUTHORIZED, 'Invalid credentials');
      }
    } catch (error) {
      respondWithError(
        res,
        HTTP_INTERNAL_SERVER_ERROR,
        'Internal server error',
        error,
      );
    }
  }
}
