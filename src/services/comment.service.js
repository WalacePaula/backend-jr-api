import models from '../models/index.js';

export const createNewComment = async (commentData) => {
    const { content, postId, authorId } = commentData;

    const post = await models.Post.findByPk(postId);
    if (!post) {
        const error = new Error('Post não encontrado');
        error.statusCode = 404;
        throw error;
    }

    const comment = await models.Comment.create({ content, postId, authorId });
    return comment;
};

export const deleteCommentById = async (commentData) => {
    const { commentId, authorId } = commentData;

    const comment = await models.Comment.findByPk(commentId);
    if (!comment) {
        const error = new Error('Comentário não encontrado');
        error.statusCode = 404;
        throw error;
    }

    if (comment.authorId !== authorId) {
        const error = new Error('Você não tem permissão para deletar este comentário');
        error.statusCode = 403;
        throw error;
    }

    await comment.destroy();
};