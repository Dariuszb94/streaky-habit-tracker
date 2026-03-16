# Architecture & Design Decisions

This document explains the architectural choices and design patterns used in Streaky.

## 🏗 Architecture Overview

Streaky follows a **clean architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│            Presentation Layer           │
│  (Screens, Components, Navigation)      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          Business Logic Layer           │
│         (Custom Hooks)                  │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           Service Layer                 │
│  (Firebase Services, Notifications)     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           Data Layer                    │
│     (Firebase Auth & Firestore)         │
└─────────────────────────────────────────┘
```

## 📁 Folder Structure Rationale

### `/src/components`

**Purpose:** Reusable, presentation-only components

**Design Decision:** Keep components dumb and stateless where possible

- Components receive data via props
- No direct Firebase calls
- Focused on UI rendering
- High reusability

**Example:** `HabitCard`, `Button`, `ProgressBar`

### `/src/screens`

**Purpose:** Full-page views that compose components

**Design Decision:** Smart containers that use hooks

- Screens orchestrate multiple components
- Use custom hooks for data
- Handle user interactions
- Manage local UI state

**Example:** `HomeScreen` uses `useAuth`, `useHabits`, and `useCompletions`

### `/src/hooks`

**Purpose:** Encapsulate business logic and state management

**Design Decision:** Custom hooks for each domain

- Separate hook for each major feature (Auth, Habits, Stats)
- Handle data fetching and mutations
- Provide loading and error states
- Abstract away service layer details

**Why not Redux/MobX?**

- React hooks are sufficient for this app size
- Less boilerplate
- Better performance with proper optimization
- Easier to understand and maintain

### `/src/services`

**Purpose:** Firebase integration and external API calls

**Design Decision:** One service per Firebase collection/feature

- Pure functions that interact with Firebase
- No React dependencies
- Easy to test
- Can be swapped out (e.g., switch from Firebase to another backend)

**Example:** `habitService.ts` handles all habit CRUD operations

### `/src/utils`

**Purpose:** Pure utility functions

**Design Decision:** Stateless helper functions

- No side effects
- Easily testable
- Reusable across the app
- Single responsibility

**Example:** `streakCalculator.ts` only calculates streaks, nothing else

### `/src/types`

**Purpose:** TypeScript type definitions

**Design Decision:** Centralized type definitions

- Single source of truth
- Shared across the app
- Ensures type safety
- Easy to update

### `/src/navigation`

**Purpose:** App navigation structure

**Design Decision:** Centralized navigation setup

- Single place to see app flow
- Easy to modify navigation
- Type-safe navigation (TypeScript)

### `/src/firebase`

**Purpose:** Firebase initialization and config

**Design Decision:** Separate configuration

- Easy to update credentials
- Can switch between dev/prod environments
- Keeps sensitive data in one place

## 🎯 Design Patterns Used

### 1. Container/Presentation Pattern

**Containers (Screens):**

```typescript
// Screens are containers
export const HomeScreen = () => {
  const { habits } = useHabits();  // Data logic
  return <HabitCard habit={habit} />; // Render presentational component
};
```

**Presentations (Components):**

```typescript
// Components are presentational
export const HabitCard = ({ habit, onToggle }) => {
  return <View>...</View>; // Just render UI
};
```

### 2. Custom Hooks Pattern

Encapsulate stateful logic:

```typescript
export const useHabits = (userId) => {
  const [habits, setHabits] = useState([]);
  // ... fetching logic
  return { habits, createHabit, updateHabit, deleteHabit };
};
```

**Benefits:**

- Reusable logic
- Easy to test
- Separation of concerns
- Better code organization

### 3. Service Layer Pattern

Abstract Firebase operations:

```typescript
// Service function
export const createHabit = async (habit) => {
  const docRef = await addDoc(collection(db, 'habits'), habit);
  return docRef.id;
};

// Used in hook
const createHabit = async (habitData) => {
  const id = await createHabitService(habitData);
  await fetchHabits();
};
```

**Benefits:**

- Easy to switch backends
- Testable without Firebase
- Clear API boundaries

### 4. Composition Pattern

Build complex UIs from simple components:

```typescript
<HomeScreen>
  <Header />
  <StatsCard>
    <ProgressBar />
  </StatsCard>
  <HabitsList>
    <HabitCard />
  </HabitsList>
</HomeScreen>
```

## 🔄 State Management Strategy

### Local State

- UI state (modals, inputs) → `useState`
- Form state → `useState`

### Server State

- User data → `useAuth` hook
- Habits → `useHabits` hook
- Completions → `useCompletions` hook
- Stats → `useStats` hook

**Why no global state manager?**

- Firebase provides real-time sync
- Custom hooks encapsulate state
- Props drilling is minimal
- Simpler architecture

### State Caching

- Firebase queries cached automatically
- Hooks re-fetch on mount
- Manual refresh via `refreshHabits()` etc.

## 🎨 Component Design Principles

### 1. Single Responsibility

Each component does one thing well:

- `Button` → renders a button
- `HabitCard` → displays a habit
- `ProgressBar` → shows progress

### 2. Prop Interfaces

Every component has TypeScript interface:

```typescript
interface HabitCardProps {
  habit: Habit;
  streak: number;
  isCompleted: boolean;
  onToggle: () => void;
}
```

### 3. Consistent Styling

- StyleSheet for styles
- Consistent spacing (8px grid)
- Reusable style constants

### 4. Error Boundaries

Graceful error handling:

```typescript
try {
  await createHabit(data);
} catch (error) {
  Alert.alert('Error', error.message);
}
```

## 📊 Data Flow

### Read Flow

```
Screen → Hook → Service → Firebase → Service → Hook → Screen → Component
```

### Write Flow

```
Component → Screen Handler → Hook → Service → Firebase
         ↓
    Update Local State
