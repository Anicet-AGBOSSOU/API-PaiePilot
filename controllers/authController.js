// const bcrypt = require('bcryptjs');
// const { generateToken } = require('../config/jwt');
// const Company = require('../models/Company');

// // Inscription
// exports.register = async (req, res) => {
//     try {
//         const { companyName, sector, commerceRegistry, city, phone, email, password } = req.body;

//         // Vérifier si l'email existe déjà
//         const existingCompany = await Company.findOne({ email });
//         if (existingCompany) {
//             return res.status(400).json({ message: 'Cette adresse email est déjà utilisée.' });
//         }

//         // Hacher le mot de passe
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Créer une nouvelle entreprise
//         const newCompany = new Company({
//             companyName,
//             sector,
//             commerceRegistry,
//             city,
//             phone,
//             email,
//             password: hashedPassword
//         });

//         await newCompany.save();
//         res.status(201).json({ message: 'Enregistrement réussi.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Erreur lors de l\'enregistrement.', error });
//     }
// };

// // Connexion
// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Vérifier si l'utilisateur existe
//         const company = await Company.findOne({ email });
//         if (!company) {
//             return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
//         }

//         // Vérifier le mot de passe
//         const isMatch = await bcrypt.compare(password, company.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
//         }

//         // Générer un token JWT
//         const token = generateToken(company._id);

//         res.status(200).json({ message: 'Connexion réussie.', token });
//     } catch (error) {
//         res.status(500).json({ message: 'Erreur lors de la connexion.', error });
//     }
// };



const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Company = require('../models/companyModel');
const { JWT_SECRET } = require('../config/jwt');

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

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

    console.log(company)
    if (passwordMatch) {
      const payload = { companyId: company._id, companyEmail: company.companyEmail };
      const token = generateToken(payload);

      res.status(200).json({ token, companyId: company._id });
    } else {
      res.status(401).json({ error: 'Identifiants invalides.' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
  }
};