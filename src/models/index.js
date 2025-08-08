import sequelize from '../config/sequelize.js';
import Sequelize from 'sequelize';
import postModel from './post.model.js';
import commentModel from './comment.model.js';

const Post = postModel(sequelize, Sequelize.DataTypes);
const Comment = commentModel(sequelize, Sequelize.DataTypes);

const models = {
  Post,
  Comment,
  sequelize
};

Object.values(models).filter(model => typeof model.associate === 'function').forEach(model => {
  model.associate(models);
});

export default models;