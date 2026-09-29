import { Router } from "express";
import * as crypto from "crypto";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import {
  db,
  adminSessionsTable,
  appSettingsTable,
  coinBalancesTable,
  transactionsTable,
  usersTable,
  walletRequestsTable,
  walletSettingsTable,
} from "@workspace/db";
import { requireAdmin, type AdminRequest } from "../middlewares/auth";
import {
  ALL_COINS,
  ensureWalletSettings,
  formatWalletRequest,
} from "./wallet";

const router = Router();
const DEFAULT_APP_SETTINGS = {
  requireDepositApproval: "true",
  requireWithdrawalApproval: "true",
  maintenanceMode: "false",
};

function adminPasswordDigest(password: string) {
  return crypto
    .createHash("sha256")
    .update(`${password}${process.env.SESSION_SECRET ?? ""}`)
    .digest();
}

function secureEqual(left: Buffer, right: Buffer) {
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function configuredAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  return email && password ? { email, password } : null;
}

function serializeUser(user: typeof usersTable.$inferSelect) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    country: user.country,
    createdAt: user.createdAt.toISOString(),
  };
}

// POST /admin/auth/login
router.post("/admin/auth/login", async (req, res) => {
  const admin = configuredAdmin();
  if (!admin) {
    res.status(503).json({
      error: "Admin access is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD server secrets.",
    });
    return;
  }

  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";
  if (
    email !== admin.email ||
    !secureEqual(adminPasswordDigest(password), adminPasswordDigest(admin.password))
  ) {
    res.status(401).json({ error: "Invalid admin credentials" });
    return;
  }

  const token = `admin_${crypto.randomBytes(32).toString("hex")}`;
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);
  await db.insert(adminSessionsTable).values({
    adminEmail: admin.email,
    token,
    expiresAt,
  });

  res.json({ token, admin: { email: admin.email, expiresAt: expiresAt.toISOString() } });
});

router.get("/admin/auth/me", requireAdmin, async (req: AdminRequest, res) => {
  res.json({ email: req.adminEmail, role: "admin" });
});

router.post("/admin/auth/logout", requireAdmin, async (req: AdminRequest, res) => {
  const token = req.headers.authorization!.slice(7);
  await db.delete(adminSessionsTable).where(eq(adminSessionsTable.token, token));
  res.json({ success: true });
});

router.get("/admin/requests", requireAdmin, async (req, res) => {
  const requestedType = req.query.type === "deposit" || req.query.type === "withdrawal"
    ? req.query.type
    : undefined;
  const requestedStatus = req.query.status === "pending" || req.query.status === "approved" || req.query.status === "rejected"
    ? req.query.status
    : undefined;

  const filters = [];
  if (requestedType) filters.push(eq(walletRequestsTable.type, requestedType));
  if (requestedStatus) filters.push(eq(walletRequestsTable.status, requestedStatus));

  const rows = await db
    .select({
      request: walletRequestsTable,
      user: usersTable,
    })
    .from(walletRequestsTable)
    .innerJoin(usersTable, eq(walletRequestsTable.userId, usersTable.id))
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(walletRequestsTable.createdAt));

  res.json(rows.map(row => formatWalletRequest(row.request, {
    fullName: row.user.fullName,
    email: row.user.email,
  })));
});

router.post("/admin/requests/:id/review", requireAdmin, async (req: AdminRequest, res) => {
  const id = Number(req.params.id);
  const decision = req.body.status;
  const note = typeof req.body.note === "string" ? req.body.note.trim() : null;

  if (!Number.isInteger(id) || !["approved", "rejected"].includes(decision)) {
    res.status(400).json({ error: "A valid request id and review status are required" });
    return;
  }

  const [request] = await db
    .select()
    .from(walletRequestsTable)
    .where(eq(walletRequestsTable.id, id))
    .limit(1);

  if (!request) {
    res.status(404).json({ error: "Request not found" });
    return;
  }
  if (request.status !== "pending") {
    res.status(409).json({ error: "This request has already been reviewed" });
    return;
  }

  const amount = Number(request.amount);
  if (decision === "approved") {
    const existing = await db
      .select()
      .from(coinBalancesTable)
      .where(and(
        eq(coinBalancesTable.userId, request.userId),
        eq(coinBalancesTable.coinSlug, request.coinSlug),
      ))
      .limit(1);

    const currentBalance = existing.length ? Number(existing[0].balance) : 0;
    if (request.type === "withdrawal" && currentBalance < amount) {
      res.status(409).json({ error: "User no longer has enough balance for this withdrawal" });
      return;
    }

    if (!existing.length) {
      await db.insert(coinBalancesTable).values({
        userId: request.userId,
        coinSlug: request.coinSlug,
        balance: request.type === "deposit" ? amount.toFixed(8) : "0",
      });
    } else {
      const nextBalance = request.type === "deposit"
        ? currentBalance + amount
        : currentBalance - amount;
      await db
        .update(coinBalancesTable)
        .set({ balance: nextBalance.toFixed(8), updatedAt: new Date() })
        .where(eq(coinBalancesTable.id, existing[0].id));
    }

    const meta = ALL_COINS[request.coinSlug];
    await db.insert(transactionsTable).values({
      userId: request.userId,
      investmentId: null,
      type: request.type,
      amount: Number(request.usdAmount).toFixed(2),
      description: request.type === "deposit"
        ? `Deposited ${amount} ${meta?.symbol ?? request.coinSlug.toUpperCase()}`
        : `Withdrew ${amount} ${meta?.symbol ?? request.coinSlug.toUpperCase()}${request.destinationAddress ? ` to ${request.destinationAddress}` : ""}`,
    });
  }

  const [updated] = await db
    .update(walletRequestsTable)
    .set({
      status: decision,
      reviewNote: note,
      reviewedBy: req.adminEmail ?? null,
      reviewedAt: new Date(),
    })
    .where(and(
      eq(walletRequestsTable.id, id),
      eq(walletRequestsTable.status, "pending"),
    ))
    .returning();

  if (!updated) {
    res.status(409).json({ error: "This request was reviewed by another admin" });
    return;
  }

  res.json({ success: true, request: formatWalletRequest(updated) });
});