```

### Example: Toggling a Habit

```typescript
// 1. User taps checkbox in HabitCard
<HabitCard onToggle={() => handleToggle(habit.id)} />

// 2. Screen handles the event
const handleToggle = async (habitId) => {
  await toggleHabitCompletion(habitId);
  await refreshCompletions();
};

// 3. Service updates Firebase
export const toggleHabitCompletion = async (habitId, date) => {
  await updateDoc(docRef, { completed: !current });
};

// 4. Hook refetches data
const refreshCompletions = async () => {
  const data = await getHabitCompletions(habitId);
  setCompletions(data);
};

// 5. Screen re-renders with new data
```

## 🔐 Security Design

### Firebase Security Rules

- User-scoped data access
- Authenticated requests only
- Server-side validation

### Client-Side

- User ID attached to all requests
- No sensitive data in client code
- Secure session management

### Best Practices

- Never trust client input
- Validate on server (Firebase rules)
- Use TypeScript for type safety

## 🚀 Performance Optimizations

### 1. React Optimizations

```typescript
// useCallback for event handlers
const handleToggle = useCallback(() => {
  toggleCompletion(habitId);
}, [habitId]);

// Memoize expensive calculations
const streak = useMemo(() => calculateStreak(completions), [completions]);
```

### 2. Firebase Optimizations

- Indexed queries
- Limited data fetching (no `get()` on entire collections)
- Real-time listeners only where needed

### 3. Code Splitting

- Lazy load screens (React Navigation does this)
- Lazy load heavy dependencies

## 🧪 Testability

### Service Layer

Pure functions, easy to unit test:

```typescript
describe('streakCalculator', () => {
  it('calculates streak correctly', () => {
    const completions = [
      /* test data */
    ];
    const streak = calculateStreak(completions);
    expect(streak.currentStreak).toBe(3);
  });
});
```

### Hooks

Can be tested with `@testing-library/react-hooks`:

```typescript
const { result } = renderHook(() => useHabits(userId));
expect(result.current.habits).toEqual([]);
```

### Components

Can be tested with `@testing-library/react-native`:

```typescript
render(<HabitCard habit={mockHabit} />);
expect(screen.getByText('Drink Water')).toBeInTheDocument();
```

## 📦 Dependency Choices

### Why Firebase?

- Real-time sync
- Built-in authentication
- Generous free tier
- Easy scaling
- Managed infrastructure

### Why Expo?

- Faster development
- Easy testing on device
- OTA updates
- Great developer experience

### Why React Navigation?

- Standard for React Native
- Type-safe
- Great documentation
- Active community

### Why TypeScript?

- Catch errors early
- Better IDE support
- Self-documenting code
- Refactoring confidence

### Why date-fns?

- Lightweight
- Tree-shakeable
- Modern API
- Good TypeScript support

## 🔄 Future Architecture Improvements

### Potential Enhancements

1. **State Management**
   - Add Zustand/Jotai if app grows
   - Implement optimistic updates

2. **Caching**
   - Add React Query for better caching
   - Offline support with local storage

3. **Testing**
   - Add unit tests for utils
   - Add integration tests for services
   - Add E2E tests with Detox

4. **Performance**
   - Implement virtual lists for long habit lists
   - Add loading skeletons
   - Lazy load images

5. **Code Quality**
   - Add ESLint
   - Add Prettier
   - Add Husky for pre-commit hooks

6. **Monitoring**
   - Add Sentry for error tracking
   - Add Firebase Analytics
   - Add performance monitoring

## 📝 Coding Conventions

### File Naming

- Components: PascalCase (`HabitCard.tsx`)
- Hooks: camelCase with "use" prefix (`useAuth.ts`)
- Services: camelCase with "Service" suffix (`habitService.ts`)
- Utils: camelCase (`streakCalculator.ts`)

### Component Structure

```typescript
// 1. Imports
import React from 'react';

// 2. Types
interface Props {}

// 3. Component
export const Component: React.FC<Props> = () => {
  // 4. Hooks
  const [state, setState] = useState();

  // 5. Handlers
  const handleClick = () => {};

  // 6. Render
  return <View />;
};

// 7. Styles
const styles = StyleSheet.create({});
```

### TypeScript Guidelines

- Always define prop interfaces
- Use explicit return types for functions
- Avoid `any` type
- Use strict mode

## 🎓 Learning Resources

To understand this architecture better:

1. **React Hooks**: https://react.dev/reference/react
2. **Clean Architecture**: Robert C. Martin's book
3. **Firebase**: https://firebase.google.com/docs
4. **TypeScript**: https://www.typescriptlang.org/docs

## ✨ Summary

This architecture provides:

- ✅ Clear separation of concerns
- ✅ Easy to understand and maintain
- ✅ Scalable structure
- ✅ Type safety with TypeScript
- ✅ Testable code
- ✅ Reusable components
- ✅ Performance optimized
- ✅ Production ready

The architecture is flexible enough to grow with your app while keeping complexity manageable.

---

**Questions about the architecture?** Review the code examples in the codebase to see these patterns in action!
