import { Router } from "express";
import { db, investmentsTable, plansTable, transactionsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth, type AuthRequest } from "../middlewares/auth";

const router = Router();

function formatInvestment(inv: typeof investmentsTable.$inferSelect & { planName?: string }) {
  return {
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
  };
}

// GET /investments
router.get("/investments", requireAuth, async (req: AuthRequest, res) => {
  const rows = await db
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
    .where(eq(investmentsTable.userId, req.userId!))
    .orderBy(investmentsTable.createdAt);

  res.json(rows.map(r => formatInvestment(r as any)));
});

// POST /investments
router.post("/investments", requireAuth, async (req: AuthRequest, res) => {
  const { planId, amount } = req.body;

  if (!planId || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    res.status(400).json({ error: "Valid plan ID and amount are required" });
    return;
  }

  const plans = await db.select().from(plansTable).where(eq(plansTable.id, Number(planId))).limit(1);
  if (!plans.length) {
    res.status(400).json({ error: "Plan not found" });
    return;
  }

  const plan = plans[0];
  const numAmount = Number(amount);
  const minAmount = Number(plan.minAmount);
  const maxAmount = plan.maxAmount !== null ? Number(plan.maxAmount) : null;

  if (numAmount < minAmount) {
    res.status(400).json({ error: `Minimum investment for this plan is $${minAmount}` });
    return;
  }
  if (maxAmount !== null && numAmount > maxAmount) {
    res.status(400).json({ error: `Maximum investment for this plan is $${maxAmount}` });
    return;
  }

  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);
  const roiPercent = Number(plan.roiPercent);
  const expectedReturn = numAmount * (1 + roiPercent / 100);

  const [investment] = await db.insert(investmentsTable).values({
    userId: req.userId!,
    planId: Number(planId),
    amount: numAmount.toFixed(2),
    expectedReturn: expectedReturn.toFixed(2),
    status: "active",
    startDate,
    endDate,
  }).returning();

  // Record deposit transaction
  await db.insert(transactionsTable).values({
    userId: req.userId!,
    investmentId: investment.id,
    type: "deposit",
    amount: numAmount.toFixed(2),
    description: `Investment in ${plan.name} plan`,
  });

  res.status(201).json(formatInvestment({ ...investment, planName: plan.name }));
});

// GET /investments/:id
router.get("/investments/:id", requireAuth, async (req: AuthRequest, res) => {
  const id = parseInt(String(req.params.id));
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid investment ID" });
    return;
  }

  const rows = await db
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
    .where(and(eq(investmentsTable.id, id), eq(investmentsTable.userId, req.userId!)))
    .limit(1);

  if (!rows.length) {
    res.status(404).json({ error: "Investment not found" });
    return;
  }

  res.json(formatInvestment(rows[0] as any));
});

export default router;
