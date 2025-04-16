// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// // Inscription
// router.post('/register', authController.register);

// // Connexion
// router.post('/login', authController.login);

// module.exports = router; 



const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerCompany);

// router.get('/register', authController.registerCompany);


// router.put('/register', authController.registerCompany);

// router.delete('/register', authController.registerCompany);




router.post('/login', authController.loginCompany);

module.exports = router;