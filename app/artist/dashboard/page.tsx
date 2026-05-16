'use client';

import { useState, useEffect } from 'react';
import { Guitar, Calendar, Users, DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Show = {
  id: number;
  title: string;
  date: string;
  venue: string;
  city: string;
  price: number;
  ticketsSold: number;
  status: 'Pending' | 'Approved' | 'Live';
};

export default function ArtistDashboard() {
  const [shows, setShows] = useState<Show[]>([
    {
      id: 101,
      title: "Live in the Holler",
      date: "August 30, 2026",
      venue: "Joan Perry Brock Center",
      city: "Farmville, VA",
      price: 79,
      ticketsSold: 1240,
      status: "Approved"
    },
    {
      id: 102,
      title: "Working Man's Night",
      date: "September 12, 2026",
      venue: "Salt Shed",
      city: "Chicago, IL",
      price: 45,
      ticketsSold: 320,
      status: "Pending"
    }
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Guitar className="w-12 h-12 text-red-600" />
            <div>
              <h1 className="text-5xl font-bold">Artist Dashboard</h1>
              <p className="text-zinc-400">Manage your shows on Lowkey Tickets</p>
            </div>
          </div>
          <Link href="/artist" className="flex items-center gap-2 text-red-500 hover:text-red-400">
            <ArrowLeft className="w-5 h-5" /> Back to Submit Show
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
            <div className="text-5xl font-bold text-red-500">2</div>
            <div className="text-zinc-400 mt-2">Active Shows</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
            <div className="text-5xl font-bold">1,560</div>
            <div className="text-zinc-400 mt-2">Tickets Sold</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
            <div className="text-5xl font-bold">$98,740</div>
            <div className="text-zinc-400 mt-2">Gross Revenue</div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">Your Shows</h2>

        <div className="space-y-6">
          {shows.map(show => (
            <div key={show.id} className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold">{show.title}</h3>
                  <p className="text-red-500">{show.venue}, {show.city}</p>
                  <div className="flex items-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" /> {show.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" /> {show.ticketsSold} sold
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold">${show.price}</div>
                  <div className="text-sm text-zinc-400">starting price</div>
                  <div className={`inline-block mt-4 px-5 py-1.5 rounded-full text-sm font-medium
                    ${show.status === 'Approved' ? 'bg-green-900 text-green-400' : 
                      show.status === 'Live' ? 'bg-red-900 text-red-400' : 'bg-yellow-900 text-yellow-400'}`}>
                    {show.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/artist" 
            className="inline-block bg-red-600 hover:bg-red-700 px-12 py-5 rounded-2xl text-xl font-semibold"
          >
            Submit Another Show
          </Link>
        </div>
      </div>
    </div>
  );
}