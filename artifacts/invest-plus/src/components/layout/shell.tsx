import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Home, TrendingUp, Repeat2, ShieldCheck, Settings } from "lucide-react";

function BottomNav() {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const items = [
    { href: "/dashboard", icon: Home,         label: "Home"    },
    { href: "/plans",     icon: TrendingUp,   label: "Invest"  },
    { href: "/dashboard?tab=swap", icon: Repeat2, label: "Swap" },
    { href: "/wallets",   icon: ShieldCheck,  label: "Wallets" },
    { href: "/settings",  icon: Settings,     label: "Settings"},
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
      {items.map(({ href, icon: Icon, label }) => {
        const base = href.split("?")[0];
        const isActive = location === base || (base === "/dashboard" && location === "/");
        return (
          <Link key={href} href={href}>
            <div className="flex flex-col items-center gap-0.5 px-4 py-1 cursor-pointer">
              <Icon
                className={`w-5 h-5 transition-colors ${isActive ? "text-blue-600" : "text-gray-400"}`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f5f6fa] text-foreground overflow-hidden">
      <main className={`flex-1 flex flex-col ${isAuthenticated && !isAdminRoute ? "pb-16" : ""}`}>
        {children}
      </main>
      {!isAdminRoute && <BottomNav />}
    </div>
  );
}
