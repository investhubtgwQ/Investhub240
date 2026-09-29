import { Router } from "express";
import { db, investmentsTable, transactionsTable, plansTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth, type AuthRequest } from "../middlewares/auth";

const router = Router();

// GET /dashboard/summary
router.get("/dashboard/summary", requireAuth, async (req: AuthRequest, res) => {
  const userId = req.userId!;

  // Get all investments with plan names
  const investments = await db
    .select({
      id: investmentsTable.id,
      userId: investmentsTable.userId,
      planId: investmentsTable.planId,
      planName: plansTable.name,
      amount: investmentsTable.amount,
      expectedReturn: investmentsTable.expectedReturn,
      status: investmentsTable.status,
      startDate: investmentsTable.startDate,
      endDate: investmentsTable.endDate,
      createdAt: investmentsTable.createdAt,
    })
    .from(investmentsTable)
    .leftJoin(plansTable, eq(investmentsTable.planId, plansTable.id))
    .where(eq(investmentsTable.userId, userId));

  const active = investments.filter(i => i.status === "active");
  const completed = investments.filter(i => i.status === "completed");

  const totalInvested = investments.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalReturns = completed.reduce((sum, i) => sum + (Number(i.expectedReturn) - Number(i.amount)), 0);
  const portfolioValue = totalInvested + totalReturns;
  const roiPercent = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

  // Recent transactions
  const transactions = await db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, userId))
    .orderBy(transactionsTable.createdAt)
    .limit(10);

  const formatInvestment = (inv: typeof investments[0]) => ({
    id: inv.id,
    userId: inv.userId,
    planId: inv.planId,
    planName: inv.planName ?? "",
    amount: Number(inv.amount),
    expectedReturn: Number(inv.expectedReturn),
    status: inv.status,
    startDate: inv.startDate.toISOString(),
    endDate: inv.endDate.toISOString(),
    createdAt: inv.createdAt.toISOString(),
  });

  const formatTransaction = (t: typeof transactions[0]) => ({
    id: t.id,
    userId: t.userId,
    investmentId: t.investmentId ?? null,
    type: t.type,
    amount: Number(t.amount),
    description: t.description,
    createdAt: t.createdAt.toISOString(),
  });

  res.json({
    totalInvested,
    totalReturns,
    activeInvestments: active.length,
    completedInvestments: completed.length,
    portfolioValue,
    roiPercent,
    recentTransactions: transactions.map(formatTransaction),
    activeInvestmentsList: active.map(formatInvestment),
  });
});

export default router;
