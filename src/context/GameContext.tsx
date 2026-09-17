import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  GameState,
  ActiveTask,
  RoleDefinition,
  SeniorityLevel,
  MurphyEvent,
  MurphyChoice
} from '../types/game';
import { ROLES_DATA } from '../data/rolesData';
import { SHOP_UPGRADES, CONSUMABLES } from '../data/shopData';
import { MURPHY_EVENTS } from '../data/murphyEvents';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData';
import { loadGameState, saveGameState, resetGameStorage, getGitRepoUrl, saveGitRepoUrl, DEFAULT_GIT_REPO_URL } from '../utils/storage';
import { sound } from '../utils/audio';

interface GameContextType {
  state: GameState;
  currentRole: RoleDefinition;
  nextRole?: RoleDefinition;
  seniority: SeniorityLevel;
  roleProgressPercent: number;
  canPromote: boolean;
  requiredRoleTasks: number;
  maxSanity: number;
  sanityRegenPerSec: number;
  netSanityPerSec: number;
  maxConcurrentTasks: number;
  clickPower: number;
  clickSanityCost: number;
  autoClickPower: number;
  activeMurphyEvent: MurphyEvent | null;
  lastMurphyResult: { title: string; text: string; success: boolean } | null;
  offlineReport: { seconds: number; salaryGained: number; sanityRestored: number } | null;
  showTerminalMinigame: boolean;
  gitRepoUrl: string;
  
  // Actions
  startTask: (taskDefId: string) => boolean;
  clickActiveTask: (taskId: string) => void;
  petDuck: () => void;
  cancelTask: (taskId: string) => void;
  buyConsumable: (consumableId: string) => boolean;
  buyUpgrade: (upgradeId: string) => boolean;
  promoteRole: () => boolean;
  handleMurphyChoice: (choiceIndex: number) => void;
  dismissMurphyResult: () => void;
  dismissOfflineReport: () => void;
  toggleSound: () => void;
  resetGame: () => void;
  setShowTerminalMinigame: (show: boolean) => void;
  completeMinigameBonus: (score: number) => void;
  triggerEmergencyMurphy: () => void;
  updateGitRepoUrl: (url: string) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(() => {
    const { state: initial } = loadGameState();
    return initial;
  });

  const [activeMurphyEvent, setActiveMurphyEvent] = useState<MurphyEvent | null>(null);
  const [lastMurphyResult, setLastMurphyResult] = useState<{ title: string; text: string; success: boolean } | null>(null);
  const [offlineReport, setOfflineReport] = useState<{ seconds: number; salaryGained: number; sanityRestored: number } | null>(null);
  const [showTerminalMinigame, setShowTerminalMinigame] = useState(false);
  const [gitRepoUrl, setGitRepoUrlState] = useState<string>(() => getGitRepoUrl());

  const updateGitRepoUrl = useCallback((newUrl: string) => {
    const cleanUrl = newUrl.trim() || DEFAULT_GIT_REPO_URL;
    saveGitRepoUrl(cleanUrl);
    setGitRepoUrlState(cleanUrl);
  }, []);

  // Time tracking
  const murphyTimerRef = useRef<number>(0);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Sound sync
  useEffect(() => {
    sound.setEnabled(state.soundEnabled);
  }, [state.soundEnabled]);

  // Current Role
  const currentRole = useMemo(() => {
    return ROLES_DATA.find((r) => r.id === state.currentRoleId) || ROLES_DATA[0];
  }, [state.currentRoleId]);

  const nextRole = useMemo(() => {
    return ROLES_DATA.find((r) => r.id === state.currentRoleId + 1);
  }, [state.currentRoleId]);

  const requiredRoleTasks = currentRole.requiredTasks || 50;

  // Seniority based on both roleXP and completed tasks in this role
  // Requires at least ~17 tasks (33%) for Semi-Senior and ~34 tasks (66%) for Senior
  const seniority: SeniorityLevel = useMemo(() => {
    const xpRatio = state.roleXP / currentRole.unlockXP;
    const taskRatio = (state.roleTasksCompleted || 0) / requiredRoleTasks;
    if (xpRatio >= 0.66 && taskRatio >= 0.66) return 'Senior';
    if (xpRatio >= 0.33 && taskRatio >= 0.33) return 'Semi-Senior';
    return 'Junior';
  }, [state.roleXP, state.roleTasksCompleted, currentRole.unlockXP, requiredRoleTasks]);

