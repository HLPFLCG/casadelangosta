"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { reserveLink } from "@/lib/whatsapp";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(1).max(50),
  date: z.string().min(1),
  time: z.string().min(1),
  partySize: z.string().min(1),
  specialRequests: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

const TIMES = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

function generateRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "RES-";
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

export function ReservationForm({ locale }: { locale: string }) {
  const t = useTranslations("reserve");
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(_data: FormValues) {
    // Demo mode — no backend storage, just show confirmation
    setBookingRef(generateRef());
  }

  if (bookingRef) {
    return (
      <div className="rounded-3xl bg-sand p-10 text-center max-w-lg mx-auto">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mx-auto mb-6">
          <CalendarCheck className="h-8 w-8 text-teal-700" aria-hidden="true" />
        </div>
        <h2 className="font-display text-3xl font-bold text-palm mb-3">{t("confirm_title")}</h2>
        <p className="text-muted-text mb-2">{t("confirm_ref")}</p>
        <p className="font-mono text-2xl font-bold text-ocean mb-6">{bookingRef}</p>
        <p className="text-muted-text leading-relaxed mb-8">{t("confirm_body")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="accent">
            <a href={reserveLink(locale)} target="_blank" rel="noopener noreferrer">
              {t("confirm_whatsapp")}
            </a>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setBookingRef(null);
              reset();
            }}
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            {t("new_reservation")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto" noValidate>
      {/* Name */}
      <div>
        <Label htmlFor="res-name">{t("form_name")}</Label>
        <Input
          id="res-name"
          placeholder={t("form_name_placeholder")}
          className="mt-1.5"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="res-email">{t("form_email")}</Label>
        <Input
          id="res-email"
          type="email"
          placeholder={t("form_email_placeholder")}
          className="mt-1.5"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="res-phone">{t("form_phone")}</Label>
        <Input
          id="res-phone"
          type="tel"
          placeholder={t("form_phone_placeholder")}
          className="mt-1.5"
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
      </div>

      {/* Date + Time row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="res-date">{t("form_date")}</Label>
          <Input
            id="res-date"
            type="date"
            className="mt-1.5"
            aria-invalid={!!errors.date}
            {...register("date")}
          />
          {errors.date && <p className="text-xs text-destructive mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <Label htmlFor="res-time">{t("form_time")}</Label>
          <select
            id="res-time"
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            aria-invalid={!!errors.time}
            {...register("time")}
          >
            <option value="">—</option>
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.time && <p className="text-xs text-destructive mt-1">{errors.time.message}</p>}
        </div>
      </div>

      {/* Party size */}
      <div>
        <Label htmlFor="res-party">{t("form_party")}</Label>
        <select
          id="res-party"
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
          aria-invalid={!!errors.partySize}
          {...register("partySize")}
        >
          <option value="">—</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={String(n)}>
              {n === 1 ? t("form_party_1") : t("form_party_n", { n })}
            </option>
          ))}
        </select>
        {errors.partySize && (
          <p className="text-xs text-destructive mt-1">{errors.partySize.message}</p>
        )}
      </div>

      {/* Special requests */}
      <div>
        <Label htmlFor="res-requests">{t("form_requests")}</Label>
        <Textarea
          id="res-requests"
          placeholder={t("form_requests_placeholder")}
          className="mt-1.5"
          {...register("specialRequests")}
        />
      </div>

      <Button type="submit" variant="default" className="w-full" disabled={isSubmitting}>
        {t("form_submit")}
      </Button>
    </form>
  );
}
