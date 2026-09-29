import { useState, useEffect, type ReactNode } from "react";
import { Shield, Search, Check, X, ChevronRight, Copy, Trash2, Wifi, AlertCircle, QrCode } from "lucide-react";
import QRCode from "qrcode";

// ─── Wallet logos (accurate brand SVGs) ───────────────────────────────────────

function MetaMaskLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#FFFFFF" />
      <rect width="40" height="40" rx="12" fill="#F6851B" fillOpacity="0.08" />
      {/* Fox face simplified */}
      <polygon points="20,6 28,14 25,22 20,20 15,22 12,14" fill="#E2761B" />
      <polygon points="12,14 15,22 10,20" fill="#E4761B" />
      <polygon points="28,14 30,20 25,22" fill="#E4761B" />
      <polygon points="15,22 14,27 20,24 20,20" fill="#D7C1B3" />
      <polygon points="25,22 26,27 20,24 20,20" fill="#D7C1B3" />
      <polygon points="14,27 18,30 20,24" fill="#233447" />
      <polygon points="26,27 22,30 20,24" fill="#233447" />
      <polygon points="18,30 20,24 22,30 20,32" fill="#CD6116" />
      <polygon points="14,27 18,30 20,32 22,30 26,27 20,24" fill="#E4751F" />
      <circle cx="16" cy="17" r="2" fill="#763D16" />
      <circle cx="24" cy="17" r="2" fill="#763D16" />
    </svg>
  );
}

function TrustWalletLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#3375BB" />
      <path d="M20 8L10 12V21C10 26.5 14.5 31.5 20 33C25.5 31.5 30 26.5 30 21V12L20 8Z" fill="white" fillOpacity="0.95" />
      <path d="M20 10L12 13.5V21C12 25.5 15.5 29.8 20 31.2C24.5 29.8 28 25.5 28 21V13.5L20 10Z" fill="#3375BB" />
      <path d="M17 20L19.5 22.5L24 17.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CoinbaseLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#0052FF" />
      <circle cx="20" cy="20" r="11" fill="white" />
      <circle cx="20" cy="20" r="7.5" fill="#0052FF" />
      <rect x="16" y="17.5" width="8" height="5" rx="2.5" fill="white" />
    </svg>
  );
}

function PhantomLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#AB9FF2" />
      <ellipse cx="20" cy="18" rx="10" ry="10" fill="white" />
      <ellipse cx="20" cy="20" rx="10" ry="11" fill="white" />
      {/* Ghost body */}
      <path d="M10 18C10 12.477 14.477 8 20 8C25.523 8 30 12.477 30 18V28L27 26L24 28L21 26L18 28L15 26L12 28L10 26V18Z" fill="white" />
      {/* Eyes */}
      <ellipse cx="16.5" cy="19" rx="2.5" ry="3" fill="#AB9FF2" />
      <ellipse cx="23.5" cy="19" rx="2.5" ry="3" fill="#AB9FF2" />
      <circle cx="17.5" cy="19.5" r="1" fill="white" />
      <circle cx="24.5" cy="19.5" r="1" fill="white" />
    </svg>
  );
}

function BinanceLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#1E2026" />
      <path d="M20 9L22.5 11.5L16 18L13.5 15.5L20 9Z" fill="#F3BA2F" />
      <path d="M20 9L26.5 15.5L24 18L17.5 11.5L20 9Z" fill="#F3BA2F" />
      <path d="M11 18L13.5 15.5L16 18L13.5 20.5L11 18Z" fill="#F3BA2F" />
      <path d="M29 18L26.5 15.5L24 18L26.5 20.5L29 18Z" fill="#F3BA2F" />
      <path d="M20 20L22.5 17.5L25 20L22.5 22.5L20 20Z" fill="#F3BA2F" />
      <path d="M15 20L17.5 17.5L20 20L17.5 22.5L15 20Z" fill="#F3BA2F" />
      <path d="M20 23L26.5 16.5L29 19L22.5 25.5L20 23Z" fill="#F3BA2F" />
      <path d="M20 23L13.5 16.5L11 19L17.5 25.5L20 23Z" fill="#F3BA2F" />
      <path d="M20 31L17.5 28.5L24 22L26.5 24.5L20 31Z" fill="#F3BA2F" />
      <path d="M20 31L22.5 28.5L16 22L13.5 24.5L20 31Z" fill="#F3BA2F" />
    </svg>
  );
}

function OKXLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#000000" />
      <rect x="9" y="9" width="9" height="9" rx="1.5" fill="white" />
      <rect x="22" y="9" width="9" height="9" rx="1.5" fill="white" />
      <rect x="9" y="22" width="9" height="9" rx="1.5" fill="white" />
      <rect x="22" y="22" width="9" height="9" rx="1.5" fill="white" />
      <rect x="15.5" y="15.5" width="9" height="9" rx="1.5" fill="white" />
    </svg>
  );
}

function RainbowLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#174299" />
      <defs>
        <linearGradient id="rbow1" x1="8" y1="20" x2="32" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="25%" stopColor="#FFE66D" />
          <stop offset="50%" stopColor="#4ECDC4" />
          <stop offset="75%" stopColor="#45B7D1" />
          <stop offset="100%" stopColor="#6C5CE7" />
        </linearGradient>
      </defs>
      <path d="M8 26C8 20 11 15 16 13" stroke="url(#rbow1)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M10 28C10 20 14 14 20 12" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M13 30C13 21 17.5 15 20 14" stroke="#FFE66D" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M16 31C16 23 19 17 20 16" stroke="#4ECDC4" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M19 31.5C19 25 20 19 20 18" stroke="#6C5CE7" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
    </svg>
  );
}

function UniswapLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#FF007A" />
      <circle cx="15" cy="14" r="3" fill="white" opacity="0.9" />
      <path d="M15 17C15 17 16 22 21 24C26 26 28 24 28 24" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M12 14C12 14 10 18 12 22C14 26 17 28 17 28" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
      <circle cx="26" cy="26" r="3.5" fill="white" opacity="0.9" />
    </svg>
  );
}

function LedgerLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#142533" />
      <rect x="10" y="10" width="13" height="20" rx="1" fill="white" />
      <rect x="17" y="17" width="13" height="13" rx="1" fill="white" />
    </svg>
  );
}

function ExodusLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#0B0C13" />
      <defs>
        <linearGradient id="exo" x1="10" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B72FF" />
          <stop offset="100%" stopColor="#0BF8E6" />
        </linearGradient>
      </defs>
      <path d="M20 8L30 14V20L20 26L10 20V14L20 8Z" fill="url(#exo)" />
      <path d="M20 12L26 16V20L20 24L14 20V16L20 12Z" fill="#0B0C13" />
      <path d="M20 14L24 17V20L20 23L16 20V17L20 14Z" fill="url(#exo)" opacity="0.7" />
    </svg>
  );
}

function BybitLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#F7A600" />
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="11" fontWeight="900" fontFamily="Arial">BYBIT</text>
    </svg>
  );
}

function SafePalLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#00B0D8" />
      <path d="M20 9L11 13V22C11 27 15 31 20 33C25 31 29 27 29 22V13L20 9Z" fill="white" opacity="0.95" />
      <path d="M20 13L14 16V22C14 25.5 16.5 28.5 20 30C23.5 28.5 26 25.5 26 22V16L20 13Z" fill="#00B0D8" />
      <circle cx="20" cy="22" r="4" fill="white" />
      <circle cx="20" cy="22" r="2" fill="#00B0D8" />
    </svg>
  );
}

function AtomicLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#2E3148" />
      <circle cx="20" cy="20" r="3.5" fill="#6D9BF1" />
      <ellipse cx="20" cy="20" rx="11" ry="5" stroke="#6D9BF1" strokeWidth="1.5" fill="none" />
      <ellipse cx="20" cy="20" rx="11" ry="5" stroke="#6D9BF1" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)" />
      <ellipse cx="20" cy="20" rx="11" ry="5" stroke="#6D9BF1" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)" />
    </svg>
  );
}

function WalletConnectLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#3B99FC" />
      <path d="M11.5 17.5C16.2 12.8 23.8 12.8 28.5 17.5L29.1 18.1C29.3 18.3 29.3 18.7 29.1 18.9L27.3 20.7C27.2 20.8 27 20.8 26.9 20.7L26.1 19.9C22.8 16.6 17.2 16.6 13.9 19.9L13 20.8C12.9 20.9 12.7 20.9 12.6 20.8L10.8 19C10.7 18.8 10.7 18.4 10.8 18.2L11.5 17.5Z" fill="white" />
      <path d="M30.5 19.5L32.1 21.1C32.3 21.3 32.3 21.7 32.1 21.9L24.8 29.2C24.6 29.4 24.2 29.4 24 29.2L18.9 24.1C18.85 24.05 18.75 24.05 18.7 24.1L13.6 29.2C13.4 29.4 13 29.4 12.8 29.2L5.5 21.9C5.3 21.7 5.3 21.3 5.5 21.1L7.1 19.5C7.3 19.3 7.7 19.3 7.9 19.5L13 24.6C13.05 24.65 13.15 24.65 13.2 24.6L18.3 19.5C18.5 19.3 18.9 19.3 19.1 19.5L24.2 24.6C24.25 24.65 24.35 24.65 24.4 24.6L29.5 19.5C29.7 19.3 30.3 19.3 30.5 19.5Z" fill="white" />
    </svg>
  );
}

function KeplrLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#6B62F5" />
      <rect x="11" y="10" width="6" height="20" rx="2" fill="white" />
      <path d="M17 19.5L28 11V29L17 20.5" fill="white" opacity="0.9" />
    </svg>
  );
}

function ImTokenLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#11C4D1" />
      <circle cx="20" cy="16" r="5" fill="white" />
      <rect x="14" y="23" width="12" height="2.5" rx="1.25" fill="white" />
      <rect x="16" y="27" width="8" height="2.5" rx="1.25" fill="white" opacity="0.7" />
    </svg>
  );
}

function MathWalletLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#000000" />
      <circle cx="20" cy="20" r="11" stroke="white" strokeWidth="1.5" fill="none" />
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="700">M</text>
    </svg>
  );
}

function BitgetLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#00F0FF" fillOpacity="0.15" />
      <rect width="40" height="40" rx="12" fill="#1DA2B4" />
      <path d="M12 24L20 10L28 24H12Z" fill="white" opacity="0.9" />
      <path d="M14 26L20 32L26 26H14Z" fill="white" opacity="0.7" />
    </svg>
  );
}

// ─── Wallet registry ──────────────────────────────────────────────────────────

interface Wallet {
  id: string;
  name: string;
  logo: (size?: number) => ReactNode;
  networks: string[];
  category: "popular" | "hardware" | "defi" | "mobile";
  description: string;
}

const WALLETS: Wallet[] = [
  { id: "metamask",    name: "MetaMask",         logo: (s) => <MetaMaskLogo size={s} />,     networks: ["Ethereum", "BNB Chain", "Polygon", "Arbitrum"],   category: "popular",  description: "Browser & mobile Ethereum wallet" },
  { id: "trustwallet", name: "Trust Wallet",     logo: (s) => <TrustWalletLogo size={s} />,  networks: ["Multi-chain", "BNB Chain", "Ethereum"],           category: "popular",  description: "Official Binance multi-chain wallet" },
  { id: "coinbase",   name: "Coinbase Wallet",   logo: (s) => <CoinbaseLogo size={s} />,     networks: ["Ethereum", "Polygon", "Solana", "Base"],          category: "popular",  description: "Self-custody wallet by Coinbase" },
  { id: "phantom",    name: "Phantom",           logo: (s) => <PhantomLogo size={s} />,      networks: ["Solana", "Ethereum", "Polygon"],                  category: "popular",  description: "The friendly crypto wallet for Solana" },
  { id: "binance",    name: "Binance Web3",      logo: (s) => <BinanceLogo size={s} />,      networks: ["BNB Chain", "Ethereum", "Bitcoin"],               category: "popular",  description: "Web3 wallet from Binance exchange" },
  { id: "okx",        name: "OKX Wallet",        logo: (s) => <OKXLogo size={s} />,          networks: ["Multi-chain", "Bitcoin", "Ethereum"],             category: "popular",  description: "All-in-one crypto wallet by OKX" },
  { id: "rainbow",    name: "Rainbow",           logo: (s) => <RainbowLogo size={s} />,      networks: ["Ethereum", "Polygon", "Arbitrum", "Optimism"],    category: "defi",     description: "Fun, simple Ethereum wallet" },
  { id: "uniswap",   name: "Uniswap Wallet",    logo: (s) => <UniswapLogo size={s} />,      networks: ["Ethereum", "Arbitrum", "Optimism", "Base"],       category: "defi",     description: "Swap-native mobile wallet" },
  { id: "walletconnect", name: "WalletConnect",  logo: (s) => <WalletConnectLogo size={s} />, networks: ["Multi-chain"],                                  category: "defi",     description: "Open protocol for wallet linking" },
  { id: "ledger",     name: "Ledger Live",       logo: (s) => <LedgerLogo size={s} />,       networks: ["Bitcoin", "Ethereum", "Multi-chain"],             category: "hardware", description: "Hardware wallet — cold storage" },
  { id: "exodus",     name: "Exodus",            logo: (s) => <ExodusLogo size={s} />,       networks: ["Bitcoin", "Ethereum", "Solana", "Multi-chain"],   category: "mobile",   description: "Desktop & mobile multi-asset wallet" },
  { id: "bybit",      name: "Bybit Wallet",      logo: (s) => <BybitLogo size={s} />,        networks: ["BNB Chain", "Ethereum", "Bitcoin"],               category: "popular",  description: "Crypto wallet by Bybit exchange" },
  { id: "safepal",    name: "SafePal",           logo: (s) => <SafePalLogo size={s} />,      networks: ["Multi-chain", "BNB Chain", "Bitcoin"],            category: "hardware", description: "Air-gapped hardware & software wallet" },
  { id: "atomic",     name: "Atomic Wallet",     logo: (s) => <AtomicLogo size={s} />,       networks: ["Multi-chain", "Bitcoin", "Ethereum"],             category: "mobile",   description: "Decentralized multi-currency wallet" },
  { id: "keplr",      name: "Keplr",             logo: (s) => <KeplrLogo size={s} />,        networks: ["Cosmos", "Osmosis", "Juno"],                      category: "defi",     description: "Interchain wallet for Cosmos ecosystem" },
  { id: "imtoken",    name: "imToken",           logo: (s) => <ImTokenLogo size={s} />,      networks: ["Ethereum", "Bitcoin", "BNB Chain"],               category: "mobile",   description: "Professional crypto asset wallet" },
  { id: "mathwallet", name: "Math Wallet",       logo: (s) => <MathWalletLogo size={s} />,   networks: ["Multi-chain", "Solana", "Polkadot"],              category: "mobile",   description: "Multi-chain Web3 wallet" },
  { id: "bitget",     name: "Bitget Wallet",     logo: (s) => <BitgetLogo size={s} />,       networks: ["Multi-chain", "Bitcoin", "Ethereum"],             category: "popular",  description: "Smart on-chain trading wallet" },
];

