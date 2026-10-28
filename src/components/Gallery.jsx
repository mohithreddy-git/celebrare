import { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import { favouritesReducer, loadFavourites, TOGGLE_FAVOURITE } from '../reducers/favouritesReducer';
import { STORAGE_KEY } from '../constants';
import SearchBar from './SearchBar';
import PhotoGrid from './PhotoGrid';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [query, setQuery] = useState('');
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {}
  }, [favourites]);

  // Memoize toggle handler to prevent child cards from re-rendering unnecessarily
  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVOURITE, payload: id });
  }, []);

  // Memoize search filtration to avoid heavy recalculations on every render
  const filteredPhotos = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return photos;
    return photos.filter((p) => p.author?.toLowerCase().includes(trimmed));
  }, [photos, query]);

  return (
    <main className="max-w-7xl mx-auto px-4 pb-20">
      <section className="sticky top-0 z-20 bg-white pt-6 pb-6 border-b">
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
      </section>

      <div className="pt-8">
        {loading && <Spinner />}
        {!loading && error && <ErrorMessage message={error} />}
        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="text-center py-24">
            <p className="font-medium text-zinc-900">No photos found for “{query}”</p>
          </div>
        )}
        {!loading && !error && filteredPhotos.length > 0 && (
          <PhotoGrid
            photos={filteredPhotos}
            favourites={favourites}
            onToggleFavourite={handleToggleFavourite}
          />
        )}
      </div>
    </main>
  );
}