  const canPromote = useMemo(() => {
    return Boolean(
      nextRole &&
      state.roleXP >= currentRole.unlockXP &&
      (state.roleTasksCompleted || 0) >= requiredRoleTasks
    );
  }, [nextRole, state.roleXP, state.roleTasksCompleted, currentRole.unlockXP, requiredRoleTasks]);

  const roleProgressPercent = useMemo(() => {
    const xpRatio = Math.min(1, state.roleXP / currentRole.unlockXP);
    const taskRatio = Math.min(1, (state.roleTasksCompleted || 0) / requiredRoleTasks);
    // Average progress between XP goal and tasks goal
    return Math.min(100, Math.floor(((xpRatio + taskRatio) / 2) * 100));
  }, [state.roleXP, state.roleTasksCompleted, currentRole.unlockXP, requiredRoleTasks]);

  // Calculate Upgrades Modifiers
  const {
    maxSanity,
    sanityRegenPerSec,
    taskSpeedMult,
    xpMultiplier,
    salaryMultiplier,
    sanityCostReduction,
    maxConcurrentTasks,
    clickPower,
    autoClickPower,
    scrapChanceBonus,
  } = useMemo(() => {
    let baseMaxSanity = 100;
    let bonusSanityRegen = 0; // Bonus from office upgrades/pets (e.g. Silla Ergonómica, Hámster)
    let baseTaskSpeed = 1.0;
    let baseXP = 1.0;
    let baseSalary = 1.0;
    let baseSanityRed = 0;
    let baseConcurrentSlots = 1;
    let baseClickPower = 15; // +15% per click
    let baseAutoClick = 0;
    let baseScrapBonus = 0;

    Object.entries(state.purchasedUpgrades).forEach(([upgradeId, rawLevel]) => {
      const level = Number(rawLevel);
      const up = SHOP_UPGRADES.find((u) => u.id === upgradeId);
      if (!up || level <= 0) return;

      if (up.maxSanityBonus) baseMaxSanity += up.maxSanityBonus * level;
      if (up.sanityRegenBonus) bonusSanityRegen += up.sanityRegenBonus * level;
      if (up.taskSpeedMultiplier) baseTaskSpeed += up.taskSpeedMultiplier * level;
      if (up.xpMultiplier) baseXP += up.xpMultiplier * level;
      if (up.salaryMultiplier) baseSalary += up.salaryMultiplier * level;
      if (up.sanityCostReduction) baseSanityRed += up.sanityCostReduction * level;
      if (up.concurrentTaskSlotsBonus) baseConcurrentSlots += up.concurrentTaskSlotsBonus * level;
      if (up.autoClickPower) baseAutoClick += up.autoClickPower * level;
      if (up.scrapChanceBonus) baseScrapBonus += up.scrapChanceBonus * level;
    });

    return {
      maxSanity: baseMaxSanity,
      sanityRegenPerSec: bonusSanityRegen,
      taskSpeedMult: baseTaskSpeed,
      xpMultiplier: baseXP,
      salaryMultiplier: baseSalary,
      sanityCostReduction: Math.min(0.6, baseSanityRed),
      maxConcurrentTasks: Math.min(3, baseConcurrentSlots),
      clickPower: baseClickPower * baseTaskSpeed,
      autoClickPower: baseAutoClick,
      scrapChanceBonus: baseScrapBonus,
    };
  }, [state.purchasedUpgrades]);

  // Current live net flow of sanity per second
  const netSanityPerSec = useMemo(() => {
    const activeTasksCount = state.activeTasks.length;
    if (state.isBurnout) {
      return Number(Math.max(0.2, 0.25 + sanityRegenPerSec).toFixed(2));
    }
    const taskDrain = activeTasksCount * 0.15 * (1 - sanityCostReduction);
    const idleRegen = activeTasksCount === 0 ? 0.35 : 0;
    return Number(((idleRegen + sanityRegenPerSec) - taskDrain).toFixed(2));
  }, [state.activeTasks.length, state.isBurnout, sanityRegenPerSec, sanityCostReduction]);

