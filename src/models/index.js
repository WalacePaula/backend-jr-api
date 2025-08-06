import sequelize from '../config/sequelize.js';
import Sequelize from 'sequelize';
import userModel from './user.js';

const User = userModel(sequelize, Sequelize.DataTypes);

const models = {
  User,
  sequelize
};

export default models;