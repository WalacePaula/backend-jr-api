import user from '../models/user.model.js';
import { createNewUser, loginUser } from '../services/user.service.js';

export const createUser = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json('Todos os campos são obrigatórios');
  }

  try {
    const userData = { name, username, password};
    const user = await createNewUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json('Todos os campos são obrigatórios');
  }

  const userData = { username, password };
  try {
    const token = await loginUser(userData);
    res.status(200).json({ token });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

