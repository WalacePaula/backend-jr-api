import { createPost } from "../services/post.service.js";

export const create = async (req, res) => {
  const { titulo, conteudo } = req.body;
  const autorId = req.user.id;

  if (!titulo || !conteudo) {
        return res.send("Título e conteúdo são obrigatórios");
  }
    try {
        const post = await createPost(titulo, conteudo, autorId);
        res.status(201).json(post);
    } catch (error) {
        console.error("Erro ao criar postagem:", error);
        res.send("Erro interno do servidor");
    }
};