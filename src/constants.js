/**
 * Application Constants
 *
 * Centralized configuration constants for the photo gallery.
 * Centralizing avoids magic strings and ensures consistency across hooks and reducers.
 */

// Public endpoint providing a list of 30 curated photographs
export const API_URL = 'https://picsum.photos/v2/list?limit=30';

// Persistent localStorage key used to store the array of favorited photo IDs
export const STORAGE_KEY = 'celebrare_gallery_favourites';
