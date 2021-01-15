import { Router } from 'express';
import { validate, auth } from '../middlewares';
import { transferSchema } from '../validations';
import TransfersController from '../controllers/TransfersController';

const router = Router();

router.get('/', auth, TransfersController.list);
router.post('/', auth, validate(transferSchema.transfers), TransfersController.transfers);

export default router;
