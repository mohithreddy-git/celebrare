import { useState, useEffect } from 'react';
import { API_URL } from '../constants';

/**
 * Custom Hook: useFetchPhotos
 *
 * Encapsulates photo data retrieval, lifecycle management, and error handling.
 * Meets Requirement R6:
 * - Returns exactly { photos, loading, error }
 * - Uses AbortController to cleanly cancel in-flight requests on unmount or
 *   during React 18/19 StrictMode double-invocations.
 * - Initialises loading to true in useState to prevent synchronous setState
 *   in the effect body.
 * - Ignores AbortError to prevent state updates on unmounted components.
 * - Guarantees loading is set to false across all terminal paths.
 *
 * @returns {{ photos: Array<Object>, loading: boolean, error: string | null }}
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchPhotos() {
      try {
        const response = await fetch(API_URL, { signal });

        if (!response.ok) {
          throw new Error(`Failed to load photos from server (Status ${response.status}: ${response.statusText || 'Error'})`);
        }

        const data = await response.json();

        // Validate that data is an array
        if (!Array.isArray(data)) {
          throw new Error('Invalid response structure: expected an array of photos.');
        }

        setPhotos(data);
        setError(null);
      } catch (err) {
        // StrictMode unmount / abort is expected behavior and should not trigger an error state
        if (err.name === 'AbortError') {
          return;
        }

        // Present a clear, human-readable error message for network issues or HTTP errors
        const message = err.message || 'Unable to connect to photo service. Please check your network connection.';
        setError(message);
      } finally {
        // Guarantee loading becomes false if the component is still mounted and request wasn't aborted
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    // Cleanup: abort in-flight fetch when the component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  return { photos, loading, error };
}
