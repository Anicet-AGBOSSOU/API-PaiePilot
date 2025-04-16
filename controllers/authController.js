const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Company = require('../models/companyModel');
const { JWT_SECRET } = require('../config/jwt');

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

const connectedCompanies = []; // Tableau pour stocker les entreprises connectées

// Inscription d'une entreprise
exports.registerCompany = async (req, res) => {
  const {
    companyName,
    companyEmail,
    password,
    phoneNumber,
    address,
    registrationNumber,
    taxIdentificationNumber,
    legalForm,
    sectorOfActivity,
    website,
    contactPersonName,
    contactPersonEmail,
    contactPersonPhone,
  } = req.body;

  const requiredFields = [companyName, companyEmail, password];
  if (requiredFields.some(field => !field)) {
    return res.status(400).json({ error: 'Le nom de l\'entreprise, l\'email et le mot de passe sont requis.' });
  }

  try {
    const existingCompany = await Company.findOne({ companyEmail });
    if (existingCompany) {
      return res.status(409).json({ error: 'L\'adresse email de l\'entreprise existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
      companyName,
      companyEmail,
      passwordHash: hashedPassword,
      phoneNumber,
      address,
      registrationNumber,
      taxIdentificationNumber,
      legalForm,
      sectorOfActivity,
      website,
      contactPersonName,
      contactPersonEmail,
      contactPersonPhone,
    });

    const savedCompany = await newCompany.save();

    res.status(201).json({ message: 'Entreprise enregistrée avec succès.', companyId: savedCompany._id });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'inscription.' });
  }
};

// Connexion d'une entreprise
exports.loginCompany = async (req, res) => {
  const { companyEmail, password } = req.body;

  if (!companyEmail || !password) {
    return res.status(400).json({ error: 'L\'email et le mot de passe sont requis.' });
  }

  try {
    const company = await Company.findOne({ companyEmail });

    if (!company) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    const passwordMatch = await bcrypt.compare(password, company.passwordHash);
    if (passwordMatch) {
      const payload = { companyId: company._id, companyEmail: company.companyEmail };
      const token = generateToken(payload);


      // Ajouter l'entreprise à la liste des connectées
      connectedCompanies.push({ companyId: company._id, companyEmail: company.companyEmail });

      res.status(200).json({ token, companyId: company._id });
    } else {
      res.status(401).json({ error: 'Identifiants invalides.' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
  }
};

// Déconnexion d'une entreprise
exports.logoutCompany = (req, res) => {
  const { companyId } = req.body;

  // Supprimer l'entreprise de la liste des connectées
  const index = connectedCompanies.findIndex(company => company.companyId === companyId);
  if (index !== -1) {
    connectedCompanies.splice(index, 1);
  }

  res.status(200).json({ message: 'Déconnexion réussie.' });
};

// Voir toutes les entreprises connectées
exports.getConnectedCompanies = (req, res) => {
  res.status(200).json(connectedCompanies);
};

// Lire toutes les entreprises
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error('Erreur lors de la récupération des entreprises :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des entreprises.' });
  }
};

// Lire une entreprise par ID
exports.getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ error: 'Entreprise non trouvée.' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'entreprise :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'entreprise.' });
  }
};

// Mettre à jour une entreprise
exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedCompany = await Company.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ error: 'Entreprise non trouvée.' });
    }
    res.status(200).json({ message: 'Entreprise mise à jour avec succès.', company: updatedCompany });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'entreprise :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'entreprise.' });
  }
};

// Supprimer une entreprise
exports.deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ error: 'Entreprise non trouvée.' });
    }
    res.status(200).json({ message: 'Entreprise supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'entreprise :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'entreprise.' });
  }
};






// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Company = require('../models/companyModel');
// const { JWT_SECRET } = require('../config/jwt');

// const generateToken = (payload) => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
// };

// exports.registerCompany = async (req, res) => {
//   const {
//     companyName,
//     companyEmail,
//     password,
//     phoneNumber,
//     address,
//     registrationNumber,
//     taxIdentificationNumber,
//     legalForm,
//     sectorOfActivity,
//     website,
//     contactPersonName,
//     contactPersonEmail,
//     contactPersonPhone,
//   } = req.body;

//   const requiredFields = [companyName, companyEmail, password];
//   if (requiredFields.some(field => !field)) {
//     return res.status(400).json({ error: 'Le nom de l\'entreprise, l\'email et le mot de passe sont requis.' });
//   }

//   try {
//     const existingCompany = await Company.findOne({ companyEmail });
//     if (existingCompany) {
//       return res.status(409).json({ error: 'L\'adresse email de l\'entreprise existe déjà.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newCompany = new Company({
//       companyName,
//       companyEmail,
//       passwordHash: hashedPassword,
//       phoneNumber,
//       address,
//       registrationNumber,
//       taxIdentificationNumber,
//       legalForm,
//       sectorOfActivity,
//       website,
//       contactPersonName,
//       contactPersonEmail,
//       contactPersonPhone,
//     });

//     const savedCompany = await newCompany.save();

//     res.status(201).json({ message: 'Entreprise enregistrée avec succès.', companyId: savedCompany._id });
//   } catch (error) {
//     console.error('Erreur lors de l\'inscription :', error);
//     res.status(500).json({ error: 'Erreur serveur lors de l\'inscription.' });
//   }
// };

// exports.loginCompany = async (req, res) => {
//   const { companyEmail, password } = req.body;

//   if (!companyEmail || !password) {
//     return res.status(400).json({ error: 'L\'email et le mot de passe sont requis.' });
//   }

//   try {
//     const company = await Company.findOne({ companyEmail });

//     if (!company) {
//       return res.status(401).json({ error: 'Identifiants invalides.' });
//     }

//     const passwordMatch = await bcrypt.compare(password, company.passwordHash);

//     console.log(company)
//     if (passwordMatch) {
//       const payload = { companyId: company._id, companyEmail: company.companyEmail };
//       const token = generateToken(payload);

//       res.status(200).json({ token, companyId: company._id });
//     } else {
//       res.status(401).json({ error: 'Identifiants invalides.' });
//     }
//   } catch (error) {
//     console.error('Erreur lors de la connexion :', error);
//     res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
//   }
// };