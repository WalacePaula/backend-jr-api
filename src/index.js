import express from 'express';
import { PORT } from './config.js';
import userRouter from './routes/user.router.js';
import postRouter from './routes/post.router.js';
import models from './models/index.js';


const app = express();

app.use(express.json());

app.use(userRouter);
app.use(postRouter);
app.listen(PORT);

models.sequelize.sync({}).then(() => {
  console.log( 'Conectado com o banco de dados');
})
