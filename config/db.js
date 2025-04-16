const mongoose = require('mongoose');

require(`dotenv`).config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Anicet:Anicet1604@cluster0.r1ckt.mongodb.net/PaiePilot';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

  module.exports = mongoose.connection;

