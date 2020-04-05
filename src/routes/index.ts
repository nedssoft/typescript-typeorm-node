import { Router, Request, Response } from 'express';
import authRoutes from './auth'
import postRoutes from './post'
import { HTTP_OK } from '../helpers/httpStatusCode';
const router: Router = new Router();

router.get('/', (req: Request, res: Response): object => {
    return res.status(HTTP_OK).json({ message: 'Welcome', status:'success', data: []});
 });

 router.use('/auth', authRoutes)
 router.use('/api/posts', postRoutes)

 export default router;