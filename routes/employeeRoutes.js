// const express = require('express');
// const router = express.Router();
// const employeeController = require('../controllers/employeeController');
// const authMiddleware = require('../middleware/authMiddleware');

// // Ajouter un employé
// router.post('/', authMiddleware, employeeController.addEmployee);

// // Récupérer tous les employés
// router.get('/', authMiddleware, employeeController.getEmployees);

// // Récupérer un employé par ID
// router.get('/:id', authMiddleware, employeeController.getEmployeeById);

// // Mettre à jour un employé
// router.put('/:id', authMiddleware, employeeController.updateEmployee);

// // Supprimer un employé
// router.delete('/:id', authMiddleware, employeeController.deleteEmployee);

// module.exports = router;






const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authenticateToken = require('../middleware/authMiddleware');


const { validateEmployeeInput } = require('../middleware/validationMiddleware'); // Exemple

router.post('/', authenticateToken, validateEmployeeInput, employeeController.createEmployee);

router.get('/', authenticateToken, employeeController.getAllEmployees);

router.get('/:id', authenticateToken, employeeController.getEmployeeById);

router.put('/:id', authenticateToken, validateEmployeeInput, employeeController.updateEmployee);

router.delete('/:id', authenticateToken, employeeController.deleteEmployee);

module.exports = router;

