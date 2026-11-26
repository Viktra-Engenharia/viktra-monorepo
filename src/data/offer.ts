// Current offer. Every offer must show its end date and conditions on the page (CDC arts. 30, 35, 37).
// Set `offer` to null when there is no real offer.

export interface Offer {
  title: string;
  description: string;
  /** Last valid day, ISO date (YYYY-MM-DD), inclusive, in Brasília time. */
  endsOn: string;
  conditions: string[];
  /** Optional link to the full terms. */
  termsUrl?: string;
}

// TODO(conteudo): definir uma oferta real (bônus preferível a % de desconto), com data final e regras.
export const offer: Offer | null = null;

/** Returns the offer only while it is valid. Evaluated at build time, so rebuild after it ends. */
export function getActiveOffer(now: Date = new Date()): Offer | null {
  if (!offer) return null;
  const endOfLastDay = new Date(`${offer.endsOn}T23:59:59-03:00`);
  return now <= endOfLastDay ? offer : null;
}
