const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Register new admin
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) return res.status(400).json({ error: 'Admin already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({ username, password: hashedPassword });
  await newAdmin.save();
  res.json({ message: 'Admin registered' });
});

// Login admin
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;


