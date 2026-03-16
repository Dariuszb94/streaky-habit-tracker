# Streaky - Gamified Habit Tracker

<div align="center">
  <h3>🔥 Build lasting habits with daily streaks 🔥</h3>
  <p>A production-ready React Native mobile app with Firebase backend</p>
</div>

## 📱 About

Streaky is a gamified habit tracking app that helps users build daily habits through:

- **Streak tracking** - Build consecutive day streaks
- **XP & Leveling** - Earn experience points and level up
- **Daily reminders** - Push notifications for habit completion
- **Progress tracking** - Visualize your habit completion history
- **Motivation** - Unlock milestones and achievements

## 🛠 Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Firebase Authentication** - Email/password auth
- **Cloud Firestore** - Real-time database
- **React Navigation** - Navigation library
- **Expo Notifications** - Push notifications
- **date-fns** - Date utilities

## 📂 Project Structure

```
micro-habit-tracker/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── HabitCard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── IconPicker.tsx
│   │   ├── Button.tsx
│   │   ├── StatCard.tsx
│   │   └── Loading.tsx
│   ├── screens/            # App screens
│   │   ├── OnboardingScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── AddHabitScreen.tsx
│   │   ├── HabitDetailScreen.tsx
│   │   ├── StatsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/         # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useHabits.ts
│   │   ├── useCompletions.ts
│   │   └── useStats.ts
│   ├── services/           # Business logic layer
│   │   ├── authService.ts
│   │   ├── habitService.ts
│   │   ├── completionService.ts
│   │   ├── statsService.ts
│   │   └── notificationService.ts
│   ├── firebase/           # Firebase configuration
│   │   └── config.ts
│   ├── utils/              # Utility functions
│   │   ├── dateHelpers.ts
│   │   ├── streakCalculator.ts
│   │   └── xpCalculator.ts
│   └── types/              # TypeScript types
│       └── index.ts
├── App.tsx                 # App entry point
├── package.json
├── tsconfig.json
└── app.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator
- Firebase project

### Installation

1. **Clone and install dependencies**

```bash
cd micro-habit-tracker
npm install
```

2. **Set up Firebase**

   a. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)

   b. Enable Authentication (Email/Password)

   c. Create a Firestore database

   d. Get your Firebase config from Project Settings

   e. Update `src/firebase/config.ts` with your credentials:

```typescript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

3. **Set up Firestore rules**

Go to Firestore Rules in Firebase Console and add:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Habits collection
    match /habits/{habitId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }

    // Habit completions
    match /habitCompletions/{completionId} {
      allow read, write: if request.auth != null;
    }

    // User stats
    match /userStats/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. **Start the development server**

```bash
npm start
```

5. **Run on device/simulator**

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## 🎮 Features

### Authentication

- Email/password registration
- Secure login
- Session persistence
- User profile management

### Habit Management

- Create habits with custom names and icons
- Set daily reminder times
- Edit habit details
- Delete habits

### Completion Tracking

- Toggle daily completion status
- View completion history
- Track streak progress

### Streak System

- Current streak calculation
- Longest streak tracking
- Streak breaks on missed days
- Visual streak indicators 🔥

### XP & Leveling

- Earn 10 XP per habit completion
- Bonus XP for streak milestones:
  - 7 days: +50 XP
  - 14 days: +100 XP
  - 30 days: +250 XP
  - 100 days: +1000 XP
- Level = XP / 100
- Progress bar visualization

### Statistics

- Weekly completion rate
- Total habits completed
- Average streak length
- XP and level progress
- Motivational messages

### Notifications

- Daily habit reminders
- Customizable reminder times
- Push notifications support

## 📊 Data Models

### Habit

```typescript
{
  id: string
  name: string
  icon: string
  createdAt: Date
  reminderTime?: string
  userId: string
}
```

### HabitCompletion

```typescript
{
  id: string
  habitId: string
  date: string (YYYY-MM-DD)
  completed: boolean
  completedAt?: Date
}
```

### UserStats

```typescript
{
  userId: string;
  xp: number;
  level: number;
  totalHabitsCompleted: number;
  longestStreak: number;
}
```

## 🎨 UI Design

- Clean, minimalist interface
- White background with rounded cards
- Custom emoji icons for habits
- Streak indicators with fire emoji 🔥
- XP progress bars
- Tab navigation
- Smooth animations

## 📱 Screens

1. **Onboarding** - Welcome screen with app intro
2. **Login** - Email/password authentication
3. **Register** - New account creation
4. **Home** - Today's habits list with completion toggles
5. **Add Habit** - Create new habits with icon picker
6. **Habit Detail** - View streak, history, and manage habit
7. **Stats** - Weekly/monthly progress statistics
8. **Profile** - User level, XP, achievements, and logout

## 🔥 Streak Calculation Logic

```typescript
// Consecutive daily completions
Mon ✓ Tue ✓ Wed ✓ = 3-day streak
Thu ✖ = streak resets to 0

// Must be completed today or yesterday to be "active"
```

## ⚡ XP System

```typescript
Base XP: 10 per completion
Streak Bonuses:
  - 7-day streak: +50 XP
  - 14-day streak: +100 XP
  - 30-day streak: +250 XP
  - 100-day streak: +1000 XP

Level Formula: floor(xp / 100)
```

## 🧪 Development

### Code Quality

- TypeScript strict mode
- Functional components with hooks
- Clean architecture
- Separation of concerns
- Reusable components
- Custom hooks for business logic

### State Management

- React hooks (useState, useEffect, useCallback)
- Custom hooks for data fetching
- Firebase real-time updates

## 📦 Building for Production

### iOS

```bash
expo build:ios
```

### Android

```bash
expo build:android
```

## 🔒 Security

- Firebase Authentication for secure user management
- Firestore security rules for data protection
- No sensitive data in client code
- Environment variables for configuration

## 🐛 Troubleshooting

### Firebase connection issues

- Verify your Firebase config is correct
- Check Firestore rules are properly set
- Ensure Authentication is enabled

### Notification issues

- Grant notification permissions
- Test on physical device (simulators have limitations)
- Check notification service configuration

### Build errors

- Clear cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Update Expo: `npm install expo@latest`

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🤝 Contributing

This is a complete production-ready app. Feel free to fork and customize for your needs!

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review Firebase documentation
3. Check Expo documentation
4. Review React Navigation docs

## 🎯 Future Enhancements

Potential features to add:

- Social features (friend challenges)
- Custom themes
- Habit categories
- Advanced analytics
- Habit templates
- Cloud backup/restore
- Widget support
- Apple Health integration

---

Built with ❤️ using React Native + Firebase

**Happy habit building! 🔥**
