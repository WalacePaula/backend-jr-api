import {Router} from 'express';
import models from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get('/users', async (req, res) => {
    try{
    const users = await models.User.findAll({
        attributes: {exclude : ['password']},
    });
    
    res.json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro interno do servidor');
    }
    
})

userRouter.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  res.send('Pegar usuário ' + userId);
})

userRouter.post('/createUser', async (req, res) => {
  const { nome, username, password } = req.body;
  if (!nome || !username || !password) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await models.User.create({ nome, username, password: hashedPassword });
    return res.send('Usuário cadastrado com sucesso');
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
})

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body; 
    if (!username || !password) {
    return res.status(400).send('Todos os campos são obrigatórios');
    }
    try {
        const user = await models.User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }  
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Senha inválida');
        }

        const token = jwt.sign({ id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });

        return res.send('Login realizado com sucesso');
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        return res.status(500).send('Erro interno do servidor');
    }
});

//Talvez não precise
userRouter.delete('/user/:userId', (req, res) => {
  res.send('Excluir usuários');
})

//Talvez não precise
userRouter.put('/user/:userId', (req, res) => {
  const { userId } = req.params;
  res.send('Atualizar usuário ' + userId);
})

export default userRouter;