export const FAVOURITES_STORAGE_KEY = 'photo-gallery:favourites'

export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'

// Runs once, as the lazy initialiser for useReducer. Anything unexpected in
// localStorage (missing, corrupted, wrong shape) falls back to an empty list.
export function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVOURITES_STORAGE_KEY))
    return Array.isArray(saved) ? saved.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

// State is an array of favourited photo ids.
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    default:
      return state
  }
}
