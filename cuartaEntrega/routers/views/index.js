import { Router } from 'express';
import productsTest from '../views-test/index.js';
import login from './login.js';

const router = Router();
router.use('/', productsTest, login);

export default router;