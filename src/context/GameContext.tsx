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
import { loadGameState, saveGameState, resetGameStorage } from '../utils/storage';
import { sound } from '../utils/audio';

interface GameContextType {
  state: GameState;
  currentRole: RoleDefinition;
  nextRole?: RoleDefinition;
  seniority: SeniorityLevel;
  roleProgressPercent: number;
  maxSanity: number;
  sanityRegenPerSec: number;
  maxConcurrentTasks: number;
  clickPower: number;
  autoClickPower: number;
  activeMurphyEvent: MurphyEvent | null;
  lastMurphyResult: { title: string; text: string; success: boolean } | null;
  offlineReport: { seconds: number; salaryGained: number; sanityRestored: number } | null;
  showTerminalMinigame: boolean;
  
  // Actions
  startTask: (taskDefId: string) => boolean;
  clickActiveTask: (taskId: string) => void;
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

  // Seniority based on roleXP vs unlockXP
  const seniority: SeniorityLevel = useMemo(() => {
    const ratio = state.roleXP / currentRole.unlockXP;
    if (ratio >= 0.66) return 'Senior';
    if (ratio >= 0.33) return 'Semi-Senior';
    return 'Junior';
  }, [state.roleXP, currentRole.unlockXP]);

  const roleProgressPercent = useMemo(() => {
    return Math.min(100, Math.floor((state.roleXP / currentRole.unlockXP) * 100));
  }, [state.roleXP, currentRole.unlockXP]);

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
    let baseSanityRegen = 1.0; // 1% per sec base
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
      if (up.sanityRegenBonus) baseSanityRegen += up.sanityRegenBonus * level;
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
      sanityRegenPerSec: baseSanityRegen,
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
      if (ach.id === 'ach-senior-rank' && (currentState.roleXP / (ROLES_DATA.find(r => r.id === currentState.currentRoleId)?.unlockXP || 1000) >= 0.66)) qualify = true;
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
        roleXP: currentState.roleXP + bonusXP,
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
        const nextState: GameState = {
          ...prev,
          salary: prev.salary + salaryEarned,
          sanity: nextSanity,
          isBurnout: nextSanity <= 0,
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

        // Passive Sanity Regeneration
        let newSanity = prev.sanity;
        if (!prev.isBurnout && prev.sanity < maxSanity) {
          newSanity = Math.min(maxSanity, prev.sanity + sanityRegenPerSec * deltaSeconds);
        } else if (prev.isBurnout && prev.sanity > 25) {
          // Recovering from burnout if above 25%
        }

        const isBurnoutNow = newSanity <= 0;
        let burnoutsCount = prev.stats.burnoutsSuffered;
        if (isBurnoutNow && !prev.isBurnout) {
          burnoutsCount += 1;
          sound.playErrorBuzz();
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

  // Click / Tap Active Task to accelerate
  const clickActiveTask = useCallback(
    (taskId: string) => {
      sound.playKeyClick();

      setState((prev) => {
        const taskIndex = prev.activeTasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) return prev;

        const target = prev.activeTasks[taskIndex];
        const newProgress = target.progress + clickPower;

        if (newProgress >= 100) {
          setTimeout(() => completeTask(taskId), 0);
          return {
            ...prev,
            stats: { ...prev.stats, totalClicks: prev.stats.totalClicks + 1 },
          };
        }

        const newTasks = [...prev.activeTasks];
        newTasks[taskIndex] = { ...target, progress: newProgress };

        return {
          ...prev,
          activeTasks: newTasks,
          stats: { ...prev.stats, totalClicks: prev.stats.totalClicks + 1 },
        };
      });
    },
    [clickPower, completeTask]
  );

  // Cancel Active Task
  const cancelTask = useCallback((taskId: string) => {
    setState((prev) => ({
      ...prev,
      activeTasks: prev.activeTasks.filter((t) => t.id !== taskId),
    }));
  }, []);

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

        const nextState: GameState = {
          ...prev,
          salary: prev.salary - item.cost,
          sanity: newSanity,
          isBurnout: newSanity <= 0,
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
    if (currentState.roleXP < currentRole.unlockXP) {
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

      setState((prev) => {
        const nextSanity = Math.min(maxSanity, Math.max(0, prev.sanity + sDelta));
        const nextState: GameState = {
          ...prev,
          sanity: nextSanity,
          isBurnout: nextSanity <= 0,
          salary: Math.max(0, prev.salary + mDelta),
          roleXP: Math.max(0, prev.roleXP + xDelta),
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

      const xpBonus = score * 25;
      const scrapBonus = Math.floor(score * 1.5) + 3;
      const sanityRecovered = Math.min(30, score * 5);

      setState((prev) => ({
        ...prev,
        roleXP: prev.roleXP + xpBonus,
        totalXP: prev.totalXP + xpBonus,
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
    maxSanity,
    sanityRegenPerSec,
    maxConcurrentTasks,
    clickPower,
    autoClickPower,
    activeMurphyEvent,
    lastMurphyResult,
    offlineReport,
    showTerminalMinigame,
    startTask,
    clickActiveTask,
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
