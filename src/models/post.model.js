const postModel = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: { 
        type: DataTypes.INTEGER,    
        primaryKey: true,
        autoIncrement: true
    }, 
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conteudo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    autorId: {
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
            foreignKey: 'autorId',
            as: 'autor'
        });
        //Associação com comentários
    };

    return Post;

};

export default postModel;