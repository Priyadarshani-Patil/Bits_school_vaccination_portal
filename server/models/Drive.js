<<<<<<< HEAD
// const mongoose = require('mongoose');

// const driveSchema = new mongoose.Schema({
//   vaccineName: String,
//   date: Date,
//   // availableDoses: Number,
//   // applicableClasses: [String],
//   location: { type: String, required: true },
//   vaccination: { type: String, required: true }
// });

// module.exports = mongoose.model('Drive', driveSchema);
=======
// const mongoose = require('mongoose');

// const driveSchema = new mongoose.Schema({
//   vaccineName: String,
//   date: Date,
//   // availableDoses: Number,
//   // applicableClasses: [String],
//   location: { type: String, required: true },
//   vaccination: { type: String, required: true }
// });

// module.exports = mongoose.model('Drive', driveSchema);


const mongoose = require('mongoose');
const driveSchema = new mongoose.Schema({ date: String, location: String, targetGroup: String , vaccinationName: String});
module.exports = mongoose.model('Drive', driveSchema);
>>>>>>> 3ae7b4f (Initial commit)
