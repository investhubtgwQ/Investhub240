import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Copy,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  WalletCards,
  X,
  XCircle,
} from "lucide-react";
import { getAuthToken } from "@/lib/auth";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";
const ADMIN_TOKEN_KEY = "invest_plus_admin_token";

type Section = "overview" | "requests" | "users" | "settings";
type RequestStatus = "pending" | "approved" | "rejected";

function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

function setAdminToken(token: string) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

async function adminFetch(path: string, options: RequestInit = {}) {
  const token = getAdminToken();
  const response = await fetch(`${BASE}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || `Request failed (${response.status})`);
  return body;
}

function formatMoney(value: number) {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function AdminLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-blue-500/15 flex items-center justify-center border border-blue-400/20">
        <ShieldCheck className="h-5 w-5 text-blue-300" />
      </div>
      {!compact && (
        <div>
          <p className="font-bold tracking-tight text-white">Invest Plus</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-blue-200/60">Admin console</p>
        </div>
      )}
    </div>
  );
}

export function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (getAdminToken()) setLocation("/admin");
  }, [setLocation]);

  const login = useMutation({
    mutationFn: () => adminFetch("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
    onSuccess: data => {
      setAdminToken(data.token);
      setLocation("/admin");
    },
    onError: (err: Error) => setError(err.message),
  });

  return (
    <div className="min-h-screen bg-[#eef2f8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="rounded-2xl bg-[#0b1730] p-3 shadow-xl shadow-blue-900/15">
            <AdminLogo compact />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[28px] p-7 sm:p-9 shadow-sm">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 mb-2">Restricted access</p>
            <h1 className="text-2xl font-bold text-gray-950">Admin sign in</h1>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Manage wallet operations and review customer requests from one secure workspace.
            </p>
          </div>
          {error && (
            <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <form
            onSubmit={event => {
              event.preventDefault();
              setError("");
              if (email && password) login.mutate();
            }}
            className="space-y-5"
          >
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Admin email</span>
              <input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
                autoComplete="username"
                placeholder="admin@yourdomain.com"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Password</span>
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your admin password"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </label>
            <button
              type="submit"
              disabled={login.isPending}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60"
            >
              {login.isPending ? "Signing in…" : "Enter admin console"}
            </button>
          </form>
          <Link href="/" className="mt-6 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-blue-600">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Invest Plus
          </Link>
        </div>
        <p className="mt-5 text-center text-xs text-gray-400">
          Credentials are managed by server environment secrets.
        </p>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: RequestStatus }) {
  const styles = {
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
    rejected: "bg-red-50 text-red-700 border-red-100",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}

function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  helper: string;
  icon: typeof Activity;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-950">{value}</p>
        </div>
        <div className={`rounded-xl p-2.5 ${tone}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-400">{helper}</p>
    </div>
  );
}

