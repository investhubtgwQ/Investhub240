import { pgTable, serial, integer, numeric, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users.js";
import { plansTable } from "./plans.js";

export const investmentsTable = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  planId: integer("plan_id").notNull().references(() => plansTable.id),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  expectedReturn: numeric("expected_return", { precision: 18, scale: 2 }).notNull(),
  status: text("status", { enum: ["active", "completed", "cancelled"] }).notNull().default("active"),
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertInvestmentSchema = createInsertSchema(investmentsTable).omit({ id: true, createdAt: true });
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Investment = typeof investmentsTable.$inferSelect;
