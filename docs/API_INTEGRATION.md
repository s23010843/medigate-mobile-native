# MediGate Mobile - API Integration Architecture

## Overview

This document describes the API integration architecture implemented in MediGate Mobile. The architecture follows best practices to ensure easy migration from local JSON data to a production MongoDB backend.

## Architecture Layers

### 1. Configuration Layer (`constants/config.ts`)
- **Purpose**: Centralizes all API configuration
- **Features**:
  - Environment-based configuration
  - API endpoints definition
  - Timeout and logging settings
  - Storage keys for AsyncStorage

### 2. Type Definitions (`services/api/types.ts`)
- **Purpose**: TypeScript interfaces for all data models
- **Benefits**:
  - Type safety throughout the application
  - Clear API contracts
  - Easy refactoring and maintenance

### 3. API Client (`services/api/client.ts`)
- **Purpose**: Low-level HTTP client
- **Features**:
  - Automatic switching between local JSON and remote API
  - Authentication token management
  - Request/response logging
  - Error handling
  - Timeout management

### 4. Service Layer (`services/api/*Service.ts`)
Individual services for each resource:
- `userService.ts` - User authentication and profile
- `doctorService.ts` - Doctor information and search
- `appointmentService.ts` - Appointment CRUD operations
- `medicationService.ts` - Medication tracking
- `healthRecordService.ts` - Health records management
- `notificationService.ts` - Notification handling
- `pharmacyService.ts` - Pharmacy information
- `emergencyService.ts` - Emergency contacts

### 5. Context Layer (`contexts/DataContext.tsx`)
- **Purpose**: State management using React Context
- **Features**:
  - Centralized data access
  - Automatic data loading
  - Error handling
  - Loading states

## Development vs Production

### Development Mode
```typescript
// Uses local JSON file
BASE_URL: 'local'

// Data loaded from:
private/user-data.json
```

### Production Mode
```typescript
// Uses remote API
BASE_URL: process.env.EXPO_PUBLIC_API_URL

// Data fetched from:
https://api.medigate.com/v1/*
```

## Switching to MongoDB Backend

### Step 1: Set Up Backend API

1. Create a Node.js/Express backend:
```bash
npm init
npm install express mongoose cors dotenv
```

2. Connect to MongoDB:
```javascript
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
```

3. Create models matching the TypeScript interfaces in `services/api/types.ts`

4. Implement REST endpoints matching `constants/config.ts` endpoints

### Step 2: Configure Environment Variables

Create `.env` file in your app root:
```env
EXPO_PUBLIC_API_URL=https://api.medigate.com
```

### Step 3: Deploy Backend

Deploy your backend to a cloud provider:
- Heroku
- AWS (EC2, Elastic Beanstalk)
- Google Cloud Platform
- Digital Ocean
- Vercel/Netlify (for serverless)

### Step 4: Update Mobile App

No code changes needed! The app will automatically use the production API.

Just rebuild:
```bash
npx expo build
```

## API Endpoints Reference

All endpoints are defined in `constants/config.ts`:

### User Endpoints
- `GET /user` - Get current user
- `PUT /user/update` - Update user profile
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/register` - Register new user

### Doctor Endpoints
- `GET /doctors` - Get all doctors
- `GET /doctors/:id` - Get doctor by ID

### Appointment Endpoints
- `GET /appointments` - Get all appointments
- `GET /appointments/:id` - Get appointment by ID
- `POST /appointments/create` - Create appointment
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Delete appointment

### Medication Endpoints
- `GET /medications` - Get all medications
- `GET /medications/:id` - Get medication by ID
- `POST /medications/:id/taken` - Mark as taken

### Health Record Endpoints
- `GET /health-records` - Get all records
- `GET /health-records/:id` - Get record by ID

### Notification Endpoints
- `GET /notifications` - Get all notifications
- `PATCH /notifications/:id/read` - Mark as read
- `POST /notifications/read-all` - Mark all as read

### Pharmacy Endpoints
- `GET /pharmacies` - Get all pharmacies
- `GET /pharmacies/:id` - Get pharmacy by ID

### Emergency Contact Endpoints
- `GET /emergency-contacts` - Get all emergency contacts

## Testing

### Development Testing
The app currently uses local JSON data. Test all features:
```bash
npx expo start
```

### Production Testing
1. Set up a staging environment
2. Update `.env` with staging URL
3. Test all API integrations
4. Verify error handling
5. Check performance

## Security Considerations

### Authentication
- Token-based authentication (JWT recommended)
- Secure token storage using AsyncStorage
- Auto-refresh tokens before expiration

### Data Protection
- HTTPS only in production
- Encrypt sensitive data
- Implement rate limiting
- Validate all inputs

### Privacy Compliance
- HIPAA compliance for health data
- GDPR compliance if serving EU users
- Data encryption at rest and in transit

## Performance Optimization

### Caching Strategy
```typescript
// Implement caching in services
const cache = new Map();

async getAllDoctors() {
  if (cache.has('doctors')) {
    return cache.get('doctors');
  }
  const data = await api.get('/doctors');
  cache.set('doctors', data);
  return data;
}
```

### Pagination
```typescript
// Add pagination support
async getAllDoctors(page = 1, limit = 20) {
  return await api.get(`/doctors?page=${page}&limit=${limit}`);
}
```

### Debouncing
```typescript
// Debounce search requests
const debouncedSearch = debounce(async (query) => {
  return await doctorService.searchByName(query);
}, 300);
```

## Error Handling

All services return a consistent error format:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

Handle errors in components:
```typescript
const { data, error } = await doctorService.getAllDoctors();

if (error) {
  Alert.alert('Error', error);
  return;
}

// Use data
```

## Monitoring and Logging

### Production Logging
Implement logging service:
```typescript
// services/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    // Send to logging service (e.g., Sentry, LogRocket)
  },
  error: (message: string, error: Error) => {
    // Send to error tracking service
  }
};
```

### Analytics
Track API usage:
```typescript
// Track API calls
analytics.track('api_call', {
  endpoint: '/doctors',
  duration: 245,
  success: true
});
```

## Maintenance

### Version Control
- Keep API version in URL: `/v1/`, `/v2/`
- Support multiple API versions
- Deprecate old versions gradually

### Database Migrations
Use migration tools:
- Mongoose migrations
- MongoDB Atlas schema versioning
- Backup before migrations

### Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Regular performance audits

## Support

For questions or issues:
- Check documentation in `docs/`
- Review API endpoint definitions
- Test with local data first
- Check network connectivity
- Verify API URL configuration
