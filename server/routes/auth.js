const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).send('Email already registered');
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, password: hash });
    res.sendStatus(201);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});


module.exports = router;
