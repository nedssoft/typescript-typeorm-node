import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { User } from '../database/entities/User';
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_CREATED } from '../helpers/httpStatusCode';
import { respondWithError, respondWithSuccess } from '../helpers/helpers';

export class AuthController {
  static async signUp(req: Request, res: Response) {
    try {
      const { firstName, lastName, password, email } = req.body;
      const hashedPassword = await bcrypt.hashSync(password, 10);
      const userRepository = getRepository(User);

      const user = await userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      const created = await userRepository.save(user);
      if (created) {
        respondWithSuccess(res, user, HTTP_CREATED )
      }
    } catch (error) {
        respondWithError(res, HTTP_INTERNAL_SERVER_ERROR, 'Internal server error', error)
    }
  }
}
