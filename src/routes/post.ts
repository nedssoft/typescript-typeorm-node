import { Router } from 'express'
import { PostController } from '../controllers/post';
import { isAuthenticated } from '../middlewares/auth'
import { validatePost } from '../validations/post';

const router: Router= new Router();

router.post('/', isAuthenticated,validatePost,PostController.create)
router.get('/', PostController.getAllPosts)

export default router;