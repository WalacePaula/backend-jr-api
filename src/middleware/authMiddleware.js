import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send('Token não fornecido ou inválido');
    }

    const tokenValue = token.split(' ')[1];
    
    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send('Token expirado');
        }
        return res.status(401).send('Token inválido');
    }
};

export default authMiddleware;