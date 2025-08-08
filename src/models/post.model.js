const postModel = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: { 
        type: DataTypes.INTEGER,    
        primaryKey: true,
        autoIncrement: true
    }, 
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
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
    tableName: 'posts'
    });

    Post.associate = (models) => {
        Post.belongsTo(models.User, {
            foreignKey: 'authorId',
            as: 'autor'
        });
        Post.hasMany(models.Comment, {
            foreignKey: 'postId',
            as: 'comments'
        });
    };

    return Post;
};

export default postModel;