import { Link } from "wouter";
import { Shield, TrendingUp, Users, Globe, Award, Heart, ArrowLeft } from "lucide-react";

export default function About() {
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
        <Link href="/register">
          <button className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </Link>
      </nav>

      {/* Hero */}
      <div className="bg-white px-6 py-14 text-center border-b border-gray-100">
        <div className="max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-100">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M13 16L15.5 18.5L19 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">About Invest Plus</h1>
          <p className="text-gray-500 leading-relaxed">
            We are a next-generation crypto investment platform built to make wealth creation accessible to everyone — from first-time savers to seasoned investors.
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-10 space-y-8">

        {/* Mission */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Invest Plus was founded with one goal in mind: to democratize access to crypto investment returns. Traditional investment platforms require large capital and complex setups. We believe everyone deserves the opportunity to grow their money — starting from just $500.
          </p>
        </div>

        {/* What we offer */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">What We Offer</h2>
          </div>
          <div className="space-y-3">
            {[
              { title: "Multi-Coin Wallet",     desc: "Hold, deposit, and withdraw BTC, ETH, BNB, USDT and TRX all in one place." },
              { title: "Instant Swaps",          desc: "Swap between any supported cryptocurrencies at real-time rates with zero wait." },
              { title: "Investment Plans",       desc: "Three structured plans — Starter, Growth, and Elite — each with fixed ROI and duration." },
              { title: "Real-Time Portfolio",    desc: "Track your total balance, per-coin holdings, and investment progress at a glance." },
            ].map(item => (
              <div key={item.title} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-gray-800">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our values */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center">
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Shield className="w-4 h-4 text-blue-600" />,   title: "Transparency",  desc: "Clear fees, clear returns, no hidden surprises." },
              { icon: <Award className="w-4 h-4 text-amber-500" />,   title: "Integrity",     desc: "We only promise what we can deliver." },
              { icon: <Users className="w-4 h-4 text-purple-600" />,  title: "Accessibility", desc: "Low minimums so everyone can participate." },
              { icon: <TrendingUp className="w-4 h-4 text-green-600" />, title: "Growth",     desc: "Your financial progress is our success." },
            ].map(v => (
              <div key={v.title} className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                <div className="flex items-center gap-1.5 mb-1">
                  {v.icon}
                  <span className="text-xs font-bold text-gray-800">{v.title}</span>
                </div>
                <p className="text-xs text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-blue-600 rounded-3xl p-6 text-white">
          <h2 className="text-lg font-bold mb-5 text-center">By the Numbers</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "50K+",   label: "Investors" },
              { value: "100+",   label: "Coins Supported" },
              { value: "99.9%",  label: "Uptime" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-xs text-blue-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Our Team</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Invest Plus is built by a team of fintech engineers, crypto specialists, and financial advisors united by a shared vision: making crypto investment simple, safe, and rewarding.
          </p>
          <div className="flex gap-3">
            {["Engineering", "Finance", "Security", "Support"].map(dept => (
              <div key={dept} className="flex-1 bg-gray-50 rounded-xl py-2 px-1 text-center border border-gray-100">
                <div className="text-[10px] font-semibold text-gray-500">{dept}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to get started?</h3>
          <p className="text-sm text-gray-400 mb-5">Join thousands of investors growing their crypto wealth today.</p>
          <Link href="/register">
            <button className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-2xl hover:bg-blue-700 transition-colors">
              Create Free Account →
            </button>
          </Link>
          <div className="mt-3 text-xs text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-6 py-6 mt-4">
        <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
          <Link href="/" className="hover:text-blue-600 transition-colors font-medium">Home</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors font-medium text-blue-600">About Us</Link>
          <Link href="/terms" className="hover:text-blue-600 transition-colors font-medium">Terms & Policy</Link>
        </div>
        <p className="text-xs text-gray-300 text-center mt-3">© 2026 Invest Plus. All rights reserved.</p>
      </footer>
    </div>
  );
}
