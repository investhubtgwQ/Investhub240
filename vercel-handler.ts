import type { Request, Response } from "express";
import app from "./artifacts/api-server/src/app";

function normalizeApiPath(req: Request) {
  if (req.url === "/api" || req.url?.startsWith("/api/")) return;
  req.url = `/api${req.url?.startsWith("/") ? req.url : `/${req.url ?? ""}`}`;
}

export default function vercelHandler(req: Request, res: Response) {
  normalizeApiPath(req);
  return app(req, res);
}