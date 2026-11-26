// Measurement helper. No analytics tool is chosen yet, so `track` only logs in dev.
// When one is chosen (prefer cookieless: Plausible/Umami), forward events here — nowhere else.

export type TrackEvent =
  | 'hero_view'
  | 'calculator_start'
  | 'calculator_result'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click';

export type TrackData = Record<string, string | number | boolean>;

export function track(event: TrackEvent, data: TrackData = {}): void {
  if (import.meta.env.DEV) {
    console.debug('[track]', event, data);
  }
}

/**
 * Tracks clicks on any element with `data-track="<event>"` (+ optional `data-track-location`),
 * using one delegated listener so components don't need their own scripts.
 */
export function initClickTracking(): void {
  document.addEventListener('click', (clickEvent) => {
    const target = clickEvent.target;
    if (!(target instanceof Element)) return;

    const element = target.closest<HTMLElement>('[data-track]');
    if (!element) return;

    const event = element.dataset.track as TrackEvent;
    const location = element.dataset.trackLocation;
    track(event, location ? { location } : {});
  });
}
