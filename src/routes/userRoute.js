import {Router} from 'express';

const userRouter = Router();

userRouter.get('/users', (req, res) => {
  res.send('Pegar usuários');
})

userRouter.get("/users/:userId", (req, res) => {
  const { userId } = req.params; // Acessar o parâmetro de rota
  res.send('Pegar usuário ' + userId);
})

userRouter.post('/user', (req, res) => {
  res.send('Criando usuários');
})

userRouter.delete('/user/:userId', (req, res) => {
  res.send('Excluir usuários');
})

userRouter.put('/user/:userId', (req, res) => {
  const { userId } = req.params; // Acessar o parâmetro de rota
  res.send('Atualizar usuário ' + userId);
})

export default userRouter;