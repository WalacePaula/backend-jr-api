import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { create } from "../controllers/post.controller.js";

const postRouter = Router();
postRouter.use(authMiddleware);

postRouter.post("/", create);

export default postRouter;