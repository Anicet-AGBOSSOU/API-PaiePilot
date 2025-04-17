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
// // const jwt = require('../config/jwt');

// //Middleware pour vérifier un token JWT
// const authenticateToken= (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ msg: "Accès refusé. Token manquant" });

//   try {
//     const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET || 'MON_CODE_SECRET') ;
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token invalide" });
//   }
// };

// module.exports = authenticateToken;




const jwt = require('jsonwebtoken');
require(`dotenv`).config();

// Middleware pour vérifier l'authentification
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentification requise. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute les informations de l'utilisateur au request object
    req.companyId=decoded.companyId
    next();
  
  } catch (error) {
    res.status(401).json({ error: 'Token invalide.' });
  }
};
module.exports = authenticateToken;



// // Middleware pour vérifier les rôles
// exports.authorizeRole = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ error: 'Accès refusé. Rôle non autorisé.' });
//     }
//     next();
//   };
// };