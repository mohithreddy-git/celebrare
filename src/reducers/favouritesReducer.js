import { STORAGE_KEY } from '../constants';

export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

// Load favorites from localStorage cleanly
export function loadFavourites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return []; // Fail gracefully if localStorage is corrupted
  }
}

// Reducer to add or remove favorites
export function favouritesReducer(state, action) {
  if (action.type !== TOGGLE_FAVOURITE) return state;

  const id = action.payload;
  
  // If already favorited, remove it; otherwise, add it
  return state.includes(id) 
    ? state.filter((item) => item !== id) 
    : [...state, id];
}
