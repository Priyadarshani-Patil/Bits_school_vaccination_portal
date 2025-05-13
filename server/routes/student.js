const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const Student = require('../models/Student'); // ensure this model exists
const auth = require('../middleware/auth'); // if you're using JWT protection

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, password: hash });
  res.sendStatus(201);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Unauthorized');
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.use(auth); // protect all routes

router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post('/', async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send('Error fetching students');
  }
});

// POST new student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).send('Error creating student');
  }
});

// PUT update student
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).send('Error updating student');
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send('Error deleting student');
  }
});


module.exports = router;

