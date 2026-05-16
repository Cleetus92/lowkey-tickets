'use client';

import { Calendar, MapPin, Guitar } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Guitar className="w-9 h-9 text-red-600" />
            <div>
              <h1 className="text-4xl font-bold tracking-tighter">LOWKEY TICKETS</h1>
              <p className="text-sm text-zinc-400 -mt-1">Real Music • Real Low Fees</p>
            </div>
          </div>
          <nav className="flex gap-8 text-sm font-medium">
            <Link href="/" className="text-red-500">Home</Link>
            <Link href="/events" className="hover:text-red-500">All Events</Link>
            <Link href="/my-tickets" className="hover:text-red-500">My Tickets</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-900 to-black py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-bold mb-6 leading-tight">
            Tickets for Working People<br />
            <span className="text-red-500">No Rip-Off Fees</span>
          </h2>
          <p className="text-2xl text-zinc-400 mb-10">Flat $1.99 fee. Support the artists who sing about real life.</p>
          <Link 
            href="/events"
            className="inline-block bg-red-600 hover:bg-red-700 px-14 py-6 rounded-2xl text-2xl font-semibold"
          >
            Find Shows Near You
          </Link>
        </div>
      </section>

      <footer className="py-12 text-center text-zinc-500 border-t border-zinc-800">
        Lowkey Tickets © 2026 • Built for blue-collar America • No Ticketmaster nonsense
      </footer>
    </div>
  );
}