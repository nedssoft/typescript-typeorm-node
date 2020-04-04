
import { Router } from 'express';
import { AuthController as Auth } from '../controllers/auth';
import { validateSignUp, validateLogin } from '../validations/auth';

const router = new Router();

router.post('/register', validateSignUp,  Auth.signUp)
router.post('/login', validateLogin,  Auth.login)

export default router;