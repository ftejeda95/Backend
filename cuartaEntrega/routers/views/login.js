import { Router } from 'express';
import {
      log,
      singIn,
      failLogin,
      logOut,
} from '../../controllers/operation.controller.login.js'

const router = Router();

router.get('/', log);
router.post('/sign-in',singIn);
router.get('/faillogin',failLogin);
router.get('/logout',logOut);

export default router;