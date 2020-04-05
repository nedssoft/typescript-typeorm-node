import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../../helpers/jwt'
import { getRepository } from 'typeorm'
import { User } from '../../database/entities/User'
import { respondWithError } from '../../helpers/helpers'
import { HTTP_UNAUTHORIZED } from '../../helpers/httpStatusCode'

export const isAuthenticated =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization = ''} = req.headers
        const { id } = await decodeToken(authorization);
        if (id) {
            const user = await getRepository(User).findOne(id);
            req.user = user;
            next()
        } else {
            respondWithError(res,HTTP_UNAUTHORIZED,'Invalid authorization' )
        }
    } catch (error) {
        respondWithError(res,HTTP_UNAUTHORIZED,'Invalid authorization')
    }
}