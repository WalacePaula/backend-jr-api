import { createNewPost } from "../services/post.service.js";

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