const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
  vaccineName: String,
  date: Date,
  // availableDoses: Number,
  // applicableClasses: [String],
  location: { type: String, required: true },
  vaccination: { type: String, required: true }
});

module.exports = mongoose.model('Drive', driveSchema);
