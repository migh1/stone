import { Router } from 'express';
import validate from '../middlewares';
import { withdrawSchema } from '../validations';
import WithdrawController from '../controllers/WithdrawController';

const router = Router();

router.post('/', validate(withdrawSchema.withdraw), WithdrawController.withdraw);

export default router;
