# Backend API Implementation Guide

This guide helps you create a production-ready backend API for MediGate Mobile using Node.js, Express, and MongoDB.

## Quick Start

### 1. Initialize Backend Project

```bash
mkdir medigate-backend
cd medigate-backend
npm init -y
```

### 2. Install Dependencies

```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install -D nodemon typescript @types/express @types/node
```

### 3. Project Structure

```
medigate-backend/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   ├── Medication.js
│   │   ├── HealthRecord.js
│   │   ├── Notification.js
│   │   ├── Pharmacy.js
│   │   └── EmergencyContact.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── doctors.js
│   │   ├── appointments.js
│   │   ├── medications.js
│   │   ├── healthRecords.js
│   │   ├── notifications.js
│   │   ├── pharmacies.js
│   │   └── emergency.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── database.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

## Sample Implementation

### server.js

```javascript
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/v1/auth', require('./routes/auth'));
app.use('/v1/user', require('./routes/user'));
app.use('/v1/doctors', require('./routes/doctors'));
app.use('/v1/appointments', require('./routes/appointments'));
app.use('/v1/medications', require('./routes/medications'));
app.use('/v1/health-records', require('./routes/healthRecords'));
app.use('/v1/notifications', require('./routes/notifications'));
app.use('/v1/pharmacies', require('./routes/pharmacies'));
app.use('/v1/emergency-contacts', require('./routes/emergency'));

// Error Handler
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### models/User.js

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  dateOfBirth: Date,
  gender: String,
  address: String,
  avatar: String,
  memberSince: { type: Date, default: Date.now },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
  medicalInfo: {
    bloodType: String,
    height: String,
    weight: String,
    allergies: [String],
    chronicConditions: [String],
    insuranceProvider: String,
    insuranceId: String,
  },
  preferences: {
    pushNotifications: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: false },
    biometricAuth: { type: Boolean, default: false },
    language: { type: String, default: 'English' },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

### models/Doctor.js

```javascript
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  phone: String,
  email: String,
  avatar: String,
  lastSeen: String,
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  experience: String,
  about: String,
  education: [String],
  languages: [String],
  availability: String,
  consultationFee: Number,
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
```

### models/Appointment.js

```javascript
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  doctorName: String,
  specialty: String,
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  type: { 
    type: String, 
    enum: ['In-person', 'Video call'],
    required: true
  },
  reason: String,
  location: String,
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
```

### middleware/auth.js

```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid token' 
    });
  }
};
```

### routes/auth.js

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (without password)
    const userData = user.toObject();
    delete userData.password;

    res.json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      fullName,
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (without password)
    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  // Client-side token removal
  res.json({ success: true });
});

module.exports = router;
```

### routes/doctors.js

```javascript
const express = require('express');
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all doctors
router.get('/', auth, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get doctor by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ 
        success: false, 
        error: 'Doctor not found' 
      });
    }

    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
```

### routes/appointments.js

```javascript
const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all appointments for user
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId })
      .populate('doctorId', 'name specialty');
    
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Create appointment
router.post('/create', auth, async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      userId: req.userId,
    });

    await appointment.save();
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update appointment
router.put('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appointment not found' 
      });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Delete appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appointment not found' 
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
```

## Data Migration

### Import existing data from user-data.json

```javascript
// scripts/importData.js
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const Doctor = require('../src/models/Doctor');
const Pharmacy = require('../src/models/Pharmacy');

async function importData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const data = JSON.parse(
      fs.readFileSync('../medigate-mobile-native/private/user-data.json', 'utf-8')
    );

    // Import doctors
    await Doctor.deleteMany();
    await Doctor.insertMany(data.doctors);
    console.log('Doctors imported');

    // Import pharmacies
    await Pharmacy.deleteMany();
    await Pharmacy.insertMany(data.pharmacies);
    console.log('Pharmacies imported');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

importData();
```

Run: `node scripts/importData.js`

## Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create medigate-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Deploy to AWS

Use AWS Elastic Beanstalk or EC2 with PM2

### Deploy to Digital Ocean

Use App Platform or Droplet with PM2

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Use helmet.js for security headers
- [ ] Enable CORS only for your app domain
- [ ] Store passwords with bcrypt
- [ ] Use JWT with expiration
- [ ] Implement refresh tokens
- [ ] Log all security events
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Testing

```bash
npm install -D jest supertest

# Run tests
npm test
```

## Monitoring

- Use PM2 for process management
- Set up logging (Winston, Bunyan)
- Monitor with New Relic, DataDog, or similar
- Set up alerts for errors and downtime

## Support

For questions, refer to:
- Express.js docs: https://expressjs.com/
- Mongoose docs: https://mongoosejs.com/
- MongoDB docs: https://docs.mongodb.com/
