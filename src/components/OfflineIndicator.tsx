import React, { useEffect, useState } from 'react';
import { WifiOff, CheckCircle } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3000);
      return () => clearTimeout(timer);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (showReconnected) {
    return (
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-emerald-600/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white shadow-lg border border-emerald-400/30 animate-fade-in">
        <CheckCircle className="w-4 h-4 text-emerald-200" />
        <span>Conexión restablecida</span>
      </div>
    );
  }

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-amber-500/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-lg border border-amber-300/40">
      <WifiOff className="w-4 h-4 text-slate-950 animate-pulse" />
      <span>Modo Offline — Tu progreso se guarda localmente</span>
    </div>
  );
};
