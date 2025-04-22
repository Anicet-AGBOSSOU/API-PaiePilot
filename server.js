


// const express = require('express');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const employeeRoutes = require('./routes/employeeRoutes');
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swagger');


// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3001;
// const cors= require("cors")
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(cors());
// connectDB;


// require('./swagger')(app);

// app.use('/api/auth', authRoutes);
// app.use('/api/employees', employeeRoutes);

// app.listen(port, () => {
//   console.log(`Serveur backend démarré sur le port ${port}`);
// });

// //Pour le message dans le naviguateur
// app.get(`/`,(request,response)=>{
//     response.send(`Salut les amis, Bienvenu sur l'API de PaiePilot`);
// })



const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


connectDB;

// 🔥 Intégration de la doc Swagger ici
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🔗 Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// 🏠 Route de base
app.get('/', (req, res) => {
  res.send('Salut les amis, Bienvenu sur l\'API de PaiePilot');
});

// 🚀 Lancement du serveur
app.listen(port, () => {
  console.log(`✅ Serveur backend démarré sur le port ${port}`);
});
