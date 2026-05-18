'use client';

import Link from 'next/link';
import { Guitar, Calendar, MapPin, ArrowRight } from 'lucide-react';

const featuredEvents = [
  { id: 1, title: "Oliver Anthony - Rich Men North of Richmond Tour", date: "June 15, 2026", venue: "The Farm Amphitheater", city: "Nashville, TN", price: 49, image: "https://picsum.photos/id/1015/800/450" },
  { id: 2, title: "Tyler Childers - Working Man's Revival", date: "July 3, 2026", venue: "Red Rocks Amphitheatre", city: "Morrison, CO", price: 65, image: "https://picsum.photos/id/102/800/450" },
  { id: 3, title: "Zach Bryan - The Great American Tour", date: "July 12, 2026", venue: "Soldier Field", city: "Chicago, IL", price: 75, image: "https://picsum.photos/id/103/800/450" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1015/2000/1200')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-zinc-950"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Guitar className="w-20 h-20 text-red-600" />
          </div>
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6">
            LOWKEY TICKETS
          </h1>
          <p className="text-2xl md:text-3xl text-zinc-300 mb-10">
            Real Music.<br />Real Low Fees.<br />$1.99 per ticket.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/events" 
              className="bg-red-600 hover:bg-red-700 text-xl font-semibold px-12 py-6 rounded-2xl flex items-center justify-center gap-3 transition-all">
              Browse Events <ArrowRight className="w-6 h-6" />
            </Link>
            <Link href="/artist" 
              className="border border-zinc-600 hover:bg-zinc-900 text-xl font-semibold px-12 py-6 rounded-2xl transition-all">
              For Artists
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Events</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {featuredEvents.map(event => (
            <Link key={event.id} href={`/event/${event.id}`} className="group">
              <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all">
                <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
                <div className="p-8">
                  <div className="flex justify-between mb-4">
                    <span className="text-red-500 font-medium">Featured</span>
                    <span className="text-2xl font-bold">${event.price}</span>
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight mb-6 group-hover:text-red-500 transition-colors">
                    {event.title}
                  </h3>
                  <div className="text-zinc-400 space-y-2">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      <span>{event.venue}, {event.city}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/events" className="text-red-500 hover:text-red-400 text-xl font-medium inline-flex items-center gap-3">
            See All Events <ArrowRight />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 text-center text-zinc-500 border-t border-zinc-800">
        <p>Lowkey Tickets © 2026 • Built for blue-collar America • No box office nonsense</p>
        <div className="flex justify-center gap-8 mt-6 text-sm">
          <Link href="/legal" className="hover:text-zinc-300">Legal</Link>
          <Link href="/artist" className="hover:text-zinc-300">For Artists</Link>
          <a href="mailto:support@lowkeytickets.com" className="hover:text-zinc-300">Contact</a>
        </div>
      </footer>
    </div>
  );
}