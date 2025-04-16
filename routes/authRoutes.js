const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes d'authentification
router.post('/register', authController.registerCompany);
router.post('/login', authController.loginCompany);
router.post('/logout', authController.logoutCompany); // Route pour la déconnexion
router.get('/connected', authController.getConnectedCompanies); // Route pour voir les entreprises connectées

// Routes CRUD pour les entreprises
router.get('/companies', authController.getAllCompanies); // Route pour voir toutes les entreprises
router.get('/companies/:id', authController.getCompanyById); // Route pour voir une entreprise par ID
router.put('/companies/:id', authController.updateCompany); // Route pour mettre à jour une entreprise
router.delete('/companies/:id', authController.deleteCompany); // Route pour supprimer une entreprise

module.exports = router;







// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/register', authController.registerCompany);






// router.post('/login', authController.loginCompany);

// module.exports = router;