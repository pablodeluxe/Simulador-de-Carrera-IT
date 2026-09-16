import React from 'react';
import {
  Brain,
  DollarSign,
  Cpu,
  Volume2,
  VolumeX,
  Trophy,
  Settings,
  AlertOctagon,
  Flame,
  Coffee,
  Sparkles,
  Github
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onOpenAchievements: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAchievements,
  onOpenSettings,
}) => {
  const {
    state,
    currentRole,
    seniority,
    maxSanity,
    netSanityPerSec,
    buyConsumable,
    toggleSound,
    setShowTerminalMinigame,
    gitRepoUrl,
  } = useGame();

  const sanityPercent = Math.min(100, Math.max(0, Math.round((state.sanity / maxSanity) * 100)));

  // Seniority badge color
  const seniorityColors = {
    Junior: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    'Semi-Senior': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    Senior: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  }[seniority];

  const isLowSanity = state.sanity < maxSanity * 0.25;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-3 sm:px-6 py-2.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Role, Seniority & Level */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-950 shadow-md flex-shrink-0"
            style={{ backgroundColor: currentRole.color }}
          >
            <span className="font-mono text-xs font-black">#{currentRole.id}</span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider text-cyan-400">
                Simulador de Carrera IT
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-base sm:text-lg font-extrabold text-white truncate">
                {currentRole.title}
              </h1>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${seniorityColors}`}>
                {seniority}
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate hidden sm:block">
              {currentRole.department}
            </p>
          </div>
        </div>

        {/* Center: Sanity (Cordura) Energy Bar */}
        <div className="flex-1 max-w-xs min-w-[140px] sm:min-w-[180px] order-3 sm:order-2">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <div className="flex items-center gap-1">
              {state.isBurnout ? (
                <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
              ) : (
                <Brain className={`w-4 h-4 ${isLowSanity ? 'text-amber-400 animate-pulse' : 'text-cyan-400'}`} />
              )}
              <span className={state.isBurnout ? 'text-rose-400 font-bold' : isLowSanity ? 'text-amber-300' : 'text-slate-300'}>
                {state.isBurnout ? '¡BURNOUT TOTAL!' : 'Cordura'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-slate-300">
              <span>{Math.round(state.sanity)} / {maxSanity}</span>
              {!state.isBurnout && (
                <span className={`text-[10px] font-bold px-1 py-0.2 rounded ${
                  netSanityPerSec >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                }`}>
                  {netSanityPerSec >= 0 ? `+${netSanityPerSec}/s` : `${netSanityPerSec}/s`}
                </span>
              )}
            </div>
          </div>

          {/* Progress track */}
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60 relative">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                state.isBurnout
                  ? 'bg-rose-600 animate-pulse'
                  : isLowSanity
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                  : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
              }`}
              style={{ width: `${sanityPercent}%` }}
            />
          </div>

          {/* Quick Coffee emergency button if low */}
          {isLowSanity && state.salary >= 15 && (
            <button
              onClick={() => buyConsumable('coffee')}
              className="mt-1 w-full flex items-center justify-center gap-1 text-xs font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 rounded-lg py-1 transition cursor-pointer"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>Café de Emergencia ($15)</span>
            </button>
          )}
        </div>

        {/* Right: Currencies ($ Sueldo & ⚙️ Chatarra) + Controls */}
        <div className="flex items-center gap-2 sm:gap-3 order-2 sm:order-3">
          {/* Sueldo */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-xl px-2.5 py-1.5 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="text-right">
              <div className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                ${Math.floor(state.salary).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 leading-none">Sueldo</div>
            </div>
          </div>

          {/* Chatarra Electrónica */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-xl px-2.5 py-1.5 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="text-right">
              <div className="text-sm sm:text-base font-bold font-mono text-amber-300">
                {state.scrap}
              </div>
              <div className="text-[11px] text-slate-400 leading-none">Chatarra</div>
            </div>
          </div>

          {/* Duck Minigame Trigger */}
          <button
            onClick={() => setShowTerminalMinigame(true)}
            title="Rubber Duck Debugger (Minijuego)"
            className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25 transition cursor-pointer relative"
          >
            <span className="text-sm">🦆</span>
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </button>

          {/* Trophies / Achievements */}
          <button
            onClick={onOpenAchievements}
            title="Logros y Trofeos"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition cursor-pointer relative"
          >
            <Trophy className="w-4 h-4" />
            {state.unlockedAchievements.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                {state.unlockedAchievements.length}
              </span>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={state.soundEnabled ? 'Silenciar Efectos' : 'Activar Sonido'}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition cursor-pointer"
          >
            {state.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            title="Configuración y Estadísticas"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Git Repository Link */}
          <a
            href={gitRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Repositorio Git (Código Fuente)"
            aria-label="Repositorio Git"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition cursor-pointer flex items-center justify-center group"
          >
            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>

          {/* PWA Install Button */}
          <PWAInstallButton />
        </div>
      </div>
    </header>
  );
};
