import models from '../models/index.js';

export const createNewPost = async (postData)  => {
    const { title, content, authorId } = postData;
    if (!title || !content) {
        const error = new Error('Título ou conteúdo vazios');
        error.statusCode = 409;
        throw error;
    }

    const post = await models.Post.create({ title, content, authorId });
    return post;
};

export const updateExistingPost = async (updateData) => {
    const { postId, title, content, authorId } = updateData;

    const post = await models.Post.findByPk(postId);
    if (!post) {
        const error = new Error('Post não encontrado');
        error.statusCode = 404;
        throw error;
    }

    if (post.authorId !== authorId) {
        const error = new Error('Você não tem permissão para atualizar este post');
        error.statusCode = 403;
        throw error;
    }

    if (title) {
        post.title = title;
    }

    if (content) {
        post.content = content;
    }

    await post.save();

    return post;
};

export const findAllPosts = async () => {
    const posts = await models.Post.findAll({
        include: [
        { 
            model: models.User,
            as: 'autor',
            attributes: ['id', 'name', 'username']
        }, 
        {
            model: models.Comment,
            as: 'comments',
            attributes: ['id', 'content', 'createdAt'],
            include: [
                {
                    model: models.User,
                    as: 'autor',
                    attributes: ['id', 'name', 'username']
                }
            ]
        }
    ]
    });
    return posts;
};

export const deletePostById = async (postData) => {
    const { postId, authorId } = postData;
    const post = await models.Post.findByPk(postId);
    if (!post) {
        const error = new Error('Post não encontrado');
        error.statusCode = 404;
        throw error;
    }
    if (post.authorId !== authorId) {
        const error = new Error('Você não tem permissão para deletar este post');
        error.statusCode = 403;
        throw error;
    }
    await post.destroy();
};