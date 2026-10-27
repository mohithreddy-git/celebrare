import { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  loadFavourites,
  TOGGLE_FAVOURITE,
} from '../reducers/favouritesReducer';
import { STORAGE_KEY } from '../constants';
import SearchBar from './SearchBar';
import PhotoGrid from './PhotoGrid';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

/**
 * Gallery Component — The Core Brain
 *
 * Houses all primary state and orchestration logic in a single file per requirements:
 * 1. Data Fetching: useFetchPhotos() custom hook (never calls fetch directly).
 * 2. Favorites Management: useReducer with pure favouritesReducer & lazy loadFavourites.
 * 3. Search Filter: Controlled query state filtering by author name in real-time.
 * 4. Performance Optimization: useCallback, useMemo, and React.memo pairings.
 *
 * --- HOOK HONESTY & PERFORMANCE ANALYSIS ---
 * - `handleSearchChange` with `useCallback`:
 *   Honestly, this provides NO measurable performance benefit because `SearchBar`'s `value`
 *   prop changes on every keystroke anyway. `SearchBar` must re-render to reflect the new text.
 *   However, it satisfies the strict brief specification.
 *
 * - `handleToggleFavourite` with `useCallback` + `React.memo(PhotoCard)`:
 *   This IS where memoization genuinely matters! Because `handleToggleFavourite` has a stable
 *   function reference, unchanged `PhotoCard` instances do NOT re-render when the user types
 *   into the search input or when another card is toggled.
 *
 * - `filteredPhotos` with `useMemo`:
 *   Avoids running the O(N) array filter calculation on re-renders unrelated to [photos, query]
 *   (e.g., when favorites are toggled).
 *
 * - What would break if useCallback / useMemo were removed?
 *   Removing them would NOT break any application behavior or functionality. The app would
 *   still work completely correctly; removing them only causes unnecessary recalculations
 *   and surplus component re-renders.
 */
export default function Gallery() {
  // 1. Data Fetching Hook: returns { photos, loading, error }
  const { photos, loading, error } = useFetchPhotos();

  // 2. Search Query State
  const [query, setQuery] = useState('');

  // 3. Favourites State via useReducer with Lazy Initializer
  // Reads stored favorites from localStorage on initial mount without blocking renders
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites);

  // 4. Persistence Effect: Syncs favorites array to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      // Gracefully handle storage quota exceeded or disabled storage in private browsing
    }
  }, [favourites]);

  /**
   * Search Handler Callback
   * Stable reference passed to memoized SearchBar.
   * (Honest note: does not prevent re-renders during typing because `value` changes).
   */
  const handleSearchChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  /**
   * Toggle Favourite Callback
   * Stable reference passed down through PhotoGrid to memoized PhotoCard components.
   * Dispatches TOGGLE_FAVOURITE with the clicked photo's ID.
   */
  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVOURITE, payload: id });
  }, []);

  /**
   * Derived Filtered Photos List
   * Case-insensitive, trimmed author name filter computed in memory without API calls.
   * Re-evaluates ONLY when `photos` or `query` changes.
   */
  const filteredPhotos = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return photos;

    return photos.filter((photo) =>
      Boolean(photo.author && photo.author.toLowerCase().includes(trimmed))
    );
  }, [photos, query]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Sticky Search Bar Section */}
      <section
        aria-label="Search and Filter Controls"
        className="sticky top-0 z-20 bg-[#FBFBF9]/95 backdrop-blur-xs pt-6 pb-6 border-b border-zinc-200/60"
      >
        <SearchBar value={query} onChange={handleSearchChange} />
      </section>

      {/* Main Content Area */}
      <div className="pt-8">
        {/* Loading State */}
        {loading && <Spinner />}

        {/* Error State */}
        {!loading && error && <ErrorMessage message={error} />}

        {/* Content States (when not loading and no error) */}
        {!loading && !error && (
          <>
            {filteredPhotos.length === 0 ? (
              /* Empty Search Match State */
              <div
                role="status"
                aria-live="polite"
                className="text-center py-24 px-4 max-w-md mx-auto"
              >
                <p className="text-base font-medium text-zinc-900 font-sans">
                  No photos found for “{query.trim()}”
                </p>
                <p className="mt-1.5 text-sm text-zinc-500 font-sans">
                  Try checking the author’s name or clearing your search term.
                </p>
              </div>
            ) : (
              /* Responsive Photo Grid */
              <PhotoGrid
                photos={filteredPhotos}
                favourites={favourites}
                onToggleFavourite={handleToggleFavourite}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
