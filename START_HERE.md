# 🎉 Welcome to Streaky!

<div align="center">

# 🔥 Streaky - Your Habit Tracking Companion

**A production-ready React Native mobile app with Firebase backend**

[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-50.0-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7-orange.svg)](https://firebase.google.com/)

</div>

---

## 🚀 Quick Navigation

### 📚 Documentation Guide

| Document                                     | Purpose                    | Read Time |
| -------------------------------------------- | -------------------------- | --------- |
| **[QUICKSTART.md](QUICKSTART.md)**           | Get running in 5 minutes   | 5 min     |
| **[README.md](README.md)**                   | Complete app documentation | 15 min    |
| **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)**   | Detailed Firebase setup    | 10 min    |
| **[DEVELOPMENT.md](DEVELOPMENT.md)**         | Development environment    | 10 min    |
| **[ARCHITECTURE.md](ARCHITECTURE.md)**       | Architecture & design      | 15 min    |
| **[FILE_STRUCTURE.md](FILE_STRUCTURE.md)**   | File organization          | 10 min    |
| **[CHECKLIST.md](CHECKLIST.md)**             | Setup verification         | 5 min     |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Project overview           | 10 min    |

### 🎯 Start Here Based on Your Goal

**I want to run the app NOW:**
→ Start with [QUICKSTART.md](QUICKSTART.md)

**I want to understand what this app does:**
→ Start with [README.md](README.md)

**I need to set up Firebase:**
→ Start with [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

**I want to understand the architecture:**
→ Start with [ARCHITECTURE.md](ARCHITECTURE.md)

**I want to verify my setup:**
→ Start with [CHECKLIST.md](CHECKLIST.md)

**I'm a senior developer reviewing code:**
→ Start with [ARCHITECTURE.md](ARCHITECTURE.md) and [FILE_STRUCTURE.md](FILE_STRUCTURE.md)

---

## 📱 What is Streaky?

Streaky is a **gamified habit tracker** that helps users build lasting habits through:

- 🔥 **Streak Tracking** - Build consecutive day streaks
- ⚡ **XP & Leveling** - Earn points and level up
- 🎯 **Daily Goals** - Track habit completion
- 📊 **Progress Stats** - Visualize your journey
- 🔔 **Smart Reminders** - Never forget a habit
- 🏆 **Achievements** - Unlock milestones

---

## 🎬 Getting Started (3 Steps)

### Step 1: Install Dependencies (2 minutes)

```bash
cd micro-habit-tracker
npm install
```

### Step 2: Configure Firebase (3 minutes)

1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Copy your Firebase config
3. Update `src/firebase/config.ts`
4. Enable Email/Password auth
5. Create Firestore database
6. Set security rules (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md))

### Step 3: Run the App (1 minute)

```bash
npm start
```

Then press:

- `i` for iOS Simulator (Mac only)
- `a` for Android Emulator
- Scan QR with Expo Go on your phone

---

## 🏗 Project Structure at a Glance

```
src/
├── components/     # 6 reusable UI components
├── screens/        # 8 app screens
├── hooks/          # 4 custom React hooks
├── services/       # 5 Firebase service layers
├── utils/          # 3 utility modules
├── navigation/     # Navigation setup
├── firebase/       # Firebase config (UPDATE THIS)
└── types/          # TypeScript definitions
```

**Total:** 40+ files, 6,000+ lines of production code

---

## ✨ Key Features

### Authentication System ✅

- Email/password registration
- Secure login with Firebase
- Session persistence
- Profile management

### Habit Management ✅

- Create habits with 18 emoji icons
- Set custom reminder times
- Edit and delete habits
- Real-time Firebase sync

### Completion Tracking ✅

- Toggle daily completion
- Visual completion history
- 7-day calendar view
- Persistent storage

### Streak System ✅

- Automatic streak calculation
- Current & longest streak tracking
- Streak resets on missed days
- Fire emoji indicators 🔥

### Gamification ✅

- 10 XP per completion
- Bonus XP for milestones (7, 14, 30, 100 days)
- Dynamic leveling (Level = XP / 100)
- Progress bars and animations

### Statistics ✅

- Weekly completion rate
- Total habits completed
- Average streaks
- Motivational messages

