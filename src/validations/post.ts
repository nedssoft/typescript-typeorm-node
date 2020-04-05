import { Request, Response, NextFunction } from 'express';
import * as Joi from '@hapi/joi';
import { HTTP_BAD_REQUEST } from '../helpers/httpStatusCode';
import { respondWithError } from '../helpers/helpers';

export const validatePost =  (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    title: Joi.string().required().trim(),
    body: Joi.string().required().trim(),
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