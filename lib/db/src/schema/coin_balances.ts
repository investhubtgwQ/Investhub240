import { pgTable, serial, integer, numeric, text, timestamp, unique } from "drizzle-orm/pg-core";
import { usersTable } from "./users.js";

export const coinBalancesTable = pgTable("coin_balances", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  coinSlug: text("coin_slug").notNull(), // usdt, btc, eth, bnb, trx
  balance: numeric("balance", { precision: 28, scale: 8 }).notNull().default("0"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  unique().on(table.userId, table.coinSlug),
]);

export type CoinBalance = typeof coinBalancesTable.$inferSelect;
