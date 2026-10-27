/**
 * Minimal Loading Spinner Component
 *
 * Provides clear, dignified feedback while photographs are being fetched.
 * Fully accessible with role="status" and visually hidden text for screen readers.
 */
export default function Spinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-24 text-zinc-500"
    >
      <div className="w-8 h-8 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin motion-reduce:animate-none" />
      <span className="mt-4 text-xs tracking-wider uppercase font-medium text-zinc-500">
        Loading collection…
      </span>
      <span className="sr-only">Loading photographs…</span>
    </div>
  );
}
