import { Response, Request, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): any => {
    if (err) {
        res.status(500).json({status: 'error', message: err.message, errors: []})
    }
    next()
}

export default errorHandler;