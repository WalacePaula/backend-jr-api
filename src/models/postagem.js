const postagem = (sequelize, DataTypes) => {
  const Postagem = sequelize.define('Postagem', {
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
    tableName: 'postagens'
    });

    Postagem.associate = (models) => {
        Postagem.belongsTo(models.User, {
            foreignKey: 'autorId',
            as: 'autor'
        });
        //Associação com comentários
    };

    return Postagem;

};

export default postagem;