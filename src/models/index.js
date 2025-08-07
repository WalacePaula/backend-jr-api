import sequelize from '../config/sequelize.js';
import Sequelize from 'sequelize';
import userModel from './user.js';
import postagemModel from './postagem.js';

const User = userModel(sequelize, Sequelize.DataTypes);
const Postagem = postagemModel(sequelize, Sequelize.DataTypes);

const models = {
  User,
  Postagem,
  sequelize
};

export default models;