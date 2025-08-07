import models from '../models/index.js';

export const createPost = async (titulo, conteudo, autorId)  => {
    if (!titulo || !conteudo) {
        const error = new Error('Título ou conteúdo vazios');
        error.statusCode = 409;
        throw error;
    }

    const post = await models.Postagem.create({ titulo, conteudo, autorId });
    return post;
};