function RequestCard({
  request,
  onReview,
  isReviewing,
}: {
  request: any;
  onReview: (id: number, status: "approved" | "rejected") => void;
  isReviewing: boolean;
}) {
  const isDeposit = request.type === "deposit";
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`rounded-xl p-2.5 ${isDeposit ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}>
            {isDeposit ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-gray-950">{isDeposit ? "Deposit request" : "Withdrawal request"}</h3>
              <StatusPill status={request.status} />
            </div>
            <p className="mt-1 text-sm text-gray-500">{request.user?.fullName} · {request.user?.email}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-950">{request.amount} {request.symbol}</p>
          <p className="text-xs text-gray-400">{formatMoney(request.usdAmount)}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 rounded-xl bg-gray-50 p-3.5 text-xs sm:grid-cols-2">
        <div>
          <p className="font-semibold uppercase tracking-wide text-gray-400">Network</p>
          <p className="mt-1 text-gray-700">{request.network || "—"}</p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wide text-gray-400">Submitted</p>
          <p className="mt-1 text-gray-700">{formatDate(request.createdAt)}</p>
        </div>
        {request.destinationAddress && (
          <div className="sm:col-span-2">
            <p className="font-semibold uppercase tracking-wide text-gray-400">Destination address</p>
            <p className="mt-1 break-all font-mono text-[11px] text-gray-700">{request.destinationAddress}</p>
          </div>
        )}
      </div>
      {request.status === "pending" && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onReview(request.id, "approved")}
            disabled={isReviewing}
            className="flex-1 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            <Check className="mr-1.5 inline h-4 w-4" /> Approve
          </button>
          <button
            onClick={() => onReview(request.id, "rejected")}
            disabled={isReviewing}
            className="flex-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
          >
            <X className="mr-1.5 inline h-4 w-4" /> Reject
          </button>
        </div>
      )}
      {request.reviewNote && <p className="mt-3 text-xs text-gray-500">Note: {request.reviewNote}</p>}
    </div>
  );
}

function AdminSidebar({
  section,
  setSection,
  onLogout,
  open,
}: {
  section: Section;
  setSection: (section: Section) => void;
  onLogout: () => void;
  open: boolean;
}) {
  const items: Array<{ id: Section; label: string; icon: typeof Activity }> = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "requests", label: "Review requests", icon: ClipboardList },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Wallet settings", icon: Settings2 },
  ];
  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0b1730] px-4 py-5 text-white transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="px-2">
        <AdminLogo />
      </div>
      <div className="my-8 h-px bg-white/10" />
      <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/50">Workspace</p>
      <nav className="mt-3 space-y-1">
        {items.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                section === item.id ? "bg-blue-500 text-white shadow-lg shadow-blue-950/20" : "text-blue-100/65 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
              {item.id === "requests" && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
            </button>
          );
        })}
      </nav>
      <div className="absolute bottom-5 left-4 right-4">
        <div className="mb-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-blue-300" />
            <span className="text-xs font-semibold text-blue-100/80">Protected session</span>
          </div>
          <p className="mt-1 text-[10px] text-blue-100/45">Session expires automatically</p>
        </div>
        <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-blue-100/65 hover:bg-white/5 hover:text-white">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [section, setSection] = useState<Section>("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [requestFilter, setRequestFilter] = useState<"pending" | "approved" | "rejected">("pending");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [adjustment, setAdjustment] = useState({ coinSlug: "usdt", amount: "", note: "" });
  const [walletDrafts, setWalletDrafts] = useState<Record<string, any>>({});
  const [appDraft, setAppDraft] = useState({
    requireDepositApproval: true,
    requireWithdrawalApproval: true,
    maintenanceMode: false,
  });
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (!getAdminToken()) setLocation("/admin/login");
  }, [setLocation]);

  const requestsQuery = useQuery({
    queryKey: ["admin-requests", requestFilter],
    queryFn: () => adminFetch(`/admin/requests?status=${requestFilter}`),
    enabled: !!getAdminToken(),
    refetchInterval: 20_000,
  });
  const usersQuery = useQuery({
    queryKey: ["admin-users", search],
    queryFn: () => adminFetch(`/admin/users${search ? `?search=${encodeURIComponent(search)}` : ""}`),
    enabled: !!getAdminToken(),
  });
  const settingsQuery = useQuery({
    queryKey: ["admin-settings"],
    queryFn: () => adminFetch("/admin/settings"),
    enabled: !!getAdminToken(),
  });

  useEffect(() => {
    if (settingsQuery.data) {
      const drafts: Record<string, any> = {};
      for (const setting of settingsQuery.data.walletSettings ?? []) drafts[setting.coinSlug] = { ...setting };
      setWalletDrafts(drafts);
      setAppDraft({
        requireDepositApproval: settingsQuery.data.appSettings?.requireDepositApproval ?? true,
        requireWithdrawalApproval: settingsQuery.data.appSettings?.requireWithdrawalApproval ?? true,
        maintenanceMode: settingsQuery.data.appSettings?.maintenanceMode ?? false,
      });
    }
  }, [settingsQuery.data]);

  const reviewMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: "approved" | "rejected" }) =>
      adminFetch(`/admin/requests/${id}/review`, {
        method: "POST",
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      setFlash("Request updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-requests"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: Error) => setFlash(error.message),
  });

  const adjustMutation = useMutation({
    mutationFn: () => adminFetch(`/admin/users/${selectedUser.id}/balance`, {
      method: "POST",
      body: JSON.stringify({
        coinSlug: adjustment.coinSlug,
        amount: Number(adjustment.amount),
        note: adjustment.note,
      }),
    }),
    onSuccess: () => {
      setFlash("Balance adjustment applied");
      setAdjustment({ coinSlug: "usdt", amount: "", note: "" });
      setSelectedUser(null);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: Error) => setFlash(error.message),
  });

  const walletMutation = useMutation({
    mutationFn: (draft: any) => adminFetch(`/admin/settings/wallet/${draft.coinSlug}`, {
      method: "PUT",
      body: JSON.stringify({
        depositAddress: draft.depositAddress,
        network: draft.network,
        enabled: draft.enabled,
      }),
    }),
    onSuccess: () => {
      setFlash("Wallet address saved");
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    },
    onError: (error: Error) => setFlash(error.message),
  });

  const appMutation = useMutation({
    mutationFn: () => adminFetch("/admin/settings/app", {
      method: "PUT",
      body: JSON.stringify({ settings: appDraft }),
    }),
    onSuccess: () => {
      setFlash("Platform settings saved");
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    },
    onError: (error: Error) => setFlash(error.message),
  });

  const requests = requestsQuery.data ?? [];
  const users = usersQuery.data ?? [];
  const pendingRequests = requestsFilterPending(requests);
  const requestCounts = useMemo(() => ({
    deposits: requests.filter((item: any) => item.type === "deposit").length,
    withdrawals: requests.filter((item: any) => item.type === "withdrawal").length,
  }), [requests]);

  const logout = async () => {
    try {
      await adminFetch("/admin/auth/logout", { method: "POST" });
    } finally {
      clearAdminToken();
      setLocation("/admin/login");
    }
  };

  useEffect(() => {
    if (flash) {
      const timeout = window.setTimeout(() => setFlash(""), 3500);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [flash]);

  if (!getAdminToken()) return null;

  const title = {
    overview: "Overview",
    requests: "Review requests",
    users: "User management",
    settings: "Wallet settings",
  }[section];

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-gray-900 lg:flex">
      <AdminSidebar section={section} setSection={next => { setSection(next); setMobileNav(false); }} onLogout={logout} open={mobileNav} />
      {mobileNav && <button aria-label="Close navigation" onClick={() => setMobileNav(false)} className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" />}
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileNav(true)} className="rounded-lg p-2 hover:bg-gray-100 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">Operations</p>
              <h1 className="text-lg font-bold text-gray-950">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { requestsQuery.refetch(); usersQuery.refetch(); }} className="rounded-xl border border-gray-200 p-2.5 text-gray-500 hover:bg-gray-50" title="Refresh data">
              <RefreshCw className={`h-4 w-4 ${requestsQuery.isFetching ? "animate-spin" : ""}`} />
            </button>
            <div className="hidden items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-gray-500">Live console</span>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-[1440px] p-4 sm:p-8">
          {flash && (
            <div className={`mb-5 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${flash.toLowerCase().includes("error") || flash.toLowerCase().includes("enough") ? "border-red-100 bg-red-50 text-red-700" : "border-emerald-100 bg-emerald-50 text-emerald-700"}`}>
              {flash.toLowerCase().includes("error") ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              {flash}
            </div>
          )}

          {section === "overview" && (
            <Overview
              requests={pendingRequests}
              users={users}
              counts={requestCounts}
              onReview={(id, status) => reviewMutation.mutate({ id, status })}
              isReviewing={reviewMutation.isPending}
              goTo={setSection}
            />
          )}

          {section === "requests" && (
            <section>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Review deposits and withdrawals before they affect customer balances.</p>
                </div>
                <div className="flex rounded-xl border border-gray-200 bg-white p-1">
                  {(["pending", "approved", "rejected"] as const).map(status => (
                    <button key={status} onClick={() => setRequestFilter(status)} className={`rounded-lg px-3 py-2 text-xs font-bold capitalize ${requestFilter === status ? "bg-[#0b1730] text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              {requestsQuery.isLoading ? <LoadingState /> : requests.length === 0 ? <EmptyState icon={ClipboardList} title={`No ${requestFilter} requests`} body="New wallet requests will appear here automatically." /> : (
                <div className="grid gap-4 xl:grid-cols-2">
                  {requests.map((request: any) => <RequestCard key={request.id} request={request} onReview={(id, status) => reviewMutation.mutate({ id, status })} isReviewing={reviewMutation.isPending} />)}
                </div>
              )}
            </section>
          )}

          {section === "users" && (
            <section>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">View customer accounts and apply audited balance adjustments.</p>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search name or email" className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              {usersQuery.isLoading ? <LoadingState /> : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="hidden grid-cols-[1.6fr_1.3fr_1fr_1fr_auto] gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 md:grid">
                    <span>User</span><span>Location</span><span>Joined</span><span>Portfolio</span><span />
                  </div>
                  {users.length === 0 ? <EmptyState icon={Users} title="No users found" body="Try a different search term." /> : users.map((user: any) => (
                    <div key={user.id} className="grid gap-3 border-b border-gray-100 px-5 py-4 last:border-0 md:grid-cols-[1.6fr_1.3fr_1fr_1fr_auto] md:items-center md:gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">{user.fullName?.slice(0, 2).toUpperCase()}</div>
                        <div className="min-w-0"><p className="truncate text-sm font-bold text-gray-900">{user.fullName}</p><p className="truncate text-xs text-gray-400">{user.email}</p></div>
                      </div>
                      <p className="text-xs text-gray-500">{user.country || "Not provided"}</p>
                      <p className="text-xs text-gray-500">{formatDate(user.createdAt)}</p>
                      <p className="text-sm font-bold text-gray-900">{formatMoney(user.totalUsd)}</p>
                      <button onClick={() => setSelectedUser(user)} className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100">Adjust</button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {section === "settings" && (
            <SettingsSection
              walletSettings={Object.values(walletDrafts)}
              appDraft={appDraft}
              setAppDraft={setAppDraft}
              onWalletChange={(coinSlug, field, value) => setWalletDrafts(current => ({ ...current, [coinSlug]: { ...current[coinSlug], [field]: value } }))}
              onSaveWallet={draft => walletMutation.mutate(draft)}
              onSaveApp={() => appMutation.mutate()}
              savingWallet={walletMutation.isPending}
              savingApp={appMutation.isPending}
            />
          )}
        </div>
      </main>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div><p className="text-xs font-bold uppercase tracking-wide text-blue-600">Audited action</p><h2 className="mt-1 text-lg font-bold">Adjust balance</h2><p className="mt-1 text-xs text-gray-500">{selectedUser.fullName} · {selectedUser.email}</p></div>
              <button onClick={() => setSelectedUser(null)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-6 space-y-4">
              <label className="block"><span className="text-xs font-bold uppercase tracking-wide text-gray-500">Asset</span><select value={adjustment.coinSlug} onChange={event => setAdjustment(current => ({ ...current, coinSlug: event.target.value }))} className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm outline-none"><option value="usdt">USDT</option><option value="btc">BTC</option><option value="eth">ETH</option><option value="bnb">BNB</option><option value="trx">TRX</option></select></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wide text-gray-500">Amount</span><input type="number" step="any" value={adjustment.amount} onChange={event => setAdjustment(current => ({ ...current, amount: event.target.value }))} placeholder="Use a negative amount to debit" className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm outline-none focus:border-blue-500" /></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wide text-gray-500">Reason</span><textarea value={adjustment.note} onChange={event => setAdjustment(current => ({ ...current, note: event.target.value }))} placeholder="Required internal note" rows={3} className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm outline-none focus:border-blue-500" /></label>
              <button onClick={() => adjustMutation.mutate()} disabled={adjustMutation.isPending || !adjustment.amount || !adjustment.note.trim()} className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50">{adjustMutation.isPending ? "Applying…" : "Apply adjustment"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function requestsFilterPending(requests: any[]) {
  return requests.filter(request => request.status === "pending");
}

function Overview({
  requests,
  users,
  counts,
  onReview,
  isReviewing,
  goTo,
}: {
  requests: any[];
  users: any[];
  counts: { deposits: number; withdrawals: number };
  onReview: (id: number, status: "approved" | "rejected") => void;
  isReviewing: boolean;
  goTo: (section: Section) => void;
}) {
  const totalPendingUsd = requests.reduce((sum, item) => sum + item.usdAmount, 0);
  return (
    <section>
      <div className="mb-7">
        <p className="text-sm text-gray-500">Here’s what needs your attention today.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending requests" value={String(requests.length)} helper={`${counts.deposits} deposits · ${counts.withdrawals} withdrawals`} icon={ClipboardList} tone="bg-blue-50 text-blue-600" />
        <StatCard label="Awaiting review" value={formatMoney(totalPendingUsd)} helper="Total request value" icon={CircleDollarSign} tone="bg-amber-50 text-amber-600" />
        <StatCard label="Registered users" value={String(users.length)} helper="Showing up to 100 accounts" icon={Users} tone="bg-violet-50 text-violet-600" />
        <StatCard label="System status" value="Operational" helper="All admin services online" icon={Activity} tone="bg-emerald-50 text-emerald-600" />
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-gray-950">Needs attention</h2><p className="mt-1 text-xs text-gray-500">Pending requests are listed newest first.</p></div>
        <button onClick={() => goTo("requests")} className="text-xs font-bold text-blue-600 hover:text-blue-700">View all <ChevronRight className="inline h-3.5 w-3.5" /></button>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        {requests.slice(0, 4).map(request => <RequestCard key={request.id} request={request} onReview={onReview} isReviewing={isReviewing} />)}
        {requests.length === 0 && <EmptyState icon={CheckCircle2} title="All caught up" body="There are no pending wallet requests to review." />}
      </div>
    </section>
  );
}

function SettingsSection({
  walletSettings,
  appDraft,
  setAppDraft,
  onWalletChange,
  onSaveWallet,
  onSaveApp,
  savingWallet,
  savingApp,
}: {
  walletSettings: any[];
  appDraft: Record<string, boolean>;
  setAppDraft: (value: any) => void;
  onWalletChange: (coinSlug: string, field: string, value: any) => void;
  onSaveWallet: (draft: any) => void;
  onSaveApp: () => void;
  savingWallet: boolean;
  savingApp: boolean;
}) {
  return (
    <section className="space-y-8">
      <div><p className="text-sm text-gray-500">Control receiving addresses, networks, asset visibility, and operational safeguards.</p></div>
      <div>
        <div className="mb-4 flex items-center gap-2"><WalletCards className="h-5 w-5 text-blue-600" /><div><h2 className="font-bold">Deposit wallet addresses</h2><p className="text-xs text-gray-500">Changes are reflected in customer deposit instructions.</p></div></div>
        <div className="space-y-3">
          {walletSettings.map(setting => (
            <div key={setting.coinSlug} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[10px] font-black text-gray-700">{setting.coinSlug.toUpperCase().slice(0, 3)}</div>
                <div className="w-20"><p className="text-sm font-bold">{setting.coinSlug.toUpperCase()}</p><p className="text-[10px] text-gray-400">{setting.enabled ? "Visible" : "Hidden"}</p></div>
                <input value={setting.network} onChange={event => onWalletChange(setting.coinSlug, "network", event.target.value)} className="min-w-[180px] flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs outline-none focus:border-blue-500" placeholder="Network" />
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-500"><input type="checkbox" checked={setting.enabled} onChange={event => onWalletChange(setting.coinSlug, "enabled", event.target.checked)} /> Enabled</label>
              </div>
              <div className="mt-3 flex gap-2">
                <input value={setting.depositAddress} onChange={event => onWalletChange(setting.coinSlug, "depositAddress", event.target.value)} className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 font-mono text-xs outline-none focus:border-blue-500" placeholder="Deposit address" />
                <button onClick={() => onSaveWallet(setting)} disabled={savingWallet} className="rounded-lg bg-[#0b1730] px-4 py-2 text-xs font-bold text-white hover:bg-blue-900 disabled:opacity-50">Save</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2"><SlidersHorizontal className="h-5 w-5 text-blue-600" /><div><h2 className="font-bold">Platform controls</h2><p className="text-xs text-gray-500">Keep review gates enabled for manual operations.</p></div></div>
        <div className="mt-5 divide-y divide-gray-100">
          {[
            ["requireDepositApproval", "Require deposit approval", "Deposits stay pending until an admin confirms them."],
            ["requireWithdrawalApproval", "Require withdrawal approval", "Withdrawals reserve availability until reviewed."],
            ["maintenanceMode", "Maintenance mode", "Use this to pause customer-facing wallet operations."],
          ].map(([key, label, description]) => (
            <label key={key} className="flex cursor-pointer items-center justify-between gap-4 py-4">
              <div><p className="text-sm font-semibold text-gray-800">{label}</p><p className="mt-1 text-xs text-gray-400">{description}</p></div>
              <input type="checkbox" checked={!!appDraft[key]} onChange={event => setAppDraft({ ...appDraft, [key]: event.target.checked })} className="h-4 w-4 accent-blue-600" />
            </label>
          ))}
        </div>
        <button onClick={onSaveApp} disabled={savingApp} className="mt-3 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50">{savingApp ? "Saving…" : "Save platform settings"}</button>
      </div>
    </section>
  );
}

function LoadingState() {
  return <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-400">Loading admin data…</div>;
}

function EmptyState({ icon: Icon, title, body }: { icon: typeof Activity; title: string; body: string }) {
  return <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center sm:col-span-2"><Icon className="mx-auto h-8 w-8 text-gray-300" /><h3 className="mt-3 font-bold text-gray-800">{title}</h3><p className="mt-1 text-sm text-gray-400">{body}</p></div>;
}