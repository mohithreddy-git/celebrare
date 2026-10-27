import { STORAGE_KEY } from '../constants';

/**
 * Action Types
 *
 * Using explicit string constants prevents silent typos and provides
 * a single source of truth for all dispatchable actions.
 */
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

/**
 * Lazy Initializer for useReducer
 *
 * Runs ONCE when the component mounts instead of on every render.
 * Reads existing favorites from localStorage and defensively validates
 * that the stored value is genuinely an Array of string IDs.
 *
 * @returns {string[]} Initial array of favorite photo IDs
 */
export function loadFavourites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    // Defensive check: ensure data is an Array and elements are strings
    if (Array.isArray(parsed)) {
      return parsed.map(String);
    }
    return [];
  } catch {
    // If localStorage is unavailable, disabled, or JSON is corrupt, fail gracefully to empty array
    return [];
  }
}

/**
 * Pure Favourites Reducer
 *
 * Calculates the next state without mutating the existing state or causing side effects.
 * Side effects (such as writing to localStorage) MUST live in useEffect, not in the reducer.
 *
 * State structure: Array of photo ID strings (e.g., ['10', '15', '22'])
 *
 * @param {string[]} state - Current array of favorited photo IDs
 * @param {{ type: string, payload: string }} action - Action with type and photo ID payload
 * @returns {string[]} New array of favorited photo IDs
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE: {
      const id = String(action.payload);
      const isAlreadyFav = state.includes(id);

      // Return a new array reference: either remove the ID or append it
      if (isAlreadyFav) {
        return state.filter((item) => item !== id);
      }
      return [...state, id];
    }

    default:
      return state;
  }
}
