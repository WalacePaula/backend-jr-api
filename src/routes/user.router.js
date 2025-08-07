import { Router } from 'express';
import { createUser, login } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/createUser', createUser)
userRouter.post('/login', login)

export default userRouter;