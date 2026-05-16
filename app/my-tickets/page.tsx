'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Guitar, Ticket } from 'lucide-react';
import Link from 'next/link';

export default function MyTickets() {
  const [myTickets, setMyTickets] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('myTickets');
    if (saved) setMyTickets(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
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
            <Link href="/" className="hover:text-red-500">Home</Link>
            <Link href="/events" className="hover:text-red-500">All Events</Link>
            <Link href="/my-tickets" className="text-red-500">My Tickets</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-10">
          <Ticket className="w-10 h-10 text-red-600" />
          <h2 className="text-5xl font-bold">My Tickets</h2>
        </div>

        {myTickets.length > 0 ? (
          <div className="space-y-8">
            {myTickets.map((ticket: any) => (
              <div key={ticket.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-3xl font-bold">{ticket.eventTitle}</h3>
                    <p className="text-red-500">{ticket.venue}, {ticket.city}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">${ticket.totalPaid}</div>
                  </div>
                </div>
                <div className="mt-6 flex gap-8 text-lg">
                  <div><Calendar className="inline w-5 h-5" /> {ticket.date}</div>
                  <div><Ticket className="inline w-5 h-5" /> {ticket.quantity} Tickets</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-zinc-400">No tickets yet. Go buy some shows!</p>
        )}
      </div>
    </div>
  );
}