// const mongoose = require('mongoose');

// const companySchema = new mongoose.Schema({
//     companyName: { type: String, required: true },
//     sector: { type: String, required: true },
//     commerceRegistry: { type: String, required: true },
//     city: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Company', companySchema);



const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  passwordHash: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  registrationNumber: {
    type: String,
    trim: true
  },
  taxIdentificationNumber: {
    type: String,
    trim: true
  },
  legalForm: {
    type: String,
    trim: true
  },
  sectorOfActivity: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  contactPersonName: {
    type: String,
    trim: true
  },
  contactPersonEmail: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid contact email']
  },
  contactPersonPhone: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Company', CompanySchema);
