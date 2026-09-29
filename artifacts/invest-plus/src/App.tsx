import { initAuth } from "@/lib/auth";
import { AuthProvider } from "@/hooks/use-auth";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { Shell } from "@/components/layout/shell";
import Home from "@/pages/home";
import Plans from "@/pages/plans";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Settings from "@/pages/settings";
import About from "@/pages/about";
import Terms from "@/pages/terms";
import Wallets from "@/pages/wallets";
import AdminPanel, { AdminLogin } from "@/pages/admin";

// Initialize the API client
initAuth();

const queryClient = new QueryClient();

function Router() {
  return (
    <Shell>
      <Switch>
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/" component={Home} />
        <Route path="/plans" component={Plans} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/settings" component={Settings} />
        <Route path="/wallets" component={Wallets} />
        <Route path="/about" component={About} />
        <Route path="/terms" component={Terms} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <AuthProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
