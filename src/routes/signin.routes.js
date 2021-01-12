import { Router } from 'express';
import validate from '../middlewares';
import { signinSchema } from '../validations';
import SigninController from '../controllers/SigninController';

const router = Router();

router.post('/', validate(signinSchema.authenticate), SigninController.authenticate);

export default router;
