import { Router, Request, Response } from 'express';

const router: Router = new Router();

router.get('/', (req: Request, res: Response): object => {
    return res.status(200).json({ message: 'Welcome', status:'success', data: []});
 });

 export default router;