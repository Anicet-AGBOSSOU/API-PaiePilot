const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API PaiePilot',
      version: '1.0.0',
      description: 'Documentation complète de l\'API PaiePilot',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Serveur local',
      },
    ],
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

// Toutes les routes manuellement définies ici
swaggerSpec.paths = {
  // AUTH ROUTES
  '/api/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Inscription d\'une entreprise',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                companyName: { type: 'string' },
                companyEmail: { type: 'string' },
                password: { type: 'string' },
                phoneNumber: { type: 'string' },
                address: { type: 'string' },
                registrationNumber: { type: 'string' },
                taxIdentificationNumber: { type: 'string' },
                legalForm: { type: 'string' },
                sectorOfActivity: { type: 'string' },
                website: { type: 'string' },
                contactPersonName: { type: 'string' },
                contactPersonEmail: { type: 'string' },
                contactPersonPhone: { type: 'string' },
              },
              required: ['companyName', 'companyEmail', 'password'],
            },
          },
        },
      },
      responses: {
        201: { description: 'Entreprise enregistrée' },
        400: { description: 'Champs manquants' },
        409: { description: 'Email déjà utilisé' },
      },
    },
  },
  '/api/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Connexion d\'une entreprise',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                companyEmail: { type: 'string' },
                password: { type: 'string' },
              },
              required: ['companyEmail', 'password'],
            },
          },
        },
      },
      responses: {
        200: { description: 'Connexion réussie' },
        401: { description: 'Identifiants invalides' },
      },
    },
  },
  '/api/auth/logout': {
    post: {
      tags: ['Auth'],
      summary: 'Déconnexion de l\'entreprise',
      responses: {
        200: { description: 'Déconnexion réussie' },
      },
    },
  },
  '/api/auth/connected': {
    get: {
      tags: ['Auth'],
      summary: 'Lister les entreprises connectées',
      responses: {
        200: { description: 'Liste des entreprises connectées' },
      },
    },
  },

  // COMPANY ROUTES
  '/api/auth/companies': {
    get: {
      tags: ['Companies'],
      summary: 'Lister toutes les entreprises',
      responses: {
        200: { description: 'Liste récupérée' },
      },
    },
  },
  '/api/auth/companies/{id}': {
    get: {
      tags: ['Companies'],
      summary: 'Obtenir une entreprise par ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: { description: 'Entreprise trouvée' },
        404: { description: 'Entreprise non trouvée' },
      },
    },
    put: {
      tags: ['Companies'],
      summary: 'Mettre à jour une entreprise',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                companyName: { type: 'string' },
                companyEmail: { type: 'string' },
                phoneNumber: { type: 'string' },
                address: { type: 'string' },
                registrationNumber: { type: 'string' },
                taxIdentificationNumber: { type: 'string' },
                legalForm: { type: 'string' },
                sectorOfActivity: { type: 'string' },
                website: { type: 'string' },
                contactPersonName: { type: 'string' },
                contactPersonEmail: { type: 'string' },
                contactPersonPhone: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Entreprise mise à jour' },
        404: { description: 'Entreprise non trouvée' },
      },
    },
    delete: {
      tags: ['Companies'],
      summary: 'Supprimer une entreprise',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: { description: 'Entreprise supprimée' },
        404: { description: 'Entreprise non trouvée' },
      },
    },
  },

  // EMPLOYEE ROUTES
  '/api/employees': {
    get: {
      tags: ['Employees'],
      summary: 'Lister tous les employés',
      responses: {
        200: { description: 'Liste des employés' },
      },
    },
    post: {
      tags: ['Employees'],
      summary: 'Créer un nouvel employé',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                age: { type: 'integer' },
                maritalStatus: { type: 'string' },
                position: { type: 'string' },
              },
              required: ['firstName', 'lastName'],
            },
          },
        },
      },
      responses: {
        201: { description: 'Employé ajouté' },
      },
    },
  },
  '/api/employees/{id}': {
    get: {
      tags: ['Employees'],
      summary: 'Obtenir un employé par ID',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: {
        200: { description: 'Employé trouvé' },
        404: { description: 'Employé non trouvé' },
      },
    },
    put: {
      tags: ['Employees'],
      summary: 'Modifier un employé',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                age: { type: 'integer' },
                maritalStatus: { type: 'string' },
                position: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Employé mis à jour' },
        404: { description: 'Employé non trouvé' },
      },
    },
    delete: {
      tags: ['Employees'],
      summary: 'Supprimer un employé',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: {
        200: { description: 'Employé supprimé' },
        404: { description: 'Employé non trouvé' },
      },
    },
  },
};

// ✅ LOGS POUR VÉRIFIER EN CONSOLE
console.log('✅ Swagger chargé avec succès');
console.log(`📚 Total des routes documentées : ${Object.keys(swaggerSpec.paths).length}`);
Object.keys(swaggerSpec.paths).forEach((path) => {
  console.log(`📌 Route Swagger : ${path}`);
});

module.exports = swaggerSpec;
