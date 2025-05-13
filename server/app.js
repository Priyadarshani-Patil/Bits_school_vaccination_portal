const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
<<<<<<< HEAD
// const studentRoutes = require('./routes/studentRoutes');
// const driveRoutes = require('./routes/driveRoutes');
// const authRoutes = require('./routes/authRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');
//const cors = require('cors');
//app.use(cors());
=======

const studentRoutes = require('./routes/student');
const driveRoutes = require('./routes/drives');
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');
//const dashboardRoutes = require('./routes/dashboardRoutes');
>>>>>>> 3ae7b4f (Initial commit)

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
<<<<<<< HEAD
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
=======
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
>>>>>>> 3ae7b4f (Initial commit)

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/drives', driveRoutes);
app.use('/api/reports', reportRoutes);
<<<<<<< HEAD
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======
//app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/api/reports', (req, res) => {
  const filePath = path.join(__dirname, 'reports', 'report.csv');
  res.download(filePath, 'report.csv');
});
>>>>>>> 3ae7b4f (Initial commit)
