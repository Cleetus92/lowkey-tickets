'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Guitar, CreditCard, User, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const eventsData: { [key: number]: any } = {
  1: { id: 1, title: "Oliver Anthony - Rich Men North of Richmond Tour", date: "June 15, 2026", venue: "The Farm Amphitheater", city: "Nashville, TN", price: 49, image: "https://picsum.photos/id/1015/800/450", genre: "Country" },
  2: { id: 2, title: "Tyler Childers - Working Man's Revival", date: "July 3, 2026", venue: "Red Rocks Amphitheatre", city: "Morrison, CO", price: 65, image: "https://picsum.photos/id/102/800/450", genre: "Bluegrass" },
};

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [event, setEvent] = useState<any>(null);
  const [selectedTickets, setSelectedTickets] = useState(2);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });

  useEffect(() => {
    const id = parseInt(params.id as string);
    setEvent(eventsData[id]);
  }, [params.id]);

  // Handle success redirect from Stripe
  useEffect(() => {
    if (searchParams.get('success')) {
      setPurchaseComplete(true);
      setTimeout(() => {
        router.push('/my-tickets');
      }, 1800);
    }
  }, [searchParams, router]);

  if (!event) return <div className="text-center py-20 text-2xl">Loading event...</div>;

  const subtotal = event.price * selectedTickets;
  const fee = 1.99 * selectedTickets;
  const total = subtotal + fee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStripeCheckout = async () => {
    if (!formData.fullName || !formData.email) {
      alert("Please enter your name and email.");
      return;
    }

    setIsCheckingOut(true);

    // Save ticket before redirect
    const purchase = {
      id: Date.now(),
      eventTitle: event.title,
      date: event.date,
      venue: event.venue,
      city: event.city,
      quantity: selectedTickets,
      totalPaid: total,
      fee: fee,
      purchaseDate: new Date().toISOString(),
      buyerName: formData.fullName,
      buyerEmail: formData.email,
    };

    const existing = JSON.parse(localStorage.getItem('myTickets') || '[]');
    localStorage.setItem('myTickets', JSON.stringify([purchase, ...existing]));

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventTitle: event.title,
          quantity: selectedTickets,
          totalAmount: total,
          eventId: event.id,
        }),
      });

      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (error) {
      alert("Error connecting to payment. Please try again.");
      setIsCheckingOut(false);
    }
  };

  if (purchaseComplete) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-5xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-xl text-zinc-400">Your tickets have been saved.</p>
          <p className="text-zinc-500 mt-8">Redirecting to My Tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <Link href="/events" className="inline-flex items-center text-red-500 hover:text-red-400 mb-8">
          ← Back to All Events
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Event Info */}
          <div>
            <img src={event.image} alt={event.title} className="w-full rounded-2xl shadow-2xl" />
            <div className="mt-8 space-y-4 text-lg">
              <div className="flex items-center gap-4"><Calendar className="w-6 h-6 text-zinc-400" /><span>{event.date}</span></div>
              <div className="flex items-center gap-4"><MapPin className="w-6 h-6 text-zinc-400" /><span>{event.venue}, {event.city}</span></div>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-8">{event.title}</h1>

            <div className="bg-zinc-900 rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <CreditCard className="text-red-600" /> Secure Checkout
              </h3>

              {/* Quantity Selector */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl">Number of Tickets</span>
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedTickets(Math.max(1, selectedTickets - 1))} className="w-12 h-12 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-2xl">-</button>
                  <span className="text-4xl font-bold w-16 text-center">{selectedTickets}</span>
                  <button onClick={() => setSelectedTickets(selectedTickets + 1)} className="w-12 h-12 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-2xl">+</button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 text-lg border-t border-zinc-700 pt-6 mb-8">
                <div className="flex justify-between"><span>Face Value × {selectedTickets}</span><span>${subtotal}</span></div>
                <div className="flex justify-between text-green-400"><span>Lowkey Fee (${1.99} per ticket)</span><span>${fee.toFixed(2)}</span></div>
                <div className="flex justify-between text-2xl font-bold pt-4 border-t border-zinc-700"><span>Total Today</span><span>${total}</span></div>
              </div>

              {/* Buyer Info */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm text-zinc-400 mb-2"><User className="w-4 h-4" /> Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600" 
                    placeholder="John Smith" 
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm text-zinc-400 mb-2"><Mail className="w-4 h-4" /> Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600" 
                    placeholder="you@email.com" 
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleStripeCheckout}
              disabled={isCheckingOut || !formData.fullName || !formData.email}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 py-6 rounded-2xl text-2xl font-semibold transition-all flex items-center justify-center gap-3"
            >
              {isCheckingOut ? (
                <>Processing...</>
              ) : (
                <>Pay ${total} Securely with Stripe <CreditCard className="w-6 h-6" /></>
              )}
            </button>

            <p className="text-center text-sm text-zinc-500 mt-6">
              🔒 Secured by Stripe • No hidden fees • $1.99 per ticket
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}