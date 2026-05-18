export default function LegalPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <h1 className="text-5xl font-bold mb-12">Legal</h1>

        <div className="prose prose-invert max-w-none space-y-12 text-zinc-300">
          <section>
            <h2 className="text-3xl font-semibold text-white mb-6">Terms of Service</h2>
            <p>Lowkey Tickets is a primary ticketing platform focused on low fees and supporting independent artists. By using our service, you agree to purchase tickets for personal use only.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-6">Privacy Policy</h2>
            <p>We collect minimal information (name, email) only for ticket delivery and payment processing. We do not sell your data. Payments are securely processed by Stripe.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-6">Refund Policy</h2>
            <p>All sales are final. Refunds are only issued in case of event cancellation. Contact us at support@lowkeytickets.com for issues.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white mb-6">Contact</h2>
            <p>Email: support@lowkeytickets.com</p>
            <p>Lowkey Tickets LLC – Chicago, IL</p>
          </section>
        </div>
      </div>
    </div>
  );
}