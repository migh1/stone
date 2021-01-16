import { Router } from 'express';
import { auth, validate } from '../middlewares';
import { withdrawSchema } from '../validations';
import WithdrawController from '../controllers/WithdrawController';

const router = Router();

router.post('/', auth, validate(withdrawSchema.withdraw), WithdrawController.withdraw);

export default router;
