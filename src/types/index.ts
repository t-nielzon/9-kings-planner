// Core game entity types
export interface King {
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

export interface Card {
  id: string;
  name: string;
  type: "Base" | "Troop" | "Tower" | "Building" | "Tome" | "Enchantment";
  description: string;
  kingId: string;
  assetPath: string;
}

export interface CardStats {
  damage?: number;
  health?: number;
  units?: number;
  range?: number;
  cost?: number;
}

export interface CardEffect {
  type: string;
  value: number | string;
  description: string;
}

export interface Decree {
  id: string;
  name: string;
  description: string;
  effect: string;
  kingSpecific: boolean;
  kingId?: string;
  category: "Combat" | "Economic" | "Defensive" | "Utility";
}

export interface Perk {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  effect: string;
  kingSpecific: boolean;
  kingId?: string;
  category: "Economy" | "Combat" | "Utility" | "Special";
}

export interface Event {
  id: string;
  name: string;
  type: "Choice" | "Shop" | "Blessing" | "Expansion" | "Combat" | "Challenge";
  firstAppearance: number;
  frequency: "Once" | "Multiple" | "Available";
  description: string;
  strategicPurpose: string;
}

// User data models
export interface BuildPlan {
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

export interface GridLayout {
  // Dynamic expansion from 3x3 to 5x5
  currentSize: number; // 3, 4, or 5 (representing 3x3, 4x4, 5x5)
  unlockedPlots: string[]; // Array of unlocked plot positions like ["0,0", "0,1", "1,0", ...]
  plots: {
    [position: string]: PlotData; // key format: "row,col" (e.g., "0,0", "1,2")
  };
}

export interface PlotData {
  cardId?: string;
  level: number;
  unlocked: boolean;
  unlockedYear?: number; // Track when plot was unlocked for planning
}

export interface DiplomaticPlan {
  timeline: DiplomaticAction[];
  targetEnemies: string[];
  cardPoolStrategy: string;
}

export interface DiplomaticAction {
  year: number;
  action: "war" | "peace";
  kingId: string;
  reasoning: string;
}

export interface PerkPlan {
  selectedPerks: {
    perkId: string;
    targetLevel: number;
    priority: number;
  }[];
  progression: {
    level: number;
    perkId: string;
  }[];
}

// App state types
export interface AppState {
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

export interface GameData {
  kings: King[];
  cards: Card[];
  decrees: Decree[];
  perks: Perk[];
  events: Event[];
}

export interface StoredData {
  buildPlans: BuildPlan[];
  userPreferences: UserPreferences;
  plannerState: PlannerState;
  kingProgression: KingProgression[];
}

export interface UserPreferences {
  theme: "light" | "dark";
  defaultGridSize: "3x3" | "5x5";
  autoSave: boolean;
  soundEnabled: boolean;
}

export interface PlannerState {
  lastSelectedKing?: string;
  recentBuilds: string[];
  favoriteCards: string[];
}

export interface KingProgression {
  kingId: string;
  level: number;
  experience: number;
  unlockedPerks: string[];
}

// Drag and drop types
export interface DragItem {
  type: "card";
  card: Card;
  sourceId?: string;
}

export interface DropResult {
  plotPosition: string;
  success: boolean;
}

// Grid position utilities
export type GridPosition = {
  row: number;
  col: number;
};

export type GridSize = 3 | 4 | 5;
