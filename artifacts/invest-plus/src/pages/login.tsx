import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useLogin } from "@workspace/api-client-react";
import { setAuthToken } from "@/lib/auth";
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const loginMutation = useLogin();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect") || "/dashboard";
      setLocation(redirect);
    }
  }, [isAuthenticated, isLoading, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    loginMutation.mutate({ data: { email, password } }, {
      onSuccess: (data) => {
        setAuthToken(data.token);
        const params = new URLSearchParams(window.location.search);
        window.location.href = params.get("redirect") || "/dashboard";
      },
      onError: (error) => {
        toast({
          title: "Login Failed",
          description: error.data?.error || "Invalid email or password",
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 16C8 11.582 11.582 8 16 8V8C20.418 8 24 11.582 24 16V16C24 20.418 20.418 24 16 24V24C11.582 24 8 20.418 8 16V16Z" fill="white" fillOpacity="0.3"/>
            <path d="M13 16L15.5 18.5L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Invest Plus</h1>
        <p className="text-sm text-gray-400 mt-1">Your crypto investment wallet</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h2>
        <p className="text-sm text-gray-400 mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMutation.error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {loginMutation.error.data?.error || "Invalid credentials"}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
              <Link href="#" className="text-xs text-blue-600 font-medium hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
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
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {loginMutation.isPending ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>Sign In <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-5">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
