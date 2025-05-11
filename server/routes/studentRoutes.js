const express = require('express');
const Student = require('../models/Student');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  // protected route
});


// Add a student
router.post('/', async (req, res) => {
  const { name, className, vaccinated, vaccineName } = req.body;
  //const student = new Student(req.body);
  const student = new Student({
    name,
    className,
    vaccinated,
    vaccineName: vaccinated ? vaccineName : ''
  });
  await student.save();
  res.status(201).json(student);
});

// Get all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Update vaccination status
// router.put('/:id/vaccinate', async (req, res) => {
//   const student = await Student.findById(req.params.id);
//   const { vaccineName, date } = req.body;
//   if (!student) return res.status(404).json({ message: 'Student not found' });

//   student.vaccinationStatus = true;
//   student.vaccinationDetails.push({ vaccineName, date });
//   await student.save();

//   res.json({ message: 'Vaccination updated', student });
// });

router.put('/:id', async (req, res) => {
  const { name, className, vaccinated, vaccineName } = req.body;
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    { name, className, vaccinated, vaccineName: vaccinated ? vaccineName : '' },
    { new: true }
  );
  res.json(updated);
});


module.exports = router;
