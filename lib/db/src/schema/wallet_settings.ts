import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const walletSettingsTable = pgTable("wallet_settings", {
  id: serial("id").primaryKey(),
  coinSlug: text("coin_slug").notNull().unique(),
  depositAddress: text("deposit_address").notNull(),
  network: text("network").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  updatedBy: text("updated_by"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type WalletSetting = typeof walletSettingsTable.$inferSelect;