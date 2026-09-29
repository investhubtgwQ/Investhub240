import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { setAuthToken } from "@/lib/auth";
import {
  Mail, Lock, User, ArrowRight, AlertCircle, Eye, EyeOff,
  ShieldCheck, Phone, Globe, Calendar, ChevronDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Bolivia",
  "Bosnia and Herzegovina","Brazil","Bulgaria","Cambodia","Cameroon","Canada",
  "Chile","China","Colombia","Congo","Costa Rica","Croatia","Cuba","Cyprus",
  "Czech Republic","Denmark","Ecuador","Egypt","El Salvador","Estonia","Ethiopia",
  "Finland","France","Georgia","Germany","Ghana","Greece","Guatemala","Honduras",
  "Hungary","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Latvia",
  "Lebanon","Libya","Lithuania","Luxembourg","Malaysia","Mexico","Moldova",
  "Mongolia","Morocco","Mozambique","Myanmar","Nepal","Netherlands","New Zealand",
  "Nicaragua","Nigeria","North Korea","Norway","Oman","Pakistan","Palestine",
  "Panama","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania",
  "Russia","Rwanda","Saudi Arabia","Senegal","Serbia","Singapore","Slovakia",
  "Slovenia","Somalia","South Africa","South Korea","Spain","Sri Lanka","Sudan",
  "Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand",
  "Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam",
  "Yemen","Zambia","Zimbabwe",
];

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

async function registerUser(data: {
  fullName: string; email: string; password: string;
  phone?: string; country?: string; dateOfBirth?: string; gender?: string;
}) {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || "Registration failed");
  return body;
}

// Step indicator
function StepDot({ active, done }: { active: boolean; done: boolean }) {
  return (
    <div className={`w-2 h-2 rounded-full transition-colors ${done ? "bg-blue-600" : active ? "bg-blue-600" : "bg-gray-200"}`} />
  );
}

export default function Register() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Step 1 — Personal info
  const [fullName, setFullName]       = useState("");
  const [email, setEmail]             = useState("");
  const [phone, setPhone]             = useState("");
  const [country, setCountry]         = useState("");

  // Step 2 — Account details
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender]           = useState("");
  const [password, setPassword]       = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);

  const [step, setStep]       = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (isAuthenticated && !isLoading) setLocation("/dashboard");
  }, [isAuthenticated, isLoading, setLocation]);

  const validateStep1 = () => {
    if (!fullName.trim())  { setError("Full name is required");    return false; }
    if (!email.trim() || !email.includes("@")) { setError("Valid email is required"); return false; }
    if (!phone.trim())     { setError("Phone number is required"); return false; }
    if (!country)          { setError("Please select your country"); return false; }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 8) { setError("Password must be at least 8 characters"); return; }
    if (password !== confirmPassword)     { setError("Passwords do not match");                return; }
    setError("");
    setSubmitting(true);
    try {
      const data = await registerUser({ fullName, email, password, phone, country, dateOfBirth, gender });
      setAuthToken(data.token);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
      toast({ title: "Registration Failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col items-center justify-center px-4 py-10">
      {/* Logo */}
      <div className="mb-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-200">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M8 16C8 11.582 11.582 8 16 8C20.418 8 24 11.582 24 16C24 20.418 20.418 24 16 24C11.582 24 8 20.418 8 16Z" fill="white" fillOpacity="0.3"/>
            <path d="M13 16L15.5 18.5L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Invest Plus</h1>
        <p className="text-xs text-gray-400 mt-0.5">Your crypto investment wallet</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        {/* Header + step dots */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {step === 1 ? "Create account" : "Account details"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {step === 1 ? "Personal information" : "Security & identity"}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <StepDot active={step === 1} done={step > 1} />
            <StepDot active={step === 2} done={false} />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* ── Step 1: Personal info ── */}
        {step === 1 && (
          <div className="mt-5 space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={e => { setFullName(e.target.value); setError(""); }}
                  placeholder="Your full legal name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setError(""); }}
                  placeholder="+1 000 000 0000"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Country of Residence</label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select
                  value={country}
                  onChange={e => { setCountry(e.target.value); setError(""); }}
                  className="w-full pl-10 pr-9 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white transition-colors appearance-none"
                >
                  <option value="" disabled>Select your country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Step 2: Account details ── */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Date of Birth */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={e => setDateOfBirth(e.target.value)}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-1">You must be at least 18 years old</p>
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Gender <span className="text-gray-300 font-normal normal-case">(optional)</span></label>
              <div className="flex gap-2">
                {["Male", "Female", "Other", "Prefer not to say"].map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(gender === g ? "" : g)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                      gender === g
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 text-gray-500 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {g === "Prefer not to say" ? "Prefer not" : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Minimum 8 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:bg-white transition-colors ${
                    confirmPassword && confirmPassword !== password ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs text-red-500 mt-1.5 ml-1">Passwords do not match</p>
              )}
            </div>

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => { setStep(1); setError(""); }}
                className="flex-none px-4 py-3.5 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white font-semibold py-3.5 rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </form>
        )}

        <p className="text-sm text-center text-gray-400 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
