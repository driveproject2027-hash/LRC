/**
 * Route-loading fallback.
 *
 * WHAT THIS REPLACED
 *   The previous `Loader` was a full-screen overlay that forced a hard
 *   2-second `setTimeout`, then a further 500ms fade — 2.5 seconds of
 *   artificial delay on every cold load, on top of real network time. It
 *   also painted a hardcoded cyan gradient (`#5BC0DE` to `#4aa3c0`) left
 *   over from the pre-Phase-1 design, and announced "Loading..." to screen
 *   readers for every lazy route chunk.
 *
 * WHAT THIS IS NOW
 *   A genuine Suspense fallback, shown only while a lazy route chunk is
 *   actually resolving. On a warm cache it never paints at all. It uses the
 *   design-system canvas so there is no flash of a different colour, and it
 *   is announced politely rather than as an alert.
 *
 * It renders no text which keeps the fallback to a single muted mark, so a
 * fast chunk swap is invisible rather than a flicker of the word "Loading".
 */
const Loader = () => (
  <div
    className="flex min-h-[60vh] items-center justify-center"
    role="status"
    aria-live="polite"
    aria-label="Loading page"
  >
    <span className="h-8 w-8 animate-pulse rounded-full border border-[var(--border-subtle)] bg-[var(--surface-warm)]" />
  </div>
);

export default Loader;
