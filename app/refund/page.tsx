import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Refund Policy — Learnpedia.ai',
}

export default function RefundPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <h1 className="text-4xl font-black text-white mb-2">Refund Policy</h1>
        <p className="text-slate-500 text-sm mb-12">Last updated: March 2025</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-slate-400 leading-relaxed">

          <section>
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-5 mb-8">
              <p className="text-violet-300 font-semibold text-sm">
                We offer a 7-day money-back guarantee on all plans. If you are not satisfied with your purchase for any reason, contact us within 7 days of purchase and we will issue a full refund — no questions asked.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Refund Eligibility</h2>
            <p>You are eligible for a full refund if:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
              <li>You request a refund within 7 days of your purchase date</li>
              <li>You have not downloaded more than 2 books from the library</li>
              <li>Your account has not been used to generate AI content excessively</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Non-Refundable Situations</h2>
            <p>Refunds will not be issued in the following cases:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
              <li>Refund requests made more than 7 days after purchase</li>
              <li>Accounts found to be in violation of our Terms of Service</li>
              <li>Purchases made with promotional or discounted pricing (unless otherwise stated)</li>
              <li>If the full content library has been downloaded prior to the refund request</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. How to Request a Refund</h2>
            <p>To request a refund:</p>
            <ol className="list-decimal list-inside space-y-2 mt-2 ml-4">
              <li>Email us at <a href="mailto:support@learnpedia.ai" className="text-violet-400 hover:text-violet-300">support@learnpedia.ai</a></li>
              <li>Include your registered email address and order details</li>
              <li>Briefly describe the reason for your refund request (optional)</li>
            </ol>
            <p className="mt-3">We will process your refund within 3–5 business days of approval. Refunds are returned to the original payment method.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Refund Processing Time</h2>
            <p>Once approved, refunds are processed within:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
              <li><strong className="text-white">Credit/Debit Cards:</strong> 5–10 business days to appear on your statement</li>
              <li><strong className="text-white">UPI/Net Banking:</strong> 3–5 business days</li>
            </ul>
            <p className="mt-2">Processing times may vary depending on your bank or payment provider.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Account Access After Refund</h2>
            <p>Upon approval of a refund, your access to the Platform and all downloaded content will be revoked immediately. Any content downloaded during the access period must be deleted from your devices.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Chargebacks</h2>
            <p>We encourage you to contact us before initiating a chargeback with your bank. Chargebacks without prior contact may result in permanent account suspension. We are committed to resolving any issues fairly and promptly.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. Contact Us</h2>
            <p>For refund requests or questions, please contact our support team at <a href="mailto:support@learnpedia.ai" className="text-violet-400 hover:text-violet-300">support@learnpedia.ai</a>. We aim to respond to all enquiries within 24 hours on business days.</p>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  )
}
