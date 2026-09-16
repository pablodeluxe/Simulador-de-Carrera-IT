import React, { useState } from 'react';
import {
  Armchair,
  Keyboard,
  Monitor,
  Headphones,
  Server,
  Sparkles,
  Cat,
  Zap,
  Shield,
  BookOpen,
  Cloud,
  Trello,
  Terminal,
  DollarSign,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { SHOP_UPGRADES } from '../data/shopData';

type ShopCategory = 'all' | 'setup' | 'pet' | 'course';

export const ShopView: React.FC = () => {
  const { state, buyUpgrade } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>('all');

  const filteredUpgrades = SHOP_UPGRADES.filter(
    (up) => selectedCategory === 'all' || up.category === selectedCategory
  );

  return (
    <div className="space-y-6 pb-12">
      
      {/* Shop Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5 sm:p-6 shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              La Tienda del Informático
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs font-semibold text-slate-300">
              Mejoras de Hardware, Mascotas & Cursos
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Optimiza tu Estación de Trabajo
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Invierte tu Sueldo y Chatarra Electrónica para multiplicar tu XP, automatizar tareas y blindar tu cordura contra el temido Burnout.
          </p>
        </div>

        {/* Currency balances summary */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2">
            <div className="text-xs text-slate-400">Tu Sueldo</div>
            <div className="text-base font-mono font-bold text-emerald-400">
              ${Math.floor(state.salary).toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2">
            <div className="text-xs text-slate-400">Tu Chatarra</div>
            <div className="text-base font-mono font-bold text-amber-300">
              ⚙️ {state.scrap}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          Todo el Catálogo
        </button>
        <button
          onClick={() => setSelectedCategory('setup')}
          className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            selectedCategory === 'setup'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          💺 Setup & Ergonomía
        </button>
        <button
          onClick={() => setSelectedCategory('pet')}
          className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            selectedCategory === 'pet'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          🦆 Mascotas de Soporte
        </button>
        <button
          onClick={() => setSelectedCategory('course')}
          className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            selectedCategory === 'course'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          🎓 Cursos & Certificaciones
        </button>
      </div>

      {/* Upgrades Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredUpgrades.map((upgrade) => {
          const currentLevel = state.purchasedUpgrades[upgrade.id] || 0;
          const isMaxLevel = currentLevel >= upgrade.maxLevel;
          const currentPrice = Math.floor(
            upgrade.cost * Math.pow(upgrade.costMultiplier, currentLevel)
          );

          const canAfford =
            upgrade.currency === 'salary'
              ? state.salary >= currentPrice
              : state.scrap >= currentPrice;

          return (
            <div
              key={upgrade.id}
              className={`rounded-2xl border p-5 transition-all duration-200 bg-slate-900/80 backdrop-blur-md flex flex-col justify-between ${
                isMaxLevel
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {upgrade.name}
                  </h3>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border flex-shrink-0 ${
                      isMaxLevel
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : currentLevel > 0
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    Nivel {currentLevel} / {upgrade.maxLevel}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-3.5">
                  {upgrade.description}
                </p>

                {/* Effect Callout */}
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 mb-3.5">
                  <div className="text-xs text-slate-400 font-medium">Efecto:</div>
                  <div className="text-xs sm:text-sm font-bold text-cyan-300">
                    {upgrade.effectDescription}
                  </div>
                </div>
              </div>

              {/* Purchase Footer */}
              <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
                {isMaxLevel ? (
                  <div className="w-full py-2.5 text-center text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-950/30 rounded-xl border border-emerald-500/30 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Nivel Máximo Adquirido</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      {upgrade.currency === 'salary' ? (
                        <div className="text-sm sm:text-base font-mono font-bold text-emerald-400 flex items-center">
                          <DollarSign className="w-4.5 h-4.5" />
                          <span>{currentPrice.toLocaleString()}</span>
                        </div>
                      ) : (
                        <div className="text-sm sm:text-base font-mono font-bold text-amber-300 flex items-center gap-1">
                          <Cpu className="w-4.5 h-4.5" />
                          <span>{currentPrice} Chatarra</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => buyUpgrade(upgrade.id)}
                      disabled={!canAfford}
                      className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer ${
                        canAfford
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {currentLevel === 0 ? 'Comprar Mejora' : 'Mejorar (+1 Nivel)'}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
