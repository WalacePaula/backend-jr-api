import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createPost } from "../controllers/post.controller.js";

const postRouter = Router();
postRouter.use(authMiddleware);

postRouter.post("/", createPost);

export default postRouter;