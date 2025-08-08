import { createNewPost, updateExistingPost, findAllPosts, deletePostById } from "../services/post.service.js";

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const authorId = req.user.id;

  if (!title || !content) {
        return res.send("Título e conteúdo são obrigatórios");
  }
    try {
        const postData = {title, content,authorId};
        const post = await createNewPost(postData);
        res.status(201).json(post);
    } catch (error) {
        console.error("Erro ao criar post:", error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try{
        const updateData = {
            postId: req.params.id,
            title: req.body.title,
            content: req.body.content,
            authorId: req.user.id
        };
        const post = await updateExistingPost(updateData);
        res.status(200).json(post);
    } catch (error) {
        console.error("Erro ao atualizar post:", error);
        res.status(error.statusCode || 500).json({ error: error.message });
        }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await findAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Erro ao buscar posts:", error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const authorId = req.user.id;
    if (!postId) {
        return res.status(400).json({ error: 'Especifique o id do post' });
    }
    const postData = { postId, authorId };
    try {
        await deletePostById(postData);
        res.status(200).json({ message: 'Post deletado com sucesso' });
    } catch (error) {
        console.error("Erro ao deletar post:", error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};