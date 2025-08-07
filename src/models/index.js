import sequelize from '../config/sequelize.js';
import Sequelize from 'sequelize';
import userModel from './user.model.js';
import postModel from './post.model.js';

const User = userModel(sequelize, Sequelize.DataTypes);
const Post = postModel(sequelize, Sequelize.DataTypes);

const models = {
  User,
  Post,
  sequelize
};

Object.values(models).filter(model => typeof model.associate === 'function').forEach(model => {
  model.associate(models);
});

export default models;