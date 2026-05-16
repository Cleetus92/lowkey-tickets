'use client';

import { useState } from 'react';
import { Calendar, MapPin, Search, Guitar } from 'lucide-react';
import Link from 'next/link';

const allEvents = [
  // Country / Americana
  { id: 1, title: "Oliver Anthony", date: "August 30, 2026", venue: "Joan Perry Brock Center", city: "Farmville, VA", price: 79, image: "https://picsum.photos/id/1015/800/600", genre: "Country" },
  { id: 2, title: "Tyler Childers", date: "July 12, 2026", venue: "Red Rocks Amphitheatre", city: "Morrison, CO", price: 65, image: "https://picsum.photos/id/1074/800/600", genre: "Country" },
  { id: 3, title: "Zach Bryan", date: "September 15, 2026", venue: "Madison Square Garden", city: "New York, NY", price: 89, image: "https://picsum.photos/id/201/800/600", genre: "Country" },
  
  // Bluegrass / Folk
  { id: 4, title: "Working Man's Revival", date: "June 20, 2026", venue: "Salt Shed", city: "Chicago, IL", price: 45, image: "https://picsum.photos/id/106/800/600", genre: "Bluegrass" },
  { id: 5, title: "Colter Wall", date: "July 25, 2026", venue: "The Fillmore", city: "San Francisco, CA", price: 55, image: "https://picsum.photos/id/133/800/600", genre: "Folk" },
  
  // Rock / Southern Rock
  { id: 6, title: "Chris Stapleton", date: "August 15, 2026", venue: "United Center", city: "Chicago, IL", price: 95, image: "https://picsum.photos/id/180/800/600", genre: "Southern Rock" },
  { id: 7, title: "Lynyrd Skynyrd Farewell Tour", date: "October 10, 2026", venue: "Ameris Bank Amphitheatre", city: "Atlanta, GA", price: 75, image: "https://picsum.photos/id/201/800/600", genre: "Southern Rock" },
  
  // Blues / Classic Rock
  { id: 8, title: "The Black Crowes", date: "July 18, 2026", venue: "House of Blues", city: "Chicago, IL", price: 60, image: "https://picsum.photos/id/251/800/600", genre: "Blues Rock" },
];

const genres = ['All', 'Country', 'Bluegrass', 'Folk', 'Southern Rock', 'Blues Rock'];

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [maxPrice, setMaxPrice] = useState(150);

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || event.genre === selectedGenre;
    const matchesPrice = event.price <= maxPrice;
    return matchesSearch && matchesGenre && matchesPrice;
  });

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
            <Link href="/events" className="text-red-500">All Events</Link>
            <Link href="/my-tickets" className="hover:text-red-500">My Tickets</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-bold mb-3">Find Your Next Show</h2>
        <p className="text-zinc-400 mb-10">Flat $1.99 fee • Supporting real artists nationwide</p>

        {/* Filters */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12 grid md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm text-zinc-400 mb-2">Search Artist or City</label>
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Oliver Anthony or Chicago..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 pl-12 py-4 rounded-xl focus:border-red-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Genre</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 py-4 px-5 rounded-xl focus:border-red-600 outline-none"
            >
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Max Price: ${maxPrice}</label>
            <input
              type="range"
              min="30"
              max="150"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-red-600"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Link href={`/event/${event.id}`} key={event.id} className="group">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-600 transition-all">
                <img src={event.image} alt={event.title} className="w-full h-56 object-cover" />
                <div className="p-7">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{event.title}</h3>
                      <p className="text-red-500">{event.genre}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">${event.price}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-zinc-400">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.venue}, {event.city}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}