router.get("/admin/users", requireAdmin, async (req, res) => {
  const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
  const users = await db
    .select()
    .from(usersTable)
    .where(search
      ? or(ilike(usersTable.email, `%${search}%`), ilike(usersTable.fullName, `%${search}%`))
      : undefined)
    .orderBy(desc(usersTable.createdAt))
    .limit(100);

  const balances = await db.select().from(coinBalancesTable);
  const totals = new Map<number, number>();
  for (const balance of balances) {
    totals.set(
      balance.userId,
      (totals.get(balance.userId) ?? 0) + Number(balance.balance) * (ALL_COINS[balance.coinSlug]?.priceUsd ?? 0),
    );
  }

  res.json(users.map(user => ({
    ...serializeUser(user),
    totalUsd: totals.get(user.id) ?? 0,
  })));
});

router.post("/admin/users/:id/balance", requireAdmin, async (req: AdminRequest, res) => {
  const userId = Number(req.params.id);
  const coinSlug = typeof req.body.coinSlug === "string" ? req.body.coinSlug : "";
  const amount = Number(req.body.amount);
  const note = typeof req.body.note === "string" ? req.body.note.trim() : "";
  const meta = ALL_COINS[coinSlug];

  if (!Number.isInteger(userId) || !meta || !Number.isFinite(amount) || amount === 0) {
    res.status(400).json({ error: "User, coin, and a non-zero adjustment are required" });
    return;
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const [existing] = await db
    .select()
    .from(coinBalancesTable)
    .where(and(eq(coinBalancesTable.userId, userId), eq(coinBalancesTable.coinSlug, coinSlug)))
    .limit(1);
  const current = existing ? Number(existing.balance) : 0;
  const next = current + amount;
  if (next < 0) {
    res.status(400).json({ error: "Adjustment cannot make the balance negative" });
    return;
  }

  if (existing) {
    await db.update(coinBalancesTable)
      .set({ balance: next.toFixed(8), updatedAt: new Date() })
      .where(eq(coinBalancesTable.id, existing.id));
  } else {
    await db.insert(coinBalancesTable).values({ userId, coinSlug, balance: next.toFixed(8) });
  }

  await db.insert(transactionsTable).values({
    userId,
    investmentId: null,
    type: amount > 0 ? "deposit" : "withdrawal",
    amount: Math.abs(amount * meta.priceUsd).toFixed(2),
    description: `Admin adjustment: ${amount > 0 ? "+" : ""}${amount} ${meta.symbol}${note ? ` — ${note}` : ""}`,
  });

  res.json({ success: true, coinSlug, balance: next });
});

router.get("/admin/settings", requireAdmin, async (_req, res) => {
  await ensureWalletSettings();
  for (const [settingKey, settingValue] of Object.entries(DEFAULT_APP_SETTINGS)) {
    await db.insert(appSettingsTable)
      .values({ settingKey, settingValue })
      .onConflictDoNothing();
  }
  const [walletSettings, appSettings] = await Promise.all([
    db.select().from(walletSettingsTable).orderBy(walletSettingsTable.coinSlug),
    db.select().from(appSettingsTable),
  ]);
  res.json({
    walletSettings,
    appSettings: Object.fromEntries(appSettings.map(setting => [setting.settingKey, setting.settingValue === "true"])),
  });
});

router.put("/admin/settings/wallet/:coinSlug", requireAdmin, async (req: AdminRequest, res) => {
  const coinSlug = typeof req.params.coinSlug === "string" ? req.params.coinSlug : "";
  const meta = ALL_COINS[coinSlug];
  const depositAddress = typeof req.body.depositAddress === "string" ? req.body.depositAddress.trim() : "";
  const network = typeof req.body.network === "string" ? req.body.network.trim() : "";
  const enabled = typeof req.body.enabled === "boolean" ? req.body.enabled : true;

  if (!meta || !depositAddress || !network) {
    res.status(400).json({ error: "A valid coin, deposit address, and network are required" });
    return;
  }

  const [setting] = await db.update(walletSettingsTable)
    .set({ depositAddress, network, enabled, updatedBy: req.adminEmail ?? null, updatedAt: new Date() })
    .where(eq(walletSettingsTable.coinSlug, coinSlug))
    .returning();
  res.json({ success: true, setting });
});

router.put("/admin/settings/app", requireAdmin, async (req: AdminRequest, res) => {
  const input = req.body?.settings;
  if (!input || typeof input !== "object") {
    res.status(400).json({ error: "Settings object is required" });
    return;
  }

  for (const settingKey of Object.keys(DEFAULT_APP_SETTINGS)) {
    if (typeof input[settingKey] !== "boolean") continue;
    await db.insert(appSettingsTable)
      .values({
        settingKey,
        settingValue: String(input[settingKey]),
        updatedBy: req.adminEmail ?? null,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: appSettingsTable.settingKey,
        set: {
          settingValue: String(input[settingKey]),
          updatedBy: req.adminEmail ?? null,
          updatedAt: new Date(),
        },
      });
  }
  res.json({ success: true });
});

export default router;