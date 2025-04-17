const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API PaiePilot",
      version: "1.0.0",
      description: "Documentation de l'API pour la gestion de paie (PaiePilot)",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = require('swagger-jsdoc')(options);
module.exports = swaggerSpec;