  // Mental sanity consumed per manual acceleration click (base 2.0, reduced by certifications / office perks)
  const clickSanityCost = useMemo(() => {
    return Number(Math.max(0.5, 2.0 * (1 - sanityCostReduction)).toFixed(1));
  }, [sanityCostReduction]);

  // Check and unlock achievements
  const checkAchievements = useCallback((currentState: GameState) => {
    const newlyUnlocked: string[] = [];
    const unlockedSet = new Set(currentState.unlockedAchievements);

    ACHIEVEMENTS_DATA.forEach((ach) => {
      if (unlockedSet.has(ach.id)) return;

      let qualify = false;
      if (ach.id === 'ach-first-task' && currentState.stats.totalTasksCompleted >= 1) qualify = true;
      if (ach.id === 'ach-first-coffee' && currentState.stats.totalCoffeesDrank >= 1) qualify = true;
      if (ach.id === 'ach-first-burnout' && currentState.stats.burnoutsSuffered >= 1) qualify = true;
      if (ach.id === 'ach-duck-owner' && (currentState.purchasedUpgrades['pet-duck'] || 0) >= 1) qualify = true;
      if (ach.id === 'ach-murphy-survivor' && currentState.stats.murphyEventsSurvived >= 1) qualify = true;
      if (ach.id === 'ach-role-helpdesk' && currentState.currentRoleId >= 2) qualify = true;
      if (ach.id === 'ach-role-dev' && currentState.currentRoleId >= 6) qualify = true;
      if (ach.id === 'ach-scrap-collector' && currentState.stats.totalScrapCollected >= 100) qualify = true;
      if (
        ach.id === 'ach-senior-rank' &&
        (currentState.roleXP / (ROLES_DATA.find((r) => r.id === currentState.currentRoleId)?.unlockXP || 1000) >= 0.66) &&
        (currentState.roleTasksCompleted || 0) >= 33
      ) qualify = true;
      if (ach.id === 'ach-architect-guru' && currentState.currentRoleId === 10) qualify = true;
      if (ach.id === 'ach-keyboard-warrior' && currentState.stats.totalClicks >= 100) qualify = true;
      if (
        ach.id === 'ach-setup-god' &&
        (currentState.purchasedUpgrades['chair'] || 0) >= 1 &&
        (currentState.purchasedUpgrades['keyboard'] || 0) >= 1 &&
        (currentState.purchasedUpgrades['monitor'] || 0) >= 1
      ) qualify = true;

      if (qualify) {
        newlyUnlocked.push(ach.id);
      }
    });

    if (newlyUnlocked.length > 0) {
      sound.playPromotion();
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
      } catch {}

      let bonusSalary = 0;
      let bonusXP = 0;
      newlyUnlocked.forEach((id) => {
        const ach = ACHIEVEMENTS_DATA.find((a) => a.id === id);
        if (ach) {
          bonusSalary += ach.salaryReward;
          bonusXP += ach.xpReward;
        }
      });

      return {
        ...currentState,
        salary: currentState.salary + bonusSalary,
        totalXP: currentState.totalXP + bonusXP,
        roleXP: currentState.roleXP + Math.min(50, Math.floor(bonusXP * 0.15)),
        unlockedAchievements: [...currentState.unlockedAchievements, ...newlyUnlocked],
      };
    }

    return currentState;
  }, []);

  // Offline processing on mount
  useEffect(() => {
    const { offlineSeconds } = loadGameState();
    if (offlineSeconds > 5) {
      // Calculate offline earnings (cap at 8 hours = 28800s)
      const cappedSeconds = Math.min(28800, offlineSeconds);
      // Passive salary per second based on role (approx $1 to $20/min)
      const basePerSec = (currentRole.minSalary / 60) * 0.4;
      const salaryEarned = Math.floor(basePerSec * cappedSeconds * salaryMultiplier);
      const sanityRestored = Math.min(maxSanity, Math.floor(sanityRegenPerSec * cappedSeconds * 0.8));

      setState((prev) => {
        const nextSanity = Math.min(maxSanity, prev.sanity + sanityRestored);

        // Advance active tasks during offline period
        const updatedActiveTasks = prev.activeTasks.map((task) => {
          let taskDef = currentRole.tasks.find((t) => t.id === task.taskDefId);
          if (!taskDef) {
            for (const r of ROLES_DATA) {
              const found = r.tasks.find((t) => t.id === task.taskDefId);
              if (found) {
                taskDef = found;
                break;
              }
            }
          }
          const totalDuration = taskDef ? taskDef.durationSeconds : 10;
          const progressGained = (cappedSeconds / totalDuration) * 100;
          const newProgress = Math.min(100, task.progress + progressGained);
          return {
            ...task,
            progress: newProgress,
            elapsedSeconds: task.elapsedSeconds + cappedSeconds,
          };
        });

        const nextState: GameState = {
          ...prev,
          salary: prev.salary + salaryEarned,
          sanity: nextSanity,
          isBurnout: nextSanity <= 0,
          activeTasks: updatedActiveTasks,
          stats: {
            ...prev.stats,
            totalSalaryEarned: prev.stats.totalSalaryEarned + salaryEarned,
          },
        };
        return nextState;
      });

      setOfflineReport({
        seconds: cappedSeconds,
        salaryGained: salaryEarned,
        sanityRestored,
      });
    }
  }, []);

  // Complete a task helper
  const completeTask = useCallback((taskId: string) => {
    setState((prev) => {
      const active = prev.activeTasks.find((t) => t.id === taskId);
      if (!active) return prev;

      // Find task definition
      let taskDef = currentRole.tasks.find((t) => t.id === active.taskDefId);
      if (!taskDef) {
        // Fallback search in all roles
        for (const r of ROLES_DATA) {
          const found = r.tasks.find((t) => t.id === active.taskDefId);
          if (found) {
            taskDef = found;
            break;
          }
        }
      }

      if (!taskDef) return prev;

      // Calculate rewards
      const earnedXP = Math.floor(taskDef.baseXP * xpMultiplier);
      const earnedSalary = Math.floor(taskDef.baseSalaryReward * salaryMultiplier);

      // Scrap chance
      const finalScrapChance = Math.min(1.0, taskDef.scrapChance + scrapChanceBonus);
      let earnedScrap = 0;
      if (Math.random() < finalScrapChance) {
        earnedScrap = Math.floor(
          taskDef.minScrap + Math.random() * (taskDef.maxScrap - taskDef.minScrap + 1)
        );
      }

      sound.playLevelUp();
      sound.playCashChime();

      const remainingTasks = prev.activeTasks.filter((t) => t.id !== taskId);

      const nextState: GameState = {
        ...prev,
        roleXP: prev.roleXP + earnedXP,
        roleTasksCompleted: (prev.roleTasksCompleted || 0) + 1,
        totalXP: prev.totalXP + earnedXP,
        salary: prev.salary + earnedSalary,
        scrap: prev.scrap + earnedScrap,
        activeTasks: remainingTasks,
        stats: {
          ...prev.stats,
          totalTasksCompleted: prev.stats.totalTasksCompleted + 1,
          totalSalaryEarned: prev.stats.totalSalaryEarned + earnedSalary,
          totalScrapCollected: prev.stats.totalScrapCollected + earnedScrap,
        },
      };

      return checkAchievements(nextState);
    });
  }, [currentRole, xpMultiplier, salaryMultiplier, scrapChanceBonus, checkAchievements]);

  // Main Game Tick (every 500ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const now = Date.now();
        const deltaSeconds = 0.5;

        // Sanity dynamics:
        // Idle recovery when 0 tasks are running (+0.35/s base)
        // Mental strain when tasks are running: -0.15/s per active task (mitigated by sanityCostReduction)
        // Upgrades (e.g. Silla ergonómica, hámster) provide bonus sanity recovery at all times
        const activeTasksCount = prev.activeTasks.length;
        const taskStrainRate = activeTasksCount * 0.15 * (1 - sanityCostReduction);
        const idleRestRate = activeTasksCount === 0 ? 0.35 : 0;
        const netSanityRateCurrent = (idleRestRate + sanityRegenPerSec) - taskStrainRate;

        let newSanity = prev.sanity;
        if (prev.isBurnout) {
          // In burnout, task strain pauses; recovery occurs until reaching >= 25 sanity
          const burnoutRecoveryRate = Math.max(0.2, 0.25 + sanityRegenPerSec);
          newSanity = Math.min(maxSanity, prev.sanity + burnoutRecoveryRate * deltaSeconds);
        } else {
          newSanity = Math.min(maxSanity, Math.max(0, prev.sanity + netSanityRateCurrent * deltaSeconds));
        }

        const isBurnoutNow = prev.isBurnout ? newSanity < 25 : newSanity <= 0;
        let burnoutsCount = prev.stats.burnoutsSuffered;
        if (isBurnoutNow && !prev.isBurnout) {
          burnoutsCount += 1;
          sound.playErrorBuzz();
        } else if (!isBurnoutNow && prev.isBurnout) {
          sound.playCoffeeDrink();
        }

        // Auto Passive Salary (Scaled by role and multipliers)
        // Approx base salary per min / 60 * multiplier
        const baseRolePerSec = (currentRole.minSalary / 60) * 0.15;
        const passiveSalaryGained = prev.isBurnout
          ? baseRolePerSec * 0.25 * deltaSeconds
          : baseRolePerSec * salaryMultiplier * deltaSeconds;

        // Advance Active Tasks
        const tasksToComplete: string[] = [];
        const speedFactor = (prev.isBurnout ? 0.35 : 1.0) * taskSpeedMult;

        const updatedTasks = prev.activeTasks.map((task) => {
          let taskDef = currentRole.tasks.find((t) => t.id === task.taskDefId);
          if (!taskDef) {
            for (const r of ROLES_DATA) {
              const found = r.tasks.find((t) => t.id === task.taskDefId);
              if (found) {
                taskDef = found;
                break;
              }
            }
          }
          const totalDuration = taskDef ? taskDef.durationSeconds : 10;
          const advanceRate = (100 / totalDuration) * speedFactor * deltaSeconds;
          
          // Add auto-clicker contribution
          const autoProgress = autoClickPower > 0 ? autoClickPower * 4 * deltaSeconds : 0;
          const newProgress = task.progress + advanceRate + autoProgress;

          if (newProgress >= 100) {
            tasksToComplete.push(task.id);
            return { ...task, progress: 100 };
          }
          return {
            ...task,
            progress: newProgress,
            elapsedSeconds: task.elapsedSeconds + deltaSeconds,
          };
        });

        // Trigger completed tasks
        if (tasksToComplete.length > 0) {
          setTimeout(() => {
            tasksToComplete.forEach((id) => completeTask(id));
          }, 0);
        }

        // Murphy's Law Crisis Scheduler (~every 120s of active play)
        murphyTimerRef.current += deltaSeconds;
        if (murphyTimerRef.current >= 110 && !activeMurphyEvent) {
          if (Math.random() < 0.35) {
            // Trigger random Murphy event
            const randomEvent = MURPHY_EVENTS[Math.floor(Math.random() * MURPHY_EVENTS.length)];
            setActiveMurphyEvent(randomEvent);
            sound.playMurphyAlert();
            murphyTimerRef.current = 0;
          }
        }

        const nextState: GameState = {
          ...prev,
          sanity: Math.max(0, newSanity),
          isBurnout: isBurnoutNow,
          salary: prev.salary + passiveSalaryGained,
          activeTasks: updatedTasks,
          lastTickTimestamp: now,
          stats: {
            ...prev.stats,
            totalSalaryEarned: prev.stats.totalSalaryEarned + passiveSalaryGained,
            burnoutsSuffered: burnoutsCount,
            timePlayedSeconds: prev.stats.timePlayedSeconds + deltaSeconds,
          },
        };

        // Auto Save to localStorage
        saveGameState(nextState);

        return nextState;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [
    maxSanity,
    sanityRegenPerSec,
    sanityCostReduction,
    taskSpeedMult,
    salaryMultiplier,
    autoClickPower,
    currentRole,
    completeTask,
    activeMurphyEvent,
  ]);

  // Start Task
  const startTask = useCallback(
    (taskDefId: string): boolean => {
      const currentState = stateRef.current;
      if (currentState.activeTasks.length >= maxConcurrentTasks) {
        sound.playErrorBuzz();
        return false;
      }

      // Find task definition
      const taskDef = currentRole.tasks.find((t) => t.id === taskDefId);
      if (!taskDef) return false;

      // Check sanity requirement
      const effectiveSanityCost = Math.round(
        taskDef.baseSanityCost * (1 - sanityCostReduction)
      );

      if (currentState.sanity < effectiveSanityCost && !currentState.isBurnout) {
        sound.playErrorBuzz();
        return false;
      }

      const newTask: ActiveTask = {
        id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        taskDefId,
        roleId: currentRole.id,
        progress: 0,
        elapsedSeconds: 0,
        totalDurationSeconds: taskDef.durationSeconds,
        startedAt: Date.now(),
      };

      sound.playKeyClick();

      setState((prev) => {
        const nextSanity = Math.max(0, prev.sanity - effectiveSanityCost);
        const isBurnout = nextSanity <= 0;
        return {
          ...prev,
          sanity: nextSanity,
          isBurnout,
          activeTasks: [...prev.activeTasks, newTask],
          stats: {
            ...prev.stats,
            totalSanityLost: prev.stats.totalSanityLost + effectiveSanityCost,
            burnoutsSuffered: isBurnout && !prev.isBurnout ? prev.stats.burnoutsSuffered + 1 : prev.stats.burnoutsSuffered,
          },
        };
      });

      return true;
    },
    [maxConcurrentTasks, currentRole, sanityCostReduction]
  );

  // Click / Tap Active Task to accelerate (rushing causes mental exhaustion and consumes sanity)
  const clickActiveTask = useCallback(
    (taskId: string) => {
      sound.playKeyClick();

      setState((prev) => {
        const taskIndex = prev.activeTasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) return prev;

        const effectiveClickPower = prev.isBurnout
          ? Math.max(3, Math.round(clickPower * 0.35))
          : clickPower;

        const target = prev.activeTasks[taskIndex];
        const newProgress = target.progress + effectiveClickPower;

        // Rushing costs mental energy:
        // Consumes sanity unless already in burnout (where sanity cannot drop below 0)
        const sanityLost = prev.isBurnout ? 0 : clickSanityCost;
        const nextSanity = Math.max(0, Number((prev.sanity - sanityLost).toFixed(1)));
        const isBurnoutNow = prev.isBurnout ? true : nextSanity <= 0;
        let burnoutsCount = prev.stats.burnoutsSuffered;

        if (isBurnoutNow && !prev.isBurnout) {
          burnoutsCount += 1;
          sound.playErrorBuzz();
        }

        if (newProgress >= 100) {
          setTimeout(() => completeTask(taskId), 0);
          const nextState: GameState = {
            ...prev,
            sanity: nextSanity,
            isBurnout: isBurnoutNow,
            stats: {
              ...prev.stats,
              totalClicks: prev.stats.totalClicks + 1,
              totalSanityLost: prev.stats.totalSanityLost + sanityLost,
              burnoutsSuffered: burnoutsCount,
            },
          };
          return checkAchievements(nextState);
        }

        const newTasks = [...prev.activeTasks];
        newTasks[taskIndex] = { ...target, progress: newProgress };

        const nextState: GameState = {
          ...prev,
          sanity: nextSanity,
          isBurnout: isBurnoutNow,
          activeTasks: newTasks,
          stats: {
            ...prev.stats,
            totalClicks: prev.stats.totalClicks + 1,
            totalSanityLost: prev.stats.totalSanityLost + sanityLost,
            burnoutsSuffered: burnoutsCount,
          },
        };

        return checkAchievements(nextState);
      });
    },
    [clickPower, clickSanityCost, completeTask, checkAchievements]
  );

  // Cancel Active Task
  const cancelTask = useCallback((taskId: string) => {
    setState((prev) => ({
      ...prev,
      activeTasks: prev.activeTasks.filter((t) => t.id !== taskId),
    }));
  }, []);

  // Pet Duck for anti-stress emotional relief
  const lastDuckPetRef = useRef<number>(0);
  const petDuck = useCallback(() => {
    const now = Date.now();
    if (now - lastDuckPetRef.current < 250) return;
    lastDuckPetRef.current = now;
    sound.playDuckQuack();

    setState((prev) => {
      const newSanity = Math.min(maxSanity, prev.sanity + 0.5);
      const isBurnout = prev.isBurnout ? newSanity < 25 : newSanity <= 0;
      return {
        ...prev,
        sanity: newSanity,
        isBurnout,
      };
    });
  }, [maxSanity]);

  // Buy Consumable (Coffee, Pizza, Energy Drink, Desk Nap)
  const buyConsumable = useCallback(
    (consumableId: string): boolean => {
      const item = CONSUMABLES.find((c) => c.id === consumableId);
      if (!item) return false;

      const currentState = stateRef.current;
      if (currentState.salary < item.cost) {
        sound.playErrorBuzz();
        return false;
      }

      sound.playCoffeeDrink();

      setState((prev) => {
        const addedSanity = (maxSanity * item.sanityRestorePercent) / 100;
        const newSanity = Math.min(maxSanity, prev.sanity + addedSanity);
        // Exits burnout if sanity reaches 25 or more
        const isBurnoutNow = prev.isBurnout ? newSanity < 25 : newSanity <= 0;

        const nextState: GameState = {
          ...prev,
          salary: prev.salary - item.cost,
          sanity: newSanity,
          isBurnout: isBurnoutNow,
          stats: {
            ...prev.stats,
            totalCoffeesDrank: prev.stats.totalCoffeesDrank + 1,
          },
        };

        return checkAchievements(nextState);
      });

      return true;
    },
    [maxSanity, checkAchievements]
  );

  // Buy Shop Upgrade
  const buyUpgrade = useCallback(
    (upgradeId: string): boolean => {
      const up = SHOP_UPGRADES.find((u) => u.id === upgradeId);
      if (!up) return false;

      const currentState = stateRef.current;
      const currentLevel = currentState.purchasedUpgrades[upgradeId] || 0;
      if (currentLevel >= up.maxLevel) return false;

      // Calculate price based on level
      const currentPrice = Math.floor(up.cost * Math.pow(up.costMultiplier, currentLevel));

      if (up.currency === 'salary' && currentState.salary < currentPrice) {
        sound.playErrorBuzz();
        return false;
      }
      if (up.currency === 'scrap' && currentState.scrap < currentPrice) {
        sound.playErrorBuzz();
        return false;
      }

      if (upgradeId.startsWith('pet-duck')) {
        sound.playDuckQuack();
      } else {
        sound.playCashChime();
      }

      setState((prev) => {
        const nextSalary = up.currency === 'salary' ? prev.salary - currentPrice : prev.salary;
        const nextScrap = up.currency === 'scrap' ? prev.scrap - currentPrice : prev.scrap;

        const nextPurchased = {
          ...prev.purchasedUpgrades,
          [upgradeId]: currentLevel + 1,
        };

        const nextState: GameState = {
          ...prev,
          salary: nextSalary,
          scrap: nextScrap,
          purchasedUpgrades: nextPurchased,
        };

        return checkAchievements(nextState);
      });

      return true;
    },
    [checkAchievements]
  );

  // Promote to Next Role in Career Ladder
  const promoteRole = useCallback((): boolean => {
    const currentState = stateRef.current;
    if (!nextRole) return false;
    const requiredTasks = currentRole.requiredTasks || 50;
    if (
      currentState.roleXP < currentRole.unlockXP ||
      (currentState.roleTasksCompleted || 0) < requiredTasks
    ) {
      sound.playErrorBuzz();
      return false;
    }

    sound.playPromotion();
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
      });
    } catch {}

    setState((prev) => {
      const nextState: GameState = {
        ...prev,
        currentRoleId: nextRole.id,
        roleXP: 0, // Reset XP for new role
        roleTasksCompleted: 0, // Reset task progression counter for new role
        sanity: maxSanity, // Fully rest
        isBurnout: false,
        activeTasks: [],
        salary: prev.salary + 500, // Promotion bonus
        scrap: prev.scrap + 15,
        stats: {
          ...prev.stats,
          promotionsCount: prev.stats.promotionsCount + 1,
        },
      };

      return checkAchievements(nextState);
    });

    return true;
  }, [nextRole, currentRole, maxSanity, checkAchievements]);

  // Handle Murphy Event Choice
  const handleMurphyChoice = useCallback(
    (choiceIndex: number) => {
      if (!activeMurphyEvent) return;
      const choice: MurphyChoice = activeMurphyEvent.choices[choiceIndex];
      if (!choice) return;

      const roll = Math.random();
      const isSuccess = roll <= choice.successRate;

      let sDelta = choice.sanityDelta;
      let mDelta = choice.salaryDelta;
      let xDelta = choice.xpDelta;
      let scrapDelta = choice.scrapDelta;
      let resultText = isSuccess ? '¡Resolviste la crisis con éxito!' : choice.failureOutcome?.text || 'La situación se complicó más de lo esperado.';

      if (!isSuccess && choice.failureOutcome) {
        sDelta = choice.failureOutcome.sanityDelta;
        mDelta = choice.failureOutcome.salaryDelta;
        xDelta = Math.floor(xDelta * 0.3);
        scrapDelta = Math.floor(scrapDelta * 0.3);
        sound.playErrorBuzz();
      } else {
        sound.playLevelUp();
      }

      const roleXpDelta = Math.min(45, Math.round(xDelta * 0.15));

      setState((prev) => {
        const nextSanity = Math.min(maxSanity, Math.max(0, prev.sanity + sDelta));
        const nextState: GameState = {
          ...prev,
          sanity: nextSanity,
          isBurnout: nextSanity <= 0,
          salary: Math.max(0, prev.salary + mDelta),
          roleXP: Math.max(0, prev.roleXP + roleXpDelta),
          totalXP: prev.totalXP + xDelta,
          scrap: Math.max(0, prev.scrap + scrapDelta),
          stats: {
            ...prev.stats,
            murphyEventsSurvived: prev.stats.murphyEventsSurvived + (isSuccess ? 1 : 0),
          },
        };
        return checkAchievements(nextState);
      });

      setLastMurphyResult({
        title: activeMurphyEvent.title,
        text: resultText,
        success: isSuccess,
      });

      setActiveMurphyEvent(null);
    },
    [activeMurphyEvent, maxSanity, checkAchievements]
  );

  // Minigame bonus reward
  const completeMinigameBonus = useCallback(
    (score: number) => {
      sound.playLevelUp();
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      } catch {}

      const roleXpBonus = Math.min(30, score * 3);
      const totalXpBonus = score * 20;
      const scrapBonus = Math.floor(score * 1.5) + 3;
      const sanityRecovered = Math.min(30, score * 5);

      setState((prev) => ({
        ...prev,
        roleXP: prev.roleXP + roleXpBonus,
        totalXP: prev.totalXP + totalXpBonus,
        scrap: prev.scrap + scrapBonus,
        sanity: Math.min(maxSanity, prev.sanity + sanityRecovered),
        stats: {
          ...prev.stats,
          totalScrapCollected: prev.stats.totalScrapCollected + scrapBonus,
        },
      }));
    },
    [maxSanity]
  );

  const triggerEmergencyMurphy = useCallback(() => {
    const randomEvent = MURPHY_EVENTS[Math.floor(Math.random() * MURPHY_EVENTS.length)];
    setActiveMurphyEvent(randomEvent);
    sound.playMurphyAlert();
  }, []);

  const dismissMurphyResult = useCallback(() => {
    setLastMurphyResult(null);
  }, []);

  const dismissOfflineReport = useCallback(() => {
    setOfflineReport(null);
  }, []);

  const toggleSound = useCallback(() => {
    setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const resetGame = useCallback(() => {
    const fresh = resetGameStorage();
    setState(fresh);
    setActiveMurphyEvent(null);
    setLastMurphyResult(null);
  }, []);

  const value = {
    state,
    currentRole,
    nextRole,
    seniority,
    roleProgressPercent,
    canPromote,
    requiredRoleTasks,
    maxSanity,
    sanityRegenPerSec,
    netSanityPerSec,
    maxConcurrentTasks,
    clickPower,
    clickSanityCost,
    autoClickPower,
    activeMurphyEvent,
    lastMurphyResult,
    offlineReport,
    showTerminalMinigame,
    startTask,
    clickActiveTask,
    petDuck,
    cancelTask,
    buyConsumable,
    buyUpgrade,
    promoteRole,
    handleMurphyChoice,
    dismissMurphyResult,
    dismissOfflineReport,
    toggleSound,
    resetGame,
    setShowTerminalMinigame,
    completeMinigameBonus,
    triggerEmergencyMurphy,
    gitRepoUrl,
    updateGitRepoUrl,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
