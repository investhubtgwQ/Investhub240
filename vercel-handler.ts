import type { Request, Response } from "express";

function normalizeApiPath(req: Request): boolean {
  const requestUrl = new URL(req.url ?? "/", "http://localhost");

  if (requestUrl.searchParams.has("__api_path")) {
    const pathSuffix = requestUrl.searchParams.get("__api_path") ?? "";
    if (pathSuffix.split("/").some((segment) => segment === "." || segment === "..")) {
      return false;
    }

    requestUrl.searchParams.delete("__api_path");
    requestUrl.pathname = pathSuffix
      ? `/api/${pathSuffix.replace(/^\/+/, "")}`
      : "/api";
    req.url = `${requestUrl.pathname}${requestUrl.search}`;
    return true;
  }

  if (requestUrl.pathname !== "/api" && !requestUrl.pathname.startsWith("/api/")) {
    requestUrl.pathname = `/api${requestUrl.pathname.startsWith("/") ? requestUrl.pathname : `/${requestUrl.pathname}`}`;
  }
  req.url = `${requestUrl.pathname}${requestUrl.search}`;
  return true;
}

export default async function vercelHandler(req: Request, res: Response) {
  if (!normalizeApiPath(req)) {
    res.status(400).json({ error: "Invalid API path" });
    return;
  }
  const { default: app } = await import("./artifacts/api-server/dist/app.mjs");
  return app(req, res);
}
