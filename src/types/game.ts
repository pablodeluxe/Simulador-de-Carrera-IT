export type SeniorityLevel = 'Junior' | 'Semi-Senior' | 'Senior';

export interface TaskDefinition {
  id: string;
  title: string;
  description: string;
  durationSeconds: number; // scaled for responsive gameplay
  baseXP: number;
  baseSalaryReward: number;
  baseSanityCost: number;
  scrapChance: number; // 0 to 1
  minScrap: number;
  maxScrap: number;
  iconName: string;
  requiredSeniority?: SeniorityLevel;
}

export interface ActiveTask {
  id: string;
  taskDefId: string;
  roleId: number;
  progress: number; // 0 to 100
  elapsedSeconds: number;
  totalDurationSeconds: number;
  startedAt: number;
  isAutomated?: boolean;
}

export interface RoleDefinition {
  id: number;
  title: string;
  department: string;
  icon: string;
  description: string;
  minSalary: number;
  maxSalary: number;
  unlockXP: number;
  color: string;
  tasks: TaskDefinition[];
  lore: string[];
}

export interface ConsumableItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  currency: 'salary' | 'scrap';
  sanityRestorePercent: number; // e.g. 15 for Café
  cooldownSeconds?: number;
}

export interface ShopUpgrade {
  id: string;
  name: string;
  category: 'setup' | 'pet' | 'course';
  description: string;
  icon: string;
  cost: number;
  currency: 'salary' | 'scrap';
  level: number;
  maxLevel: number;
  costMultiplier: number;
  effectDescription: string;
  // Modifiers
  xpMultiplier?: number;
  salaryMultiplier?: number;
  sanityRegenBonus?: number;
  maxSanityBonus?: number;
  taskSpeedMultiplier?: number;
  sanityCostReduction?: number;
  autoClickPower?: number;
  scrapChanceBonus?: number;
  concurrentTaskSlotsBonus?: number;
}

export interface MurphyChoice {
  text: string;
  description: string;
  sanityDelta: number;
  xpDelta: number;
  salaryDelta: number;
  scrapDelta: number;
  successRate: number; // 0 to 1
  failureOutcome?: {
    text: string;
    sanityDelta: number;
    salaryDelta: number;
  };
}

export interface MurphyEvent {
  id: string;
  title: string;
  subtitle: string;
  flavorText: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  choices: MurphyChoice[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: number;
  xpReward: number;
  salaryReward: number;
}

export interface GameStats {
  totalTasksCompleted: number;
  totalClicks: number;
  totalSalaryEarned: number;
  totalScrapCollected: number;
  totalSanityLost: number;
  totalCoffeesDrank: number;
  burnoutsSuffered: number;
  murphyEventsSurvived: number;
  promotionsCount: number;
  timePlayedSeconds: number;
}

export interface GameState {
  currentRoleId: number;
  roleXP: number;
  totalXP: number;
  salary: number;
  scrap: number;
  sanity: number;
  maxSanity: number;
  isBurnout: boolean;
  activeTasks: ActiveTask[];
  purchasedUpgrades: Record<string, number>; // upgradeId -> level
  unlockedAchievements: string[];
  stats: GameStats;
  lastTickTimestamp: number;
  soundEnabled: boolean;
  autoSaveEnabled: boolean;
}
