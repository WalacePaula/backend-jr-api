const commentModel = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
  }, {
    tableName: 'comments'
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post'
    });
  };
    return Comment;
};

export default commentModel;