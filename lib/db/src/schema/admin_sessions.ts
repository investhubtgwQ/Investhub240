import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const adminSessionsTable = pgTable("admin_sessions", {
  id: serial("id").primaryKey(),
  adminEmail: text("admin_email").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AdminSession = typeof adminSessionsTable.$inferSelect;