// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const employeeRoutes = require('./routes/employeeRoutes');

// const app = express();

// // Middleware
// app.use(express.json());

// // Connexion à MongoDB
// connectDB();

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/employees', employeeRoutes);

// // Démarrer le serveur
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Serveur en écoute sur le port ${PORT}`);
// });




const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const cors= require("cors")

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
connectDB;

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});

//Pour le message dans le naviguateur
app.get(`/`,(request,response)=>{
    response.send(`Salut les amis, Bienvenu sur l'API de PaiePilot`);
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));