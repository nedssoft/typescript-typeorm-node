import { Response, Request, NextFunction } from 'express';
import { HTTP_INTERNAL_SERVER_ERROR } from '../../helpers/httpStatusCode';
import { respondWithError } from '../../helpers/helpers';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): any => {
    
    if (err) {
        respondWithError(res, HTTP_INTERNAL_SERVER_ERROR, '', err)
    } else {
        next()
    }
}

export default errorHandler;