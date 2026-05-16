'use client';

import { useState } from 'react';
import { Guitar, Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ArtistSubmission() {
  const [formData, setFormData] = useState({
    artistName: '',
    eventTitle: '',
    date: '',
    venue: '',
    city: '',
    price: '',
    genre: '',
    description: '',
    contactEmail: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Artist Submission:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <Guitar className="w-20 h-20 mx-auto text-red-600 mb-6" />
          <h2 className="text-4xl font-bold mb-4">Thank You!</h2>
          <p className="text-xl text-zinc-400">
            Your show has been submitted. We'll review it and get back to you within 48 hours.
          </p>
          <Link href="/artist/dashboard" className="inline-block mt-10 bg-red-600 hover:bg-red-700 px-10 py-4 rounded-2xl font-semibold">
            Go to Artist Dashboard →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Guitar className="w-12 h-12 text-red-600" />
            <div>
              <h1 className="text-5xl font-bold">List Your Show</h1>
              <p className="text-zinc-400 text-lg">Get your music in front of real fans with low fees</p>
            </div>
          </div>
          <Link 
            href="/artist/dashboard"
            className="flex items-center gap-2 text-red-500 hover:text-red-400 font-medium"
          >
            Artist Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Form fields remain the same as before */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-zinc-400 mb-2">Artist / Band Name</label>
              <input
                type="text"
                required
                value={formData.artistName}
                onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 p-4 rounded-xl focus:border-red-600 outline-none"
                placeholder="Oliver Anthony"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-2">Event Title</label>
              <input
                type="text"
                required
                value={formData.eventTitle}
                onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 p-4 rounded-xl focus:border-red-600 outline-none"
                placeholder="Live in the Holler"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-zinc-400 mb-2">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 p-4 rounded-xl focus:border-red-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-2">Starting Ticket Price ($)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 p-4 rounded-xl focus:border-red-600 outline-none"
                placeholder="45"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-2">Venue Name</label>
            <input
              type="text"
              required
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-700 p-4 rounded-xl focus:border-red-600 outline-none"
              placeholder="Salt Shed"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-2">City & State</label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-700 p-4 rounded-xl focus:border-red-600 outline-none"
              placeholder="Chicago, IL"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-2">Genre</label>
            <select
              required
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-700 p-4 rounded-xl focus:border-red-600 outline-none"
            >
              <option value="">Select Genre</option>
              <option value="Country">Country</option>
              <option value="Bluegrass">Bluegrass</option>
              <option value="Southern Rock">Southern Rock</option>
              <option value="Blues">Blues</option>
              <option value="Folk">Folk</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-400 mb-2">Short Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full bg-zinc-900 border border-zinc-700 p-4 rounded-xl focus:border-red-600 outline-none"
              placeholder="High energy country show with working man anthems..."
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-2">Contact Email</label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-700 p-4 rounded-xl focus:border-red-600 outline-none"
              placeholder="yourband@email.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-6 text-2xl font-semibold rounded-2xl mt-8"
          >
            Submit Show for Review
          </button>
        </form>
      </div>
    </div>
  );
}