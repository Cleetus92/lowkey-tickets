'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Guitar, Search } from 'lucide-react';

const allEvents = [
  // Country
  { id: 1, title: "Oliver Anthony - Rich Men North of Richmond Tour", date: "June 15, 2026", venue: "The Farm Amphitheater", city: "Nashville, TN", price: 49, image: "https://picsum.photos/id/1015/800/450", genre: "Country" },
  { id: 3, title: "Zach Bryan - The Great American Tour", date: "July 12, 2026", venue: "Soldier Field", city: "Chicago, IL", price: 75, image: "https://picsum.photos/id/103/800/450", genre: "Country" },
  { id: 5, title: "Chris Stapleton - All-American Road Show", date: "August 22, 2026", venue: "Rupp Arena", city: "Lexington, KY", price: 59, image: "https://picsum.photos/id/106/800/450", genre: "Country" },

  // Bluegrass / Folk
  { id: 2, title: "Tyler Childers - Working Man's Revival", date: "July 3, 2026", venue: "Red Rocks Amphitheatre", city: "Morrison, CO", price: 65, image: "https://picsum.photos/id/102/800/450", genre: "Bluegrass" },
  { id: 6, title: "Billy Strings - Renewal Tour", date: "June 28, 2026", venue: "The Anthem", city: "Washington, DC", price: 45, image: "https://picsum.photos/id/107/800/450", genre: "Bluegrass" },
  { id: 9, title: "Sierra Ferrell - Trail of Flowers", date: "August 15, 2026", venue: "Ryman Auditorium", city: "Nashville, TN", price: 42, image: "https://picsum.photos/id/201/800/450", genre: "Folk" },

  // Southern Rock / Classic Rock
  { id: 4, title: "Lynyrd Skynyrd - Farewell Tour", date: "August 5, 2026", venue: "Ameris Bank Amphitheatre", city: "Alpharetta, GA", price: 55, image: "https://picsum.photos/id/104/800/450", genre: "Southern Rock" },
  { id: 7, title: "The Allman Brothers Band Tribute", date: "July 20, 2026", venue: "Merriweather Post Pavilion", city: "Columbia, MD", price: 48, image: "https://picsum.photos/id/108/800/450", genre: "Southern Rock" },

  // Blues / Blues Rock
  { id: 8, title: "Gary Clark Jr. - JPEG Raw Tour", date: "September 10, 2026", venue: "Fillmore Philadelphia", city: "Philadelphia, PA", price: 52, image: "https://picsum.photos/id/109/800/450", genre: "Blues Rock" },
  { id: 10, title: "Samantha Fish - Live in Concert", date: "August 8, 2026", venue: "House of Blues", city: "Chicago, IL", price: 38, image: "https://picsum.photos/id/110/800/450", genre: "Blues" },
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [maxPrice, setMaxPrice] = useState(150);

  const genres = ['All', 'Country', 'Bluegrass', 'Folk', 'Southern Rock', 'Blues Rock', 'Blues'];

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = selectedGenre === 'All' || event.genre === selectedGenre;
      const matchesPrice = event.price <= maxPrice;

      return matchesSearch && matchesGenre && matchesPrice;
    });
  }, [searchTerm, selectedGenre, maxPrice]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <h1 className="text-5xl font-bold mb-10">All Events</h1>

        {/* Filters */}
        <div className="bg-zinc-900 rounded-3xl p-8 mb-12 flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search events, artists, or cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl pl-14 py-4 focus:outline-none focus:border-red-600"
            />
          </div>

          <div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full md:w-52 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600"
            >
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400 whitespace-nowrap">Max Price: ${maxPrice}</span>
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
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <Link key={event.id} href={`/event/${event.id}`} className="group">
              <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all duration-300">
                <img src={event.image} alt={event.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-red-500 text-sm font-medium tracking-wider">{event.genre}</span>
                    <span className="text-2xl font-bold text-white">${event.price}</span>
                  </div>
                  <h3 className="text-xl font-semibold leading-tight mb-4 group-hover:text-red-500 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="text-zinc-400 text-sm space-y-1">
                    <div>{event.date}</div>
                    <div>{event.venue}, {event.city}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <Guitar className="w-20 h-20 mx-auto text-zinc-600 mb-6" />
            <p className="text-2xl text-zinc-500">No events found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}