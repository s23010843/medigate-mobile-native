# MediGate API Integration - Quick Reference

## 🎯 Overview

The app now uses a **service-based architecture** that abstracts data access. This allows seamless migration from local JSON to MongoDB in production.

## 📁 New File Structure

```
medigate-mobile-native/
├── constants/
│   └── config.ts              # API configuration and endpoints
├── services/
│   └── api/
│       ├── client.ts          # HTTP client (handles local/remote)
│       ├── types.ts           # TypeScript interfaces
│       ├── userService.ts     # User operations
│       ├── doctorService.ts   # Doctor operations
│       ├── appointmentService.ts
│       ├── medicationService.ts
│       ├── healthRecordService.ts
│       ├── notificationService.ts
│       ├── pharmacyService.ts
│       ├── emergencyService.ts
│       └── index.ts           # Export all services
├── contexts/
│   └── DataContext.tsx        # Updated to use API services
├── private/
│   └── user-data.json         # Development data source
├── docs/
│   ├── API_INTEGRATION.md     # Detailed architecture docs
│   └── BACKEND_SETUP.md       # Backend implementation guide
└── .env.example               # Environment variables template
```

## 🚀 Quick Start

### Development Mode (Current Setup)

The app currently uses local JSON data:

```typescript
// constants/config.ts
BASE_URL: 'local'  // Uses user-data.json
```

No setup needed! Just run:
```bash
npx expo start
```

### Production Mode (Future)

1. **Create `.env` file:**
```bash
cp .env.example .env
```

2. **Update `.env`:**
```env
EXPO_PUBLIC_API_URL=https://api.medigate.com
```

3. **Deploy backend** (see `docs/BACKEND_SETUP.md`)

4. **Rebuild app:**
```bash
npx expo build
```

That's it! The app will automatically use your backend API.

## 💡 How to Use Services

### In Components

```typescript
import { doctorService, appointmentService } from '@/services/api';

// Get all doctors
const { data, error } = await doctorService.getAllDoctors();

// Create appointment
const result = await appointmentService.createAppointment({
  doctorId: 1,
  date: '2025-11-10',
  time: '10:00 AM',
  type: 'In-person',
  reason: 'Checkup'
});
```

### Using Context (Recommended)

```typescript
import { useData } from '@/contexts/DataContext';

function MyComponent() {
  const { 
    user, 
    doctors, 
    appointments,
    updateUser,
    addAppointment 
  } = useData();

  // Use the data
}
```

## 🔄 Migration Path

### Phase 1: Development (Current)
✅ Using local JSON file  
✅ All features work offline  
✅ No backend needed  

### Phase 2: Backend Development
📝 Set up Node.js/Express backend  
📝 Connect to MongoDB  
📝 Implement REST APIs  
📝 Test with Postman  

### Phase 3: Integration
🔄 Update `.env` with backend URL  
🔄 Test with real API  
🔄 Fix any integration issues  

### Phase 4: Production
🚀 Deploy backend to cloud  
🚀 Update production `.env`  
🚀 Deploy mobile app  

## 📝 Available Services

| Service | Operations |
|---------|-----------|
| **userService** | login, logout, getUser, updateUser, register |
| **doctorService** | getAllDoctors, getDoctorById, searchBySpecialty |
| **appointmentService** | getAllAppointments, createAppointment, updateAppointment, deleteAppointment |
| **medicationService** | getAllMedications, markAsTaken, getActiveMedications |
| **healthRecordService** | getAllRecords, getRecordsByCategory, getRecentRecords |
| **notificationService** | getAllNotifications, markAsRead, getUnreadCount |
| **pharmacyService** | getAllPharmacies, getOpenPharmacies, searchByName |
| **emergencyService** | getAllContacts, getContactsByType |

## 🛠️ Configuration

### API Endpoints
All endpoints are defined in `constants/config.ts`:

```typescript
export const API_ENDPOINTS = {
  USER: '/user',
  DOCTORS: '/doctors',
  APPOINTMENTS: '/appointments',
  // ... more endpoints
};
```

### Environment Variables
Configure in `.env`:

```env
# Required for production
EXPO_PUBLIC_API_URL=https://api.medigate.com

# Optional
SENTRY_DSN=your-sentry-dsn
ANALYTICS_KEY=your-analytics-key
```

## 🔒 Security Features

- ✅ Token-based authentication
- ✅ Automatic token management
- ✅ Request/response encryption (HTTPS)
- ✅ Input validation
- ✅ Error handling
- ✅ Rate limiting support

## 📚 Documentation

- **API Integration**: See `docs/API_INTEGRATION.md`
- **Backend Setup**: See `docs/BACKEND_SETUP.md`
- **Data Architecture**: See `ARCHITECTURE.md`

## 🧪 Testing

### Test with Local Data
```bash
# Current setup - no changes needed
npx expo start
```

### Test with Backend API
```bash
# Update .env
echo "EXPO_PUBLIC_API_URL=http://localhost:3000" > .env

# Start backend
cd ../medigate-backend
npm start

# Start app
npx expo start
```

## 🐛 Troubleshooting

### "Cannot connect to API"
- Check `.env` file exists
- Verify `EXPO_PUBLIC_API_URL` is correct
- Ensure backend is running
- Check network connectivity

### "Invalid token"
- Logout and login again
- Check token expiration
- Verify JWT_SECRET matches backend

### "Data not loading"
- Check API endpoint URLs
- Verify authentication
- Check network requests in dev tools
- Review API logs

## 📦 Dependencies

All dependencies are already installed. No new packages needed!

The architecture uses only:
- React Context for state management
- Fetch API for HTTP requests
- TypeScript for type safety

## 🎓 Best Practices

1. **Always use services** - Don't directly import `user-data.json`
2. **Handle errors** - Always check `success` in API responses
3. **Loading states** - Show loading indicators during API calls
4. **Type safety** - Use TypeScript interfaces from `types.ts`
5. **Testing** - Test with local data first, then backend

## 🔗 Related Files

- **Configuration**: `constants/config.ts`
- **Services**: `services/api/*.ts`
- **Types**: `services/api/types.ts`
- **Context**: `contexts/DataContext.tsx`
- **Data**: `private/user-data.json`

## 📞 Support

Need help?
1. Check the documentation in `docs/`
2. Review service implementations
3. Test with local data first
4. Check console for errors

## 🎉 Benefits

✨ **Clean Architecture** - Separation of concerns  
✨ **Type Safety** - Full TypeScript support  
✨ **Easy Migration** - Switch to MongoDB with just env change  
✨ **Testable** - Mock services easily  
✨ **Maintainable** - Clear structure and documentation  
✨ **Scalable** - Add new features easily  

---

**Status**: ✅ Ready for Development  
**Next Step**: Continue building features with local data  
**Future**: Set up backend when ready for production
