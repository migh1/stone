import { Router } from 'express';
import validate from '../middlewares';
import { transferSchema } from '../validations';
import TransfersController from '../controllers/TransfersController';

const router = Router();

router.get('/', TransfersController.list);
router.post('/', validate(transferSchema.transfers), TransfersController.transfers);

export default router;
