import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createPost, updatePost, getPosts, deletePost } from "../controllers/post.controller.js";
import { createComment, deleteComment } from "../controllers/comment.controller.js";

const postRouter = Router();
postRouter.use(authMiddleware);

postRouter.post("/", createPost);
postRouter.put("/:id", updatePost);
postRouter.get("/", getPosts);
postRouter.delete("/:id", deletePost);

postRouter.post("/:postId/comments", createComment);
postRouter.delete("/:postId/comments/:commentId", deleteComment);

export default postRouter;