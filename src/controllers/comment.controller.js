import { createNewComment, deleteCommentById } from "../services/comment.service.js";

export const createComment = async (req, res) => {
    const { content } = req.body;
    const postId = req.params.postId;
    const authorId = req.user.id;

    if (!content) {
        return res.status(400).json({ error: 'Conteúdo é obrigatório' });
    }

    try {
        const commentData = { content, postId, authorId };
        const comment = await createNewComment(commentData);
        res.status(201).json(comment);
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    const authorId = req.user.id;

    try {
        const commentData = { commentId, authorId };
        await deleteCommentById(commentData);
        res.status(200).json({ message: 'Comentário deletado com sucesso' });
    } catch (error) {
        console.error("Erro ao deletar comentário:", error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};