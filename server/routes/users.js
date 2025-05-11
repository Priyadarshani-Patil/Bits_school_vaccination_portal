const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// POST request to /api/users/login
router.post('/login', UserController.login);

module.exports = router;
