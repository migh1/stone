import { Router } from 'express';
import { validate } from '../middlewares';
import { accountSchema } from '../validations';
import AccountsController from '../controllers/AccountsController';

const router = Router();

router.post('/', validate(accountSchema.create), AccountsController.create);

export default router;
