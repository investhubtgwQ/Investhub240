import { Request, Response, NextFunction } from "express";
import { db, sessionsTable, usersTable, adminSessionsTable } from "@workspace/db";
import { eq, and, gt } from "drizzle-orm";

export interface AuthRequest extends Request {
  userId?: number;
  userEmail?: string;
}

export interface AdminRequest extends Request {
  adminEmail?: string;
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.slice(7);
  const now = new Date();

  const sessions = await db
    .select({ userId: sessionsTable.userId })
    .from(sessionsTable)
    .where(
      and(
        eq(sessionsTable.token, token),
        gt(sessionsTable.expiresAt, now)
      )
    )
    .limit(1);

  if (!sessions.length) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  req.userId = sessions[0].userId;
  next();
}

export async function requireAdmin(req: AdminRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Admin authentication required" });
    return;
  }

  const token = authHeader.slice(7);
  const now = new Date();
  const sessions = await db
    .select({ adminEmail: adminSessionsTable.adminEmail })
    .from(adminSessionsTable)
    .where(
      and(
        eq(adminSessionsTable.token, token),
        gt(adminSessionsTable.expiresAt, now),
      ),
    )
    .limit(1);

  if (!sessions.length) {
    res.status(401).json({ error: "Invalid or expired admin session" });
    return;
  }

  req.adminEmail = sessions[0].adminEmail;
  next();
}
