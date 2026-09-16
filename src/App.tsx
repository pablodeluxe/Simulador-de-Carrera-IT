import React, { useState } from 'react';
import {
  Terminal,
  TrendingUp,
  ShoppingBag,
  Trophy,
  Settings,
  Sparkles,
  Flame,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { MainGameView } from './components/MainGameView';
import { CareerTreeView } from './components/CareerTreeView';
import { ShopView } from './components/ShopView';
import { MurphyEventModal } from './components/MurphyEventModal';
import { TerminalMinigameModal } from './components/TerminalMinigameModal';
import { OfflineProgressModal } from './components/OfflineProgressModal';
import { AchievementsModal } from './components/AchievementsModal';
import { SettingsModal } from './components/SettingsModal';
import { OfflineIndicator } from './components/OfflineIndicator';

type NavTab = 'desk' | 'career' | 'shop';

function GameDashboard() {
  const [activeTab, setActiveTab] = useState<NavTab>('desk');
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { state, currentRole, nextRole } = useGame();

  const canPromote = nextRole && state.roleXP >= currentRole.unlockXP;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        onOpenAchievements={() => setShowAchievements(true)}
        onOpenSettings={() => setShowSettings(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-4 pb-24 sm:pb-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3.5 mb-6">
          <nav className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => setActiveTab('desk')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'desk'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-4.5 h-4.5" />
              <span>Estación de Trabajo</span>
            </button>

            <button
              onClick={() => setActiveTab('career')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer relative ${
                activeTab === 'career'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-4.5 h-4.5" />
              <span>Árbol de Carrera</span>
              {canPromote && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping absolute -top-1 -right-1" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('shop')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'shop'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <span>La Tienda</span>
            </button>
          </nav>

          {/* Role Status Reminder */}
          <div className="hidden md:flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-mono">
            <span>Rol #{currentRole.id}:</span>
            <span className="text-cyan-300 font-bold">{currentRole.title}</span>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'desk' && (
          <MainGameView onNavigateToCareer={() => setActiveTab('career')} />
        )}

        {activeTab === 'career' && <CareerTreeView />}

        {activeTab === 'shop' && <ShopView />}
      </main>

      {/* Mobile Floating Bottom Bar for Ergonomic One-Hand Gameplay */}
      <div className="fixed bottom-0 inset-x-0 sm:hidden z-40 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-lg px-4 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('desk')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition ${
            activeTab === 'desk' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Terminal className="w-5 h-5" />
          <span className="text-[10px]">Estación</span>
        </button>

        <button
          onClick={() => setActiveTab('career')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition relative ${
            activeTab === 'career' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px]">Carrera</span>
          {canPromote && (
            <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1 right-2" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('shop')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition ${
            activeTab === 'shop' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px]">Tienda</span>
        </button>
      </div>

      {/* Global Modals */}
      <MurphyEventModal />
      <TerminalMinigameModal />
      <OfflineProgressModal />
      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
      />
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Offline Status Indicator */}
      <OfflineIndicator />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameDashboard />
    </GameProvider>
  );
}
