// const mongoose = require('mongoose');
// require(`dotenv`).config();

// // Connexion à la base de données MongoDB

// const connectDB = async () => {
//     await mongoose.connect(process.env.MONGODB_URI,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }
//     )
//     .then(() => console.log("MongoDB connecté"))
//     .catch(err => console.error("Erreur de connexion à MongoDB", err));
// }

// module.exports = connectDB



const mongoose = require('mongoose');


require(`dotenv`).config();


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Anicet:Anicet1604@cluster0.r1ckt.mongodb.net/PaiePilot';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));


  module.exports = mongoose.connection;

// const mongoose = require('mongoose');
// require('dotenv').config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('Connexion à la base de données réussie.');
//   } catch (error) {
//     console.error('Erreur de connexion à la base de données :', error.message);
//     process.exit(1); // Quitte l'application en cas d'erreur
//   }
// };

// module.exports = connectDB;