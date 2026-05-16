import Link from 'next/link';
import { Guitar } from 'lucide-react';

export default function Legal() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-12">Legal & About</h1>

        <div className="prose prose-invert max-w-none space-y-16">
          <section>
            <h2 className="text-3xl font-semibold mb-6">About Lowkey Tickets</h2>
            <p className="text-lg text-zinc-400">
              Lowkey Tickets was built for working people who love real music. 
              We charge a flat $1.99 per ticket — no hidden fees, no box office nonsense. 
              Our goal is simple: make it fair for fans and artists.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">Terms of Service</h2>
            <p className="text-zinc-400 leading-relaxed">
              All ticket sales are final. Tickets are non-refundable unless the event is officially cancelled. 
              Lowkey Tickets is not responsible for events that are postponed or cancelled by the artist or venue.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">Privacy Policy</h2>
            <p className="text-zinc-400 leading-relaxed">
              We only collect the information needed to deliver your tickets. 
              Payment details are processed securely through Stripe and are never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
            <p className="text-zinc-400">
              Questions or support: <span className="text-red-500">support@lowkeytickets.com</span>
            </p>
          </section>
        </div>

        <div className="mt-20 text-center text-sm text-zinc-500">
          Lowkey Tickets © 2026 • A product of your LLC
        </div>
      </div>

      <footer className="py-12 text-center text-zinc-500 border-t border-zinc-800">
        Lowkey Tickets © 2026 • Built for blue-collar America • No box office nonsense
      </footer>
    </div>
  );
}