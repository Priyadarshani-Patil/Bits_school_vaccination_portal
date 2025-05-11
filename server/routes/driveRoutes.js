const express = require('express');
const router = express.Router();
const Drive = require('../models/Drive');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  // protected route
});


// POST /api/drives - create a drive
// router.post('/', async (req, res) => {
//   try {
//     const { vaccineName, date, availableDoses, applicableClasses } = req.body;

//     if (!vaccineName || !date || !availableDoses || !applicableClasses || applicableClasses.length === 0) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const newDrive = new Drive({
//       vaccineName,
//       date,
//       availableDoses,
//       applicableClasses
//     });
//     await newDrive.save();
//     res.status(201).json({ message: 'Drive created successfully' });
//   } catch (err) {
//     console.error('Error in POST /api/drives:', err);
//     res.status(500).json({ message: err.message || 'Server error' });
//   }
// });


router.post('/', async (req, res) => {
  const { date, location, vaccination} = req.body;

   if (!date || !location || !vaccination){
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newDrive = new Drive({ date, location, vaccination });
    await newDrive.save();
    res.status(201).json({ message: 'Drive added successfully', drive: newDrive });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/drives - fetch all drives
router.get('/', async (req, res) => {
  try {
    const drives = await Drive.find().sort({ date: 1 });;
    res.json(drives);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching drives' });
  }
});

// Delete a drive
router.delete('/:id', async (req, res) => {
  await Drive.findByIdAndDelete(req.params.id);
  res.json({ message: 'Drive deleted' });
});

module.exports = router;
