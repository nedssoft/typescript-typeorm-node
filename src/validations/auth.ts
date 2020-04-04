import { Request, Response, NextFunction } from 'express';
import * as Joi from '@hapi/joi';
import { HTTP_BAD_REQUEST } from '../helpers/httpStatusCode';
import { respondWithError } from '../helpers/helpers';

export const validateSignUp =  (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    firstName: Joi.string().required().trim().min(2),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
  });
  const { error, value } = schema.validate(req.body);

  if (!error) {
    req.body = value;
    next();
  } else {
    return respondWithError(
      res,
      HTTP_BAD_REQUEST,
      'Validation error',
      error.details,
    );
  }
};
