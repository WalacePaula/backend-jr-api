import user from '../models/user.model.js';
import { createNewUser, loginUser } from '../services/user.service.js';

export const createUser = async (req, res) => {
  const { nome, username, password } = req.body;

  if (!nome || !username || !password) {
    return res.status(400).json('Todos os campos são obrigatórios');
  }

  try {
    const userData = { nome, username, password};
    const user = await createNewUser(userData);
    res.status(201).json(user).send('Usuário cadastrado com sucesso');
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json('Todos os campos são obrigatórios');
  }

  try {
    const token = await loginUser(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

