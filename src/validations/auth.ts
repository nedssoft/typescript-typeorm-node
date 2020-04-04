import { Request, Response, NextFunction } from 'express';
import * as Joi from '@hapi/joi';
import { BAD_REQUEST } from '../utils/httpStatusCode'

export const validateSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
  });
 const { error, result } = await schema.validate(req.body)

 if (!error) {
     req.body = result;
     next();
 } else {
     res.status(BAD_REQUEST).json({ error})
 }

};


