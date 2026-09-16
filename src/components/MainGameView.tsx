import React, { useState } from 'react';
import {
  Play,
  Zap,
  Coffee,
  Utensils,
  Moon,
  AlertTriangle,
  Flame,
  CheckCircle2,
  X,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Terminal,
  MousePointerClick
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { CONSUMABLES } from '../data/shopData';
import { sound } from '../utils/audio';

export const MainGameView: React.FC<{ onNavigateToCareer: () => void }> = ({
  onNavigateToCareer,
}) => {
  const {
    state,
    currentRole,
    nextRole,
    seniority,
    roleProgressPercent,
    canPromote,
    requiredRoleTasks,
    maxConcurrentTasks,
    clickPower,
    autoClickPower,
    startTask,
    clickActiveTask,
    cancelTask,
    buyConsumable,
    setShowTerminalMinigame,
    triggerEmergencyMurphy,
  } = useGame();

  const [clickedTaskId, setClickedTaskId] = useState<string | null>(null);
  const [duckBounces, setDuckBounces] = useState(0);

  const handleTaskClick = (taskId: string) => {
    clickActiveTask(taskId);
    setClickedTaskId(taskId);
    setTimeout(() => setClickedTaskId(null), 150);
  };

  const handleDuckClick = () => {
    sound.playDuckQuack();
    setDuckBounces((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Burnout Warning Banner */}
      {state.isBurnout && (
        <div className="rounded-2xl border-2 border-rose-500/80 bg-rose-950/40 p-4 shadow-xl shadow-rose-900/20 backdrop-blur-md animate-pulse">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
                <Flame className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-rose-300">
                  ¡ESTADO DE BURNOUT ACTIVO!
                </h3>
                <p className="text-xs text-rose-200/80">
                  Tu cordura llegó a 0. La velocidad de las tareas está reducida al 35%. ¡Toma café o descansa urgente!
                </p>
              </div>
            </div>

            <button
              onClick={() => buyConsumable('coffee')}
              disabled={state.salary < 15}
              className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Coffee className="w-4 h-4" />
              <span>Café de Urgencia ($15)</span>
            </button>
          </div>
        </div>
      )}

      {/* Promotion Available Banner */}
      {canPromote && nextRole && (
        <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-emerald-500/20 p-4 shadow-xl shadow-amber-500/10 backdrop-blur-md flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-amber-300">
                ¡ASCENSO PROFESIONAL DISPONIBLE!
              </h3>
              <p className="text-xs text-slate-300">
                Completaste las {requiredRoleTasks} tareas y alcanzaste los {currentRole.unlockXP.toLocaleString()} XP para ascender a <strong className="text-amber-200">{nextRole.title}</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToCareer}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 hover:from-amber-300 hover:to-yellow-300 transition active:scale-95 shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <span>Ver Árbol de Carrera & Ascender</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Career Progress Mini Tracker */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4.5 backdrop-blur-md shadow-md space-y-3">
        <div className="flex items-center justify-between text-sm font-bold flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-200">Progreso del Rol ({currentRole.title}):</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Rango: {seniority}
            </span>
          </div>
          <button
            onClick={onNavigateToCareer}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>Árbol de Carrera</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dual Progress Bars: XP & Tasks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span>Experiencia (XP):</span>
              <span className="text-cyan-400 font-bold">
                {Math.floor(state.roleXP).toLocaleString()} / {currentRole.unlockXP.toLocaleString()} XP
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{
                  width: `${Math.min(100, Math.floor((state.roleXP / currentRole.unlockXP) * 100))}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span>Tareas del Rol:</span>
              <span className="text-emerald-400 font-bold">
                {state.roleTasksCompleted || 0} / {requiredRoleTasks} tareas
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                style={{
                  width: `${Math.min(100, Math.floor(((state.roleTasksCompleted || 0) / requiredRoleTasks) * 100))}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE TASKS SECTION */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-4.5 h-4.5 text-cyan-400" />
            <span>Tareas en Ejecución ({state.activeTasks.length} / {maxConcurrentTasks})</span>
          </h2>
          {autoClickPower > 0 && (
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              🐱 Gato programador activo (+{autoClickPower} auto-clics/s)
            </span>
          )}
        </div>

        {state.activeTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center">
            <p className="text-sm text-slate-300 font-medium">
              No tienes ninguna tarea en curso. Selecciona una tarea abajo para comenzar a ganar XP y Sueldo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {state.activeTasks.map((activeTask) => {
              const taskDef = currentRole.tasks.find((t) => t.id === activeTask.taskDefId);
              if (!taskDef) return null;
              const isClicked = clickedTaskId === activeTask.id;

              return (
                <div
                  key={activeTask.id}
                  className={`rounded-2xl border transition-all duration-150 p-4.5 bg-slate-900/90 backdrop-blur-md shadow-lg relative overflow-hidden ${
                    isClicked
                      ? 'border-cyan-400 scale-[1.01] shadow-cyan-500/20'
                      : 'border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-white truncate">
                        {taskDef.title}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                        {taskDef.description}
                      </p>
                    </div>

                    <button
                      onClick={() => cancelTask(activeTask.id)}
                      title="Cancelar Tarea"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-xs font-mono text-slate-300">
                      <span>Progreso</span>
                      <span className="font-bold text-cyan-400">
                        {Math.floor(activeTask.progress)}%
                      </span>
                    </div>
                    <div className="w-full h-4 bg-slate-950 rounded-full p-0.5 border border-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-150"
                        style={{ width: `${Math.min(100, activeTask.progress)}%` }}
                      />
                    </div>
                  </div>

                  {/* Rewards preview & Click-to-speed-up button */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                      <span className="text-cyan-300 font-semibold">+{taskDef.baseXP} XP</span>
                      <span className="text-emerald-400 font-semibold">+${taskDef.baseSalaryReward}</span>
                      <span className="text-amber-400">⚙️ {(taskDef.scrapChance * 100).toFixed(0)}%</span>
                    </div>

                    <button
                      onClick={() => handleTaskClick(activeTask.id)}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-2 text-xs sm:text-sm font-extrabold text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition active:scale-95 shadow-md shadow-cyan-500/20 cursor-pointer"
                    >
                      <MousePointerClick className="w-4 h-4" />
                      <span>¡Acelerar! (+{Math.round(clickPower)}%)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AVAILABLE TASKS FOR CURRENT ROLE */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-4.5 h-4.5 text-amber-400" />
            <span>Tareas Disponibles ({currentRole.title})</span>
          </h2>
          <span className="text-xs text-slate-400">
            Costo en Cordura se recupera pasivamente o con Café
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {currentRole.tasks.map((task) => {
            const isSeniorityLocked =
              task.requiredSeniority === 'Senior'
                ? seniority !== 'Senior'
                : task.requiredSeniority === 'Semi-Senior'
                ? seniority === 'Junior'
                : false;

            const isAlreadyActive = state.activeTasks.some((t) => t.taskDefId === task.id);
            const isSlotsFull = state.activeTasks.length >= maxConcurrentTasks;
            const notEnoughSanity = state.sanity < task.baseSanityCost && !state.isBurnout;

            return (
              <div
                key={task.id}
                className={`rounded-2xl border p-5 transition-all duration-200 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between ${
                  isSeniorityLocked
                    ? 'border-slate-800 opacity-60'
                    : isAlreadyActive
                    ? 'border-cyan-500/40 bg-cyan-950/15'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                      {task.title}
                    </h3>
                    {task.requiredSeniority && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
                        {task.requiredSeniority}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mb-3.5 line-clamp-2">
                    {task.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2.5 border-t border-slate-800/80">
                  {/* Task Specs */}
                  <div className="grid grid-cols-4 gap-1.5 text-center bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/60">
                    <div>
                      <div className="text-[10px] text-slate-400">Tiempo</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-slate-200">{task.durationSeconds}s</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Cordura</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-rose-400">-{task.baseSanityCost}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Exp (XP)</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-cyan-400">+{task.baseXP}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Sueldo</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-emerald-400">+${task.baseSalaryReward}</div>
                    </div>
                  </div>

                  {/* Start Button */}
                  {isSeniorityLocked ? (
                    <div className="w-full text-center py-2.5 text-xs font-semibold text-slate-400 bg-slate-950/40 rounded-xl border border-slate-800">
                      Requiere rango {task.requiredSeniority}
                    </div>
                  ) : isAlreadyActive ? (
                    <div className="w-full text-center py-2.5 text-xs sm:text-sm font-bold text-cyan-400 bg-cyan-950/40 rounded-xl border border-cyan-500/30 flex items-center justify-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span>En Ejecución...</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => startTask(task.id)}
                      disabled={isSlotsFull || notEnoughSanity}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 py-2.5 text-xs sm:text-sm font-bold transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current text-cyan-400" />
                      <span>
                        {isSlotsFull
                          ? 'Ranuras de Tareas Llenas'
                          : notEnoughSanity
                          ? 'Falta Cordura (Toma Café)'
                          : 'Comenzar Tarea'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUICK CONSUMABLES RECHARGE BAR */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4.5 backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Coffee className="w-4.5 h-4.5 text-amber-400" />
            <span>Cafetería & Recuperación de Cordura</span>
          </h3>
          <span className="text-xs text-slate-400">Restaura energía de inmediato</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CONSUMABLES.map((item) => {
            const canAfford = state.salary >= item.cost;
            return (
              <button
                key={item.id}
                onClick={() => buyConsumable(item.id)}
                disabled={!canAfford}
                className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  canAfford
                    ? 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 cursor-pointer active:scale-95'
                    : 'bg-slate-950/40 border-slate-900 opacity-50 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-lg">{item.id === 'coffee' ? '☕' : item.id === 'fast-food' ? '🍕' : item.id === 'energy-drink' ? '⚡' : '😴'}</span>
                    <span className="text-xs font-bold text-cyan-400">+{item.sanityRestorePercent}%</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white truncate">{item.name}</div>
                </div>
                <div className="mt-2.5 text-xs sm:text-sm font-mono font-bold text-emerald-400">
                  ${item.cost}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE DESK GADGETS & RUBBER DUCK */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3.5">
        <div className="flex items-center gap-3.5">
          <button
            onClick={handleDuckClick}
            className={`w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-3xl transition transform active:scale-90 cursor-pointer ${
              duckBounces % 2 === 1 ? 'animate-bounce' : ''
            }`}
            title="¡Haz clic en el Pato de Goma!"
          >
            🦆
          </button>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
              <span>Pato de Goma (Rubber Duck Debugger)</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Haz clic para cuaquear o abre el minijuego de terminal para ganar Chatarra y Cordura.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowTerminalMinigame(true)}
            className="flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 px-4 py-2.5 text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>Terminal Minigame</span>
          </button>

          <button
            onClick={triggerEmergencyMurphy}
            title="Probar una crisis de la Ley de Murphy"
            className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 px-3.5 py-2.5 text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden sm:inline">Invocar Crisis</span>
          </button>
        </div>
      </div>
    </div>
  );
};
