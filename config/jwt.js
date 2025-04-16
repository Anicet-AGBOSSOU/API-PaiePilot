// const { verifyToken } = require('../config/jwt');

// module.exports = (req, res, next) => {
//     const token = req.header('Authorization')?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Accès non autorisé.' });
//     }

//     try {
//         const decoded = verifyToken(token);
//         req.companyId = decoded.id;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Token invalide.' });
//     }
// };




const jwt = require('jsonwebtoken');



// Fonction pour générer un token JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'MON_CODE', { expiresIn: '1h' });
};

// Fonction pour vérifier un token JWT
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };






// module.exports = {
//     JWT_SECRET: process.env.JWT_SECRET || 'MON_CODE',
//   };