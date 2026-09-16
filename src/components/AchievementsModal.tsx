import React from 'react';
import {
  Trophy,
  X,
  CheckCircle2,
  Lock,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData';

export const AchievementsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { state } = useGame();

  if (!isOpen) return null;

  const unlockedCount = state.unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS_DATA.length;
  const percent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-4 flex items-center justify-center min-h-full animate-fade-in">
      <div className="w-full max-w-2xl my-auto max-h-[88vh] rounded-3xl border border-slate-800 bg-slate-950 p-5 sm:p-6 shadow-2xl text-slate-100 flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Logros & Trofeos Profesionales
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {unlockedCount} de {totalCount} desbloqueados ({percent}%)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden my-4">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Scrollable Achievements list */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
          {ACHIEVEMENTS_DATA.map((ach) => {
            const isUnlocked = state.unlockedAchievements.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-amber-500/40 shadow-sm'
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {isUnlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm sm:text-base font-bold truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {ach.title}
                    </h4>
                    <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 font-semibold">
                      <span>+{ach.xpReward} XP</span>
                      <span className="text-emerald-400">+${ach.salaryReward}</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
