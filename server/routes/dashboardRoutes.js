// const express = require('express');
// const Student = require('../models/Student');
// const Drive = require('../models/Drive');
// const router = express.Router();

// router.get('/metrics', async (req, res) => {
//   try {
//     const totalStudents = await Student.countDocuments();
//     const vaccinatedStudents = await Student.countDocuments({ vaccinationStatus: true });
//     const vaccinationPercentage = totalStudents === 0 ? 0 : Math.round((vaccinatedStudents / totalStudents) * 100);

//     const today = new Date();
//     const upcomingDrives = await Drive.find({
//       date: { $gte: today, $lte: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000) }
//     });

//     res.json({
//       totalStudents,
//       vaccinatedStudents,
//       vaccinationPercentage,
//       upcomingDrives
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Drive = require('../models/Drive');
const mongoose = require('mongoose');

router.get('/overview', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const vaccinatedCount = await Student.countDocuments({ vaccinated: true });

    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);

    const upcomingDrives = await Drive.find({
      date: { $gte: today, $lte: thirtyDaysLater }
    }).sort('date');

    const vaccinatedPercent = totalStudents
      ? ((vaccinatedCount / totalStudents) * 100).toFixed(2)
      : 0;

    res.json({
      totalStudents,
      vaccinatedCount,
      vaccinatedPercent,
      upcomingDrives
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
