import React, { useState } from 'react';
import {
  Settings,
  X,
  Volume2,
  VolumeX,
  RotateCcw,
  Download,
  Upload,
  BarChart3,
  Check,
  AlertTriangle,
  Github,
  ExternalLink,
  GitBranch,
  Edit2
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { exportSaveGame, importSaveGame, DEFAULT_GIT_REPO_URL } from '../utils/storage';
import { APP_VERSION } from '../utils/version';

export const SettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { state, toggleSound, resetGame, gitRepoUrl, updateGitRepoUrl } = useGame();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [copiedExport, setCopiedExport] = useState(false);
  const [editingRepoUrl, setEditingRepoUrl] = useState(false);
  const [tempRepoUrl, setTempRepoUrl] = useState(gitRepoUrl);

  if (!isOpen) return null;

  const handleExport = () => {
    const json = exportSaveGame(state);
    navigator.clipboard.writeText(json);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2500);
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const result = importSaveGame(importJsonText);
    if (result) {
      window.location.reload();
    } else {
      alert('Error: El formato JSON de guardado es inválido.');
    }
  };

  const minutesPlayed = Math.floor(state.stats.timePlayedSeconds / 60);
  const hoursPlayed = Math.floor(minutesPlayed / 60);
  const displayPlaytime = hoursPlayed > 0 ? `${hoursPlayed}h ${minutesPlayed % 60}m` : `${minutesPlayed}m`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-4 flex items-center justify-center min-h-full animate-fade-in">
      <div className="w-full max-w-xl my-auto max-h-[90vh] rounded-3xl border border-slate-800 bg-slate-950 p-5 sm:p-6 shadow-2xl text-slate-100 flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-900 text-slate-300 border border-slate-800">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Configuración
                </h3>
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                  {APP_VERSION}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Opciones de juego, datos de guardado y métricas de carrera
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-5 py-4 pr-1">
          
          {/* Audio Setting */}
          <div className="p-4.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              {state.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-cyan-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-500" />
              )}
              <div>
                <div className="text-sm sm:text-base font-bold text-white">Efectos de Sonido</div>
                <div className="text-xs text-slate-400">Teclas mecánicas, fanfarrias y alertas</div>
              </div>
            </div>

            <button
              onClick={toggleSound}
              className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                state.soundEnabled
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {state.soundEnabled ? 'Activado' : 'Silenciado'}
            </button>
          </div>

          {/* Career Statistics */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
              <BarChart3 className="w-4.5 h-4.5 text-cyan-400" />
              <span>Estadísticas de Carrera</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs text-slate-400 font-sans">Tareas Completadas</div>
                <div className="text-sm sm:text-base font-bold text-cyan-400">{state.stats.totalTasksCompleted}</div>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs text-slate-400 font-sans">Clics de Aceleración</div>
                <div className="text-sm sm:text-base font-bold text-cyan-400">{state.stats.totalClicks}</div>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs text-slate-400 font-sans">Sueldo Histórico</div>
                <div className="text-sm sm:text-base font-bold text-emerald-400">${Math.floor(state.stats.totalSalaryEarned).toLocaleString()}</div>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs text-slate-400 font-sans">Chatarra Recolectada</div>
                <div className="text-sm sm:text-base font-bold text-amber-300">⚙️ {state.stats.totalScrapCollected}</div>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs text-slate-400 font-sans">Cafés Tomados</div>
                <div className="text-sm sm:text-base font-bold text-amber-400">☕ {state.stats.totalCoffeesDrank}</div>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs text-slate-400 font-sans">Episodios de Burnout</div>
                <div className="text-sm sm:text-base font-bold text-rose-400">🔥 {state.stats.burnoutsSuffered}</div>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs text-slate-400 font-sans">Crisis de Murphy Superadas</div>
                <div className="text-sm sm:text-base font-bold text-purple-400">⚡ {state.stats.murphyEventsSurvived}</div>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs text-slate-400 font-sans">Ascensos Logrados</div>
                <div className="text-sm sm:text-base font-bold text-emerald-300">🏆 {state.stats.promotionsCount}</div>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs text-slate-400 font-sans">Tiempo de Servicio</div>
                <div className="text-sm sm:text-base font-bold text-slate-300">{displayPlaytime}</div>
              </div>
            </div>
          </div>

          {/* Save Data Management (Backup / Restore) */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Gestión de Partida Local
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                {copiedExport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copiedExport ? '¡Copiado al Portapapeles!' : 'Exportar Partida (JSON)'}</span>
              </button>

              <button
                onClick={() => setShowImportBox(!showImportBox)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Importar Partida</span>
              </button>
            </div>

            {showImportBox && (
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 mt-2">
                <textarea
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Pega aquí el código JSON de tu partida guardada..."
                  className="w-full h-20 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500 resize-none"
                />
                <button
                  onClick={handleImport}
                  className="w-full py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition cursor-pointer"
                >
                  Restaurar Partida
                </button>
              </div>
            )}
          </div>

          {/* Git Repository Link & Configuration */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Github className="w-4 h-4 text-cyan-400" />
                <span>Repositorio Git & Código Abierto</span>
              </div>
              <button
                onClick={() => {
                  setTempRepoUrl(gitRepoUrl);
                  setEditingRepoUrl(!editingRepoUrl);
                }}
                className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>{editingRepoUrl ? 'Cancelar' : 'Cambiar URL'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                    <GitBranch className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-200">Repositorio del Juego</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[240px] sm:max-w-xs font-mono">
                      {gitRepoUrl}
                    </div>
                  </div>
                </div>

                <a
                  href={gitRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition cursor-pointer"
                >
                  <span>Abrir Repositorio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {editingRepoUrl && (
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <label className="text-[11px] text-slate-400 block">
                    Personalizar URL del repositorio Git:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={tempRepoUrl}
                      onChange={(e) => setTempRepoUrl(e.target.value)}
                      placeholder="https://github.com/tu-usuario/tu-repo"
                      className="flex-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={() => {
                        updateGitRepoUrl(tempRepoUrl);
                        setEditingRepoUrl(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition cursor-pointer"
                    >
                      Guardar
                    </button>
                  </div>
                  {gitRepoUrl !== DEFAULT_GIT_REPO_URL && (
                    <button
                      onClick={() => {
                        updateGitRepoUrl(DEFAULT_GIT_REPO_URL);
                        setTempRepoUrl(DEFAULT_GIT_REPO_URL);
                        setEditingRepoUrl(false);
                      }}
                      className="text-[11px] text-slate-500 hover:text-slate-400 underline cursor-pointer"
                    >
                      Restablecer a URL original
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Reset Save Data */}
          <div className="pt-2 border-t border-slate-800">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 p-2 rounded-xl hover:bg-rose-950/30 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Partida desde Cero</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>¿Estás seguro de reiniciar todo tu progreso?</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      resetGame();
                      setShowResetConfirm(false);
                      onClose();
                    }}
                    className="flex-1 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition cursor-pointer"
                  >
                    Sí, Reiniciar Todo
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
