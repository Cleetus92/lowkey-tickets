'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Guitar, Calendar, MapPin, QrCode } from 'lucide-react';

interface Ticket {
  id: number;
  eventTitle: string;
  date: string;
  venue: string;
  city: string;
  quantity: number;
  totalPaid: number;
  fee?: number;           // Made optional
  purchaseDate: string;
}

export default function MyTickets() {
  const searchParams = useSearchParams();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('myTickets') || '[]');
    setTickets(savedTickets);

    if (searchParams.get('success')) {
      alert("✅ Payment Successful! Your tickets have been added.");
    }
  }, [searchParams]);

  if (tickets.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <Guitar className="w-20 h-20 mx-auto text-zinc-600 mb-6" />
          <h2 className="text-4xl font-bold mb-4">No Tickets Yet</h2>
          <p className="text-zinc-400">Your purchased tickets will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <h1 className="text-5xl font-bold mb-10 flex items-center gap-4">
          <Guitar className="text-red-600" /> My Tickets
        </h1>

        <div className="space-y-8">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-zinc-900 rounded-3xl p-8 border border-zinc-700">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4">{ticket.eventTitle}</h3>
                  <div className="space-y-3 text-lg">
                    <div className="flex items-center gap-4">
                      <Calendar className="w-6 h-6 text-zinc-400" />
                      <span>{ticket.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="w-6 h-6 text-zinc-400" />
                      <span>{ticket.venue}, {ticket.city}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center bg-zinc-950 rounded-2xl p-8 min-w-[200px]">
                  <QrCode className="w-28 h-28 text-red-600 mb-4" />
                  <div className="text-center">
                    <p className="text-4xl font-bold text-red-500">{ticket.quantity}</p>
                    <p className="text-sm text-zinc-400">Tickets</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-700 flex justify-between text-lg">
                <div>
                  <span className="text-zinc-400">Total Paid: </span>
                  <span className="font-semibold">${ticket.totalPaid}</span>
                </div>
                <div className="text-green-400">
                  ${(ticket.fee || 0).toFixed(2)} Lowkey Fee
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}