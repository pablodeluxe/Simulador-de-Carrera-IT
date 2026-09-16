import React, { useState, useEffect } from 'react';
import {
  Terminal,
  X,
  Sparkles,
  Zap,
  CheckCircle2,
  Bug,
  Timer
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';

const COMMAND_CHALLENGES = [
  { prompt: 'Un bug de memoria está consumiendo RAM en producción:', cmd: 'pkill -9 -f leaky_service', desc: 'Matar proceso rebelde' },
  { prompt: 'El commit rompió el build principal:', cmd: 'git reset --hard HEAD~1', desc: 'Rollback inmediato' },
  { prompt: 'El servidor web Nginx no responde en el puerto 80:', cmd: 'sudo systemctl restart nginx', desc: 'Reiniciar demonio' },
  { prompt: 'Un índice de base de datos está bloqueando lecturas:', cmd: 'REINDEX TABLE CONCURRENTLY users;', desc: 'Reconstruir índices' },
  { prompt: 'Un contenedor Docker se quedó colgado en loop:', cmd: 'docker restart app_backend_prod', desc: 'Reiniciar contenedor' },
  { prompt: 'El pipeline de CI falló por caché corrupta de NPM:', cmd: 'npm cache clean --force', desc: 'Purgar caché de paquetes' },
  { prompt: 'La tabla temporal de logs llenó el disco al 100%:', cmd: 'truncate -s 0 /var/log/syslog', desc: 'Liberar espacio' },
  { prompt: 'El pato de goma te recuerda la regla de oro:', cmd: 'echo "It works on my machine!"', desc: 'Frase sagrada' }
];

export const TerminalMinigameModal: React.FC = () => {
  const {
    showTerminalMinigame,
    setShowTerminalMinigame,
    completeMinigameBonus,
  } = useGame();

  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [typedInput, setTypedInput] = useState('');
  const [activeOptions, setActiveOptions] = useState<string[]>([]);

  const startMinigame = () => {
    setScore(0);
    setTimeLeft(20);
    setCurrentIdx(0);
    setTypedInput('');
    setGameState('playing');
    sound.playKeyClick();
  };

  // Setup options whenever current index changes
  useEffect(() => {
    if (gameState !== 'playing') return;
    const target = COMMAND_CHALLENGES[currentIdx % COMMAND_CHALLENGES.length];
    
    // Pick 3 decoys
    const decoys = COMMAND_CHALLENGES
      .filter((c) => c.cmd !== target.cmd)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((c) => c.cmd);

    const shuffled = [target.cmd, ...decoys].sort(() => 0.5 - Math.random());
    setActiveOptions(shuffled);
  }, [currentIdx, gameState]);

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const handleCommandPick = (chosenCmd: string) => {
    const target = COMMAND_CHALLENGES[currentIdx % COMMAND_CHALLENGES.length];
    if (chosenCmd === target.cmd) {
      sound.playLevelUp();
      setScore((s) => s + 1);
      setCurrentIdx((idx) => idx + 1);
    } else {
      sound.playErrorBuzz();
      setTimeLeft((t) => Math.max(1, t - 2)); // 2s penalty
    }
  };

  const handleFinish = () => {
    completeMinigameBonus(score);
    setShowTerminalMinigame(false);
    setGameState('intro');
  };

  if (!showTerminalMinigame) return null;

  const currentChallenge = COMMAND_CHALLENGES[currentIdx % COMMAND_CHALLENGES.length];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-4 flex items-center justify-center min-h-full animate-fade-in">
      <div className="w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] my-auto flex flex-col rounded-3xl border-2 border-cyan-500/60 bg-slate-950 p-5 sm:p-6 shadow-2xl shadow-cyan-950/40 text-slate-100 relative overflow-hidden font-mono">
        
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <span className="text-xs font-bold text-cyan-400 ml-2">
              bash — rubber-duck-debug.sh
            </span>
          </div>

          <button
            onClick={() => setShowTerminalMinigame(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto pr-1">
          {gameState === 'intro' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-4xl mx-auto">
                🦆
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
                  Rubber Duck Debugging
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1.5 max-w-sm mx-auto">
                  Resuelve la mayor cantidad de emergencias de terminal antes de que se acabe el tiempo para ganar Chatarra Electrónica y restaurar tu Cordura.
                </p>
              </div>

              <button
                onClick={startMinigame}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-sans font-extrabold text-sm hover:from-cyan-400 hover:to-blue-500 transition active:scale-95 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Iniciar Sesión de Debugging
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="space-y-4">
              {/* HUD */}
              <div className="flex items-center justify-between text-xs sm:text-sm bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Timer className="w-4.5 h-4.5 animate-spin" />
                  <span>{timeLeft}s restantes</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Bug className="w-4.5 h-4.5" />
                  <span>{score} Bugs Resueltos</span>
                </div>
              </div>

              {/* Prompt */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="text-xs text-cyan-400 font-bold">
                  $ EMERGENCIA #{currentIdx + 1}:
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  {currentChallenge.prompt}
                </div>
              </div>

              {/* Command Options */}
              <div className="space-y-2.5">
                <div className="text-xs text-slate-400 uppercase tracking-wider">
                  Selecciona el comando correcto:
                </div>

                {activeOptions.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCommandPick(cmd)}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800/90 hover:border-cyan-400/60 text-xs sm:text-sm text-cyan-300 font-mono transition active:scale-98 cursor-pointer flex items-center justify-between"
                  >
                    <span className="truncate">&gt; {cmd}</span>
                    <span className="text-xs text-slate-400 ml-2 font-sans font-semibold">
                      [Ejecutar]
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameState === 'completed' && (
            <div className="text-center py-4 space-y-4 font-sans">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  ¡Sesión de Debugging Finalizada!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Resolviste con éxito <strong className="text-emerald-400">{score} emergencias</strong>.
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-around text-center font-mono">
                <div>
                  <div className="text-xs text-slate-400">Exp Ganada</div>
                  <div className="text-sm sm:text-base font-bold text-cyan-400">+{score * 25} XP</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Chatarra</div>
                  <div className="text-sm sm:text-base font-bold text-amber-300">⚙️ +{Math.floor(score * 1.5) + 3}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Cordura</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-400">+{Math.min(30, score * 5)}</div>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm sm:text-base hover:from-emerald-400 hover:to-cyan-400 transition active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                Reclamar Recompensas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
