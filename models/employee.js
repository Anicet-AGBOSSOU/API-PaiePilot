// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema({
//     companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     age: { type: Number, required: true },
//     maritalStatus: { type: String, enum: ['Célibataire', 'Marié(e)', 'Divorcé(e)', 'Veuf(ve)'], required: true },
//     position: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Employee', employeeSchema);



const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ }, // Validation regex pour email
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  maritalStatus: { type: String }, // Situation matrimoniale
  jobTitle: { type: String }, // Poste occupé
  numberOfChildren: { type: Number, default: 0 }, // Nombre d'enfants
  dateOfBirth: { 
    type: Date, 
    validate: {
      validator: function(value) {
        return value < Date.now(); // Assurez-vous que la date de naissance n'est pas dans le futur
      },
      message: 'La date de naissance ne peut pas être dans le futur'
    }
  },
  hireDate: { 
    type: Date, 
    validate: {
      validator: function(value) {
        return value < Date.now(); // Assurez-vous que la date d'embauche n'est pas dans le futur
      },
      message: 'La date d\'embauche ne peut pas être dans le futur'
    }
  },
  salary: { type: Number },
  department: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware pour mettre à jour `updatedAt` avant chaque modification
EmployeeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Option pour créer un index unique pour `email` et améliorer les performances de recherche
EmployeeSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
