# App Feedback MongoDB Backend Setup

This document provides the backend API setup for handling user feedback submissions with MongoDB.

## MongoDB Schema

### Feedback Collection Schema

```javascript
const feedbackSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: false,
  },
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        return !v || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['bug', 'feature', 'improvement', 'complaint', 'other'],
  },
  subject: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
  deviceInfo: {
    platform: String,
    version: String,
    model: String,
  },
  screenshot: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  reviewedBy: {
    type: String,
    required: false,
  },
  reviewDate: {
    type: Date,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});

// Add indexes for efficient querying
feedbackSchema.index({ status: 1, timestamp: -1 });
feedbackSchema.index({ category: 1, timestamp: -1 });
feedbackSchema.index({ userId: 1, timestamp: -1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);
```

## API Endpoints

### 1. Submit Feedback

**Endpoint:** `POST /api/v1/feedback/submit`

**Request Body:**
```json
{
  "feedback": {
    "userId": 1,
    "userName": "John Doe",
    "email": "john@example.com",
    "category": "improvement",
    "subject": "Add dark mode",
    "description": "It would be great to have a dark mode option for better viewing at night",
    "rating": 5,
    "deviceInfo": {
      "platform": "ios",
      "version": "17.0",
      "model": "iPhone 14 Pro"
    }
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "654abc123def456789012345"
  },
  "message": "Feedback submitted successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid feedback data",
  "message": "Subject is required"
}
```

**Implementation (Node.js/Express):**
```javascript
// POST /api/v1/feedback/submit
router.post('/feedback/submit', async (req, res) => {
  try {
    const { feedback } = req.body;

    // Validate required fields
    if (!feedback.category || !feedback.subject || !feedback.description) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Category, subject, and description are required'
      });
    }

    // Create new feedback document
    const newFeedback = new Feedback({
      userId: feedback.userId,
      userName: feedback.userName,
      email: feedback.email,
      category: feedback.category,
      subject: feedback.subject,
      description: feedback.description,
      rating: feedback.rating,
      deviceInfo: feedback.deviceInfo,
      screenshot: feedback.screenshot,
      status: 'pending',
      timestamp: new Date(),
    });

    // Save to MongoDB
    const savedFeedback = await newFeedback.save();

    // Optional: Send notification to admin
    // await sendAdminNotification(savedFeedback);

    res.status(201).json({
      success: true,
      data: {
        id: savedFeedback._id.toString()
      },
      message: 'Feedback submitted successfully'
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'Failed to submit feedback'
    });
  }
});
```

### 2. Get Feedback List (Admin/User)

**Endpoint:** `GET /api/v1/feedback`

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `status` (optional): Filter by status (pending/reviewed/resolved)
- `category` (optional): Filter by category
- `limit` (optional): Number of results (default: 20)
- `page` (optional): Page number (default: 1)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "654abc123def456789012345",
      "category": "improvement",
      "subject": "Add dark mode",
      "description": "It would be great...",
      "rating": 5,
      "status": "pending",
      "timestamp": "2025-11-04T10:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 98
  }
}
```

**Implementation:**
```javascript
// GET /api/v1/feedback
router.get('/feedback', async (req, res) => {
  try {
    const { userId, status, category, limit = 20, page = 1 } = req.query;

    // Build query
    const query = {};
    if (userId) query.userId = parseInt(userId);
    if (status) query.status = status;
    if (category) query.category = category;

    // Count total documents
    const total = await Feedback.countDocuments(query);

    // Fetch feedback with pagination
    const feedback = await Feedback.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-__v');

    res.json({
      success: true,
      data: feedback.map(f => ({
        id: f._id.toString(),
        userId: f.userId,
        userName: f.userName,
        email: f.email,
        category: f.category,
        subject: f.subject,
        description: f.description,
        rating: f.rating,
        deviceInfo: f.deviceInfo,
        status: f.status,
        timestamp: f.timestamp,
      })),
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total
      }
    });
  } catch (error) {
    console.error('Feedback fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'Failed to fetch feedback'
    });
  }
});
```

## Environment Variables

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/medigate
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medigate?retryWrites=true&w=majority

# API Configuration
PORT=3000
NODE_ENV=production
```

## MongoDB Atlas Setup (Cloud Database)

1. **Create Account:** Sign up at https://www.mongodb.com/cloud/atlas

2. **Create Cluster:**
   - Choose FREE tier (M0)
   - Select your preferred cloud region
   - Create cluster

3. **Setup Database User:**
   - Go to Database Access
   - Add New Database User
   - Set username and password
   - Grant read/write access

4. **Whitelist IP Addresses:**
   - Go to Network Access
   - Add IP Address
   - For development: Allow access from anywhere (0.0.0.0/0)
   - For production: Add your server's IP

5. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password

## Security Best Practices

1. **Rate Limiting:** Limit submissions per IP/user
```javascript
const rateLimit = require('express-rate-limit');

const feedbackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 submissions per window
  message: 'Too many feedback submissions, please try again later'
});

router.post('/feedback/submit', feedbackLimiter, async (req, res) => {
  // ... implementation
});
```

2. **Input Sanitization:** Sanitize all user inputs
```javascript
const sanitizeHtml = require('sanitize-html');

feedback.description = sanitizeHtml(feedback.description, {
  allowedTags: [],
  allowedAttributes: {}
});
```

3. **Authentication:** Require authentication for certain operations
```javascript
const authenticateToken = require('../middleware/auth');

router.get('/feedback', authenticateToken, async (req, res) => {
  // Only authenticated users can view feedback
});
```

## Admin Dashboard Queries

### Get Statistics
```javascript
// Get feedback statistics
const stats = await Feedback.aggregate([
  {
    $group: {
      _id: '$category',
      count: { $sum: 1 },
      avgRating: { $avg: '$rating' }
    }
  }
]);

// Get recent feedback
const recentFeedback = await Feedback.find({ status: 'pending' })
  .sort({ timestamp: -1 })
  .limit(10);

// Get feedback by status
const statusCounts = await Feedback.aggregate([
  {
    $group: {
      _id: '$status',
      count: { $sum: 1 }
    }
  }
]);
```

## Testing

### Test with cURL

```bash
# Submit feedback
curl -X POST http://localhost:3000/api/v1/feedback/submit \
  -H "Content-Type: application/json" \
  -d '{
    "feedback": {
      "category": "improvement",
      "subject": "Test feedback",
      "description": "This is a test feedback submission",
      "rating": 5,
      "email": "test@example.com"
    }
  }'

# Get feedback list
curl http://localhost:3000/api/v1/feedback?limit=10&page=1
```

## Netlify Integration

For Netlify deployment, you'll need to deploy the backend API separately (e.g., on Heroku, Vercel, or AWS) and configure the API URL in your `.env` file:

```env
EXPO_PUBLIC_API_URL=https://your-backend-api.herokuapp.com/api/v1
```

Make sure your backend API is properly deployed and accessible before deploying the frontend to Netlify.
