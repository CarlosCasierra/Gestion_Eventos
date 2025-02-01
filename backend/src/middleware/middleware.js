
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

// Middleware para verificar el token
exports.verifyToken = (req, res, next) => {
    // Obtener el token del encabezado Authorization
    const authHeader = req.headers['authorization']?.split(' ')[1];
    if (!authHeader) {
        console.error('No token provided');
        return res.status(401).json({ message: 'No token provided!' });
    }
    // Verificar el token
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Adjuntar la información del usuario al objeto de la solicitud
        next(); // Continuar al siguiente middleware o controlador
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ message: 'Unauthorized!' });
    }
}

