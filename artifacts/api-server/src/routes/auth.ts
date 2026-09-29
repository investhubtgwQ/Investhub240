import { Router } from "express";
import { db, usersTable, sessionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import * as crypto from "crypto";
import { requireAuth, type AuthRequest } from "../middlewares/auth";

const router = Router();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + process.env.SESSION_SECRET).digest("hex");
}

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// POST /auth/register
router.post("/auth/register", async (req, res) => {
  const { email, password, fullName, phone, country, dateOfBirth, gender } = req.body;

  if (!email || !password || !fullName) {
    res.status(400).json({ error: "Email, password, and full name are required" });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ error: "Password must be at least 8 characters" });
    return;
  }

  const existing = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (existing.length) {
    res.status(409).json({ error: "Email already in use" });
    return;
  }

  const passwordHash = hashPassword(password);
  const [user] = await db
    .insert(usersTable)
    .values({ email, passwordHash, fullName, phone: phone || null, country: country || null, dateOfBirth: dateOfBirth || null, gender: gender || null })
    .returning();

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  await db.insert(sessionsTable).values({ userId: user.id, token, expiresAt });

  res.status(201).json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      country: user.country,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      createdAt: user.createdAt.toISOString(),
    },
    token,
  });
});

// POST /auth/login
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const users = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (!users.length) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const user = users[0];
  const passwordHash = hashPassword(password);
  if (user.passwordHash !== passwordHash) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await db.insert(sessionsTable).values({ userId: user.id, token, expiresAt });

  res.json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      country: user.country,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      createdAt: user.createdAt.toISOString(),
    },
    token,
  });
});

// POST /auth/logout
router.post("/auth/logout", requireAuth, async (req: AuthRequest, res) => {
  const authHeader = req.headers.authorization!;
  const token = authHeader.slice(7);
  await db.delete(sessionsTable).where(eq(sessionsTable.token, token));
  res.json({ message: "Logged out successfully" });
});

// GET /auth/me
router.get("/auth/me", requireAuth, async (req: AuthRequest, res) => {
  const users = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
  if (!users.length) {
    res.status(401).json({ error: "User not found" });
    return;
  }
  const user = users[0];
  res.json({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    country: user.country,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    createdAt: user.createdAt.toISOString(),
  });
});

export default router;