### Notifications ✅

- Daily habit reminders
- Custom reminder times
- Push notifications via Expo
- Permission handling

---

## 🛠 Tech Stack

| Layer             | Technology          | Purpose              |
| ----------------- | ------------------- | -------------------- |
| **Framework**     | React Native + Expo | Mobile app framework |
| **Language**      | TypeScript          | Type safety          |
| **Backend**       | Firebase            | Auth + Database      |
| **Database**      | Cloud Firestore     | NoSQL real-time DB   |
| **Navigation**    | React Navigation v6 | App navigation       |
| **Notifications** | Expo Notifications  | Push notifications   |
| **Date Utils**    | date-fns            | Date manipulation    |
| **Icons**         | Expo Vector Icons   | UI icons             |

---

## 📊 App Screens Overview

### 1. Onboarding Screen

- Welcome message
- Feature highlights
- Call-to-action button

### 2. Authentication Screens

- **Login:** Email/password sign in
- **Register:** Create new account

### 3. Main App (Tab Navigation)

#### Home Tab 🏠

- Today's habits list
- Completion checkboxes
- Current streaks
- XP progress bar
- Level display

#### Stats Tab 📊

- Weekly completion rate
- Total completions
- Longest streaks
- Motivational messages

#### Add Habit Tab ➕

- Create new habits
- Icon picker (18 emojis)
- Reminder time selector
- Form validation

#### Profile Tab 👤

- User level and XP
- Achievement milestones
- Total stats
- Logout button

### 4. Detail Screens

- **Habit Detail:** Streak info, 7-day calendar, delete option

---

## 🧠 Core Algorithms

### Streak Calculation

```
Consecutive completed days = streak
Missing a day = reset to 0
Must be completed today or yesterday to be "active"
```

### XP System

```
Base: 10 XP per completion
Bonuses:
  - 7-day streak: +50 XP
  - 14-day streak: +100 XP
  - 30-day streak: +250 XP
  - 100-day streak: +1000 XP
Level = floor(total XP / 100)
```

### Completion Rate

```
(Habits Completed / Total Possible) × 100
Calculated over 7-day period
```

---

## 🗄 Data Models

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

---

## 🎨 Design System

### Color Palette

- **Primary:** #2196F3 (Blue)
- **Success:** #4CAF50 (Green)
- **Warning:** #F57C00 (Orange)
- **Background:** #F5F5F5 (Light Gray)
- **Card:** #FFFFFF (White)
- **Text:** #333333 (Dark Gray)

### Spacing

- Based on 8px grid
- Consistent padding: 16px, 20px, 24px
- Border radius: 12px, 16px

### Typography

- Title: 28px, Bold
- Subtitle: 16px, Regular
- Body: 16px, Regular
- Caption: 14px, Regular

---

## 🔐 Security & Privacy

- ✅ Firebase Authentication
- ✅ Firestore security rules
- ✅ User-scoped data access
- ✅ No sensitive data in client
- ✅ Secure session management

---

## 📦 What's Included

### ✅ Complete Application

- [x] Full React Native + Expo setup
- [x] TypeScript configuration
- [x] Firebase integration
- [x] All screens implemented
- [x] All components built
- [x] Navigation configured
- [x] State management with hooks
- [x] Error handling
- [x] Loading states
- [x] Empty states

### ✅ Production Ready

- [x] Clean architecture
- [x] Separation of concerns
- [x] Reusable components
- [x] Type safety
- [x] Error boundaries
- [x] Performance optimized

### ✅ Comprehensive Documentation

- [x] 8 detailed guides
- [x] Setup instructions
- [x] Architecture explanation
- [x] Code examples
- [x] Troubleshooting tips

---

## 🚦 Development Workflow

### 1. First Time Setup

```bash
npm install
# Configure Firebase (see FIREBASE_SETUP.md)
npm start
```

### 2. Daily Development

```bash
npm start        # Start dev server
# Make changes → Save → Auto-reload ⚡
```

### 3. Testing

```bash
# Manual testing on simulator/device
# Check CHECKLIST.md for test scenarios
```

### 4. Building for Production

