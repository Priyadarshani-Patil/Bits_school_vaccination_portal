const mongoose = require('mongoose');

<<<<<<< HEAD
// const vaccinationDetailSchema = new mongoose.Schema({
//   vaccineName: String,
//   date: Date
// });

// const studentSchema = new mongoose.Schema({
//   name: String,
//   class: String,
//   vaccinated: { type: Boolean, default: false },
//   vaccineName: { type: String, default: '' }
// });

// module.exports = mongoose.model('Student', studentSchema);
=======
// const vaccinationDetailSchema = new mongoose.Schema({
//   vaccineName: String,
//   date: Date
// });

const studentSchema = new mongoose.Schema({
  name: String,
  grade: String,
  status: { type: Boolean, default: false },
  vaccinationName: { type: String, default: '' },
  date: { type: String, default: '' },
  location: { type: String, default: '' },
});

module.exports = mongoose.model('Student', studentSchema);

// const studentSchema = new mongoose.Schema({
//   name: String,
//   grade: String,
//   status: String, // "Vaccinated" or "Pending"
//   vaccinationDetails: {
//     vaccinationName: String,
//     date: String,
//     location: String,
//   }
// });

// module.exports = mongoose.model('Student', studentSchema);
>>>>>>> 3ae7b4f (Initial commit)
