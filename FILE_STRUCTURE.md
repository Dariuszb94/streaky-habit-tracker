# 📂 Complete File Structure

```
micro-habit-tracker/
│
├── 📱 App.tsx                          # Application entry point
├── 📄 package.json                     # Dependencies and scripts
├── ⚙️ tsconfig.json                    # TypeScript configuration
├── ⚙️ app.json                         # Expo configuration
├── ⚙️ babel.config.js                  # Babel configuration
├── 🙈 .gitignore                       # Git ignore rules
├── 📝 .env.example                     # Environment variables template
│
├── 📚 Documentation/
│   ├── README.md                       # Complete project documentation
│   ├── FIREBASE_SETUP.md              # Detailed Firebase setup guide
│   ├── QUICKSTART.md                  # 5-minute quick start
│   ├── DEVELOPMENT.md                 # Development environment setup
│   ├── ARCHITECTURE.md                # Architecture & design decisions
│   ├── PROJECT_SUMMARY.md             # Project overview
│   ├── CHECKLIST.md                   # Setup verification checklist
│   └── FILE_STRUCTURE.md              # This file
│
└── 📁 src/
    │
    ├── 🎨 components/                  # Reusable UI Components
    │   ├── HabitCard.tsx              # Habit display card with checkbox
    │   ├── ProgressBar.tsx            # XP/Level progress visualization
    │   ├── IconPicker.tsx             # Emoji icon selector
    │   ├── Button.tsx                 # Reusable button component
    │   ├── StatCard.tsx               # Statistics display card
    │   ├── Loading.tsx                # Loading spinner component
    │   └── index.ts                   # Component exports
    │
    ├── 📱 screens/                     # Application Screens
    │   ├── OnboardingScreen.tsx       # Welcome/intro screen
    │   ├── LoginScreen.tsx            # User login
    │   ├── RegisterScreen.tsx         # New user registration
    │   ├── HomeScreen.tsx             # Main habits list
    │   ├── AddHabitScreen.tsx         # Create new habit
    │   ├── HabitDetailScreen.tsx      # Habit details & history
    │   ├── StatsScreen.tsx            # Progress statistics
    │   ├── ProfileScreen.tsx          # User profile & achievements
    │   └── index.ts                   # Screen exports
    │
    ├── 🧭 navigation/                  # Navigation Configuration
    │   └── AppNavigator.tsx           # Stack & tab navigators
    │
    ├── 🪝 hooks/                       # Custom React Hooks
    │   ├── useAuth.ts                 # Authentication state & methods
    │   ├── useHabits.ts               # Habit CRUD operations
    │   ├── useCompletions.ts          # Completion tracking
    │   └── useStats.ts                # User statistics
    │
    ├── 🔧 services/                    # Business Logic Layer
    │   ├── authService.ts             # Firebase authentication
    │   ├── habitService.ts            # Habit management
    │   ├── completionService.ts       # Completion tracking
    │   ├── statsService.ts            # User statistics
    │   └── notificationService.ts     # Push notifications
    │
    ├── 🔥 firebase/                    # Firebase Configuration
    │   └── config.ts                  # Firebase initialization
    │
    ├── 🛠 utils/                       # Utility Functions
    │   ├── dateHelpers.ts             # Date formatting & manipulation
    │   ├── streakCalculator.ts        # Streak calculation logic
    │   └── xpCalculator.ts            # XP & level calculations
    │
    └── 📘 types/                       # TypeScript Definitions
        └── index.ts                   # Type interfaces & enums
```

## 📊 File Count Summary

| Category      | Files   | Lines of Code (approx) |
| ------------- | ------- | ---------------------- |
| Components    | 6       | ~600                   |
| Screens       | 8       | ~1,200                 |
| Hooks         | 4       | ~400                   |
| Services      | 5       | ~500                   |
| Utils         | 3       | ~300                   |
| Navigation    | 1       | ~150                   |
| Configuration | 5       | ~200                   |
| Documentation | 8       | ~3,000+                |
| **Total**     | **40+** | **~6,350+**            |

## 🗂 Detailed File Descriptions

### Core Application Files

#### `App.tsx`

- Application entry point
- Sets up StatusBar
- Initializes notifications
- Renders AppNavigator

#### `package.json`

- Project dependencies
- NPM scripts (start, ios, android)
- Project metadata

#### `tsconfig.json`

- TypeScript compiler options
- Strict mode enabled
- ES2020 lib support

#### `app.json`

- Expo configuration
- App name, slug, version
- Icons and splash screen
- Platform-specific settings

---

### 📁 `/src/components` (6 files)

#### `HabitCard.tsx` (~120 lines)

