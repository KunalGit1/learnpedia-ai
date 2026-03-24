import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Service — Learnpedia.ai',
}

export default function TermsPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <h1 className="text-4xl font-black text-white mb-2">Terms of Service</h1>
        <p className="text-slate-500 text-sm mb-12">Last updated: March 2025</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-slate-400 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using Learnpedia.ai ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform. These terms apply to all visitors, users, and customers.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Description of Service</h2>
            <p>Learnpedia.ai is a digital product library that provides access to ebooks, audiobooks, and AI tools. We offer one-time lifetime access plans (Starter and Pro) that grant you access to our digital content library upon purchase.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Payments and Pricing</h2>
            <p>All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes. Payments are processed securely through Stripe. We offer one-time lifetime payments — there are no recurring charges. By completing a purchase, you authorise the charge to your selected payment method.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Digital Products and Licence</h2>
            <p>Upon purchase, you receive a non-exclusive, non-transferable licence to access and use the digital content for personal and commercial purposes as described in your plan. You may not:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
              <li>Redistribute, resell, or share your account credentials</li>
              <li>Upload our content to file-sharing platforms</li>
              <li>Claim original authorship of unmodified content</li>
              <li>Use content in a way that infringes on third-party rights</li>
            </ul>
            <p className="mt-3">Pro plan members receive Private Label Rights (PLR) — you may rebrand and resell the content as your own after making meaningful modifications.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorised use of your account. We reserve the right to terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Intellectual Property</h2>
            <p>All content on the Platform, including but not limited to text, graphics, logos, and software, is the property of Learnpedia.ai or its content suppliers and is protected by applicable intellectual property laws. The Learnpedia.ai name, logo, and brand elements may not be used without prior written permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. Disclaimer of Warranties</h2>
            <p>The Platform and its content are provided "as is" without warranties of any kind, express or implied. We do not guarantee that the content will be error-free, complete, or up to date. Results from using our content vary by individual effort and circumstances — we make no income guarantees.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Learnpedia.ai shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform or its content. Our total liability shall not exceed the amount you paid for your plan.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">9. Modifications to Service</h2>
            <p>We reserve the right to modify, suspend, or discontinue any part of the Platform at any time. We may update these Terms from time to time. Continued use of the Platform after changes constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">10. Governing Law</h2>
            <p>These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in India.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">11. Contact</h2>
            <p>For questions regarding these Terms, please contact us at <a href="mailto:support@learnpedia.ai" className="text-violet-400 hover:text-violet-300">support@learnpedia.ai</a>.</p>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  )
}
