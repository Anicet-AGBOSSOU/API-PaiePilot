




// const express = require('express');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const employeeRoutes = require('./routes/employeeRoutes');
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swagger'); // 
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());


// connectDB;

// // 🔥 Intégration de la doc Swagger ici
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // 🔗 Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/employees', employeeRoutes);

// // 🏠 Route de base
// app.get('/', (req, res) => {
//   res.send('Salut les amis, Bienvenu sur l\'API de PaiePilot');
// });

// // 🚀 Lancement du serveur
// app.listen(port, () => {
//   console.log(`✅ Serveur backend démarré sur le port ${port}`);
// });





const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// ✅ Connexion à la base de données
// connectDB();

// ✅ Middleware CORS : à placer avant les routes
app.use(cors({
  origin: '*', // Remplace '*' par 'http://localhost:3000' si tu veux restreindre
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Autres middlewares
app.use(express.json());
app.use(bodyParser.json());

// ✅ Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// ✅ Route racine
app.get('/', (req, res) => {
  res.send('Salut les amis, Bienvenu sur l\'API de PaiePilot');
});

// ✅ Lancement du serveur
app.listen(port, () => {
  console.log(`✅ Serveur backend démarré sur le port ${port}`);
});
