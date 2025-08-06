import express from 'express';
import { PORT } from './config.js';
import userRouter from './routes/userRoute.js';
import models from './models/index.js';


const app = express();

app.use(userRouter);
app.listen(PORT);

models.sequelize.sync().then(() => {
  console.log( 'Conectado com o banco de dados');
})
