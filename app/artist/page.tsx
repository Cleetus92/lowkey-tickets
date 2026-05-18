'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Guitar, Calendar, MapPin } from 'lucide-react';

export default function ArtistPage() {
  const [formData, setFormData] = useState({
    artistName: '',
    eventTitle: '',
    date: '',
    venue: '',
    city: '',
    genre: 'Country',
    description: '',
    contactEmail: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage for now (we can connect to real backend later)
    const submissions = JSON.parse(localStorage.getItem('artistSubmissions') || '[]');
    localStorage.setItem('artistSubmissions', JSON.stringify([...submissions, { ...formData, id: Date.now() }]));
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    
    // Reset form
    setFormData({
      artistName: '', eventTitle: '', date: '', venue: '', city: '', genre: 'Country', description: '', contactEmail: ''
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <div className="flex items-center gap-4 mb-10">
          <Guitar className="w-12 h-12 text-red-600" />
          <div>
            <h1 className="text-5xl font-bold">For Artists</h1>
            <p className="text-zinc-400 text-lg">List your show on Lowkey Tickets</p>
          </div>
        </div>

        {submitted && (
          <div className="bg-green-900/30 border border-green-600 rounded-2xl p-6 mb-8 text-center">
            <p className="text-green-400 text-xl">✅ Submission received! We'll review it shortly.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-3xl p-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Artist / Band Name</label>
              <input type="text" name="artistName" value={formData.artistName} onChange={handleChange} required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600" placeholder="Oliver Anthony" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Event Title</label>
              <input type="text" name="eventTitle" value={formData.eventTitle} onChange={handleChange} required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600" placeholder="Rich Men North of Richmond Tour" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Venue</label>
              <input type="text" name="venue" value={formData.venue} onChange={handleChange} required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600" placeholder="The Farm Amphitheater" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600" placeholder="Nashville, TN" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Genre</label>
            <select name="genre" value={formData.genre} onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600">
              <option value="Country">Country</option>
              <option value="Bluegrass">Bluegrass</option>
              <option value="Southern Rock">Southern Rock</option>
              <option value="Blues Rock">Blues Rock</option>
              <option value="Folk">Folk</option>
              <option value="Blues">Blues</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Short Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600" 
              placeholder="High energy show with working class anthems..."></textarea>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Contact Email</label>
            <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600" placeholder="yourband@email.com" />
          </div>

          <button type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-5 rounded-2xl text-2xl font-semibold transition-all">
            Submit Show for Review
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link href="/artist/dashboard" className="text-red-500 hover:text-red-400 underline">
            → Go to Artist Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}