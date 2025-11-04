# App Report Feature Documentation

## Overview
The App Report feature allows users to submit feedback, report bugs, and suggest improvements for the MediGate app. This is a **frontend-only implementation** with no third-party dependencies.

## Features
- ✅ Submit feedback with multiple categories (bug, feature, improvement, complaint, other)
- ✅ Rate the app (1-5 stars)
- ✅ Add detailed descriptions
- ✅ Auto-capture device information
- ✅ View feedback history
- ✅ Store data locally (localStorage for web, in-memory for native)
- ✅ Optional MongoDB sync in production mode

## File Structure

```
app/app-report/
  └── index.tsx                 # Main feedback form page

services/api/
  └── feedbackService.ts        # Feedback service (no dependencies)

constants/
  └── config.ts                 # API endpoints configuration
```

## Usage

### Accessing the App Report Page
Users can navigate to `/app-report` to submit feedback.

### Data Storage
- **Web**: Uses browser `localStorage`
- **Native**: Uses in-memory cache (data persists during app session)
- **Production**: Optionally syncs to MongoDB if `EXPO_PUBLIC_MONGODB_API_URL` is configured

### MongoDB Integration (Optional)
If you want to sync feedback to MongoDB in production:

1. Set environment variable:
   ```env
   EXPO_PUBLIC_MONGODB_API_URL=https://your-api-url.com
   ```

2. The service will automatically POST to `${MONGODB_API_URL}/api/feedback`

3. Expected MongoDB endpoint:
   - **Method**: POST
   - **Endpoint**: `/api/feedback`
   - **Body**: FeedbackSubmission object
   - **Response**: Success/Error status

### Example MongoDB API Structure
```javascript
// POST /api/feedback
{
  "id": "fb_1234567890_abc123",
  "category": "bug",
  "subject": "App crashes on login",
  "description": "Detailed description...",
  "rating": 4,
  "email": "user@example.com",
  "deviceInfo": {
    "platform": "web",
    "version": "Mozilla/5.0...",
    "model": "Win32"
  },
  "timestamp": "2025-11-04T12:00:00.000Z",
  "status": "pending"
}
```

## Service Methods

### `submitFeedback(data)`
Submits new feedback and stores locally. Optionally syncs to MongoDB.

### `getFeedbackHistory()`
Retrieves all feedback from local storage.

### `getFeedbackById(id)`
Retrieves specific feedback by ID.

### `deleteFeedback(id)`
Deletes feedback from local storage.

### `clearAllFeedback()`
Clears all feedback (for testing purposes).

## Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| category | select | Yes | Bug, Feature, Improvement, Complaint, Other |
| subject | text | Yes | Brief summary |
| description | textarea | Yes | Detailed description |
| rating | number | No | 1-5 stars |
| email | email | No | Contact email |

## No External Dependencies
This implementation uses **only built-in browser/React Native APIs**:
- `localStorage` (web)
- `fetch` (HTTP requests)
- In-memory JavaScript arrays
- No AsyncStorage, no MongoDB drivers, no external packages

## Benefits
- 🚀 **Lightweight**: No additional package installation
- 📦 **Small Bundle Size**: No external dependencies
- 🔒 **Privacy-First**: Data stored locally by default
- 🌐 **Cross-Platform**: Works on web and native
- ⚡ **Fast**: No network delays for local storage
- 🔄 **Optional Sync**: MongoDB integration only when needed

## Development Notes
- Feedback is stored with a unique ID: `fb_[timestamp]_[random]`
- Device info is automatically captured (platform, version, model)
- MongoDB sync is non-blocking and fails silently
- Local storage always takes priority

## Future Enhancements
- Screenshot capture and upload
- Offline queue for MongoDB sync
- Admin dashboard for reviewing feedback
- Email notifications
- Analytics and reporting
