// const Employee = require('../models/Employee');

// // Ajouter un employé
// exports.addEmployee = async (req, res) => {
//     try {
//         const { firstName, lastName, age, maritalStatus, position } = req.body;

//         const newEmployee = new Employee({
//             companyId: req.companyId,
//             firstName,
//             lastName,
//             age,
//             maritalStatus,
//             position
//         });

//         await newEmployee.save();
//         res.status(201).json({ message: 'Employé ajouté avec succès.', employee: newEmployee });
//     } catch (error) {
//         res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'employé.', error });
//     }
// };

// // Récupérer tous les employés
// exports.getEmployees = async (req, res) => {
//     try {
//         const employees = await Employee.find({ companyId: req.companyId });
//         res.status(200).json({ employees });
//     } catch (error) {
//         res.status(500).json({ message: 'Erreur lors de la récupération des employés.', error });
//     }
// };

// // Récupérer un employé par ID
// exports.getEmployeeById = async (req, res) => {
//     try {
//         const employee = await Employee.findOne({ _id: req.params.id, companyId: req.companyId });
//         if (!employee) {
//             return res.status(404).json({ message: 'Employé non trouvé.' });
//         }
//         res.status(200).json({ employee });
//     } catch (error) {
//         res.status(500).json({ message: 'Erreur lors de la récupération de l\'employé.', error });
//     }
// };

// // Mettre à jour un employé
// exports.updateEmployee = async (req, res) => {
//     try {
//         const updatedEmployee = await Employee.findOneAndUpdate(
//             { _id: req.params.id, companyId: req.companyId },
//             req.body,
//             { new: true }
//         );

//         if (!updatedEmployee) {
//             return res.status(404).json({ message: 'Employé non trouvé.' });
//         }

//         res.status(200).json({ message: 'Employé mis à jour avec succès.', employee: updatedEmployee });
//     } catch (error) {
//         res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'employé.', error });
//     }
// };

// // Supprimer un employé
// exports.deleteEmployee = async (req, res) => {
//     try {
//         const deletedEmployee = await Employee.findOneAndDelete({ _id: req.params.id, companyId: req.companyId });
//         if (!deletedEmployee) {
//             return res.status(404).json({ message: 'Employé non trouvé.' });
//         }

//         res.status(200).json({ message: 'Employé supprimé avec succès.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Erreur lors de la suppression de l\'employé.', error });
//     }
// };



const Employee = require('../models/employee');

exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, maritalStatus, jobTitle, numberOfChildren, dateOfBirth, hireDate, salary, department /* ... autres champs ... */ } = req.body;
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      companyId: req.companyId,
      maritalStatus,
      jobTitle,
      numberOfChildren,
      dateOfBirth,
      hireDate,
      salary,
      department,
      // ... assignez les autres champs ici ...
    });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error('Erreur lors de la création de l\'employé :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de l\'employé.' });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ companyId: req.companyId });
    res.status(200).json(employees);
  } catch (error) {
    console.error('Erreur lors de la récupération des employés :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des employés.' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé.' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'employé :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'employé.' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, maritalStatus, jobTitle, numberOfChildren, dateOfBirth, hireDate, salary, department /* ... autres champs ... */ } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        email,
        companyId: req.companyId,
        maritalStatus,
        jobTitle,
        numberOfChildren,
        dateOfBirth,
        hireDate,
        salary,
        department
      },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employé non trouvé.' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'employé :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'employé.' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employé non trouvé.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'employé :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'employé.' });
  }
};

