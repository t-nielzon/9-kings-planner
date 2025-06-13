# Technical Architecture

## Architecture Overview

The 9 Kings Planner is built as a **static single-page application (SPA)** with **client-side localStorage persistence**. This architecture provides optimal performance, offline capability, and simple deployment while meeting all strategic planning requirements.

## Core Architecture Principles

### Static-First Approach

- **No Backend Required**: All game data embedded as static JSON/TypeScript constants
- **Fast Loading**: Minimal network requests after initial page load
- **Offline Capable**: Full functionality without internet connection
- **Simple Deployment**: Deploy to any static hosting service (Netlify, Vercel, GitHub Pages)

### Client-Side Data Management

- **Game Data**: Static JSON files with kings, cards, decrees, perks, and events
- **User Data**: localStorage for build plans, preferences, and planning progress
- **State Management**: Modern frontend state management (React Context/Zustand/Redux)

## Technology Stack

### Frontend Framework

- **React** with TypeScript for type safety and component architecture
- **Tailwind CSS** for utility-first styling and responsive design
- **React Router** for client-side navigation between planning tools

### Data Storage Strategy

#### Static Game Data

```typescript
// Static game data structure
interface GameData {
  kings: King[];
  cards: Card[];
  decrees: Decree[];
  perks: Perk[];
  events: Event[];
}
```

#### localStorage Schema

```typescript
interface StoredData {
  buildPlans: BuildPlan[];
  userPreferences: UserPreferences;
  plannerState: PlannerState;
  kingProgression: KingProgression[];
}
```

### Component Architecture

- **Reusable UI Components**: Buttons, inputs, cards, grids following existing patterns
- **Feature Components**: Kingdom grid, build planner, king browser
- **Layout Components**: Navigation, sidebars, modals
- **Data Components**: Card displays, stat panels, timeline views

## Data Models

### Core Game Entities

#### King

```typescript
interface King {
  id: string;
  name: string;
  archetype: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  cardPool: Card[];
  uniqueDecrees: Decree[];
  perkTree: Perk[];
  assets: {
    portrait: string;
    cards: Record<string, string>;
  };
}
```

#### Card

```typescript
interface Card {
  id: string;
  name: string;
  type: "Castle" | "Troop" | "Tower" | "Building" | "Tome" | "Enchantment";
  description: string;
  kingId: string;
  stats?: CardStats;
  effects?: CardEffect[];
  assetPath: string;
}
```

#### BuildPlan

```typescript
interface BuildPlan {
  id: string;
  name: string;
  kingId: string;
  created: Date;
  modified: Date;
  kingdomGrid: GridLayout;
  targetCards: string[];
  diplomaticStrategy: DiplomaticPlan;
  perkPriorities: PerkPlan;
  notes: string;
}
```

### User Data Models

#### GridLayout

```typescript
interface GridLayout {
  // Dynamic expansion from 3x3 to 5x5
  currentSize: number; // 3, 4, or 5 (representing 3x3, 4x4, 5x5)
  unlockedPlots: string[]; // Array of unlocked plot positions like ["0,0", "0,1", "1,0", ...]
  plots: {
    [position: string]: PlotData; // key format: "row,col" (e.g., "0,0", "1,2")
  };
}

interface PlotData {
  cardId?: string;
  level: number;
  unlocked: boolean;
  unlockedYear?: number; // Track when plot was unlocked for planning
}
```

#### DiplomaticPlan

```typescript
interface DiplomaticPlan {
  timeline: DiplomaticAction[];
  targetEnemies: string[];
  cardPoolStrategy: string;
}

interface DiplomaticAction {
  year: number;
  action: "war" | "peace";
  kingId: string;
  reasoning: string;
}
```

## Component Structure

### Page Components

```
src/
├── pages/
│   ├── HomePage.tsx           # Landing page with king selection
│   ├── KingBrowser.tsx        # King database and comparison
│   ├── CardDatabase.tsx       # Searchable card catalog
│   ├── BuildPlanner.tsx       # Main build planning interface
│   ├── KingdomGrid.tsx        # Interactive grid planner
│   └── DiplomaticPlanner.tsx  # War/peace strategy timeline
```

### Feature Components

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Select.tsx
│   │   └── Grid.tsx
│   ├── game/                  # Game-specific components
│   │   ├── KingCard.tsx
│   │   ├── GameCard.tsx
│   │   ├── DecreeList.tsx
│   │   └── PerkTree.tsx
│   └── planner/               # Planning tool components
│       ├── BuildEditor.tsx
│       ├── TimelineView.tsx
│       └── SynergyAnalyzer.tsx
```

## State Management

### Global State Structure

```typescript
interface AppState {
  // Static game data (loaded once)
  gameData: GameData;

  // User planning data
  currentBuild: BuildPlan | null;
  savedBuilds: BuildPlan[];

  // UI state
  activeKing: string | null;
  selectedCards: string[];
  gridMode: "edit" | "view";

  // Preferences
  theme: "light" | "dark";
  gridSize: "3x3" | "5x5";
}
```

### localStorage Integration

```typescript
// Automatic persistence hooks
const usePersistentState = <T>(key: string, initialValue: T) => {
  // Sync with localStorage on changes
  // Load from localStorage on mount
};

// Build plan auto-save
const useAutoSave = (buildPlan: BuildPlan) => {
  // Debounced save to localStorage
};
```

## Performance Optimizations

### Bundle Optimization

- **Code Splitting**: Lazy load individual planning tools
- **Tree Shaking**: Remove unused game data from bundles
- **Asset Optimization**: Compress card images and use modern formats

### Runtime Performance

- **Memoization**: React.memo for expensive card/grid components
- **Virtual Scrolling**: For large card lists and databases
- **Debounced Search**: Smooth filtering and search experiences

## Deployment Strategy

### Static Hosting

- **Primary**: Netlify or Vercel for automatic deployments
- **Backup**: GitHub Pages for simple hosting
- **CDN**: Automatic global distribution for fast loading

### Build Process

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && netlify deploy --prod"
  }
}
```

## Data Migration Strategy

### Future Extensibility

- **Versioned localStorage**: Handle schema changes gracefully
- **Import/Export**: Allow users to backup/restore build plans
- **Migration Utilities**: Update old build plans to new formats

### Game Data Updates

- **Static Updates**: New kings/cards added via code deployments
- **Backward Compatibility**: Ensure old builds work with new data

## Security Considerations

### Client-Side Security

- **Input Validation**: Sanitize all user inputs before storage
- **XSS Prevention**: Proper escaping of dynamic content
- **localStorage Limits**: Handle storage quota exceeded gracefully

### Data Privacy

- **Local-Only**: All user data stays on device
- **No Tracking**: No analytics or user behavior collection
- **Optional Sharing**: Future feature for build plan sharing
