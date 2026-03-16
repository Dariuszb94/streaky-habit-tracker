# Firebase Setup Guide for Streaky

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: "streaky" (or your preferred name)
4. (Optional) Enable Google Analytics
5. Click "Create project"

## Step 2: Register Your App

1. In Firebase Console, click the iOS or Android icon
2. For iOS:
   - Bundle ID: `com.streaky.app`
3. For Android:
   - Package name: `com.streaky.app`
4. Download the config file (will use web config instead for Expo)

## Step 3: Get Web Configuration

1. In Project Settings → General
2. Scroll to "Your apps" section
3. Click "Web" app (</> icon)
4. Register app with nickname "Streaky Web"
5. Copy the `firebaseConfig` object

## Step 4: Configure Firebase in App

1. Open `src/firebase/config.ts`
2. Replace the placeholder values:

```typescript
const firebaseConfig = {
  apiKey: 'AIza...', // Your API key
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abc123',
};
```

## Step 5: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get Started"
3. Click "Email/Password" under Sign-in method
4. Toggle "Enable"
5. Click "Save"

## Step 6: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in test mode" (we'll add rules next)
4. Select a location (choose closest to your users)
5. Click "Enable"

## Step 7: Set Up Firestore Collections

Firestore will auto-create collections when first written to. These collections will be created:

- `habits` - User habits
- `habitCompletions` - Daily completion records
- `userStats` - User XP and level data

## Step 8: Configure Firestore Security Rules

1. In Firestore, go to **Rules** tab
2. Replace default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }

    // Helper function to check if user owns the resource
    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // Habits collection
    match /habits/{habitId} {
      // Allow read if authenticated and user owns the habit
      allow read: if isAuthenticated() &&
                     resource.data.userId == request.auth.uid;

      // Allow create if authenticated and userId matches
      allow create: if isAuthenticated() &&
                       request.resource.data.userId == request.auth.uid;

      // Allow update if authenticated and user owns the habit
      allow update: if isAuthenticated() &&
                       resource.data.userId == request.auth.uid;

      // Allow delete if authenticated and user owns the habit
      allow delete: if isAuthenticated() &&
                       resource.data.userId == request.auth.uid;
    }

    // Habit completions collection
    match /habitCompletions/{completionId} {
      // Allow read/write if authenticated
      // Note: In production, add more specific rules based on habitId ownership
      allow read, write: if isAuthenticated();
    }

    // User stats collection
    match /userStats/{userId} {
      // Allow read if authenticated and accessing own stats
      allow read: if isAuthenticated() && isOwner(userId);

      // Allow write if authenticated and updating own stats
      allow write: if isAuthenticated() && isOwner(userId);
    }
  }
}
```

3. Click "Publish"

## Step 9: Create Firestore Indexes (Optional but Recommended)

For better query performance, create indexes:

1. Go to **Firestore → Indexes**
2. Add composite index:
   - Collection: `habits`
   - Fields: `userId` (Ascending), `createdAt` (Ascending)

The app will suggest other indexes if needed when you run queries.

## Step 10: Set Up Cloud Messaging (for Push Notifications)

1. Go to **Project Settings → Cloud Messaging**
2. Under "Web configuration", copy the **Server key**
3. This is used for push notifications (Expo handles this automatically)

## Step 11: Configure App Permissions

In `app.json`, ensure these are set:

```json
{
  "expo": {
    "android": {
      "permissions": ["RECEIVE_BOOT_COMPLETED", "VIBRATE"]
    },
    "ios": {
      "infoPlist": {
        "UIBackgroundModes": ["remote-notification"]
      }
    }
  }
}
```

## Firestore Data Structure

### Collection: `habits`

```
habits/
  {habitId}/
    - id: string
    - name: string
    - icon: string
    - createdAt: timestamp
    - reminderTime: string (optional)
    - userId: string
```

### Collection: `habitCompletions`

```
habitCompletions/
  {completionId}/
    - id: string
    - habitId: string
    - date: string (YYYY-MM-DD)
    - completed: boolean
    - completedAt: timestamp (optional)
```

### Collection: `userStats`

```
userStats/
  {userId}/
    - userId: string
    - xp: number
    - level: number
    - totalHabitsCompleted: number
    - longestStreak: number
```

## Testing Firebase Connection

1. Start your app: `npm start`
2. Try to register a new account
3. Check Firebase Console → Authentication → Users
4. You should see your new user
5. Try creating a habit
6. Check Firestore → Data to see the new documents

## Troubleshooting

### Error: "Firebase config not found"

- Make sure you updated `src/firebase/config.ts` with your actual config

### Error: "Permission denied"

- Check Firestore rules are published
- Verify user is authenticated before accessing data

### Error: "Quota exceeded"

- Firebase free tier limits: 50K reads/day, 20K writes/day
- Upgrade to Blaze plan for production

### Auth not working

- Verify Email/Password is enabled in Authentication
- Check that you're using correct credentials

## Production Considerations

### Security Rules

For production, enhance security rules:

```javascript
// More restrictive habit completion rules
match /habitCompletions/{completionId} {
  allow read: if isAuthenticated();
  allow create: if isAuthenticated() &&
                   exists(/databases/$(database)/documents/habits/$(request.resource.data.habitId)) &&
                   get(/databases/$(database)/documents/habits/$(request.resource.data.habitId)).data.userId == request.auth.uid;
  allow update, delete: if isAuthenticated() &&
                           exists(/databases/$(database)/documents/habits/$(resource.data.habitId)) &&
                           get(/databases/$(database)/documents/habits/$(resource.data.habitId)).data.userId == request.auth.uid;
}
```

### Backup Strategy

1. Enable **Firestore Export** in Google Cloud Console
2. Set up automated daily backups
3. Store backups in Cloud Storage

### Monitoring

1. Enable **Firestore Monitoring** in Firebase Console
2. Set up alerts for:
   - High read/write usage
   - Security rule violations
   - Authentication failures

### Rate Limiting

Consider implementing rate limiting for:

- Habit creation (max 10 per day)
- Completion toggles (prevent spam)
- User registration

---

## Next Steps

After Firebase is configured:

1. ✅ Update `src/firebase/config.ts` with your credentials
2. ✅ Publish Firestore security rules
3. ✅ Test authentication (register/login)
4. ✅ Test habit creation
5. ✅ Test completion tracking
6. ✅ Verify data in Firestore Console

Your Firebase backend is now ready! 🚀
