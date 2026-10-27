/**
 * Error Message Component
 *
 * Renders a clear, calm, and accessible error message when API retrieval fails.
 * Uses role="alert" to notify assistive technologies immediately.
 *
 * @param {{ message: string }} props
 */
export default function ErrorMessage({ message }) {
  return (
    <div
      role="alert"
      className="max-w-md mx-auto my-16 p-6 bg-white border border-red-200 rounded-lg text-center shadow-xs"
    >
      <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-full bg-red-50 text-red-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-zinc-900 mb-1">
        Unable to Load Gallery
      </h3>
      <p className="text-sm text-zinc-600 leading-relaxed">
        {message}
      </p>
    </div>
  );
}
