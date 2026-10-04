import { Router } from "express";
import {
  db,
  transactionsTable,
  coinBalancesTable,
  walletRequestsTable,
  walletSettingsTable,
} from "@workspace/db";
import { eq, and, inArray, desc } from "drizzle-orm";
import { requireAuth, type AuthRequest } from "../middlewares/auth.js";

const router = Router();

// ── Full coin registry ────────────────────────────────────────────────────────
export const ALL_COINS: Record<string, {
  name: string; symbol: string; priceUsd: number;
  network: string; depositAddress: string; color: string;
}> = {
  usdt:  { name: "Tether",          symbol: "USDT",  priceUsd: 1.00,        network: "TRC20 (Tron)",      depositAddress: "TJYeasTPa6gpEEhTKHSENkHPKh1BHXQ7N1",                    color: "#26A17B" },
  btc:   { name: "Bitcoin",         symbol: "BTC",   priceUsd: 64179,       network: "Bitcoin (BTC)",     depositAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",            color: "#F7931A" },
  eth:   { name: "Ethereum",        symbol: "ETH",   priceUsd: 3440,        network: "Ethereum (ERC20)",  depositAddress: "0x742d35Cc6634C0532925a3b8D4C9C4B4d5e6F7a1",           color: "#627EEA" },
  bnb:   { name: "BNB",             symbol: "BNB",   priceUsd: 605,         network: "BSC (BEP20)",       depositAddress: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",            color: "#F3BA2F" },
  trx:   { name: "Tron",            symbol: "TRX",   priceUsd: 0.28,        network: "TRC20 (Tron)",      depositAddress: "TRX7NHqjeKQxGTCi8q8ZY4pL5Zae3KZkKb",                   color: "#EF0027" },
  xrp:   { name: "XRP",             symbol: "XRP",   priceUsd: 0.52,        network: "XRP Ledger",        depositAddress: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",                   color: "#346AA9" },
  sol:   { name: "Solana",          symbol: "SOL",   priceUsd: 143,         network: "Solana (SOL)",      depositAddress: "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb4pEMuL9T7",         color: "#9945FF" },
  ada:   { name: "Cardano",         symbol: "ADA",   priceUsd: 0.39,        network: "Cardano (ADA)",     depositAddress: "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsyd",     color: "#0033AD" },
  doge:  { name: "Dogecoin",        symbol: "DOGE",  priceUsd: 0.12,        network: "Dogecoin (DOGE)",   depositAddress: "DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L",                    color: "#C2A633" },
  matic: { name: "Polygon",         symbol: "MATIC", priceUsd: 0.48,        network: "Polygon (MATIC)",   depositAddress: "0x742d35Cc6634C0532925a3b8D4C9C4a4d5e6F7b2",           color: "#8247E5" },
  ltc:   { name: "Litecoin",        symbol: "LTC",   priceUsd: 77,          network: "Litecoin (LTC)",    depositAddress: "ltc1qd5ky5va5rczfq5g2w2rjn9dlxd53lz3xa73ycq",           color: "#BFBBBB" },
  dot:   { name: "Polkadot",        symbol: "DOT",   priceUsd: 6.8,         network: "Polkadot (DOT)",    depositAddress: "14Gjs1TD93gnwEBfDMHoCgsuf1s2TVKUP6Z1qKmAZnZ8cW5q",      color: "#E6007A" },
  avax:  { name: "Avalanche",       symbol: "AVAX",  priceUsd: 26,          network: "Avalanche C-Chain", depositAddress: "0x742d35Cc6634C0532925a3b8D4C9C4C4d5e6F7c3",           color: "#E84142" },
  link:  { name: "Chainlink",       symbol: "LINK",  priceUsd: 13,          network: "Ethereum (ERC20)",  depositAddress: "0x742d35Cc6634C0532925a3b8D4C9C4D4d5e6F7d4",           color: "#2A5ADA" },
  uni:   { name: "Uniswap",         symbol: "UNI",   priceUsd: 7.4,         network: "Ethereum (ERC20)",  depositAddress: "0x742d35Cc6634C0532925a3b8D4C9C4E4d5e6F7e5",           color: "#FF007A" },
  atom:  { name: "Cosmos",          symbol: "ATOM",  priceUsd: 6.5,         network: "Cosmos (ATOM)",     depositAddress: "cosmos1grpf0955h0ykzq3ar6nmum7y6gdfl6lxfn46h2",          color: "#6F7390" },
  ton:   { name: "Toncoin",         symbol: "TON",   priceUsd: 5.2,         network: "TON Blockchain",    depositAddress: "UQByz_Ub7QL6QYXN7KFB9iDlp5HJE9vH5TQJqhxBE6tMzx",       color: "#0098EA" },
  shib:  { name: "Shiba Inu",       symbol: "SHIB",  priceUsd: 0.0000178,   network: "Ethereum (ERC20)",  depositAddress: "0x742d35Cc6634C0532925a3b8D4C9C4F4d5e6F7f6",           color: "#FFA409" },
  xlm:   { name: "Stellar",         symbol: "XLM",   priceUsd: 0.095,       network: "Stellar (XLM)",     depositAddress: "GAHJJJKMOKYE4RVPZEWZTKH5FVI4PA3VL7GK2LFNUBSGBWE5PYH36BS", color: "#000000" },
  near:  { name: "NEAR Protocol",   symbol: "NEAR",  priceUsd: 4.8,         network: "NEAR Protocol",     depositAddress: "invest-plus.near",                                      color: "#00C08B" },
  algo:  { name: "Algorand",        symbol: "ALGO",  priceUsd: 0.16,        network: "Algorand (ALGO)",   depositAddress: "VCMJKWOY5P5P7SKMZFFOCEROPJCZOTIJMNIYNUCKH7LRO3PLGA",       color: "#00B4D0" },
  apt:   { name: "Aptos",           symbol: "APT",   priceUsd: 8.2,         network: "Aptos (APT)",       depositAddress: "0xf22bede237a07cfa3450181a6b16f190d195fea2ae1eb55ac5db1c434cc72", color: "#25D4AC" },
  arb:   { name: "Arbitrum",        symbol: "ARB",   priceUsd: 0.73,        network: "Arbitrum One",      depositAddress: "0x742d35Cc6634C0532925a3b8D4C9C4G4d5e6F7g7",           color: "#28A0F0" },
  op:    { name: "Optimism",        symbol: "OP",    priceUsd: 1.52,        network: "Optimism (EVM)",    depositAddress: "0x742d35Cc6634C0532925a3b8D4C9C4H4d5e6F7h8",           color: "#FF0420" },
  sui:   { name: "Sui",             symbol: "SUI",   priceUsd: 2.1,         network: "Sui Network",       depositAddress: "0xb3d4ae57f84b8de8b7cd8cb41faa64e01c04c0a8f6fb4fa4e52c8a5f1e4c", color: "#6FBCF0" },
  fil:   { name: "Filecoin",        symbol: "FIL",   priceUsd: 3.8,         network: "Filecoin (FIL)",    depositAddress: "f1abjxfbp274xpdqcpuaykwkfb43omjotacm2p3za",                color: "#0090FF" },
  icp:   { name: "Internet Computer", symbol: "ICP", priceUsd: 9.4,         network: "ICP Network",       depositAddress: "k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae", color: "#29ABE2" },
};

// Default coins seeded for every new user
const DEFAULT_SLUGS = ["usdt", "btc", "eth", "bnb", "trx"];

export async function ensureWalletSettings() {
  for (const [coinSlug, meta] of Object.entries(ALL_COINS)) {
    await db
      .insert(walletSettingsTable)
      .values({
        coinSlug,
        depositAddress: meta.depositAddress,
        network: meta.network,
        enabled: true,
      })
      .onConflictDoNothing();
  }
}

async function getWalletSettingsMap() {
  await ensureWalletSettings();
  const rows = await db.select().from(walletSettingsTable);
  return new Map(rows.map(row => [row.coinSlug, row]));
}

export async function getConfiguredCoin(coinSlug: string) {
  const meta = ALL_COINS[coinSlug];
  if (!meta) return null;
  const settings = await getWalletSettingsMap();
  const setting = settings.get(coinSlug);
  if (setting && !setting.enabled) return null;
  return {
    ...meta,
    depositAddress: setting?.depositAddress ?? meta.depositAddress,
    network: setting?.network ?? meta.network,
  };
}

async function ensureDefaults(userId: number) {
  for (const slug of DEFAULT_SLUGS) {
    await db
      .insert(coinBalancesTable)
      .values({ userId, coinSlug: slug, balance: "0" })
      .onConflictDoNothing();
  }
}

async function getBalance(userId: number, coinSlug: string): Promise<number> {
  const rows = await db
    .select()
    .from(coinBalancesTable)
    .where(and(eq(coinBalancesTable.userId, userId), eq(coinBalancesTable.coinSlug, coinSlug)))
    .limit(1);
  return rows.length ? Number(rows[0].balance) : 0;
}

async function setBalance(userId: number, coinSlug: string, newBal: number) {
  await db
    .update(coinBalancesTable)
    .set({ balance: newBal.toFixed(8), updatedAt: new Date() })
    .where(and(eq(coinBalancesTable.userId, userId), eq(coinBalancesTable.coinSlug, coinSlug)));
}

async function getAvailableBalance(userId: number, coinSlug: string) {
  const currentBalance = await getBalance(userId, coinSlug);
  const pendingWithdrawals = await db
    .select({ amount: walletRequestsTable.amount })
    .from(walletRequestsTable)
    .where(and(
      eq(walletRequestsTable.userId, userId),
      eq(walletRequestsTable.coinSlug, coinSlug),
      eq(walletRequestsTable.type, "withdrawal"),
      eq(walletRequestsTable.status, "pending"),
    ));
  const reserved = pendingWithdrawals.reduce((sum, row) => sum + Number(row.amount), 0);
  return Math.max(0, currentBalance - reserved);
}

export function formatWalletRequest(
  request: typeof walletRequestsTable.$inferSelect,
  user?: { fullName: string; email: string },
) {
  const meta = ALL_COINS[request.coinSlug];
  return {
    id: request.id,
    userId: request.userId,
    user: user ?? null,
    type: request.type,
    coinSlug: request.coinSlug,
    symbol: meta?.symbol ?? request.coinSlug.toUpperCase(),
    coinName: meta?.name ?? request.coinSlug,
    network: meta?.network ?? "",
    amount: Number(request.amount),
    usdAmount: Number(request.usdAmount),
    destinationAddress: request.destinationAddress,
    status: request.status,
    reviewNote: request.reviewNote,
    reviewedBy: request.reviewedBy,
    reviewedAt: request.reviewedAt?.toISOString() ?? null,
    createdAt: request.createdAt.toISOString(),
  };
}

// GET /wallet/all-tokens  — full registry for the import picker
router.get("/wallet/all-tokens", requireAuth, async (_req, res) => {
  const settings = await getWalletSettingsMap();
  const tokens = Object.entries(ALL_COINS)
    .filter(([slug]) => settings.get(slug)?.enabled !== false)
    .map(([slug, meta]) => ({
      slug, name: meta.name, symbol: meta.symbol,
      priceUsd: meta.priceUsd,
      network: settings.get(slug)?.network ?? meta.network,
      depositAddress: settings.get(slug)?.depositAddress ?? meta.depositAddress,
      color: meta.color,
    }));
  res.json(tokens);
});

// GET /wallet/balances — returns every coin the user has a row for
router.get("/wallet/balances", requireAuth, async (req: AuthRequest, res) => {
  await ensureDefaults(req.userId!);

  const rows = await db
    .select()
    .from(coinBalancesTable)
    .where(eq(coinBalancesTable.userId, req.userId!));

  const balanceMap: Record<string, number> = {};
  for (const r of rows) balanceMap[r.coinSlug] = Number(r.balance);

  const settings = await getWalletSettingsMap();
  const userSlugs = Object.keys(balanceMap).filter(s => ALL_COINS[s] && settings.get(s)?.enabled !== false);

  let totalUsd = 0;
  const coins = userSlugs
    .map(slug => {
      const meta = ALL_COINS[slug]!;
      const balance = balanceMap[slug] ?? 0;
      const usdValue = balance * meta.priceUsd;
      totalUsd += usdValue;
      return {
        slug, name: meta.name, symbol: meta.symbol,
        priceUsd: meta.priceUsd, balance, usdValue,
        network: settings.get(slug)?.network ?? meta.network,
        depositAddress: settings.get(slug)?.depositAddress ?? meta.depositAddress,
        color: meta.color,
      };
    })
    // Highest USD value first; ties broken by name
    .sort((a, b) => b.usdValue - a.usdValue || a.name.localeCompare(b.name));

  res.json({ totalUsd, coins });
});

// POST /wallet/add-token  { coinSlug }
router.post("/wallet/add-token", requireAuth, async (req: AuthRequest, res) => {
  const { coinSlug } = req.body;
  if (!coinSlug || !(await getConfiguredCoin(coinSlug))) {
    res.status(400).json({ error: "Unknown or disabled token" });
    return;
  }
  await db
    .insert(coinBalancesTable)
    .values({ userId: req.userId!, coinSlug, balance: "0" })
    .onConflictDoNothing();
  res.json({ success: true, coinSlug });
});

// POST /wallet/deposit  { coinSlug, amount }
router.post("/wallet/deposit", requireAuth, async (req: AuthRequest, res) => {
  const { coinSlug, amount } = req.body;
  const numAmount = Number(amount);
  const configuredCoin = coinSlug ? await getConfiguredCoin(coinSlug) : null;

  if (!coinSlug || !configuredCoin) { res.status(400).json({ error: "Invalid or disabled coin" }); return; }
  if (!numAmount || numAmount <= 0)       { res.status(400).json({ error: "Amount must be positive" }); return; }

  const [request] = await db.insert(walletRequestsTable).values({
    userId: req.userId!,
    type: "deposit",
    coinSlug,
    amount: numAmount.toFixed(8),
    usdAmount: (numAmount * configuredCoin.priceUsd).toFixed(2),
  }).returning();

  res.status(201).json({ success: true, requestId: request.id, status: request.status, coin: coinSlug });
});

// POST /wallet/withdraw  { coinSlug, amount }
router.post("/wallet/withdraw", requireAuth, async (req: AuthRequest, res) => {
  const { coinSlug, amount } = req.body;
  const numAmount = Number(amount);
  const configuredCoin = coinSlug ? await getConfiguredCoin(coinSlug) : null;

  if (!coinSlug || !configuredCoin) { res.status(400).json({ error: "Invalid or disabled coin" }); return; }
  if (!numAmount || numAmount <= 0)       { res.status(400).json({ error: "Amount must be positive" }); return; }

  await ensureDefaults(req.userId!);
  const currentBal = await getAvailableBalance(req.userId!, coinSlug);

  if (currentBal < numAmount) {
    res.status(400).json({ error: `Insufficient ${configuredCoin.symbol} balance` });
    return;
  }

  const destinationAddress = typeof req.body.destinationAddress === "string"
    ? req.body.destinationAddress.trim()
    : "";
  if (!destinationAddress) {
    res.status(400).json({ error: "Destination address is required" });
    return;
  }

  const [request] = await db.insert(walletRequestsTable).values({
    userId: req.userId!,
    type: "withdrawal",
    coinSlug,
    amount: numAmount.toFixed(8),
    usdAmount: (numAmount * configuredCoin.priceUsd).toFixed(2),
    destinationAddress,
  }).returning();

  res.status(201).json({ success: true, requestId: request.id, status: request.status, coin: coinSlug });
});

// POST /wallet/swap  { fromCoin, toCoin, amount }
router.post("/wallet/swap", requireAuth, async (req: AuthRequest, res) => {
  const { fromCoin, toCoin, amount } = req.body;
  const numAmount = Number(amount);

  if (!fromCoin || !ALL_COINS[fromCoin] || !toCoin || !ALL_COINS[toCoin]) {
    res.status(400).json({ error: "Invalid coins" }); return;
  }
  if (fromCoin === toCoin) { res.status(400).json({ error: "Cannot swap to same coin" }); return; }
  if (!numAmount || numAmount <= 0) { res.status(400).json({ error: "Amount must be positive" }); return; }

  await ensureDefaults(req.userId!);
  const fromBal = await getBalance(req.userId!, fromCoin);

  if (fromBal < numAmount) {
    res.status(400).json({ error: `Insufficient ${ALL_COINS[fromCoin]!.symbol} balance` });
    return;
  }

  const fromMeta = ALL_COINS[fromCoin]!;
  const toMeta   = ALL_COINS[toCoin]!;
  const usdValue = numAmount * fromMeta.priceUsd;
  const toAmount = usdValue / toMeta.priceUsd;

  await setBalance(req.userId!, fromCoin, fromBal - numAmount);
  // Ensure toCoin row exists
  await db.insert(coinBalancesTable).values({ userId: req.userId!, coinSlug: toCoin, balance: "0" }).onConflictDoNothing();
  const toBal = await getBalance(req.userId!, toCoin);
  await setBalance(req.userId!, toCoin, toBal + toAmount);

  await db.insert(transactionsTable).values({
    userId: req.userId!,
    investmentId: null,
    type: "fee",
    amount: usdValue.toFixed(2),
    description: `Swapped ${numAmount} ${fromMeta.symbol} → ${toAmount.toFixed(8)} ${toMeta.symbol}`,
  });

  res.json({ success: true, fromAmount: numAmount, toAmount, fromCoin, toCoin });
});

export default router;
