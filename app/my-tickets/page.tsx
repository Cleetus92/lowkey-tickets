'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Guitar, Ticket, QrCode } from 'lucide-react';
import Link from 'next/link';

type TicketType = {
  id: number;
  eventTitle: string;
  date: string;
  venue: string;
  city: string;
  quantity: number;
  totalPaid: number;
  feePerTicket: number;
};

export default function MyTickets() {
  const [myTickets, setMyTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('myTickets');
    if (saved) {
      setMyTickets(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-10">
          <Ticket className="w-10 h-10 text-red-600" />
          <h2 className="text-5xl font-bold">My Tickets</h2>
        </div>

        {myTickets.length > 0 ? (
          <div className="space-y-8">
            {myTickets.map((ticket) => (
              <div key={ticket.id} className="bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-bold">{ticket.eventTitle}</h3>
                      <p className="text-red-500 mt-1">{ticket.venue}, {ticket.city}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">${ticket.totalPaid.toFixed(2)}</div>
                      <div className="text-sm text-green-400">Paid in full</div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6" /> {ticket.date}
                    </div>
                    <div className="flex items-center gap-3">
                      <Ticket className="w-6 h-6" /> {ticket.quantity} Tickets
                    </div>
                  </div>

                  {/* Fee Breakdown */}
                  <div className="mt-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-sm">
                    <div className="flex justify-between">
                      <span>Face Value</span>
                      <span>${(ticket.totalPaid - ticket.feePerTicket * ticket.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Lowkey Fee (${ticket.feePerTicket} × {ticket.quantity})</span>
                      <span className="text-green-400">+${(ticket.feePerTicket * ticket.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code Area */}
                <div className="bg-black p-8 flex flex-col items-center border-t border-zinc-800">
                  <div className="bg-white p-4 rounded-xl">
                    <QrCode className="w-40 h-40 text-black" />
                  </div>
                  <p className="text-xs text-zinc-500 mt-4 text-center">
                    Show this QR code at the gate<br />
                    Ticket ID: #{ticket.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Ticket className="w-20 h-20 mx-auto text-zinc-700 mb-6" />
            <p className="text-2xl text-zinc-400">You don't have any tickets yet.</p>
            <Link 
              href="/events" 
              className="inline-block mt-8 bg-red-600 hover:bg-red-700 px-10 py-4 rounded-2xl font-semibold"
            >
              Browse Upcoming Shows
            </Link>
          </div>
        )}
      </div>

      <footer className="py-12 text-center text-zinc-500 border-t border-zinc-800">
        Lowkey Tickets © 2026 • Built for blue-collar America • No box office nonsense
      </footer>
    </div>
  );
}