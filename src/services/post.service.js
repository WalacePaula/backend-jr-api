import models from '../models/index.js';

export const createNewPost = async (postData)  => {
    const { titulo, conteudo, autorId } = postData;
    if (!titulo || !conteudo) {
        const error = new Error('Título ou conteúdo vazios');
        error.statusCode = 409;
        throw error;
    }

    const post = await models.Post.create({ titulo, conteudo, autorId });
    return post;
};

export const updateExistingPost = async (updateData) => {
    const { postId, titulo, conteudo, autorId } = updateData;

    const post = await models.Post.findByPk(postId);
    if (!post) {
        const error = new Error('Post não encontrado');
        error.statusCode = 404;
        throw error;
    }

    if (post.autorId !== autorId) {
        const error = new Error('Você não tem permissão para atualizar este post');
        error.statusCode = 403;
        throw error;
    }

    if (titulo) {
        post.titulo = titulo;
    }

    if (conteudo) {
        post.conteudo = conteudo;
    }

    await post.save();

    return post;
};

export const findAllPosts = async () => {
    const posts = await models.Post.findAll({
        include: [{ 
            model: models.User,
            as: 'autor',
            attributes: ['id', 'name', 'username']}]
    });
    return posts;
};

export const deletePostById = async (postData) => {
    const { postId, autorId } = postData;
    const post = await models.Post.findByPk(postId);
    if (!post) {
        const error = new Error('Post não encontrado');
        error.statusCode = 404;
        throw error;
    }
    if (post.autorId !== autorId) {
        const error = new Error('Você não tem permissão para deletar este post');
        error.statusCode = 403;
        throw error;
    }
    await post.destroy();
}