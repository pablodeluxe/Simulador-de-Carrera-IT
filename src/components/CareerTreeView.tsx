import React from 'react';
import {
  Crown,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  DollarSign
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ROLES_DATA } from '../data/rolesData';

export const CareerTreeView: React.FC = () => {
  const {
    state,
    currentRole,
    nextRole,
    seniority,
    roleProgressPercent,
    canPromote,
    requiredRoleTasks,
    promoteRole,
  } = useGame();

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Árbol de Evolución IT
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-semibold text-slate-300">
                10 Niveles de Carrera
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              De Técnico Junior a Arquitecto Gurú
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Completa tareas y acumula Experiencia (XP) para ascender de rol. Cada rol requiere al menos 50 tareas finalizadas para forjar tu experiencia laboral.
            </p>
          </div>

          {canPromote && nextRole ? (
            <button
              onClick={promoteRole}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 px-6 py-3 text-sm font-black text-slate-950 hover:from-amber-300 hover:to-emerald-300 transition active:scale-95 shadow-lg shadow-amber-500/20 cursor-pointer animate-bounce"
            >
              <Sparkles className="w-5 h-5" />
              <span>¡ASCENDER AHORA A {nextRole.title.toUpperCase()}!</span>
            </button>
          ) : (
            <div className="text-right space-y-1">
              <div className="text-xs text-slate-400 font-semibold">Requisitos de ascenso:</div>
              <div className="flex flex-col items-end gap-0.5 text-xs font-mono">
                <span className={state.roleXP >= currentRole.unlockXP ? 'text-emerald-400 font-bold' : 'text-cyan-400 font-bold'}>
                  XP: {Math.floor(state.roleXP).toLocaleString()} / {currentRole.unlockXP.toLocaleString()}
                </span>
                <span className={(state.roleTasksCompleted || 0) >= requiredRoleTasks ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  Tareas: {state.roleTasksCompleted || 0} / {requiredRoleTasks}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 mt-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-400 transition-all duration-500"
            style={{ width: `${roleProgressPercent}%` }}
          />
        </div>

        {/* Seniority Badges */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-slate-800/80 text-center">
          <div className={`p-2.5 rounded-xl border ${seniority === 'Junior' ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'bg-slate-950/50 border-slate-800 text-slate-400'}`}>
            <div className="text-xs sm:text-sm font-bold">1. Junior</div>
            <div className="text-xs text-slate-400">0 - 16 tareas del rol</div>
          </div>
          <div className={`p-2.5 rounded-xl border ${seniority === 'Semi-Senior' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-950/50 border-slate-800 text-slate-400'}`}>
            <div className="text-xs sm:text-sm font-bold">2. Semi-Senior</div>
            <div className="text-xs text-slate-400">17 - 33 tareas (Nivel medio)</div>
          </div>
          <div className={`p-2.5 rounded-xl border ${seniority === 'Senior' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-950/50 border-slate-800 text-slate-400'}`}>
            <div className="text-xs sm:text-sm font-bold">3. Senior</div>
            <div className="text-xs text-slate-400">34 - 50 tareas (Listo para ascender)</div>
          </div>
        </div>
      </div>

      {/* ROLES ROADMAP LIST */}
      <div className="space-y-4">
        {ROLES_DATA.map((role) => {
          const isCompleted = state.currentRoleId > role.id;
          const isCurrent = state.currentRoleId === role.id;
          const isLocked = state.currentRoleId < role.id;

          return (
            <div
              key={role.id}
              className={`rounded-2xl border transition-all duration-200 p-4.5 sm:p-5 relative overflow-hidden ${
                isCurrent
                  ? 'border-cyan-400/80 bg-slate-900/90 shadow-lg shadow-cyan-500/10'
                  : isCompleted
                  ? 'border-emerald-500/30 bg-slate-950/60 opacity-90'
                  : 'border-slate-800/80 bg-slate-950/40 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-start gap-3.5">
                  {/* Role Number & Status Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-slate-950 text-base flex-shrink-0 shadow-md ${
                      isCurrent
                        ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950'
                        : ''
                    }`}
                    style={{ backgroundColor: role.color }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-slate-950" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 text-slate-950/70" />
                    ) : (
                      <span className="font-mono font-black">#{role.id}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {role.title}
                      </h3>
                      {isCurrent && (
                        <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                          Rol Actual ({seniority})
                        </span>
                      )}
                      {role.id === 10 && (
                        <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                          <Crown className="w-3.5 h-3.5" />
                          <span>Meta Final Gurú</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{role.department}</p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">{role.description}</p>
                  </div>
                </div>

                {/* Right specs: Salary & XP required */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                  <div className="flex items-center gap-1 text-xs sm:text-sm font-mono font-bold text-emerald-400 bg-emerald-950/30 px-3 py-1 rounded-lg border border-emerald-500/20">
                    <DollarSign className="w-4 h-4" />
                    <span>${role.minSalary.toLocaleString()} - ${role.maxSalary.toLocaleString()}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-300 text-right">
                    <div>Desbloqueo: <strong className="text-cyan-300">{role.unlockXP.toLocaleString()} XP</strong></div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">50 tareas del rol previo</div>
                  </div>
                </div>
              </div>

              {/* Lore quote */}
              <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 italic">
                <span>"{role.lore[0]}"</span>
                <span className="text-slate-400 font-sans not-italic text-xs">
                  {role.tasks.length} Tareas especializadas
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