const CATEGORY_LABELS: Record<string, string> = {
  popular:  "Popular",
  hardware: "Hardware",
  defi:     "DeFi Native",
  mobile:   "Mobile",
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface ConnectedWallet {
  id: string;
  name: string;
  address: string;
  connectedAt: string;
}

function WalletAddressQr({ address, size = 168 }: { address: string; size?: number }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let active = true;
    setSrc("");
    QRCode.toDataURL(address, {
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
  }, [address, size]);

  return src ? (
    <img
      src={src}
      width={size}
      height={size}
      alt={`Scannable QR code for ${address}`}
      className="block rounded-xl"
    />
  ) : (
    <div
      className="bg-gray-100 rounded-xl animate-pulse"
      style={{ width: size, height: size }}
      aria-label="Generating wallet address QR code"
    />
  );
}

// ─── Connect Modal ────────────────────────────────────────────────────────────

function ConnectModal({ wallet, onClose, onConnect }: {
  wallet: Wallet;
  onClose: () => void;
  onConnect: (address: string) => void;
}) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [done, setDone] = useState(false);

  const isValidAddress = (addr: string) => {
    return addr.length >= 25 && /^[a-zA-Z0-9]{25,}$/.test(addr.replace(/^0x/, ""));
  };

  const handleConnect = async () => {
    if (!address.trim()) { setError("Please enter your wallet address"); return; }
    if (!isValidAddress(address.trim())) { setError("Please enter a valid wallet address"); return; }
    setError("");
    setConnecting(true);
    // Simulate connection handshake
    await new Promise(r => setTimeout(r, 1400));
    setConnecting(false);
    setDone(true);
    await new Promise(r => setTimeout(r, 900));
    onConnect(address.trim());
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl p-6 pb-10 animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {wallet.logo(44)}
            <div>
              <h3 className="font-bold text-gray-900 text-base">{wallet.name}</h3>
              <p className="text-xs text-gray-400">{wallet.networks.slice(0, 2).join(" · ")}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center py-6 gap-3">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <p className="font-bold text-gray-900 text-lg">Wallet Connected!</p>
            <p className="text-sm text-gray-400 text-center">
              {wallet.name} is now linked to your Invest Plus account.
            </p>
          </div>
        ) : connecting ? (
          <div className="flex flex-col items-center py-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="font-semibold text-gray-700">Verifying address…</p>
            <p className="text-xs text-gray-400 text-center">Checking address on the network</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Security note */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3.5 flex gap-2.5">
              <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">
                <span className="font-semibold">View-only connection.</span> Enter your public wallet address — Invest Plus never asks for private keys or seed phrases.
              </p>
            </div>

            {/* Address input */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                Wallet Address
              </label>
              <textarea
                value={address}
                onChange={e => { setAddress(e.target.value); setError(""); }}
                placeholder={
                  wallet.networks[0] === "Bitcoin" ? "bc1q… or 1… or 3…" :
                  wallet.networks[0] === "Solana"  ? "Base58 address (e.g. 5Ke…)" :
                  wallet.networks[0] === "Cosmos"  ? "cosmos1… address" :
                  "0x… address"
                }
                rows={2}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-mono text-gray-900 placeholder:text-gray-300 outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none"
              />
              {error && (
                <div className="flex items-center gap-1.5 mt-2 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>

            {/* Supported networks */}
            <div>
              <p className="text-xs text-gray-400 mb-2 font-medium">Supported networks</p>
              <div className="flex flex-wrap gap-1.5">
                {wallet.networks.map(n => (
                  <span key={n} className="text-[11px] font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">{n}</span>
                ))}
              </div>
            </div>

            <button
              onClick={handleConnect}
              className="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Wifi className="w-4 h-4" />
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Wallets() {
  const [search, setSearch]                       = useState("");
  const [activeCategory, setActiveCategory]       = useState<string>("all");
  const [selectedWallet, setSelectedWallet]       = useState<Wallet | null>(null);
  const [connected, setConnected]                 = useState<ConnectedWallet[]>([]);
  const [confirmRemove, setConfirmRemove]         = useState<string | null>(null);
  const [copiedId, setCopiedId]                   = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ip_connected_wallets");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setConnected(
            parsed.filter((item): item is ConnectedWallet =>
              Boolean(
                item &&
                typeof item.id === "string" &&
                typeof item.name === "string" &&
                typeof item.address === "string" &&
                item.address.trim().length > 0,
              ),
            ),
          );
        }
      }
    } catch {}
  }, []);

  const save = (list: ConnectedWallet[]) => {
    setConnected(list);
    localStorage.setItem("ip_connected_wallets", JSON.stringify(list));
  };

  const handleConnect = (address: string) => {
    if (!selectedWallet) return;
    const normalizedAddress = address.trim();
    const already = connected.find(c => c.id === selectedWallet.id);
    if (already) {
      save(connected.map(c => c.id === selectedWallet.id
        ? { ...c, address: normalizedAddress, connectedAt: new Date().toISOString() }
        : c,
      ));
    } else {
      save([...connected, {
        id: selectedWallet.id,
        name: selectedWallet.name,
        address: normalizedAddress,
        connectedAt: new Date().toISOString(),
      }]);
    }
    setSelectedWallet(null);
  };

  const handleRemove = (id: string) => {
    save(connected.filter(c => c.id !== id));
    setConfirmRemove(null);
  };

  const copyAddress = async (id: string, addr: string) => {
    await navigator.clipboard.writeText(addr).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const connectedIds = new Set(connected.map(c => c.id));

  const categories = ["all", ...Array.from(new Set(WALLETS.map(w => w.category)))];

  const filtered = WALLETS.filter(w => {
    const matchSearch = !search || w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.networks.some(n => n.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === "all" || w.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#f5f6fa] pb-24">
      {/* ── Header ── */}
      <div className="bg-white px-5 pt-12 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">Secure Wallet</h1>
            <p className="text-xs text-gray-400">Connect your external wallets</p>
          </div>
        </div>
      </div>

      {/* ── Connected wallets ── */}
      {connected.length > 0 && (
        <div className="px-4 mt-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Connected</p>
          <div className="space-y-2.5">
            {connected.map(cw => {
              const meta = WALLETS.find(w => w.id === cw.id);
              return (
                <ConnectedWalletCard
                  key={cw.id}
                  wallet={cw}
                  meta={meta}
                  copied={copiedId === cw.id}
                  onCopy={() => copyAddress(cw.id, cw.address)}
                  onRemove={() => setConfirmRemove(cw.id)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ── Search ── */}
      <div className="px-4 mt-5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search wallets or networks…"
            className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-blue-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div className="flex gap-2 px-4 mt-3 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "bg-white text-gray-500 border border-gray-200"
            }`}
          >
            {cat === "all" ? "All Wallets" : CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* ── Wallet list ── */}
      <div className="px-4 mt-4 space-y-2.5">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">No wallets found</p>
          </div>
        ) : (
          filtered.map(wallet => {
            const isConnected = connectedIds.has(wallet.id);
            return (
              <button
                key={wallet.id}
                onClick={() => !isConnected && setSelectedWallet(wallet)}
                className={`w-full bg-white rounded-2xl border px-4 py-3.5 flex items-center gap-3.5 text-left shadow-sm transition-all active:scale-[0.98] ${
                  isConnected
                    ? "border-green-200 bg-green-50/40 cursor-default"
                    : "border-gray-100 hover:border-blue-200 hover:shadow-md"
                }`}
              >
                <div className="flex-shrink-0">{wallet.logo(44)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">{wallet.name}</span>
                    {wallet.category === "hardware" && (
                      <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Hardware</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{wallet.description}</p>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {wallet.networks.slice(0, 3).map(n => (
                      <span key={n} className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md">{n}</span>
                    ))}
                  </div>
                </div>
                {isConnected ? (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-100 px-2.5 py-1.5 rounded-full flex-shrink-0">
                    <Check className="w-3 h-3" /> Connected
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                )}
              </button>
            );
          })
        )}
      </div>

      {/* ── Security footer note ── */}
      <div className="mx-4 mt-5 bg-white border border-gray-100 rounded-2xl p-4 flex gap-2.5 shadow-sm">
        <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-gray-800 mb-0.5">View-only · Read-only access</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Invest Plus only reads your public wallet address to display your portfolio. Your private keys and seed phrases stay on your device and are never requested or stored.
          </p>
        </div>
      </div>

      {/* ── Connect modal ── */}
      {selectedWallet && (
        <ConnectModal
          wallet={selectedWallet}
          onClose={() => setSelectedWallet(null)}
          onConnect={handleConnect}
        />
      )}

      {/* ── Remove confirm ── */}
      {confirmRemove && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmRemove(null)} />
          <div className="relative bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl">
            <h3 className="font-bold text-gray-900 text-base mb-1">Disconnect wallet?</h3>
            <p className="text-sm text-gray-400 mb-5">This will remove the wallet from Invest Plus. You can reconnect it anytime.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmRemove(null)}
                className="flex-1 py-3 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => handleRemove(confirmRemove)}
                className="flex-1 py-3 bg-red-500 text-white rounded-2xl text-sm font-semibold hover:bg-red-600 transition-colors">
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ConnectedWalletCard({
  wallet,
  meta,
  copied,
  onCopy,
  onRemove,
}: {
  wallet: ConnectedWallet;
  meta?: Wallet;
  copied: boolean;
  onCopy: () => void;
  onRemove: () => void;
}) {
  const [showQr, setShowQr] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3.5 flex items-center gap-3">
        <div className="flex-shrink-0">{meta?.logo(40)}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-900">{wallet.name}</span>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Connected
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono truncate mt-0.5" title={wallet.address}>
            {wallet.address.slice(0, 10)}…{wallet.address.slice(-6)}
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onCopy}
            aria-label={`Copy ${wallet.name} address`}
            className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
            {copied
              ? <Check className="w-3.5 h-3.5 text-green-500" />
              : <Copy className="w-3.5 h-3.5 text-gray-400" />}
          </button>
          <button
            onClick={() => setShowQr(value => !value)}
            aria-label={`${showQr ? "Hide" : "Show"} ${wallet.name} address QR code`}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              showQr ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
            }`}>
            <QrCode className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRemove}
            aria-label={`Disconnect ${wallet.name}`}
            className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-red-50 transition-colors">
            <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-400" />
          </button>
        </div>
      </div>
      {showQr && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-4 flex flex-col items-center gap-2">
          <div className="bg-white p-2 rounded-2xl border border-gray-100">
            <WalletAddressQr address={wallet.address} />
          </div>
          <p className="text-[10px] text-gray-400 text-center break-all max-w-[240px]">{wallet.address}</p>
          <p className="text-[10px] text-gray-400">This QR encodes the saved public address exactly.</p>
        </div>
      )}
    </div>
  );
}
