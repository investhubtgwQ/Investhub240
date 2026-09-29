import { Router } from "express";
import { db, transactionsTable, walletRequestsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth, type AuthRequest } from "../middlewares/auth";
import { ALL_COINS } from "./wallet";

const router = Router();

function formatTransaction(t: typeof transactionsTable.$inferSelect) {
  return {
    id: t.id,
    userId: t.userId,
    investmentId: t.investmentId ?? null,
    type: t.type,
    amount: Number(t.amount),
    description: t.description,
    createdAt: t.createdAt.toISOString(),
  };
}

// GET /transactions
router.get("/transactions", requireAuth, async (req: AuthRequest, res) => {
  const [transactions, requests] = await Promise.all([
    db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, req.userId!))
    .orderBy(transactionsTable.createdAt),
    db
      .select()
      .from(walletRequestsTable)
      .where(eq(walletRequestsTable.userId, req.userId!)),
  ]);

  const pendingRequests = requests.map(request => ({
    id: -request.id,
    userId: request.userId,
    investmentId: null,
    type: request.type,
    amount: Number(request.usdAmount),
    description: `${request.type === "deposit" ? "Deposit" : "Withdrawal"} ${request.status}: ${request.amount} ${ALL_COINS[request.coinSlug]?.symbol ?? request.coinSlug.toUpperCase()}`,
    createdAt: request.createdAt.toISOString(),
  }));

  res.json([...transactions.map(formatTransaction), ...pendingRequests]);
});

export default router;
