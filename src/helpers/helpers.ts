import { Response } from 'express';

export const respondWithError = (res: Response, statusCode: number,message: string, error: any = []):void => {

    res.status(statusCode).json({ message: message ? message : 'Internal Server Error', error: Array.isArray(error) ? error: [error] });
};


export const respondWithSuccess = (res: Response, data: any, statusCode: number = 200, message: string = 'success'):void => {
    res.status(statusCode).json({ message, data: Array.isArray(data) ? data : [data] });
};