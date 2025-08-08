import models from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createNewUser = async (userData) => {
    const { name, username, password } = userData;

    const existingUser = await models.User.findOne({ where: { username } });
    if (existingUser) {
        const error = new Error('Este nome de usuário já está em uso.');
        error.statusCode = 409;
        throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await models.User.create({ name, username, password: hashedPassword });
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt,
    };
};

export const loginUser = async (credenciais) => {
    const { username, password } = credenciais;
    const user = await models.User.findOne({ where: { username } });
    if (!user) {
        const error = new Error('Credenciais inválidas');
        error.statusCode = 401;
        throw error;
    }  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        const error = new Error('Credenciais inválidas');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({ id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return token;
};