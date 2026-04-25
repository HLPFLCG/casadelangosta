import { PHONE_WHATSAPP } from "@/lib/constants";
import { buildWaLink } from "@/lib/whatsapp";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  partySize: z.string().min(1).max(20),
  date: z.string().optional(),
  message: z.string().min(1).max(1000),
  locale: z.string().optional().default("en"),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 422 });
  }

  const { name, partySize, date, message, locale } = parsed.data;

  const greeting = locale === "es" ? "¡Hola!" : "Hi!";
  const composed = `${greeting} I'm ${name}, party of ${partySize}${date ? ` on ${date}` : ""}.\n\n${message}`;

  const waUrl = buildWaLink({ message: composed, phone: PHONE_WHATSAPP });

  // If RESEND_API_KEY is set, also send an email notification to the owner.
  // Uncomment the block below after installing resend and configuring the env var.
  //
  // const apiKey = process.env.RESEND_API_KEY;
  // if (apiKey) {
  //   const { Resend } = await import("resend");
  //   const resend = new Resend(apiKey);
  //   await resend.emails.send({
  //     from: "reservations@casadelangosta.cr",
  //     to: "roberto@casadelangosta.cr",
  //     subject: `New reservation request from ${name}`,
  //     text: composed,
  //   });
  // }

  return NextResponse.json({ waUrl, ok: true });
}
