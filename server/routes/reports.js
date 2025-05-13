const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Drive = require('../models/Drive');
const fs = require('fs');
const path = require('path');

// GET /api/reports - Fetch students and drives
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    const drives = await Drive.find();
    res.json({ students, drives });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/download', async (req, res) => {
  try {
    const students = await Student.find();
    const drives = await Drive.find();

    const rows = [
      ['Name', 'Grade', 'Vaccination Status', 'Vaccination Name', 'Drive Date', 'Drive Location']
    ];

    students.forEach(student => {
      const status = student.status ? 'Yes' : 'No';
      const name = student.name;
      const grade = student.grade;
      const vaccName = student.vaccinationName || 'N/A';

      // Match drive by vaccination name (simple heuristic)
      const drive = drives.find(d => d.vaccinationName === student.vaccinationName);
      const date = drive ? drive.date : 'N/A';
      const location = drive ? drive.location : 'N/A';

      rows.push([name, grade, status, vaccName, date, location]);
    });

    const csv = rows.map(r => r.join(',')).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=student_report.csv');
    res.status(200).send(csv);
  } catch (error) {
    console.error('Error generating CSV:', error.message);
    res.status(500).json({ error: 'Failed to generate CSV report' });
  }
});

// // GET /api/reports/download - Download CSV report
// router.get('/download', async (req, res) => {
//   try {
//     const students = await Student.find();
//     const drive= await drive.find();

//     // const csvRows = [
//     //   ['Name', 'Grade', 'Vaccination Status', 'VaccinationName','Date', 'Location'],
//     //   ...students.map(s => [s.name, s.grade, s.status, s.vaccinationName])
//     //     ...drive.map( [s.date, s.location])
//     // ];

//     const driveMap = {};
// drives.forEach(d => {
//   driveMap[d.vaccinationName] = { date: d.date, location: d.location };
// });

// const csvRows = [
//   ['Name', 'Grade', 'Vaccination Status', 'Vaccination Name', 'Date', 'Location'],
//   ...students.map(s => {
//     const drive = driveMap[s.vaccinationName] || {};
//     return [
//       s.name,
//       s.grade,
//       s.status ? 'Yes' : 'No',
//       s.vaccinationName || 'N/A',
//       drive.date || 'N/A',
//       drive.location || 'N/A'
//     ];
//   })
// ];

//     const csvContent = csvRows.map(row => row.join(',')).join('\n');

//     const filePath = path.join(__dirname, '../temp_report.csv');
//     fs.writeFileSync(filePath, csvContent);

//     res.download(filePath, 'student_report.csv', err => {
//       if (err) {
//         console.error('Download error:', err);
//         res.status(500).send('Error downloading file.');
//       }
//       fs.unlinkSync(filePath); // Cleanup temp file after download
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error generating report.');
//   }
// });

module.exports = router;
