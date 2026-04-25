import { PHONE_WHATSAPP } from "./constants";

interface WaLinkOptions {
  message: string;
  phone?: string;
}

export function buildWaLink({ message, phone = PHONE_WHATSAPP }: WaLinkOptions): string {
  const clean = phone.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${clean}?text=${encoded}`;
}

export const DEFAULT_RESERVE_MESSAGE =
  "Hi! I'd like to reserve a table at Casa de Langosta. Can you help?";

export const DEFAULT_RESERVE_MESSAGE_ES =
  "¡Hola! Me gustaría reservar una mesa en Casa de Langosta. ¿Pueden ayudarme?";

export function reserveLink(locale = "en"): string {
  return buildWaLink({
    message: locale === "es" ? DEFAULT_RESERVE_MESSAGE_ES : DEFAULT_RESERVE_MESSAGE,
  });
}
