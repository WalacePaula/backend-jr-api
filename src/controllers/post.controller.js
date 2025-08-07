import { createNewPost } from "../services/post.service.js";
import { updateExistingPost, findAllPosts, deletePostById } from "../services/post.service.js";

export const createPost = async (req, res) => {
  const { titulo, conteudo } = req.body;
  const autorId = req.user.id;

  if (!titulo || !conteudo) {
        return res.send("Título e conteúdo são obrigatórios");
  }
    try {
        const postData = {titulo, conteudo,autorId};
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
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            autorId: req.user.id
        };
        const post = await updateExistingPost(updateData);
        res.status(200).json(post);
    } catch (error) {
        console.error("Erro ao atualizar post:", error);
        res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

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
    const autorId = req.user.id;
    if (!postId) {
        return res.status(400).json({ error: 'Especifique o id do post' });
    }
    const postData = { postId, autorId };
    try {
        await deletePostById(postData);
        res.status(200).json({ message: 'Post deletado com sucesso' });
    } catch (error) {
        console.error("Erro ao deletar post:", error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};