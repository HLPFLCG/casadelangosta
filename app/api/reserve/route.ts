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

  // Send email notifications to the owner and/or admin when RESEND_API_KEY is set.
  // Configure recipients via Cloudflare secrets:
  //   wrangler secret put RESEND_API_KEY
  //   wrangler secret put NOTIFY_EMAIL_OWNER   (e.g. roberto@casadelangosta.cr)
  //   wrangler secret put NOTIFY_EMAIL_ADMIN   (e.g. you@hlpfl.org)
  //   wrangler secret put RESEND_FROM_EMAIL    (e.g. reservations@casadelangosta.cr)
  // The from address must belong to a domain verified in your Resend account.
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const recipients = [
      process.env.NOTIFY_EMAIL_OWNER,
      process.env.NOTIFY_EMAIL_ADMIN,
    ].filter((e): e is string => typeof e === "string" && e.length > 0);

    const from = process.env.RESEND_FROM_EMAIL;
    if (!from) {
      console.warn(
        "RESEND_FROM_EMAIL is not set — skipping email notification. " +
          "Set it to a Resend-verified sending address (e.g. reservations@casadelangosta.cr)."
      );
    } else if (recipients.length > 0) {
      const subject =
        locale === "es"
          ? `Nueva solicitud de reserva de ${name}`
          : `New reservation request from ${name}`;
      const text = [
        `Name: ${name}`,
        `Party size: ${partySize}`,
        date ? `Date: ${date}` : null,
        "",
        `Message:\n${message}`,
        "",
        `—`,
        `Sent via casadelangosta.cr`,
      ]
        .filter((line): line is string => line !== null)
        .join("\n");

      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);
        await resend.emails.send({ from, to: recipients, subject, text });
      } catch (err) {
        // Email failure is non-fatal — the WhatsApp link is still returned.
        console.error("Failed to send reservation email:", err);
      }
    }
  }

  return NextResponse.json({ waUrl, ok: true });
}
