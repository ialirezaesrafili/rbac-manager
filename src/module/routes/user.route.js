import { Router } from 'express';
import userController from "../controllers/user.controller.js";

const router = Router();

router.post('/register', userController.create);

export default router;