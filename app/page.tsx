'use client';

import Link from 'next/link';
import { Guitar } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-900 to-black py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-bold mb-6 leading-tight">
            Tickets for Working People<br />
            <span className="text-red-500">No Box Office Nonsense</span>
          </h2>
          <p className="text-2xl text-zinc-400 mb-10">$1.99 per ticket • Support real artists</p>
          <Link 
            href="/events"
            className="inline-block bg-red-600 hover:bg-red-700 px-14 py-6 rounded-2xl text-2xl font-semibold"
          >
            Find Shows Near You
          </Link>
        </div>
      </section>

      <footer className="py-12 text-center text-zinc-500 border-t border-zinc-800">
        Lowkey Tickets © 2026 • Built for blue-collar America • No box office nonsense
      </footer>
    </div>
  );
}