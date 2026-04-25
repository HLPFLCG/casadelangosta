"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PHONE_LANDLINE, PHONE_LANDLINE_DISPLAY, PHONE_WHATSAPP_DISPLAY } from "@/lib/constants";
import { DEFAULT_RESERVE_MESSAGE, buildWaLink } from "@/lib/whatsapp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  partySize: z.string().min(1).max(20),
  date: z.string().optional(),
  message: z.string().min(1).max(1000),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const waLink = buildWaLink({ message: DEFAULT_RESERVE_MESSAGE });

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      const json = (await res.json()) as { waUrl?: string };
      if (json.waUrl) {
        window.open(json.waUrl, "_blank", "noopener,noreferrer");
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Direct contact CTAs */}
      <div className="space-y-6">
        <div className="rounded-3xl bg-sand p-8 flex flex-col gap-4">
          <Button asChild variant="accent" size="lg" className="w-full">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              {t("whatsapp_cta")} — {PHONE_WHATSAPP_DISPLAY}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <a href={`tel:${PHONE_LANDLINE}`}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t("call_cta")} — {PHONE_LANDLINE_DISPLAY}
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full">
            <a href="mailto:info@casadelangosta.cr">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t("email_cta")}
            </a>
          </Button>
        </div>
      </div>

      {/* Form */}
      <div>
        <h2 className="font-display text-2xl font-bold text-palm mb-6">{t("form_title")}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <Label htmlFor="name">{t("form_name")}</Label>
            <Input
              id="name"
              placeholder={t("form_name_placeholder")}
              className="mt-1.5"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
          </div>
          <div>
            <Label htmlFor="partySize">{t("form_party")}</Label>
            <Input
              id="partySize"
              placeholder={t("form_party_placeholder")}
              className="mt-1.5"
              aria-invalid={!!errors.partySize}
              {...register("partySize")}
            />
          </div>
          <div>
            <Label htmlFor="date">{t("form_date")}</Label>
            <Input id="date" type="date" className="mt-1.5" {...register("date")} />
          </div>
          <div>
            <Label htmlFor="message">{t("form_message")}</Label>
            <Textarea
              id="message"
              placeholder={t("form_message_placeholder")}
              className="mt-1.5"
              aria-invalid={!!errors.message}
              {...register("message")}
            />
          </div>
          <Button type="submit" variant="default" className="w-full" disabled={isSubmitting}>
            {t("form_submit")}
          </Button>
          {status === "success" && (
            <output className="text-sm text-center text-ocean font-medium block">
              {t("form_success")}
            </output>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-center text-destructive font-medium">
              {t("form_error")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
