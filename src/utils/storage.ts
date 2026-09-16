import { GameState } from '../types/game';

const STORAGE_KEY = 'carrera_it_game_state_v1';

export const INITIAL_GAME_STATE: GameState = {
  currentRoleId: 1, // Start as Técnico Informático
  roleXP: 0,
  roleTasksCompleted: 0,
  totalXP: 0,
  salary: 150, // Initial pocket money
  scrap: 10, // Initial spare parts
  sanity: 100,
  maxSanity: 100,
  isBurnout: false,
  activeTasks: [],
  purchasedUpgrades: {},
  unlockedAchievements: [],
  stats: {
    totalTasksCompleted: 0,
    totalClicks: 0,
    totalSalaryEarned: 150,
    totalScrapCollected: 10,
    totalSanityLost: 0,
    totalCoffeesDrank: 0,
    burnoutsSuffered: 0,
    murphyEventsSurvived: 0,
    promotionsCount: 0,
    timePlayedSeconds: 0,
  },
  lastTickTimestamp: Date.now(),
  soundEnabled: true,
  autoSaveEnabled: true,
};

export function loadGameState(): { state: GameState; offlineSeconds: number } {
  if (typeof window === 'undefined') {
    return { state: INITIAL_GAME_STATE, offlineSeconds: 0 };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { state: INITIAL_GAME_STATE, offlineSeconds: 0 };
    }

    const parsed: GameState = JSON.parse(raw);
    const now = Date.now();
    const lastTick = parsed.lastTickTimestamp || now;
    const offlineSeconds = Math.max(0, Math.floor((now - lastTick) / 1000));

    // Deep merge with defaults to safeguard any missing schema properties
    const state: GameState = {
      ...INITIAL_GAME_STATE,
      ...parsed,
      roleTasksCompleted: typeof parsed.roleTasksCompleted === 'number'
        ? parsed.roleTasksCompleted
        : Math.min(50, parsed.stats?.totalTasksCompleted || 0),
      stats: {
        ...INITIAL_GAME_STATE.stats,
        ...(parsed.stats || {}),
      },
      purchasedUpgrades: parsed.purchasedUpgrades || {},
      unlockedAchievements: parsed.unlockedAchievements || [],
      activeTasks: parsed.activeTasks || [],
      lastTickTimestamp: now,
    };

    return { state, offlineSeconds };
  } catch (err) {
    console.error('Error loading game state:', err);
    return { state: INITIAL_GAME_STATE, offlineSeconds: 0 };
  }
}

export function saveGameState(state: GameState): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stateToSave: GameState = {
      ...state,
      lastTickTimestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    return true;
  } catch (err) {
    console.error('Error saving game state:', err);
    return false;
  }
}

export function resetGameStorage(): GameState {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return { ...INITIAL_GAME_STATE, lastTickTimestamp: Date.now() };
}

export function exportSaveGame(state: GameState): string {
  return JSON.stringify(state, null, 2);
}

export function importSaveGame(jsonString: string): GameState | null {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.currentRoleId && typeof parsed.totalXP === 'number') {
      saveGameState(parsed);
      return parsed;
    }
  } catch (err) {
    console.error('Invalid save game JSON:', err);
  }
  return null;
}
