const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }}, {
    tableName: 'users'
})

    User.associate = (models) => {
        User.hasMany(models.Post, {
            foreignKey: 'autorId', as : 'posts'
        });

        // Associações com comentários
    }
    return User;
};

export default userModel;