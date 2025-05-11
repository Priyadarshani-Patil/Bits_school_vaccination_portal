const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Drive = require('../models/Drive');

router.get('/summary', async (req, res) => {
  try {
    
    const totalStudents = await Student.countDocuments();
    const vaccinatedStudents = await Student.countDocuments({ vaccinated: true });

   
    const vaccinationRate = totalStudents > 0
      ? ((vaccinatedStudents / totalStudents) * 100).toFixed(2)
      : 0;

    
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);

    const upcomingDrives = await Drive.find({
      date: { $gte: today, $lte: thirtyDaysLater }
    }).select('date location vaccination');

    // Send the correct response structure
    res.json({
      stats: {
        totalStudents,
        vaccinatedStudents,
        vaccinationRate
      },
      upcomingDrives
    });
  } catch (error) {
    console.error('Error fetching report summary:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
module.exports = router;
