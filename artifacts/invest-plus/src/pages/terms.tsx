import { Link } from "wouter";
import { ArrowLeft, FileText, Shield, AlertCircle, Scale, Lock, RefreshCw } from "lucide-react";

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0">
          {icon}
        </div>
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
      </div>
      <div className="text-sm text-gray-600 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link href="/">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
              <path d="M13 16L15.5 18.5L19 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-sm">Invest Plus</span>
        </div>
        <div className="w-20" />
      </nav>

      {/* Header */}
      <div className="bg-white px-6 py-10 text-center border-b border-gray-100">
        <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-5">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Terms &amp; Privacy Policy</h1>
        <p className="text-sm text-gray-400">Last updated: January 1, 2026</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-10 space-y-4">

        {/* Intro */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <p className="text-sm text-blue-700 leading-relaxed">
            By creating an account or using Invest Plus, you agree to the following terms and our privacy practices. Please read them carefully before proceeding.
          </p>
        </div>

        {/* Terms of Service */}
        <Section icon={<Scale className="w-5 h-5 text-blue-600" />} title="Terms of Service">
          <p><span className="font-semibold text-gray-800">1. Eligibility.</span> You must be at least 18 years old to use Invest Plus. By registering, you confirm you meet this requirement and that all information you provide is accurate.</p>
          <p><span className="font-semibold text-gray-800">2. Account Responsibility.</span> You are solely responsible for maintaining the security of your account credentials. Do not share your password with anyone. Invest Plus will never ask for your password.</p>
          <p><span className="font-semibold text-gray-800">3. Acceptable Use.</span> You agree not to use the platform for any unlawful purpose, including money laundering, fraud, or financing illegal activities. Violations result in immediate account suspension.</p>
          <p><span className="font-semibold text-gray-800">4. Investment Plans.</span> Selecting an investment plan locks your chosen amount for the plan duration. Plans cannot be cancelled mid-term. Returns are credited at plan maturity.</p>
          <p><span className="font-semibold text-gray-800">5. Fees.</span> Invest Plus does not charge fees on deposits or withdrawals. Swap operations may include a small spread built into the exchange rate.</p>
          <p><span className="font-semibold text-gray-800">6. Account Termination.</span> We reserve the right to suspend or terminate accounts that violate these terms, engage in suspicious activity, or are inactive for more than 24 months.</p>
        </Section>

        {/* Financial Disclaimer */}
        <Section icon={<AlertCircle className="w-5 h-5 text-amber-500" />} title="Financial Disclaimer">
          <p>Invest Plus provides structured investment plans with stated ROI percentages. However, these returns depend on platform performance and are not guaranteed by any government or regulatory body.</p>
          <p>Cryptocurrency markets can be volatile. While we take every precaution to honour stated returns, unforeseen market events may impact outcomes. Only invest funds you can afford to commit for the plan duration.</p>
          <p>Nothing on this platform constitutes personalised financial advice. You should consider seeking independent financial advice before making investment decisions.</p>
        </Section>

        {/* Privacy Policy */}
        <Section icon={<Lock className="w-5 h-5 text-green-600" />} title="Privacy Policy">
          <p><span className="font-semibold text-gray-800">Data We Collect.</span> We collect your name, email address, and transaction history when you register and use our platform. We do not collect government ID or bank account details.</p>
          <p><span className="font-semibold text-gray-800">How We Use It.</span> Your data is used solely to operate your account, process transactions, and communicate important account updates. We do not sell your data to third parties.</p>
          <p><span className="font-semibold text-gray-800">Data Security.</span> All data is encrypted at rest and in transit using industry-standard protocols. Passwords are hashed and never stored in plain text.</p>
          <p><span className="font-semibold text-gray-800">Cookies.</span> We use session tokens stored locally on your device to keep you signed in. These are never shared with third parties.</p>
          <p><span className="font-semibold text-gray-800">Your Rights.</span> You may request deletion of your account and personal data at any time by contacting support. We will process requests within 30 days.</p>
        </Section>

        {/* Security */}
        <Section icon={<Shield className="w-5 h-5 text-blue-600" />} title="Security Practices">
          <p>Invest Plus employs multiple layers of security to protect your assets and data:</p>
          <div className="space-y-2">
            {[
              "All passwords are SHA-256 hashed with a unique salt before storage",
              "Session tokens expire automatically after periods of inactivity",
              "All API communications use HTTPS with TLS encryption",
              "Suspicious login attempts trigger automatic account lockouts",
              "Transaction records are immutable and audit-logged",
            ].map(item => (
              <div key={item} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Changes */}
        <Section icon={<RefreshCw className="w-5 h-5 text-purple-600" />} title="Changes to These Terms">
          <p>We may update these Terms &amp; Privacy Policy from time to time. We will notify you of significant changes via email or an in-app notice at least 14 days before they take effect.</p>
          <p>Your continued use of the platform after changes take effect constitutes acceptance of the updated terms.</p>
        </Section>

        {/* Contact */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center">
          <h3 className="text-base font-bold text-gray-900 mb-2">Questions?</h3>
          <p className="text-sm text-gray-400 mb-1">Reach out to our support team anytime.</p>
          <p className="text-sm font-semibold text-blue-600">support@investplus.io</p>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-6 py-6 mt-4">
        <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
          <Link href="/" className="hover:text-blue-600 transition-colors font-medium">Home</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors font-medium">About Us</Link>
          <Link href="/terms" className="text-blue-600 font-medium">Terms &amp; Policy</Link>
        </div>
        <p className="text-xs text-gray-300 text-center mt-3">© 2026 Invest Plus. All rights reserved.</p>
      </footer>
    </div>
  );
}
