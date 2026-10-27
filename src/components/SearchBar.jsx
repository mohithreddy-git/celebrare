import React from 'react';

/**
 * SearchBar Component
 *
 * Wrapped in React.memo per requirement R7.
 *
 * Note on memoization efficiency:
 * While wrapping SearchBar in React.memo pairs with useCallback(handleSearchChange),
 * because the `value` prop changes on every keystroke as the user types,
 * SearchBar WILL re-render on each keystroke to display the updated text.
 * Thus, memoization here does not prevent re-renders during typing, but ensures
 * that if the parent Gallery re-rendered due to an unrelated state change,
 * SearchBar would avoid re-rendering.
 *
 * @param {{
 *   value: string,
 *   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
 * }} props
 */
function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label htmlFor="gallery-search" className="sr-only">
          Search photos by author name
        </label>

        {/* Magnifying glass inline SVG icon */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <input
          id="gallery-search"
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Search by author name…"
          autoComplete="off"
          spellCheck="false"
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E5E5DF] rounded-full text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors shadow-xs"
        />
      </form>
    </div>
  );
}

export default React.memo(SearchBar);