```bash
expo build:ios      # iOS build
expo build:android  # Android build
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

**Firebase errors?**
→ Check `src/firebase/config.ts` has correct credentials

**App won't start?**
→ Run `expo start -c` to clear cache

**Login fails?**
→ Verify Email/Password auth is enabled in Firebase

**Data not saving?**
→ Check Firestore rules are published

**Notifications not working?**
→ Test on physical device (simulators have limitations)

For detailed troubleshooting, see [DEVELOPMENT.md](DEVELOPMENT.md)

---

## 📈 Performance

- ⚡ Fast initial load
- 🔄 Real-time Firebase sync
- 📱 Optimized re-renders
- 💾 Efficient data fetching
- 🎨 Smooth animations

---

## 🧪 Testing Checklist

- [ ] Register new account → Works
- [ ] Login → Works
- [ ] Create habit → Saves to Firebase
- [ ] Toggle completion → Updates streak
- [ ] View stats → Shows correct data
- [ ] Set reminder → Notification received
- [ ] Delete habit → Removes from list
- [ ] Logout → Returns to login

See [CHECKLIST.md](CHECKLIST.md) for complete checklist

---

## 📚 Learning Resources

### React Native

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)

### Firebase

- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)

### TypeScript

- [TypeScript Docs](https://www.typescriptlang.org/docs)

### Navigation

- [React Navigation Docs](https://reactnavigation.org/)

---

## 🤝 Contributing

This is a complete, production-ready app. Feel free to:

- Fork and customize
- Learn from the code
- Build upon the architecture
- Deploy to App Store/Play Store

---

## 📄 License

MIT License - Free to use and modify

---

## 🎯 Next Steps

### For First-Time Users:

1. Read [QUICKSTART.md](QUICKSTART.md)
2. Run `npm install`
3. Configure Firebase
4. Start developing!

### For Developers:

1. Review [ARCHITECTURE.md](ARCHITECTURE.md)
2. Understand file structure
3. Customize to your needs
4. Deploy to production

### For Deploying:

1. Complete [CHECKLIST.md](CHECKLIST.md)
2. Test thoroughly
3. Build with Expo
4. Submit to app stores

---

## 💡 Tips for Success

1. **Start Simple**
   - Follow QUICKSTART.md
   - Get the app running first
   - Customize later

2. **Understand Firebase**
   - Firebase is critical
   - Read FIREBASE_SETUP.md carefully
   - Test authentication first

3. **Use the Checklist**
   - CHECKLIST.md is your friend
   - Verify each step
   - Don't skip items

4. **Read the Code**
   - Code is well-documented
   - Follow naming conventions
   - Learn from examples

5. **Ask Questions**
   - Check documentation first
   - Review error messages
   - Search for similar issues

---

## 🌟 Features Highlights

| Feature        | Status | Description                  |
| -------------- | ------ | ---------------------------- |
| Authentication | ✅     | Email/password with Firebase |
| Habits         | ✅     | Create, edit, delete habits  |
| Completions    | ✅     | Daily tracking with history  |
| Streaks        | ✅     | Automatic calculation        |
| XP System      | ✅     | Gamified progression         |
| Leveling       | ✅     | Dynamic level calculation    |
| Statistics     | ✅     | Weekly/monthly analytics     |
| Notifications  | ✅     | Daily reminders              |
| Profile        | ✅     | Achievements & milestones    |
| Real-time Sync | ✅     | Firebase Firestore           |

---

## 📞 Need Help?

### 1. Check Documentation

All questions answered in one of the 8 guides

### 2. Review Error Messages

Often contain helpful information

### 3. Check Firebase Console

Verify data is saving correctly

### 4. Clear Cache

`expo start -c` solves many issues

### 5. Search Online

Expo, Firebase, React Native have great communities

---

## 🎉 Final Words

**Streaky is a complete, production-ready mobile application.**

- ✅ 40+ files of clean code
- ✅ 6,000+ lines of TypeScript
- ✅ 8 comprehensive guides
- ✅ Full Firebase integration
- ✅ Ready to deploy

**Time to start building better habits!** 🔥

---

<div align="center">

**Made with ❤️ using React Native, Expo, TypeScript, and Firebase**

Start your journey: `npm start`

</div>
