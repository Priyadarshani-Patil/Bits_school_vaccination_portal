const mongoose = require('mongoose');

const vaccinationDetailSchema = new mongoose.Schema({
  vaccineName: String,
  date: Date
});

const studentSchema = new mongoose.Schema({
  name: String,
  class: String,
  vaccinated: { type: Boolean, default: false },
  vaccineName: { type: String, default: '' }
});

module.exports = mongoose.model('Student', studentSchema);
