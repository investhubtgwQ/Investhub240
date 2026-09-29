import { useState, useEffect, useRef, type ReactNode } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  ArrowUpRight, ArrowDownLeft, RefreshCw, Plus, ChevronRight,
  History, ScanQrCode, Sparkles, X, ChevronDown, AlertCircle,
  Check, Copy, ArrowLeft, Clock, TrendingUp, TrendingDown,
  Wallet, ExternalLink, CheckCircle2, Send, Search
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/auth";
import QRCode from "qrcode";

// ─── Hardcoded deposit addresses (frontend fallback) ─────────────────────────
const DEPOSIT_ADDRESSES: Record<string, { address: string; network: string }> = {
  usdt: { address: "TJYeasTPa6gpEEhTKHSENkHPKh1BHXQ7N1",          network: "TRC20 (Tron)" },
  btc:  { address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",  network: "Bitcoin (BTC)" },
  eth:  { address: "0x742d35Cc6634C0532925a3b8D4C9C4B4d5e6F7a1",  network: "Ethereum (ERC20)" },
  bnb:  { address: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2", network: "BSC (BEP20)" },
  trx:  { address: "TRX7NHqjeKQxGTCi8q8ZY4pL5Zae3KZkKb",         network: "TRC20 (Tron)" },
};

// ─── API helpers ─────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

async function apiFetch(path: string, opts: RequestInit = {}) {
  const token = getAuthToken();
  const res = await fetch(`${BASE}/api${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

function useWalletBalances() {
  return useQuery({
    queryKey: ["wallet-balances"],
    queryFn: () => apiFetch("/wallet/balances"),
    refetchInterval: 30_000,
  });
}

function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => apiFetch("/transactions"),
  });
}

// ─── Coin logo SVGs (all 27 coins, brand-accurate) ───────────────────────────

function CoinLogo({ slug, size = 40 }: { slug: string; size?: number }) {
  const s = size;
  const logos: Record<string, ReactNode> = {
    // ── Tether USDT ──
    usdt: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#26A17B"/>
      <rect x="11" y="13" width="18" height="3.5" rx="1.75" fill="white"/>
      <rect x="18.25" y="16.5" width="3.5" height="11" rx="1.75" fill="white"/>
      <ellipse cx="20" cy="22" rx="7" ry="2.5" fill="white" opacity="0.35"/>
    </svg>,

    // ── Bitcoin ──
    btc: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#F7931A"/>
      <path d="M24.5 17.5c.3-2-1.2-3-3.3-3.7l.7-2.8-1.7-.4-.7 2.7-1.3-.3.7-2.7-1.7-.4-.7 2.8-2.6-.6-.5 1.8s1.3.3 1.2.3c.7.2.8.6.8 1l-2 7.9c-.1.2-.3.5-.8.4 0 .1-1.2-.3-1.2-.3l-.8 2 2.5.6-.7 2.8 1.7.4.7-2.8 1.3.3-.7 2.8 1.7.4.7-2.8c2.9.6 5.1.3 6-2.3.7-2-.1-3.2-1.5-3.9 1.1-.3 1.9-1 2.2-2.5zm-3.9 5.5c-.5 2-3.9.9-5 .6l.9-3.6c1.1.3 4.6.8 4.1 3zm.5-5.5c-.5 1.8-3.3.9-4.2.7l.8-3.3c.9.2 3.8.6 3.4 2.6z" fill="white"/>
    </svg>,

    // ── Ethereum ──
    eth: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#627EEA"/>
      <polygon points="20,8 13,21 20,25 27,21" fill="white" opacity="0.9"/>
      <polygon points="20,27 13,23 20,32 27,23" fill="white" opacity="0.7"/>
      <polygon points="20,8 20,25 27,21" fill="white" opacity="0.5"/>
      <polygon points="20,27 20,32 27,23" fill="white" opacity="0.4"/>
    </svg>,

    // ── BNB ──
    bnb: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#1E2026"/>
      <path d="M20 10l2.5 2.5-7.5 7.5-2.5-2.5L20 10z" fill="#F3BA2F"/>
      <path d="M25 15l2.5 2.5-12.5 12.5-2.5-2.5L25 15z" fill="#F3BA2F"/>
      <path d="M15 15l2.5 2.5 2.5-2.5-2.5-2.5L15 15z" fill="#F3BA2F"/>
      <path d="M25 25l2.5 2.5-2.5 2.5-2.5-2.5L25 25z" fill="#F3BA2F"/>
      <path d="M20 20l2.5 2.5-2.5 2.5-2.5-2.5L20 20z" fill="#F3BA2F"/>
    </svg>,

    // ── Tron ──
    trx: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#EF0027"/>
      <polygon points="11,14 29,19 20,31" fill="white" opacity="0.95"/>
      <polygon points="11,14 20,22 20,31" fill="white" opacity="0.5"/>
    </svg>,

    // ── XRP ──
    xrp: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#346AA9"/>
      <path d="M27 12h3l-7 7c-1.7 1.7-4.3 1.7-6 0l-7-7h3l5.5 5.5c.8.8 2.2.8 3 0L27 12z" fill="white"/>
      <path d="M13 28h-3l7-7c1.7-1.7 4.3-1.7 6 0l7 7h-3l-5.5-5.5c-.8-.8-2.2-.8-3 0L13 28z" fill="white"/>
    </svg>,

    // ── Solana ──
    sol: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#9945FF"/>
      <defs>
        <linearGradient id="sol-g" x1="10" y1="20" x2="30" y2="20">
          <stop offset="0%" stopColor="#00FFA3"/>
          <stop offset="100%" stopColor="#DC1FFF"/>
        </linearGradient>
      </defs>
      <rect x="10" y="13" width="20" height="3" rx="1.5" fill="url(#sol-g)"/>
      <rect x="10" y="18.5" width="20" height="3" rx="1.5" fill="url(#sol-g)"/>
      <rect x="10" y="24" width="20" height="3" rx="1.5" fill="url(#sol-g)"/>
    </svg>,

    // ── Cardano ──
    ada: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#0033AD"/>
      <circle cx="20" cy="13" r="2" fill="white"/>
      <circle cx="20" cy="27" r="2" fill="white"/>
      <circle cx="13" cy="16.5" r="2" fill="white"/>
      <circle cx="27" cy="16.5" r="2" fill="white"/>
      <circle cx="13" cy="23.5" r="2" fill="white"/>
      <circle cx="27" cy="23.5" r="2" fill="white"/>
      <circle cx="20" cy="20" r="3" fill="white" opacity="0.6"/>
    </svg>,

    // ── Dogecoin ──
    doge: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#C2A633"/>
      <circle cx="20" cy="20" r="20" fill="#BA9F33"/>
      <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="15" fontWeight="900" fontFamily="Arial">Ð</text>
    </svg>,

    // ── Polygon ──
    matic: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#8247E5"/>
      <path d="M25.5 16.5l-3-1.7c-.3-.2-.7-.2-1 0l-3 1.7c-.3.2-.5.5-.5.9v3.4c0 .4.2.7.5.9l3 1.7c.3.2.7.2 1 0l3-1.7c.3-.2.5-.5.5-.9v-3.4c0-.4-.2-.7-.5-.9z" fill="white" opacity="0.9"/>
      <path d="M20 11l-8 4.6v9.2l8 4.6 8-4.6v-9.2L20 11zm6 12.7L20 27.2l-6-3.5v-7l6-3.5 6 3.5v7z" fill="white" opacity="0.7"/>
    </svg>,

    // ── Litecoin ──
    ltc: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#345D9D"/>
      <text x="47%" y="56%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">Ł</text>
    </svg>,

    // ── Polkadot ──
    dot: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#E6007A"/>
      <ellipse cx="20" cy="13" rx="4" ry="4" fill="white"/>
      <ellipse cx="20" cy="27" rx="4" ry="4" fill="white"/>
      <ellipse cx="13" cy="20" rx="3" ry="3" fill="white" opacity="0.6"/>
      <ellipse cx="27" cy="20" rx="3" ry="3" fill="white" opacity="0.6"/>
      <ellipse cx="14.5" cy="14.5" rx="2.5" ry="2.5" fill="white" opacity="0.4"/>
      <ellipse cx="25.5" cy="14.5" rx="2.5" ry="2.5" fill="white" opacity="0.4"/>
      <ellipse cx="14.5" cy="25.5" rx="2.5" ry="2.5" fill="white" opacity="0.4"/>
      <ellipse cx="25.5" cy="25.5" rx="2.5" ry="2.5" fill="white" opacity="0.4"/>
    </svg>,

    // ── Avalanche ──
    avax: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#E84142"/>
      <path d="M20 10l8 13.5h-5l-3-5-3 5h-5L20 10z" fill="white"/>
      <path d="M10 26h5l2 3.5H10V26zm15 0h5v3.5H23L25 26z" fill="white" opacity="0.7"/>
    </svg>,

    // ── Chainlink ──
    link: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#2A5ADA"/>
      <path d="M20 10l-3 1.7v10.6l3 1.7 3-1.7V11.7L20 10z" fill="white" opacity="0.9"/>
      <path d="M13 14.3L10 16v8l3 1.7V14.3z" fill="white" opacity="0.7"/>
      <path d="M27 14.3v11.4L30 24v-8l-3-1.7z" fill="white" opacity="0.7"/>
      <path d="M13 26.3L16 28l4-2.3-4-2.3-3 2.6z" fill="white" opacity="0.8"/>
      <path d="M27 26.3L24 28l-4-2.3 4-2.3 3 2.6z" fill="white" opacity="0.8"/>
    </svg>,

    // ── Uniswap ──
    uni: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#FF007A"/>
      <circle cx="16" cy="14" r="3.5" fill="white" opacity="0.9"/>
      <path d="M16 17.5c0 0 1.5 5.5 6.5 7.5s7 2.5 7 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9"/>
      <path d="M13 14c0 0-2 4-1 8s3 6.5 3 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
      <circle cx="27" cy="27" r="3.5" fill="white" opacity="0.9"/>
    </svg>,

    // ── Cosmos ──
    atom: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#2E3148"/>
      <circle cx="20" cy="20" r="3" fill="white"/>
      <ellipse cx="20" cy="20" rx="10" ry="5" stroke="white" strokeWidth="1.5" fill="none"/>
      <ellipse cx="20" cy="20" rx="10" ry="5" stroke="white" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)"/>
      <ellipse cx="20" cy="20" rx="10" ry="5" stroke="white" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)"/>
    </svg>,

    // ── Toncoin ──
    ton: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#0098EA"/>
      <path d="M14 13h12l-6 14L14 13z" fill="white" opacity="0.95"/>
      <path d="M20 27l-6-14h6v14z" fill="white" opacity="0.6"/>
    </svg>,

    // ── Shiba Inu ──
    shib: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#FFA409"/>
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="900" fill="#C2410C" fontFamily="Arial">SHIB</text>
      <circle cx="15" cy="17" r="2.5" fill="#C2410C" opacity="0.8"/>
      <circle cx="25" cy="17" r="2.5" fill="#C2410C" opacity="0.8"/>
      <path d="M16 23c1.1 1.5 6.9 1.5 8 0" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>,

    // ── Stellar ──
    xlm: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#14B6E7"/>
      <path d="M28 14.5l-1.8.9L12 23l-1.5.8.8 1.5 1.8-.9 14.2-7.6 1.5-.8-.8-1.5z" fill="white"/>
      <path d="M10.5 16.5l1.5.8 14.2 7.6 1.8.9.8-1.5-1.5-.8L13 15.9l-1.8-.9-.7 1.5z" fill="white" opacity="0.6"/>
      <circle cx="20" cy="20" r="2.5" fill="white"/>
    </svg>,

    // ── NEAR ──
    near: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#00C08B"/>
      <text x="13" y="23" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial">N</text>
      <path d="M15 13l10 14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <text x="22" y="23" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial">R</text>
    </svg>,

    // ── Algorand ──
    algo: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#00B4D0"/>
      <path d="M16 28l2.5-9 1.5 4 2-4.5 1.5 4L26 28h-2.5l-1-2.5-2 4.5-2-4.5-1 2.5H16z" fill="white"/>
    </svg>,

    // ── Aptos ──
    apt: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#25D4AC"/>
      <circle cx="16" cy="16" r="2.5" fill="white"/>
      <circle cx="24" cy="16" r="2.5" fill="white"/>
      <circle cx="16" cy="24" r="2.5" fill="white"/>
      <circle cx="24" cy="24" r="2.5" fill="white"/>
      <rect x="14" y="19" width="12" height="2" rx="1" fill="white" opacity="0.5"/>
    </svg>,

    // ── Arbitrum ──
    arb: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#28A0F0"/>
      <path d="M20 10L11 25h4l5-8.5 5 8.5h4L20 10z" fill="white" opacity="0.95"/>
      <path d="M14 27l2-3.3 2 3.3H14zm8 0l2-3.3 2 3.3H22z" fill="white" opacity="0.7"/>
    </svg>,

    // ── Optimism ──
    op: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#FF0420"/>
      <circle cx="16" cy="20" r="5" fill="white" opacity="0.9"/>
      <circle cx="24" cy="20" r="5" fill="white" opacity="0.9"/>
      <circle cx="16" cy="20" r="2.5" fill="#FF0420"/>
      <circle cx="24" cy="20" r="2.5" fill="#FF0420"/>
    </svg>,

    // ── Sui ──
    sui: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#6FBCF0"/>
      <path d="M20 10c0 0-8 5-8 12s8 8 8 8 8-1 8-8-8-12-8-12z" fill="white" opacity="0.9"/>
      <path d="M17 22c0 2 1.3 3 3 3s3-1 3-3-1.3-4-3-6c-1.7 2-3 4-3 6z" fill="#6FBCF0"/>
    </svg>,

    // ── Filecoin ──
    fil: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#0090FF"/>
      <path d="M20 10v20M14 14l6-4 6 4M14 26l6 4 6-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="20" cy="20" r="3" fill="white"/>
    </svg>,

    // ── Internet Computer ──
    icp: <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#29ABE2"/>
      <ellipse cx="20" cy="20" rx="10" ry="5" stroke="white" strokeWidth="2" fill="none"/>
      <ellipse cx="20" cy="20" rx="10" ry="5" stroke="white" strokeWidth="2" fill="none" transform="rotate(60 20 20)"/>
      <circle cx="20" cy="20" r="3" fill="white"/>
    </svg>,
  };

  return logos[slug] ?? (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#6B7280"/>
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">
        {slug.slice(0, 3).toUpperCase()}
      </text>
    </svg>
  );
}

// ─── Scannable QR code generated from the exact address ────────────────────────

function QRCodeDisplay({ value, size = 184 }: { value: string; size?: number }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let active = true;
    setSrc("");

    if (!value) return () => { active = false; };

    QRCode.toDataURL(value, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: size,
      color: { dark: "#111827", light: "#ffffff" },
    })
      .then(url => {
        if (active) setSrc(url);
      })
      .catch(() => {
        if (active) setSrc("");
      });

    return () => { active = false; };
  }, [value, size]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
        {src ? (
          <img
            src={src}
            width={size}
            height={size}
            alt={`Scannable QR code for ${value}`}
            className="block rounded-lg"
          />
        ) : (
          <div
            className="bg-gray-100 rounded-lg animate-pulse"
            style={{ width: size, height: size }}
            aria-label="Generating QR code"
          />
        )}
      </div>
    </div>
  );
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
        copied
          ? "bg-green-50 text-green-600 border border-green-200"
          : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : (label ?? "Copy")}
    </button>
  );
}

// ─── Transaction Receipt ──────────────────────────────────────────────────────

function TransactionReceipt({
  type, coin, coinSymbol, coinAmount, usdAmount, txId, network, onClose, pending
}: {
  type: "deposit" | "withdrawal" | "swap";
  coin: string; coinSymbol: string; coinAmount: number;
  usdAmount: number; txId: string; network: string;
  onClose: () => void; pending?: boolean;
}) {
  const isDeposit = type === "deposit";
  const isWithdrawal = type === "withdrawal";
  const isPending = pending ?? isWithdrawal;

  return (
    <div className="space-y-5">
      {/* Status badge */}
      <div className="flex flex-col items-center gap-3 py-3">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isDeposit ? "bg-green-50" : isWithdrawal ? "bg-orange-50" : "bg-blue-50"
        }`}>
          {isPending
            ? <Clock className="w-8 h-8 text-orange-500" />
            : <CheckCircle2 className={`w-8 h-8 ${isDeposit ? "text-green-500" : "text-blue-500"}`} />}
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            {isPending ? `${isDeposit ? "Deposit" : "Withdrawal"} Submitted` : isDeposit ? "Deposit Successful" : "Swap Complete"}
          </div>
          <div className={`text-xs font-semibold mt-1 px-3 py-1 rounded-full inline-block ${
            isPending ? "bg-orange-50 text-orange-600" : isDeposit ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
          }`}>
            {isPending ? "⏳ Pending admin review" : isDeposit ? "✓ Confirmed" : "✓ Executed"}
          </div>
        </div>
      </div>

      {/* Amount display */}
      <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
        <CoinLogo slug={coin} size={44} />
        <div className="flex-1">
          <div className="text-2xl font-black text-gray-900">
            {coinAmount > 0.0001
              ? coinAmount.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 6 })
              : coinAmount.toFixed(8)} {coinSymbol}
          </div>
          <div className="text-sm text-gray-400">≈ ${usdAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      </div>

      {/* Details grid */}
      <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-50">
        {[
          { label: "Transaction ID", value: txId, mono: true, copy: true },
          { label: "Network",        value: network, mono: false, copy: false },
          { label: "Type",           value: isDeposit ? "Deposit" : isWithdrawal ? "Withdrawal" : "Swap", mono: false, copy: false },
          { label: "Date & Time",    value: new Date().toLocaleString(), mono: false, copy: false },
           { label: "Status",         value: isPending ? "Pending admin review" : "Confirmed", mono: false, copy: false },
        ].map(row => (
          <div key={row.label} className="flex items-start justify-between px-4 py-3 gap-3">
            <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">{row.label}</span>
            <div className="flex items-center gap-1.5 text-right min-w-0">
              <span className={`text-xs font-semibold text-gray-800 truncate max-w-[150px] ${row.mono ? "font-mono" : ""}`}>
                {row.value}
              </span>
              {row.copy && <CopyButton text={row.value} />}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all"
      >
        Done
      </button>
    </div>
  );
}

// ─── Bottom Sheet wrapper ─────────────────────────────────────────────────────

function BottomSheet({ open, onClose, title, children, tall }: {
  open: boolean; onClose: () => void; title: string;
  children: React.ReactNode; tall?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 duration-300 ${tall ? "max-h-[92vh]" : "max-h-[85vh]"}`}>
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 pb-10 pt-5">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Deposit Modal ─────────────────────────────────────────────────────────────

function DepositModal({ open, onClose, coins, defaultCoin }: {
  open: boolean; onClose: () => void; coins: any[]; defaultCoin?: string;
}) {
  const qc = useQueryClient();
  const [done, setDone] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<string>(defaultCoin ?? "usdt");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (open) {
      setDone(false);
      setSelectedCoin(defaultCoin ?? "usdt");
      setAmount("");
      setReceipt(null);
      setErrorMsg("");
    }
  }, [open, defaultCoin]);

  const mutation = useMutation({
    mutationFn: (data: { coinSlug: string; amount: number }) =>
      apiFetch("/wallet/deposit", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["wallet-balances"] });
      qc.invalidateQueries({ queryKey: ["transactions"] });
      const meta = coins.find(c => c.slug === vars.coinSlug);
      const txId = "TX" + Math.random().toString(36).slice(2, 12).toUpperCase();
      setReceipt({
        coin: vars.coinSlug,
        coinSymbol: meta?.symbol ?? "",
        coinAmount: vars.amount,
        usdAmount: vars.amount * (meta?.priceUsd ?? 1),
        txId,
        network: meta?.network ?? "",
      });
      setDone(true);
    },
    onError: (e: Error) => setErrorMsg(e.message),
  });

  const selectedMeta = coins.find(c => c.slug === selectedCoin);

  return (
    <BottomSheet open={open} onClose={onClose} title="Deposit Crypto" tall>
      {done && receipt ? (
        <TransactionReceipt
          type="deposit"
          coin={receipt.coin}
          coinSymbol={receipt.coinSymbol}
          coinAmount={receipt.coinAmount}
          usdAmount={receipt.usdAmount}
          txId={receipt.txId}
          network={receipt.network}
           pending
          onClose={onClose}
        />
      ) : (
        <div className="space-y-5">
          {/* ── Coin selector ── */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
              Select Asset
            </label>
            <div className="grid grid-cols-5 gap-2">
              {coins.map(c => (
                <button
                  key={c.slug}
                  onClick={() => { setSelectedCoin(c.slug); setErrorMsg(""); }}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 transition-all active:scale-95 ${
                    selectedCoin === c.slug
                      ? "border-blue-600 bg-blue-50 shadow-sm shadow-blue-100"
                      : "border-gray-100 bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <CoinLogo slug={c.slug} size={26} />
                  <span className="text-[9px] font-bold text-gray-600">{c.symbol}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── QR Code + Address ── */}
          {selectedMeta && (() => {
            const addrInfo = selectedMeta.depositAddress
              ? { address: selectedMeta.depositAddress, network: selectedMeta.network }
              : DEPOSIT_ADDRESSES[selectedCoin] ?? { address: "", network: "" };
            return (
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                {/* QR centered */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center py-6 px-4 gap-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Scan to Deposit {selectedMeta.symbol}
                  </p>
                  <div className="bg-white rounded-2xl p-3 shadow-md border border-gray-100">
                    <QRCodeDisplay value={addrInfo.address} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    {addrInfo.network}
                  </div>
                </div>

                {/* Address row */}
                <div className="bg-white px-4 py-4 space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      {selectedMeta.symbol} Deposit Address
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3">
                      <p className="font-mono text-xs text-gray-800 break-all leading-relaxed select-all">
                        {addrInfo.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CopyButton text={addrInfo.address} label="Copy Address" />
                    <span className="text-xs text-gray-400">· {addrInfo.network}</span>
                  </div>

                  {/* Warning */}
                  <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Only send <strong>{selectedMeta.symbol}</strong> via <strong>{addrInfo.network}</strong>.
                      Sending the wrong asset causes permanent loss.
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── Amount input ── */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
              Amount Sent
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={e => { setAmount(e.target.value); setErrorMsg(""); }}
                placeholder="0.00"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-4 text-2xl font-black text-gray-900 outline-none focus:border-blue-500 focus:bg-white transition-all pr-20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                {selectedMeta?.symbol}
              </span>
            </div>
            {amount && Number(amount) > 0 && selectedMeta && (
              <p className="text-xs text-gray-400 mt-1.5 ml-1">
                ≈ <span className="font-semibold text-gray-700">${(Number(amount) * selectedMeta.priceUsd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
              </p>
            )}
          </div>

          {/* Balance row */}
          {selectedMeta && (
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100">
              <span className="text-xs text-gray-400">Current balance</span>
              <span className="text-xs font-semibold text-gray-800">
                {Number(selectedMeta.balance).toFixed(6)} {selectedMeta.symbol}
                <span className="text-gray-400 font-normal ml-1.5">(≈ ${selectedMeta.usdValue.toFixed(2)})</span>
              </span>
            </div>
          )}

          {errorMsg && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl p-3 border border-red-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          <button
            onClick={() => {
              if (!amount || Number(amount) <= 0) { setErrorMsg("Enter the amount you sent"); return; }
              mutation.mutate({ coinSlug: selectedCoin, amount: Number(amount) });
            }}
            disabled={mutation.isPending || !selectedMeta}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 text-base shadow-sm shadow-blue-200"
          >
            {mutation.isPending ? "Confirming…" : `Confirm Deposit`}
          </button>
        </div>
      )}
    </BottomSheet>
  );
}

// ─── Withdrawal Modal ─────────────────────────────────────────────────────────

function WithdrawalModal({ open, onClose, coins, defaultCoin }: {
  open: boolean; onClose: () => void; coins: any[]; defaultCoin?: string;
}) {
  const qc = useQueryClient();
  const [step, setStep] = useState<"form" | "receipt">("form");
  const [selectedCoin, setSelectedCoin] = useState<string>(defaultCoin ?? "usdt");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [receipt, setReceipt] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (open) {
      setStep("form");
      setSelectedCoin(defaultCoin ?? "usdt");
      setAmount("");
      setAddress("");
      setReceipt(null);
      setErrorMsg("");
    }
  }, [open, defaultCoin]);

  const mutation = useMutation({
    mutationFn: (data: { coinSlug: string; amount: number; destinationAddress: string }) =>
      apiFetch("/wallet/withdraw", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["wallet-balances"] });
      qc.invalidateQueries({ queryKey: ["transactions"] });
      const meta = coins.find(c => c.slug === vars.coinSlug);
      const txId = "WD" + Math.random().toString(36).slice(2, 12).toUpperCase();
      setReceipt({
        coin: vars.coinSlug,
        coinSymbol: meta?.symbol ?? "",
        coinAmount: vars.amount,
        usdAmount: vars.amount * (meta?.priceUsd ?? 1),
        txId,
        network: meta?.network ?? "",
      });
      setStep("receipt");
    },
    onError: (e: Error) => setErrorMsg(e.message),
  });

  const selectedMeta = coins.find(c => c.slug === selectedCoin);

  return (
    <BottomSheet open={open} onClose={onClose} title="Withdraw" tall>
      {step === "form" && (
        <div className="space-y-4">
          {/* Coin selector */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Select Asset</label>
            <div className="grid grid-cols-5 gap-2">
              {coins.map(c => (
                <button
                  key={c.slug}
                  onClick={() => { setSelectedCoin(c.slug); setErrorMsg(""); }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                    selectedCoin === c.slug ? "border-blue-600 bg-blue-50" : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <CoinLogo slug={c.slug} size={28} />
                  <span className="text-[9px] font-semibold text-gray-600">{c.symbol}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Balance */}
          {selectedMeta && (
            <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Available Balance</p>
                <p className="font-bold text-gray-900 mt-0.5">
                  {Number(selectedMeta.balance).toFixed(6)} {selectedMeta.symbol}
                </p>
                <p className="text-xs text-gray-400">${selectedMeta.usdValue.toFixed(2)}</p>
              </div>
              <button
                onClick={() => setAmount(String(selectedMeta.balance))}
                className="text-xs text-blue-600 font-bold px-3 py-1.5 bg-blue-50 rounded-xl hover:bg-blue-100 border border-blue-200"
              >
                MAX
              </button>
            </div>
          )}

          {/* Destination address */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
              Destination Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={e => { setAddress(e.target.value); setErrorMsg(""); }}
                placeholder={selectedMeta?.depositAddress ?? "Enter wallet address"}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-xs font-mono text-gray-800 outline-none focus:border-blue-500 focus:bg-white transition-colors pr-12 placeholder:text-gray-300"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200">
                <ScanQrCode className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            {selectedMeta && (
              <p className="text-xs text-gray-400 mt-1.5 ml-1">Network: {selectedMeta.network}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
              Amount ({selectedMeta?.symbol})
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={e => { setAmount(e.target.value); setErrorMsg(""); }}
                placeholder="0.00"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-2xl font-bold text-gray-900 outline-none focus:border-blue-500 focus:bg-white transition-colors pr-20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">
                {selectedMeta?.symbol}
              </span>
            </div>
            {amount && Number(amount) > 0 && selectedMeta && (
              <p className="text-xs text-gray-400 mt-2 ml-1">
                ≈ ${(Number(amount) * selectedMeta.priceUsd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </p>
            )}
          </div>

          {/* Fee note */}
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3">
            <Clock className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              Withdrawals are processed within 1–3 minutes. Network fees may apply.
            </p>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl p-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          <button
            onClick={() => {
              if (!amount || Number(amount) <= 0) { setErrorMsg("Enter a valid amount"); return; }
              if (!address.trim()) { setErrorMsg("Enter a destination address"); return; }
               mutation.mutate({
                 coinSlug: selectedCoin,
                 amount: Number(amount),
                 destinationAddress: address.trim(),
               });
            }}
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {mutation.isPending ? "Submitting..." : `Withdraw ${selectedMeta?.symbol}`}
          </button>
        </div>
      )}

      {step === "receipt" && receipt && (
        <TransactionReceipt
          type="withdrawal"
          coin={receipt.coin}
          coinSymbol={receipt.coinSymbol}
          coinAmount={receipt.coinAmount}
          usdAmount={receipt.usdAmount}
          txId={receipt.txId}
          network={receipt.network}
           pending
          onClose={onClose}
        />
      )}
    </BottomSheet>
  );
}

// ─── Swap Modal ───────────────────────────────────────────────────────────────

function SwapModal({ open, onClose, coins }: {
  open: boolean; onClose: () => void; coins: any[];
}) {
  const qc = useQueryClient();
  const [fromCoin, setFromCoin] = useState("usdt");
  const [toCoin, setToCoin] = useState("btc");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState<{ toAmount: number; toSymbol: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fromMeta = coins.find(c => c.slug === fromCoin);
  const toMeta = coins.find(c => c.slug === toCoin);

  const estimatedTo = fromMeta && toMeta && amount
    ? (Number(amount) * fromMeta.priceUsd) / toMeta.priceUsd
    : 0;

  const mutation = useMutation({
    mutationFn: (data: { fromCoin: string; toCoin: string; amount: number }) =>
      apiFetch("/wallet/swap", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["wallet-balances"] });
      qc.invalidateQueries({ queryKey: ["transactions"] });
      setSuccess({ toAmount: data.toAmount, toSymbol: toMeta?.symbol ?? "" });
      setAmount("");
      setTimeout(() => { setSuccess(null); onClose(); }, 2500);
    },
    onError: (e: Error) => setErrorMsg(e.message),
  });

  const flipCoins = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setErrorMsg("");
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="Swap" tall>
      <div className="space-y-3">
        {/* From */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase">From</span>
            {fromMeta && <span className="text-xs text-gray-400">Bal: {Number(fromMeta.balance).toFixed(4)} {fromMeta.symbol}</span>}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {coins.filter(c => c.slug !== toCoin).map(c => (
              <button key={c.slug} onClick={() => { setFromCoin(c.slug); setErrorMsg(""); }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all ${
                  fromCoin === c.slug ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
                }`}>
                <CoinLogo slug={c.slug} size={18} />
                <span className="text-xs font-semibold">{c.symbol}</span>
              </button>
            ))}
          </div>
          <input
            type="number"
            value={amount}
            onChange={e => { setAmount(e.target.value); setErrorMsg(""); }}
            placeholder="0.00"
            className="mt-3 w-full bg-transparent text-2xl font-bold text-gray-900 outline-none placeholder:text-gray-300"
          />
          {amount && Number(amount) > 0 && fromMeta && (
            <p className="text-xs text-gray-400 mt-1">≈ ${(Number(amount) * fromMeta.priceUsd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
          )}
        </div>

        {/* Flip button */}
        <div className="flex justify-center -my-1">
          <button onClick={flipCoins}
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* To */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase">To (Estimated)</span>
            {toMeta && <span className="text-xs text-gray-400">Bal: {Number(toMeta.balance).toFixed(4)} {toMeta.symbol}</span>}
          </div>
          <div className="flex gap-2 flex-wrap">
            {coins.filter(c => c.slug !== fromCoin).map(c => (
              <button key={c.slug} onClick={() => { setToCoin(c.slug); setErrorMsg(""); }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all ${
                  toCoin === c.slug ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
                }`}>
                <CoinLogo slug={c.slug} size={18} />
                <span className="text-xs font-semibold">{c.symbol}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 text-2xl font-bold text-gray-400">
            ≈ {estimatedTo > 0 ? estimatedTo.toFixed(8) : "0.00000000"}
          </div>
        </div>

        {fromMeta && toMeta && (
          <div className="text-xs text-center text-gray-400 py-1">
            1 {fromMeta.symbol} = {(fromMeta.priceUsd / toMeta.priceUsd).toFixed(8)} {toMeta.symbol}
          </div>
        )}

        {errorMsg && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl p-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errorMsg}
          </div>
        )}

        {success ? (
          <div className="flex flex-col items-center justify-center gap-2 py-6 text-green-600">
            <CheckCircle2 className="w-10 h-10" />
            <p className="font-bold text-base">Swap Complete!</p>
            <p className="text-sm text-gray-500">Received {success.toAmount.toFixed(6)} {success.toSymbol}</p>
          </div>
        ) : (
          <button
            onClick={() => {
              if (!amount || Number(amount) <= 0) { setErrorMsg("Enter a valid amount"); return; }
              mutation.mutate({ fromCoin, toCoin, amount: Number(amount) });
            }}
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {mutation.isPending ? "Swapping..." : "Swap Now"}
          </button>
        )}
      </div>
    </BottomSheet>
  );
}

// ─── Invest Modal ─────────────────────────────────────────────────────────────

function InvestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [, setLocation] = useLocation();
  return (
    <BottomSheet open={open} onClose={onClose} title="Invest">
      <div className="space-y-3">
        <p className="text-sm text-gray-500">Choose an investment plan to grow your crypto.</p>
        {[
          { name: "Starter", roi: "12.5%", days: 30, min: "$500",    badge: null,           color: "bg-blue-50 border-blue-200" },
          { name: "Growth",  roi: "28%",   days: 60, min: "$5,000",  badge: "Most Popular", color: "bg-purple-50 border-purple-200" },
          { name: "Elite",   roi: "52%",   days: 90, min: "$50,000", badge: "Best Returns", color: "bg-amber-50 border-amber-200" },
        ].map(plan => (
          <button
            key={plan.name}
            onClick={() => { onClose(); setLocation("/plans"); }}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 ${plan.color} hover:shadow-md active:scale-[0.98] transition-all text-left`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{plan.name}</span>
                {plan.badge && (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white uppercase">
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1">{plan.days} days · Min {plan.min}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-green-600">{plan.roi}</div>
              <div className="text-[10px] text-gray-400">ROI</div>
            </div>
          </button>
        ))}
        <button
          onClick={() => { onClose(); setLocation("/plans"); }}
          className="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl hover:bg-blue-700 transition-colors"
        >
          View All Plans →
        </button>
      </div>
    </BottomSheet>
  );
}

// ─── History Panel ────────────────────────────────────────────────────────────

type TxType = "deposit" | "withdrawal" | "fee" | "investment_return" | "investment";

function txTypeInfo(type: TxType, description: string) {
  if (type === "deposit") return { label: "Deposit", color: "text-green-600", bg: "bg-green-50", Icon: ArrowUpRight };
  if (type === "withdrawal") return { label: "Withdrawal", color: "text-red-500", bg: "bg-red-50", Icon: ArrowDownLeft };
  if (type === "fee") {
    if (description?.toLowerCase().includes("swap")) return { label: "Swap", color: "text-blue-600", bg: "bg-blue-50", Icon: RefreshCw };
    return { label: "Fee", color: "text-orange-500", bg: "bg-orange-50", Icon: Send };
  }
  if (type === "investment_return") return { label: "Return", color: "text-purple-600", bg: "bg-purple-50", Icon: TrendingUp };
  return { label: "Investment", color: "text-purple-600", bg: "bg-purple-50", Icon: TrendingUp };
}

function HistoryPanel({ open, onClose, filterCoin }: {
  open: boolean; onClose: () => void; filterCoin?: string;
}) {
  const { data: txs = [], isLoading } = useTransactions();

  const filtered = filterCoin
    ? txs.filter((t: any) => {
        const sym = filterCoin.toUpperCase();
        return t.description?.includes(sym);
      })
    : txs;

  // Sort newest first
  const sorted = [...filtered].sort(
    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <BottomSheet open={open} onClose={onClose} title={filterCoin ? `${filterCoin.toUpperCase()} History` : "Transaction History"} tall>
      {isLoading ? (
        <div className="space-y-3 py-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 w-32 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="h-3.5 w-14 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-300">
          <History className="w-12 h-12" />
          <p className="text-sm font-medium text-gray-400">No transactions yet</p>
          <p className="text-xs text-gray-400">Your activity will appear here</p>
        </div>
      ) : (
        <div className="space-y-1 -mx-2">
          {sorted.map((t: any) => {
            const info = txTypeInfo(t.type, t.description);
            const date = new Date(t.createdAt);
            const dateStr = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
            const timeStr = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
            const isPlus = t.type === "deposit" || t.type === "investment_return";
            return (
              <div key={t.id} className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-full ${info.bg} flex items-center justify-center flex-shrink-0`}>
                  <info.Icon className={`w-4.5 h-4.5 ${info.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{info.label}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{t.description}</p>
                  <p className="text-[10px] text-gray-300 mt-0.5">{dateStr} · {timeStr}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-bold ${isPlus ? "text-green-600" : "text-gray-900"}`}>
                    {isPlus ? "+" : "-"}${Math.abs(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className={`text-[10px] mt-0.5 font-semibold px-2 py-0.5 rounded-full inline-block ${info.bg} ${info.color}`}>
                    {info.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </BottomSheet>
  );
}

// ─── Coin Detail Sheet ────────────────────────────────────────────────────────

// Simple sparkline from a seeded fake series
function Sparkline({ seed, up, width = 200, height = 50 }: { seed: number; up: boolean; width?: number; height?: number }) {
  const points: number[] = [];
  let v = 50;
  for (let i = 0; i < 30; i++) {
    v += ((seed * (i + 1) * 1664525 + 1013904223) % 200 - 100) / 100 * 8;
    v = Math.max(5, Math.min(95, v));
    points.push(v);
  }
  const pts = points.map((p, i) => `${(i / 29) * width},${height - (p / 100) * height}`).join(" ");
  const area = `M0,${height} L${pts.split(" ").map((p, i) => (i === 0 ? `0,${height} ` : "") + p).join(" ")} L${width},${height} Z`;
  const line = `M${pts}`;
  const color = up ? "#22c55e" : "#ef4444";
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg-${seed})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// Trust Wallet-style 24h price changes (realistic market data)
const FAKE_CHANGES: Record<string, { pct: number; dir: boolean }> = {
  usdt: { pct: 0.01, dir: true  },
  btc:  { pct: 2.34, dir: false },
  eth:  { pct: 1.87, dir: true  },
  bnb:  { pct: 3.21, dir: true  },
  trx:  { pct: 0.94, dir: false },
  xrp:  { pct: 4.56, dir: true  },
  sol:  { pct: 5.12, dir: true  },
  ada:  { pct: 1.73, dir: false },
  doge: { pct: 6.88, dir: true  },
  matic:{ pct: 2.44, dir: false },
  ltc:  { pct: 1.15, dir: true  },
  dot:  { pct: 3.07, dir: false },
  avax: { pct: 4.22, dir: true  },
  link: { pct: 2.91, dir: true  },
  uni:  { pct: 1.66, dir: false },
  atom: { pct: 0.88, dir: true  },
  ton:  { pct: 3.44, dir: true  },
  shib: { pct: 7.31, dir: true  },
  xlm:  { pct: 2.18, dir: false },
  near: { pct: 5.04, dir: true  },
  algo: { pct: 1.92, dir: false },
  apt:  { pct: 4.77, dir: true  },
  arb:  { pct: 3.58, dir: false },
  op:   { pct: 2.83, dir: true  },
  sui:  { pct: 6.14, dir: true  },
  fil:  { pct: 1.37, dir: false },
  icp:  { pct: 2.69, dir: true  },
};

function CoinDetailSheet({ open, onClose, coin, onDeposit, onWithdraw, onSwap }: {
  open: boolean; onClose: () => void; coin: any | null;
  onDeposit: () => void; onWithdraw: () => void; onSwap: () => void;
}) {
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => { if (!open) setShowHistory(false); }, [open]);

  if (!open || !coin) return null;

  const change = FAKE_CHANGES[coin.slug] ?? { pct: 0.5, dir: true };
  const seed = coin.slug.split("").reduce((a: number, c: string) => a + c.charCodeAt(0), 0);

  const balFmt = Number(coin.balance) > 0.00001
    ? Number(coin.balance).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })
    : Number(coin.balance).toFixed(8);

  const priceFmt = coin.priceUsd < 0.01
    ? coin.priceUsd.toFixed(6)
    : coin.priceUsd < 1
    ? coin.priceUsd.toFixed(4)
    : coin.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

        {/* Sheet — flex col so footer sticks */}
        <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 duration-300"
          style={{ maxHeight: "92vh" }}>

          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 flex-shrink-0">
            <h2 className="text-lg font-bold text-gray-900">{coin.name}</h2>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-90 transition-all">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* ── Scrollable body ── */}
          <div className="overflow-y-auto flex-1 px-5 pb-4 space-y-4">

            {/* Balance row */}
            <div className="flex items-center gap-4 py-1">
              <CoinLogo slug={coin.slug} size={56} />
              <div>
                <p className="text-2xl font-black text-gray-900 leading-tight">
                  {balFmt}{" "}
                  <span className="text-lg font-bold text-gray-400">{coin.symbol}</span>
                </p>
                <p className="text-base text-gray-400 font-medium mt-0.5">
                  ≈ ${coin.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Price card */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">Current Price</p>
                  <p className="text-2xl font-black text-gray-900">${priceFmt}</p>
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-sm font-bold ${
                  change.dir ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                  {change.dir
                    ? <TrendingUp className="w-3.5 h-3.5" />
                    : <TrendingDown className="w-3.5 h-3.5" />}
                  {change.dir ? "+" : "-"}{change.pct}%
                  <span className="text-xs text-gray-400 font-normal ml-0.5">24h</span>
                </div>
              </div>
              {/* Full-width sparkline */}
              <div className="w-full">
                <Sparkline seed={seed} up={change.dir} width={340} height={64} />
              </div>
            </div>

            {/* Info table */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              {[
                { label: "Network",          value: coin.network },
                { label: `1 ${coin.symbol}`, value: `${priceFmt}` },
                { label: "Your Balance",     value: `${Number(coin.balance).toFixed(6)} ${coin.symbol}` },
                { label: "USD Value",        value: `${coin.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
              ].map((row, i, arr) => (
                <div key={row.label}
                  className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <span className="text-sm text-gray-400">{row.label}</span>
                  <span className="text-sm font-semibold text-gray-800 text-right max-w-[60%] truncate">{row.value}</span>
                </div>
              ))}
            </div>

            {/* History link */}
            <button
              onClick={() => setShowHistory(true)}
              className="w-full flex items-center justify-between py-3.5 px-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition-all">
              <div className="flex items-center gap-2.5">
                <History className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">{coin.symbol} Transaction History</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* ── Action buttons — always visible at bottom ── */}
          <div className="flex-shrink-0 px-5 pb-8 pt-3 border-t border-gray-50">
            <div className="grid grid-cols-3 gap-3">
              {/* Deposit */}
              <button
                onClick={() => { onClose(); onDeposit(); }}
                className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl bg-green-50 border border-green-100 hover:bg-green-100 active:scale-95 transition-all">
                <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm">
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-green-600">Deposit</span>
              </button>

              {/* Withdraw */}
              <button
                onClick={() => { onClose(); onWithdraw(); }}
                className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl bg-red-50 border border-red-100 hover:bg-red-100 active:scale-95 transition-all">
                <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm">
                  <ArrowDownLeft className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-sm font-semibold text-red-500">Withdraw</span>
              </button>

              {/* Swap */}
              <button
                onClick={() => { onClose(); onSwap(); }}
                className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl bg-blue-50 border border-blue-100 hover:bg-blue-100 active:scale-95 transition-all">
                <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-blue-600">Swap</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <HistoryPanel open={showHistory} onClose={() => setShowHistory(false)} filterCoin={coin?.symbol} />
    </>
  );
}

// ─── Import Token Modal ───────────────────────────────────────────────────────

function ImportTokenModal({ open, onClose, existingSlugs }: {
  open: boolean; onClose: () => void; existingSlugs: string[];
}) {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState<string | null>(null);
  const [added, setAdded] = useState<Set<string>>(new Set());

  const { data: allTokens = [] } = useQuery<any[]>({
    queryKey: ["all-tokens"],
    queryFn: () => apiFetch("/wallet/all-tokens"),
    enabled: open,
  });

  const mutation = useMutation({
    mutationFn: (coinSlug: string) =>
      apiFetch("/wallet/add-token", { method: "POST", body: JSON.stringify({ coinSlug }) }),
    onSuccess: (_d, coinSlug) => {
      qc.invalidateQueries({ queryKey: ["wallet-balances"] });
      setAdded(prev => new Set([...prev, coinSlug]));
      setAdding(null);
    },
    onError: () => setAdding(null),
  });

  const handleAdd = (slug: string) => {
    setAdding(slug);
    mutation.mutate(slug);
  };

  useEffect(() => { if (!open) { setSearch(""); setAdded(new Set()); } }, [open]);

  const available = allTokens.filter(t =>
    !existingSlugs.includes(t.slug) && !added.has(t.slug) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) ||
     t.symbol.toLowerCase().includes(search.toLowerCase()))
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 duration-300" style={{ maxHeight: "88vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Token</h2>
            <p className="text-xs text-gray-400 mt-0.5">Select coins to add to your wallet</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-3 border-b border-gray-50 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search coins…"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Recently added */}
        {added.size > 0 && (
          <div className="px-5 py-2 bg-green-50 border-b border-green-100 flex-shrink-0">
            <p className="text-xs font-semibold text-green-700">
              ✓ {added.size} token{added.size > 1 ? "s" : ""} added to your wallet
            </p>
          </div>
        )}

        {/* Token list */}
        <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
          {available.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Check className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">
                {search ? "No coins match your search" : "All available coins added!"}
              </p>
            </div>
          ) : (
            available.map(token => (
              <div key={token.slug} className="flex items-center gap-3 px-5 py-3.5">
                <CoinLogo slug={token.slug} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900">{token.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {token.symbol} · ${token.priceUsd < 0.01
                      ? token.priceUsd.toFixed(6)
                      : token.priceUsd >= 1
                      ? token.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : token.priceUsd.toFixed(4)}
                  </div>
                </div>
                <div className="text-xs text-gray-400 text-right mr-2 hidden sm:block">
                  {token.network.split(" ")[0]}
                </div>
                <button
                  onClick={() => handleAdd(token.slug)}
                  disabled={adding === token.slug}
                  className="flex-shrink-0 h-8 px-4 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1"
                >
                  {adding === token.slug ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>+ Add</>
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Done */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-gray-900 text-white font-semibold py-3.5 rounded-2xl hover:bg-gray-800 active:scale-[0.98] transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

type ModalType = "deposit" | "withdraw" | "swap" | "invest" | "import" | null;

export default function Dashboard() {
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth();
  const [, setLocation] = useLocation();
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedCoinForModal, setSelectedCoinForModal] = useState<string | undefined>(undefined);
  const [coinDetailSlug, setCoinDetailSlug] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const { data: wallet, isLoading: isWalletLoading } = useWalletBalances();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) setLocation("/login");
  }, [isAuthLoading, isAuthenticated, setLocation]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-3 border-blue-600 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading wallet...</p>
        </div>
      </div>
    );
  }

  const coins: any[] = wallet?.coins ?? [];
  const totalUsd: number = wallet?.totalUsd ?? 0;
  const coinDetail = coins.find(c => c.slug === coinDetailSlug) ?? null;

  const close = () => { setModal(null); setSelectedCoinForModal(undefined); };

  const openDeposit = (coinSlug?: string) => {
    setSelectedCoinForModal(coinSlug);
    setModal("deposit");
  };
  const openWithdraw = (coinSlug?: string) => {
    setSelectedCoinForModal(coinSlug);
    setModal("withdraw");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ── */}
      <div className="bg-white px-4 pt-12 pb-2 flex items-center justify-between">
        <button className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
            <Wallet className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-800 max-w-[110px] truncate">
            {user?.fullName?.split(" ")[0] ?? "Main"} Wallet
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistory(true)}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <History className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ScanQrCode className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* ── Balance ── */}
      <div className="px-5 pt-6 pb-4">
        {isWalletLoading ? (
          <div className="space-y-2">
            <div className="h-10 w-40 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-5 w-24 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 font-medium mb-1">Total Portfolio Value</p>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              ${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h1>
            <p className="text-sm text-gray-400 mt-1">Updated just now</p>
          </>
        )}
      </div>

      {/* ── Action Buttons ── */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between gap-2">
          {[
            { label: "Deposit",    icon: <ArrowUpRight className="w-5 h-5 text-gray-700" />,  active: false, action: () => openDeposit() },
            { label: "Withdrawal", icon: <ArrowDownLeft className="w-5 h-5 text-gray-700" />, active: false, action: () => openWithdraw() },
            { label: "Swap",       icon: <RefreshCw className="w-5 h-5 text-white" />,        active: true,  action: () => setModal("swap") },
            { label: "Invest",     icon: <Plus className="w-5 h-5 text-gray-700" />,          active: false, action: () => setModal("invest") },
          ].map(({ label, icon, active, action }) => (
            <button
              key={label}
              onClick={action}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform active:scale-95 ${
                active ? "bg-blue-600 shadow-blue-200 shadow-lg" : "bg-gray-100 hover:bg-gray-200"
              }`}>
                {icon}
              </div>
              <span className="text-xs font-medium text-gray-600">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Tokens ── */}
      <div className="bg-white pb-4">
        <div className="px-5 flex items-center justify-between mb-3">
          <span className="text-base font-bold text-gray-900">Tokens</span>
          <span className="text-xs text-gray-400">{coins.length} assets</span>
        </div>

        <div className="divide-y divide-gray-50">
          {isWalletLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 w-28 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="text-right space-y-1.5">
                    <div className="h-3.5 w-16 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-10 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              ))
            : coins.map(coin => {
                const change = FAKE_CHANGES[coin.slug] ?? { pct: 0, dir: true };
                return (
                  <div
                    key={coin.slug}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer active:bg-gray-100"
                    onClick={() => setCoinDetailSlug(coin.slug)}
                  >
                    <div className="flex-shrink-0">
                      <CoinLogo slug={coin.slug} size={40} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">{coin.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        ${coin.priceUsd.toLocaleString(undefined, { minimumFractionDigits: coin.priceUsd < 1 ? 4 : 2, maximumFractionDigits: coin.priceUsd < 1 ? 4 : 2 })}
                        {" "}
                        <span className={`font-semibold ${change.dir ? "text-green-500" : "text-red-400"}`}>
                          {change.dir ? "▲" : "▼"} {change.pct}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-gray-900 text-sm">
                        ${coin.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {Number(coin.balance) > 0.00001
                          ? Number(coin.balance).toFixed(4)
                          : Number(coin.balance).toFixed(8)} {coin.symbol}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 ml-1" />
                  </div>
                );
              })
          }
        </div>

        {/* Add Token Button */}
        {!isWalletLoading && (
          <button
            onClick={() => setModal("import")}
            className="mx-5 mt-3 w-[calc(100%-40px)] flex items-center justify-center gap-2 py-3.5 border border-dashed border-blue-300 rounded-2xl text-blue-600 hover:bg-blue-50 active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-semibold">Add Token</span>
          </button>
        )}

        {/* Invest Plus AI Banner */}
        <div className="mx-5 mt-4 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-800">Invest Plus AI</span>
          </div>
          <Link href="/plans">
            <button className="text-sm font-semibold text-blue-600 bg-white border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-blue-50 transition-colors">
              View Plans
            </button>
          </Link>
        </div>
      </div>

      {/* ── Modals ── */}
      <DepositModal    open={modal === "deposit"}  onClose={close} coins={coins} defaultCoin={selectedCoinForModal} />
      <WithdrawalModal open={modal === "withdraw"} onClose={close} coins={coins} defaultCoin={selectedCoinForModal} />
      <SwapModal       open={modal === "swap"}     onClose={close} coins={coins} />
      <InvestModal     open={modal === "invest"}   onClose={close} />
      <ImportTokenModal open={modal === "import"}  onClose={close} existingSlugs={coins.map((c: any) => c.slug)} />

      {/* ── Coin Detail ── */}
      <CoinDetailSheet
        open={!!coinDetailSlug}
        onClose={() => setCoinDetailSlug(null)}
        coin={coinDetail}
        onDeposit={() => openDeposit(coinDetailSlug ?? undefined)}
        onWithdraw={() => openWithdraw(coinDetailSlug ?? undefined)}
        onSwap={() => setModal("swap")}
      />

      {/* ── History ── */}
      <HistoryPanel open={showHistory} onClose={() => setShowHistory(false)} />
    </div>
  );
}
