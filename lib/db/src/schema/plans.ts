import { pgTable, serial, text, numeric, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const plansTable = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  minAmount: numeric("min_amount", { precision: 18, scale: 2 }).notNull(),
  maxAmount: numeric("max_amount", { precision: 18, scale: 2 }),
  roiPercent: numeric("roi_percent", { precision: 5, scale: 2 }).notNull(),
  durationDays: integer("duration_days").notNull(),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  badgeLabel: text("badge_label"),
});

export const insertPlanSchema = createInsertSchema(plansTable).omit({ id: true });
export type InsertPlan = z.infer<typeof insertPlanSchema>;
export type Plan = typeof plansTable.$inferSelect;
