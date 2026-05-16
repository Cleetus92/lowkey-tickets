'use client';

import { useEffect, useState } from 'react';
import { Download, Guitar } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallButton(false);
    }
    setDeferredPrompt(null);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Global Header */}
      <header className="border-b border-zinc-800 bg-zinc-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Guitar className="w-9 h-9 text-red-600" />
            <div>
              <h1 className="text-4xl font-bold tracking-tighter text-red-600">LOWKEY TICKETS</h1>
              <p className="text-sm text-zinc-400 -mt-1">Real Music • Real Low Fees</p>
            </div>
          </div>
          
          <nav className="flex gap-8 text-sm font-medium">
            <Link 
              href="/" 
              className={`hover:text-red-500 transition-colors ${isActive('/') ? 'text-red-500' : 'text-zinc-300'}`}
            >
              Home
            </Link>
            <Link 
              href="/events" 
              className={`hover:text-red-500 transition-colors ${isActive('/events') ? 'text-red-500' : 'text-zinc-300'}`}
            >
              All Events
            </Link>
            <Link 
              href="/my-tickets" 
              className={`hover:text-red-500 transition-colors ${isActive('/my-tickets') ? 'text-red-500' : 'text-zinc-300'}`}
            >
              My Tickets
            </Link>
            <Link 
              href="/artist" 
              className={`hover:text-red-500 transition-colors ${isActive('/artist') ? 'text-red-500' : 'text-zinc-300'}`}
            >
              For Artists
            </Link>
            <Link 
              href="/legal" 
              className={`hover:text-red-500 transition-colors ${isActive('/legal') ? 'text-red-500' : 'text-zinc-300'}`}
            >
              Legal
            </Link>
          </nav>
        </div>
      </header>

      {children}

      {/* Install Button */}
      {showInstallButton && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900 border border-red-600 rounded-2xl p-5 shadow-2xl z-50 max-w-[90%] w-full max-w-sm">
          <button
            onClick={handleInstall}
            className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 w-full py-4 rounded-xl text-white font-semibold text-lg"
          >
            <Download className="w-6 h-6" />
            Install Lowkey Tickets
          </button>
          <p className="text-center text-xs text-zinc-400 mt-3">
            Add to home screen for quick access
          </p>
        </div>
      )}
    </>
  );
}