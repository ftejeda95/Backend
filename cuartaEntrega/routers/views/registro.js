import { Router } from "express";
import {
  regristro,
  failRegister,
  singUp,
} from "../../controllers/operation.controller.registro.js";
const router = Router();

router.get("/registro",regristro);
router.get("/failregister",failRegister);
router.post("/sign-up",singUp);
export default router;
