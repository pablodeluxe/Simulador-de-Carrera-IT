import React from 'react';
import { Moon, DollarSign, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const OfflineProgressModal: React.FC = () => {
  const { offlineReport, dismissOfflineReport } = useGame();

  if (!offlineReport) return null;

  const minutes = Math.floor(offlineReport.seconds / 60);
  const hours = Math.floor(minutes / 60);
  const displayTime =
    hours > 0
      ? `${hours}h ${minutes % 60}m`
      : `${minutes}m ${offlineReport.seconds % 60}s`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-4 flex items-center justify-center min-h-full animate-fade-in">
      <div className="w-full max-w-md my-auto max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-cyan-500/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-5 sm:p-7 shadow-2xl text-slate-100 text-center relative">
        
        {/* Glow effect */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="mx-auto w-16 h-16 rounded-3xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-3xl mb-4 text-cyan-400">
          <Moon className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
          ¡Bienvenido de Vuelta!
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
          Estuviste ausente durante <strong className="text-cyan-300">{displayTime}</strong>. Tus sistemas continuaron generando ingresos pasivos y recuperando energía.
        </p>

        {/* Recap Cards */}
        <div className="grid grid-cols-2 gap-3.5 mb-6 font-mono">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 font-sans mb-1">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Sueldo Acumulado</span>
            </div>
            <div className="text-base sm:text-xl font-bold text-emerald-400">
              +${offlineReport.salaryGained.toLocaleString()}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 font-sans mb-1">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span>Cordura Descansada</span>
            </div>
            <div className="text-base sm:text-xl font-bold text-cyan-400">
              +{offlineReport.sanityRestored}
            </div>
          </div>
        </div>

        <button
          onClick={dismissOfflineReport}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm sm:text-base hover:from-cyan-400 hover:to-blue-500 transition active:scale-95 shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          Volver a la Oficina
        </button>
      </div>
    </div>
  );
};
