import { pgTable, serial, integer, numeric, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const walletRequestsTable = pgTable("wallet_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  type: text("type", { enum: ["deposit", "withdrawal"] }).notNull(),
  coinSlug: text("coin_slug").notNull(),
  amount: numeric("amount", { precision: 28, scale: 8 }).notNull(),
  usdAmount: numeric("usd_amount", { precision: 18, scale: 2 }).notNull(),
  destinationAddress: text("destination_address"),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).notNull().default("pending"),
  reviewNote: text("review_note"),
  reviewedBy: text("reviewed_by"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type WalletRequest = typeof walletRequestsTable.$inferSelect;