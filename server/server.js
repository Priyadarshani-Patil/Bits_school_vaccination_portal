const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const reportRoutes = require('./routes/reports');

app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);

const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const driveRoutes = require('./routes/drives');
const reportRoutes = require('./routes/reports');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/school_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);

//const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');

// Middleware
app.use(express.json());

// Routes
const studentRoutes = require('./routes/studentRoutes');
const driveRoutes = require('./routes/driveRoutes');
const reportRoutes = require('./routes/reportRoutes');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/drives', driveRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/api/reports', (req, res) => {
  const filePath = path.join(__dirname, 'reports', 'report.csv');
  res.download(filePath, 'report.csv');
});
