// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     const token = req.header('Authorization')?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Accès non autorisé.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.companyId = decoded.id;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Token invalide.' });
//     }
// };




// const jwt = require("jsonwebtoken");
// require(`dotenv`).config();
// const jwt = require('../config/jwt');

// //Middleware pour vérifier un token JWT
// const authenticateToken= (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ msg: "Accès refusé. Token manquant" });

//   try {
//     const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token invalide" });
//   }
// };

// module.exports = authenticateToken;


const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware pour vérifier un token JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]; // Utilisation de headers au lieu de header
  if (!token) return res.status(401).json({ msg: "Accès refusé. Token manquant" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token invalide" });
  }
};

module.exports = authenticateToken;


