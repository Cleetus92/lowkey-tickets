'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Guitar, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/my-tickets');
    }, 5500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center py-20">
      <div className="max-w-2xl mx-auto text-center px-6">
        <CheckCircle className="w-28 h-28 text-green-500 mx-auto mb-8" />
        
        <h1 className="text-6xl font-bold mb-6">Payment Successful!</h1>
        <p className="text-2xl text-zinc-400 mb-12">Your tickets are confirmed. See you at the show.</p>

        <div className="bg-zinc-900 rounded-3xl p-10 mb-12 text-left">
          <div className="flex items-center gap-4 mb-6">
            <Guitar className="w-10 h-10 text-red-600" />
            <div>
              <p className="font-semibold">Lowkey Tickets</p>
              <p className="text-sm text-zinc-500">Real Music • Real Low Fees</p>
            </div>
          </div>
          <p className="text-zinc-300">A confirmation has been sent to your email. Tickets are now saved in your account.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/my-tickets"
            className="bg-red-600 hover:bg-red-700 px-10 py-5 rounded-2xl font-semibold text-xl flex items-center justify-center gap-3 transition-all"
          >
            View My Tickets <ArrowRight className="w-6 h-6" />
          </Link>

          <Link
            href="/events"
            className="border border-zinc-700 hover:bg-zinc-900 px-10 py-5 rounded-2xl font-semibold text-xl transition-all"
          >
            Browse More Events
          </Link>
        </div>

        <p className="text-zinc-500 mt-16 text-sm">
          Thank you for supporting independent artists and low-fee ticketing.
        </p>
      </div>
    </div>
  );
}