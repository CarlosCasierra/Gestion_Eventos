const express = require('express');
const { verifyToken } = require('../middleware/middleware'); // Importar el middleware de autenticación

const router = express.Router();

// Ruta protegida

router.get('/protected-data', verifyToken, (req, res) => {
    res.json({ 
        message: 'Access granted to protected data!',
        user: req.user,
    });
});
router.post('/create-event', verifyToken, (req, res) => {
    const { userId } = req.user.id;  // Suponiendo que el ID del usuario se pasa en el cuerpo de la solicitud

    if (req.user.id !== userId) {
        return res.status(403).json({ message: 'You can only create events for yourself!' });
    }

    // Lógica para crear el evento
    // ...
});
module.exports = router;
