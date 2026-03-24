import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy — Learnpedia.ai',
}

export default function PrivacyPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-12">Last updated: March 2025</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-slate-400 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Introduction</h2>
            <p>Learnpedia.ai ("we", "us", "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our Platform. By using our services, you consent to the practices described in this policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
              <li><strong className="text-white">Account information:</strong> Email address, name, and password when you register</li>
              <li><strong className="text-white">Payment information:</strong> Processed securely by Stripe — we do not store card details</li>
              <li><strong className="text-white">Usage data:</strong> Pages visited, downloads, and interactions with the Platform</li>
              <li><strong className="text-white">Device information:</strong> Browser type, IP address, and operating system</li>
              <li><strong className="text-white">Communication data:</strong> Emails or messages you send to us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
              <li>Provide and maintain access to your purchased content</li>
              <li>Process payments and send purchase confirmations</li>
              <li>Send important account and service updates</li>
              <li>Respond to your support requests</li>
              <li>Improve our Platform and user experience</li>
              <li>Send promotional emails (you may opt out at any time)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Data Storage and Security</h2>
            <p>Your data is stored securely using Supabase, hosted in the EU region. We implement industry-standard security measures including encryption in transit (HTTPS) and at rest. Access to personal data is restricted to authorised personnel only.</p>
            <p className="mt-2">While we take reasonable measures to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
              <li><strong className="text-white">Stripe</strong> — payment processing (subject to Stripe's Privacy Policy)</li>
              <li><strong className="text-white">Supabase</strong> — database and authentication</li>
              <li><strong className="text-white">Vercel</strong> — hosting and deployment</li>
              <li><strong className="text-white">Google</strong> — if you use Google Sign-In (subject to Google's Privacy Policy)</li>
            </ul>
            <p className="mt-2">We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Cookies</h2>
            <p>We use essential cookies to maintain your login session and preferences. We do not use tracking or advertising cookies. You can disable cookies in your browser settings, but this may affect Platform functionality.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of marketing communications</li>
              <li>Data portability — receive your data in a structured format</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, email us at <a href="mailto:support@learnpedia.ai" className="text-violet-400 hover:text-violet-300">support@learnpedia.ai</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">8. Data Retention</h2>
            <p>We retain your account data for as long as your account is active. If you request account deletion, we will remove your personal data within 30 days, except where retention is required by law.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">9. Children's Privacy</h2>
            <p>Our Platform is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal information, please contact us immediately.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice on the Platform. Your continued use after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">11. Contact Us</h2>
            <p>For privacy-related enquiries, contact us at <a href="mailto:support@learnpedia.ai" className="text-violet-400 hover:text-violet-300">support@learnpedia.ai</a>.</p>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  )
}