**Purpose:** Display individual habit with completion toggle

- Props: habit, streak, isCompleted, onToggle, onPress
- Features: Checkbox, habit name, icon, streak indicator
- Styling: Card layout with shadow

#### `ProgressBar.tsx` (~50 lines)

**Purpose:** Visual progress bar for XP

- Props: current, total, color, height
- Features: Animated fill, percentage calculation
- Styling: Rounded bar with custom colors

#### `IconPicker.tsx` (~60 lines)

**Purpose:** Select emoji icon for habits

- Props: selectedIcon, onSelectIcon
- Features: 18 emoji icons, horizontal scroll
- Styling: Grid layout with selection highlight

#### `Button.tsx` (~80 lines)

**Purpose:** Reusable button component

- Props: title, onPress, variant, disabled, loading
- Variants: primary, secondary, outline
- Features: Loading state, disabled state

#### `StatCard.tsx` (~50 lines)

**Purpose:** Display statistics in card format

- Props: icon, label, value, color
- Features: Colored border, icon display
- Styling: Card with left accent border

#### `Loading.tsx` (~25 lines)

**Purpose:** Loading state component

- Props: size, color
- Features: Centered spinner
- Styling: Full-screen centered

---

### 📁 `/src/screens` (8 files)

#### `OnboardingScreen.tsx` (~120 lines)

**Purpose:** Welcome screen with app intro

- Features: App description, feature list, CTA button
- Navigation: → Auth stack

#### `LoginScreen.tsx` (~150 lines)

**Purpose:** User authentication

- Features: Email/password input, validation, error handling
- Navigation: → Main tabs or Register

#### `RegisterScreen.tsx` (~160 lines)

**Purpose:** New user account creation

- Features: Email/password, confirmation, validation
- Navigation: → Main tabs or Login

#### `HomeScreen.tsx` (~180 lines)

**Purpose:** Main app screen with habits list

- Features: Today's habits, completion toggles, XP display
- Uses: useAuth, useHabits, useCompletions, useStats
- Navigation: → HabitDetail

#### `AddHabitScreen.tsx` (~170 lines)

**Purpose:** Create new habits

- Features: Name input, icon picker, reminder time
- Uses: useAuth, useHabits
- Navigation: → Home (after creation)

#### `HabitDetailScreen.tsx` (~200 lines)

**Purpose:** View habit details and history

- Features: Streak display, 7-day calendar, delete option
- Uses: useCompletions
- Navigation: ← Back to Home

#### `StatsScreen.tsx` (~180 lines)

**Purpose:** Progress statistics and analytics

- Features: Weekly rate, totals, motivational messages
- Uses: useAuth, useStats, useHabits, useMultipleCompletions

#### `ProfileScreen.tsx` (~200 lines)

**Purpose:** User profile and achievements

- Features: Level, XP, milestones, logout
- Uses: useAuth, useStats

---

### 📁 `/src/navigation` (1 file)

#### `AppNavigator.tsx` (~150 lines)

**Purpose:** App navigation structure

- Stack navigators: Root, Auth, Home
- Tab navigator: Main (Home, Stats, Add, Profile)
- Protected routes based on auth state

---

### 📁 `/src/hooks` (4 files)

#### `useAuth.ts` (~70 lines)

**Purpose:** Authentication state management

- Methods: register, login, logout
- State: user, loading, error
- Service: authService

#### `useHabits.ts` (~110 lines)

**Purpose:** Habit CRUD operations

- Methods: createHabit, updateHabit, deleteHabit, refreshHabits
- State: habits, loading, error
- Service: habitService, notificationService

#### `useCompletions.ts` (~120 lines)

**Purpose:** Habit completion tracking

- Methods: toggleCompletion, refreshCompletions
- State: completions, loading, error, streak, isCompletedToday
- Service: completionService, statsService

#### `useStats.ts` (~40 lines)

**Purpose:** User statistics management

- Methods: refreshStats
- State: stats, loading, error, xpProgress
- Service: statsService

---

### 📁 `/src/services` (5 files)

#### `authService.ts` (~50 lines)

**Purpose:** Firebase authentication

- Methods: registerUser, loginUser, logoutUser, getCurrentUser, onAuthChange
- Firebase: Auth API

#### `habitService.ts` (~100 lines)

**Purpose:** Habit management

- Methods: createHabit, getUserHabits, getHabitById, updateHabit, deleteHabit
- Firebase: Firestore habits collection

#### `completionService.ts` (~130 lines)

**Purpose:** Completion tracking

- Methods: toggleHabitCompletion, getHabitCompletions, getTodayCompletion, getMultipleHabitsCompletions
- Firebase: Firestore habitCompletions collection

