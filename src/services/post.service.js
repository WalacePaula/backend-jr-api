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