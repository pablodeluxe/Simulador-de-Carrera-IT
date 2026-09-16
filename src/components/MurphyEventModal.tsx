import React from 'react';
import {
  AlertTriangle,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { useGame } from '../context/GameContext';

export const MurphyEventModal: React.FC = () => {
  const {
    activeMurphyEvent,
    lastMurphyResult,
    handleMurphyChoice,
    dismissMurphyResult,
  } = useGame();

  if (lastMurphyResult) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-4 flex items-center justify-center min-h-full">
        <div className="w-full max-w-md my-auto max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-slate-700 bg-slate-900 p-5 sm:p-6 shadow-2xl text-slate-100 text-center animate-fade-in relative">
          <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-slate-950 border border-slate-800">
            {lastMurphyResult.success ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            ) : (
              <XCircle className="w-8 h-8 text-rose-500" />
            )}
          </div>

          <h3 className="text-base sm:text-lg font-black text-white mb-2">
            {lastMurphyResult.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 mb-6 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 leading-relaxed">
            {lastMurphyResult.text}
          </p>

          <button
            onClick={dismissMurphyResult}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-extrabold text-slate-950 text-xs sm:text-sm hover:from-cyan-400 hover:to-blue-500 transition active:scale-95 cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            Continuar Trabajo
          </button>
        </div>
      </div>
    );
  }

  if (!activeMurphyEvent) return null;

  const severityBadges = {
    low: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    high: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    critical: 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse',
  }[activeMurphyEvent.severity];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-4 flex items-center justify-center min-h-full animate-fade-in">
      <div className="w-full max-w-xl max-h-[92vh] sm:max-h-[88vh] my-auto flex flex-col rounded-3xl border-2 border-rose-500/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-2xl shadow-rose-950/50 text-slate-100 relative overflow-hidden">
        
        {/* Pinned Top Warning Ribbon & Title */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-3.5 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between gap-3 mb-2 sm:mb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 sm:p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
              </div>
              <span className="text-xs font-mono font-black uppercase tracking-wider text-rose-400">
                Ley de Murphy en Producción
              </span>
            </div>
            <span className={`text-xs font-extrabold uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border ${severityBadges}`}>
              Nivel {activeMurphyEvent.severity}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
            {activeMurphyEvent.title}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-rose-300/90 mt-0.5">
            {activeMurphyEvent.subtitle}
          </p>
        </div>

        {/* Scrollable Body: Flavor Text & Strategic Choices */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-300 bg-slate-950/80 p-3.5 sm:p-4 rounded-2xl border border-slate-800/80 leading-relaxed">
            {activeMurphyEvent.flavorText}
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>¿Cómo vas a responder?</span>
              <span className="text-[11px] text-slate-400 normal-case font-normal hidden sm:inline">
                (Usa la rueda o scroll para ver opciones)
              </span>
            </div>

            {activeMurphyEvent.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleMurphyChoice(idx)}
                className="w-full text-left p-3.5 sm:p-4.5 rounded-2xl border border-slate-800 bg-slate-950/90 hover:bg-slate-900 hover:border-cyan-500/60 transition-all duration-150 active:scale-[0.98] group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition">
                      {choice.text}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      {choice.description}
                    </p>
                  </div>

                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 flex-shrink-0">
                    {(choice.successRate * 100).toFixed(0)}% Éxito
                  </span>
                </div>

                {/* Rewards / Costs Preview */}
                <div className="flex items-center gap-3.5 mt-3 pt-2.5 border-t border-slate-800/60 text-xs font-mono flex-wrap">
                  <span className={choice.sanityDelta >= 0 ? 'text-cyan-400 font-bold' : 'text-rose-400 font-bold'}>
                    {choice.sanityDelta >= 0 ? `+${choice.sanityDelta}` : choice.sanityDelta} Cordura
                  </span>
                  <span className="text-cyan-300 font-bold">+{choice.xpDelta} XP</span>
                  <span className={choice.salaryDelta >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {choice.salaryDelta >= 0 ? `+$${choice.salaryDelta}` : `-$${Math.abs(choice.salaryDelta)}`}
                  </span>
                  {choice.scrapDelta > 0 && (
                    <span className="text-amber-400 font-bold">⚙️ +{choice.scrapDelta}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
