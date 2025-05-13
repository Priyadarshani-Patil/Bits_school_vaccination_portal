const express = require('express');
const Drive = require('../models/Drive');
const auth = require('../middleware/auth');
const router = express.Router();
router.use(auth);
router.post('/', async (req, res) => {
  const drive = await Drive.create(req.body);
  res.json(drive);
});
router.get('/', async (req, res) => {
  const drives = await Drive.find();
  res.json(drives);
});

// GET all drives
router.get('/', async (req, res) => {
  try {
    const drives = await Drive.find();
    res.json(drives);
  } catch (err) {
    res.status(500).send('Error fetching drives');
  }
});

// POST new drive
router.post('/', async (req, res) => {
  try {
    const drive = await Drive.create(req.body);
    res.status(201).json(drive);
  } catch (err) {
    res.status(400).send('Error creating drive');
  }
});

// PUT update drive
router.put('/:id', async (req, res) => {
  try {
    const updated = await Drive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).send('Error updating drive');
  }
});

// DELETE drive
router.delete('/:id', async (req, res) => {
  try {
    await Drive.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send('Error deleting drive');
  }
});

module.exports = router;
