import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifyCredentials,
} from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { username, password } = body as { username?: string; password?: string };
  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const valid = verifyCredentials(username.trim(), password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  let token: string;
  try {
    token = await createSessionToken();
  } catch (err) {
    console.error("Failed to create session token:", err);
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  const opts = sessionCookieOptions();
  res.cookies.set(ADMIN_SESSION_COOKIE, token, opts);
  return res;
}
