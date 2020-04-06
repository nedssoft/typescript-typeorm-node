import { Router } from 'express'
import { PostController } from '../controllers/post';
import { isAuthenticated } from '../middlewares/auth'
import { validatePost } from '../validations/post';

const router: Router= new Router();

router.post('/', isAuthenticated,validatePost,PostController.create)
router.get('/', PostController.getAllPosts)
router.patch('/:postId', isAuthenticated, PostController.update)
router.delete('/:postId', isAuthenticated, PostController.delete) 
router.get('/:postId', PostController.getOnePost) 

export default router;