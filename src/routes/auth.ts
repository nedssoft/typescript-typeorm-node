
import { Router } from 'express';
import { AuthController as Auth } from '../controllers/auth';
import { validateSignUp } from '../validations/auth';

const router = new Router();

router.post('/register', validateSignUp,  Auth.signUp)

export default router;