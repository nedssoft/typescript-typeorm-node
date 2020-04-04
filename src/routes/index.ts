import { Router, Request, Response } from 'express';
import authRoutes from './auth'
import { HTTP_OK } from '../helpers/httpStatusCode';
const router: Router = new Router();

router.get('/', (req: Request, res: Response): object => {
    return res.status(HTTP_OK).json({ message: 'Welcome', status:'success', data: []});
 });

 router.use('/auth', authRoutes)

 export default router;