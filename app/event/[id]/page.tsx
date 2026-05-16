'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowLeft, Guitar } from 'lucide-react';
import Link from 'next/link';

const eventsData = {
  1: { title: "Oliver Anthony", date: "August 30, 2026", venue: "Joan Perry Brock Center", city: "Farmville, VA", price: 79, image: "https://picsum.photos/id/1015/800/600", genre: "Country" },
  2: { title: "Tyler Childers", date: "July 12, 2026", venue: "Red Rocks Amphitheatre", city: "Morrison, CO", price: 65, image: "https://picsum.photos/id/1074/800/600", genre: "Country" },
  3: { title: "Zach Bryan", date: "September 15, 2026", venue: "Madison Square Garden", city: "New York, NY", price: 89, image: "https://picsum.photos/id/201/800/600", genre: "Country" },
  4: { title: "Working Man's Revival", date: "June 20, 2026", venue: "Salt Shed", city: "Chicago, IL", price: 45, image: "https://picsum.photos/id/106/800/600", genre: "Bluegrass" },
  // ... (other events are in events page)
};

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedTickets, setSelectedTickets] = useState(2);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    params.then(p => {
      const ev = eventsData[parseInt(p.id)];
      setEvent(ev);
    });
  }, [params]);

  if (!event) return <div className="text-center py-20">Loading...</div>;

  const subtotal = event.price * selectedTickets;
  const fee = 1.99;
  const total = subtotal + fee;

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Save ticket to localStorage
    const newTicket = {
      id: Date.now(),
      eventTitle: event.title,
      date: event.date,
      venue: event.venue,
      city: event.city,
      quantity: selectedTickets,
      totalPaid: total
    };

    const existing = JSON.parse(localStorage.getItem('myTickets') || '[]');
    localStorage.setItem('myTickets', JSON.stringify([newTicket, ...existing]));

    setTimeout(() => {
      alert(`✅ Purchase Successful!\n\n${selectedTickets} tickets to ${event.title}\nTotal: $${total.toFixed(2)}\n\nTickets saved to My Tickets.`);
      setIsCheckingOut(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 bg-zinc-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/events" className="flex items-center gap-2 hover:text-red-500">
            <ArrowLeft className="w-6 h-6" /> Back to Events
          </Link>
          <div className="flex items-center gap-3">
            <Guitar className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold tracking-tighter">LOWKEY TICKETS</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <img src={event.image} alt={event.title} className="w-full rounded-2xl" />
            <div className="mt-8 space-y-4 text-lg">
              <div className="flex items-center gap-3"><Calendar className="w-6 h-6 text-red-500" /> {event.date}</div>
              <div className="flex items-center gap-3"><MapPin className="w-6 h-6 text-red-500" /> {event.venue}, {event.city}</div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">
            <h2 className="text-4xl font-bold mb-2">{event.title}</h2>
            <p className="text-red-500 mb-8">{event.genre}</p>

            <div className="mb-10">
              <label className="block text-zinc-400 mb-3">Number of Tickets</label>
              <div className="flex gap-3">
                {[1,2,3,4].map(n => (
                  <button key={n} onClick={() => setSelectedTickets(n)}
                    className={`px-8 py-5 rounded-2xl border text-2xl font-semibold ${selectedTickets === n ? 'bg-red-600 border-red-600' : 'border-zinc-700 hover:border-zinc-500'}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 text-lg border-t border-zinc-800 pt-8">
              <div className="flex justify-between"><span>Tickets × ${event.price}</span><span>${subtotal}</span></div>
              <div className="flex justify-between"><span>Lowkey Flat Fee</span><span className="text-green-400">$1.99</span></div>
              <div className="flex justify-between text-3xl font-bold pt-4 border-t border-zinc-700">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full mt-12 bg-red-600 hover:bg-red-700 py-7 text-2xl font-semibold rounded-2xl disabled:opacity-70"
            >
              {isCheckingOut ? "Processing..." : `Buy Tickets - Pay $${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}