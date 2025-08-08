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
            model: models.Comment,
            as: 'comments',
            attributes: ['id', 'content', 'createdAt', 'authorId'],
        }
    ]
    });

    const authorIds = new Set();
    posts.forEach(post => {
        authorIds.add(post.authorId.toString());
        post.comments.forEach(comment => {
            authorIds.add(comment.authorId.toString());
        });
    });

    const authors = await User.find({ '_id': { $in: Array.from(authorIds)} }).select('name username');
    const authorMap = new Map(authors.map(author => [author._id.toString(), author]));

    const populatedPosts = posts.map(post => {
        const postJson = post.toJSON();
        postJson.author = authorMap.get(post.authorId.toString());
        postJson.comments = postJson.comments.map(comment => {
            return {
                ...comment,
                autor: authorMap.get(comment.authorId.toString())
            };
        });
    
        return postJson;
    });
    return populatedPosts;
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