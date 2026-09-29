import { Router } from "express";
import { db, plansTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

function formatPlan(plan: typeof plansTable.$inferSelect) {
  return {
    id: plan.id,
    name: plan.name,
    slug: plan.slug,
    description: plan.description,
    minAmount: Number(plan.minAmount),
    maxAmount: plan.maxAmount !== null ? Number(plan.maxAmount) : null,
    roiPercent: Number(plan.roiPercent),
    durationDays: plan.durationDays,
    features: plan.features as string[],
    badgeLabel: plan.badgeLabel,
  };
}

// GET /plans
router.get("/plans", async (req, res) => {
  const plans = await db.select().from(plansTable).orderBy(plansTable.id);
  res.json(plans.map(formatPlan));
});

// GET /plans/:id
router.get("/plans/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid plan ID" });
    return;
  }

  const plans = await db.select().from(plansTable).where(eq(plansTable.id, id)).limit(1);
  if (!plans.length) {
    res.status(404).json({ error: "Plan not found" });
    return;
  }

  res.json(formatPlan(plans[0]));
});

export default router;
