'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Guitar, Calendar, MapPin, DollarSign, TrendingUp, Users, Award } from 'lucide-react';

interface Submission {
  id: number;
  artistName: string;
  eventTitle: string;
  date: string;
  venue: string;
  city: string;
  genre: string;
  description: string;
  contactEmail: string;
}

export default function ArtistDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('artistSubmissions') || '[]');
    setSubmissions(saved);
  }, []);

  // Mock stats
  const totalShows = submissions.length;
  const totalTicketsSold = totalShows * 1240; // Mock data
  const estimatedEarnings = Math.round(totalTicketsSold * 18); // Mock average payout

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-4">
              <Guitar className="w-12 h-12 text-red-600" />
              <h1 className="text-5xl font-bold">Artist Dashboard</h1>
            </div>
            <p className="text-zinc-400 text-xl mt-2">Welcome back • Real fans. Real payouts.</p>
          </div>
          <Link href="/artist" 
            className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all">
            + Submit New Show
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Shows</p>
                <p className="text-5xl font-bold mt-2">{totalShows}</p>
              </div>
              <Award className="w-12 h-12 text-red-600" />
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Tickets Sold</p>
                <p className="text-5xl font-bold mt-2">{totalTicketsSold.toLocaleString()}</p>
              </div>
              <Users className="w-12 h-12 text-red-600" />
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Est. Earnings</p>
                <p className="text-5xl font-bold mt-2">${estimatedEarnings}</p>
              </div>
              <DollarSign className="w-12 h-12 text-red-600" />
            </div>
            <div className="flex items-center gap-2 mt-4 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" /> +12% this month
            </div>
          </div>
        </div>

        {/* My Shows */}
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
          <Calendar className="text-red-600" /> My Shows
        </h2>

        {submissions.length === 0 ? (
          <div className="bg-zinc-900 rounded-3xl p-16 text-center">
            <Guitar className="w-20 h-20 mx-auto text-zinc-600 mb-6" />
            <p className="text-2xl text-zinc-400">No shows submitted yet</p>
            <Link href="/artist" className="text-red-500 hover:text-red-400 underline mt-6 inline-block">
              Submit your first show →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.map((show) => (
              <div key={show.id} className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 hover:border-red-600 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-1 bg-zinc-800 text-red-400 text-sm rounded-full font-medium">{show.genre}</span>
                      <p className="text-sm text-zinc-500">Submitted recently</p>
                    </div>
                    <h3 className="text-3xl font-bold mt-4 group-hover:text-red-500 transition-colors">{show.eventTitle}</h3>
                    <p className="text-red-500 text-xl mt-1">{show.artistName}</p>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="flex items-center justify-end gap-3 text-zinc-400">
                      <Calendar className="w-5 h-5" />
                      <span>{show.date}</span>
                    </div>
                    <div className="flex items-center justify-end gap-3 text-zinc-400">
                      <MapPin className="w-5 h-5" />
                      <span>{show.venue}, {show.city}</span>
                    </div>
                  </div>
                </div>

                {show.description && (
                  <p className="mt-6 text-zinc-400 border-t border-zinc-700 pt-6">{show.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}