#### `statsService.ts` (~80 lines)

**Purpose:** User statistics

- Methods: initializeUserStats, getUserStats, addXP, incrementHabitsCompleted, updateLongestStreak
- Firebase: Firestore userStats collection

#### `notificationService.ts` (~100 lines)

**Purpose:** Push notifications

- Methods: requestNotificationPermissions, scheduleHabitReminder, cancelHabitReminder, getNotificationToken
- Expo: Notifications API

---

### 📁 `/src/firebase` (1 file)

#### `config.ts` (~25 lines)

**Purpose:** Firebase initialization

- Exports: auth, db, app
- Configuration: Firebase credentials (UPDATE REQUIRED)

---

### 📁 `/src/utils` (3 files)

#### `dateHelpers.ts` (~70 lines)

**Purpose:** Date manipulation

- Functions: formatDate, getTodayString, parseDate, getDaysAgo, getLastNDays, formatTime
- Library: date-fns

#### `streakCalculator.ts` (~110 lines)

**Purpose:** Streak calculation

- Functions: calculateStreak, isCompletedToday, getCompletionForDate
- Algorithm: Consecutive day counting with reset logic

#### `xpCalculator.ts` (~60 lines)

**Purpose:** XP and level calculations

- Functions: getXPForLevel, getLevelFromXP, getXPProgress, calculateCompletionXP, formatXP
- Constants: XP_PER_COMPLETION, STREAK_BONUSES

---

### 📁 `/src/types` (1 file)

#### `index.ts` (~80 lines)

**Purpose:** TypeScript type definitions

- Interfaces: Habit, HabitCompletion, UserStats, User, StreakData, WeeklyStats
- Navigation types: RootStackParamList, AuthStackParamList, MainTabParamList, HomeStackParamList
- Constants: HABIT_ICONS array

---

## 🎯 File Dependencies

### Component Dependencies

```
HabitCard → types
ProgressBar → (standalone)
IconPicker → types
Button → (standalone)
StatCard → (standalone)
Loading → (standalone)
```

### Screen Dependencies

```
HomeScreen → components, hooks (useAuth, useHabits, useCompletions, useStats), services, utils
AddHabitScreen → components, hooks (useAuth, useHabits), types
HabitDetailScreen → components, hooks (useCompletions), services, types, utils
StatsScreen → components, hooks (useAuth, useStats, useHabits, useCompletions), utils
ProfileScreen → components, hooks (useAuth, useStats)
```

### Hook Dependencies

```
useAuth → services (authService, statsService)
useHabits → services (habitService, notificationService), types
useCompletions → services (completionService, statsService), utils, types
useStats → services (statsService), utils, types
```

### Service Dependencies

```
authService → firebase/config
habitService → firebase/config, types
completionService → firebase/config, types, utils
statsService → firebase/config, types
notificationService → types
```

## 📝 Import Conventions

### Component Imports

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ComponentName } from '../components';
import { useHook } from '../hooks/useHook';
import { Type } from '../types';
```

### Service Imports

```typescript
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { Type } from '../types';
```

## 🔍 Finding Files Quickly

### Need to modify UI?

→ Look in `/src/components`

### Need to change a screen?

→ Look in `/src/screens`

### Need to update data logic?

→ Look in `/src/services`

### Need to add business logic?

→ Look in `/src/hooks`

### Need helper functions?

→ Look in `/src/utils`

### Need to update types?

→ Look in `/src/types`

### Need to change navigation?

→ Look in `/src/navigation`

### Need to update Firebase config?

→ Look in `/src/firebase/config.ts`

---

## 🎨 Style Organization

Styles are co-located with components using `StyleSheet.create()`:

```typescript
const styles = StyleSheet.create({
  container: { ... },
  text: { ... },
});
```

### Common Style Patterns

- 8px spacing grid
- 12px border radius
- Shadow: offset (0, 2), opacity 0.05
- Colors: consistent palette

## 📦 Asset Organization

Assets (icons, images) would go in `/assets`:

```
assets/
├── icon.png
├── splash.png
├── adaptive-icon.png
└── favicon.png
```

## 🔐 Configuration Files

### Git Ignored Files

- `node_modules/`
- `.expo/`
- `.env` (if using env vars)
- `dist/`

### Configuration Priority

1. `app.json` - Expo config
2. `tsconfig.json` - TypeScript config
3. `babel.config.js` - Babel config
4. `package.json` - Dependencies

---

**This structure supports:**

- ✅ Easy navigation
- ✅ Clear separation of concerns
- ✅ Scalability
- ✅ Maintainability
- ✅ Testability

**Happy coding! 🚀**
