// Demo author labels. They are NOT the real photographers: each photo's id is
// mapped to one of these names, so a given photo always shows the same name.
export const DISPLAY_NAMES = [
  'Alex Morgan',
  'Jamie Wilson',
  'Taylor Brooks',
  'Sam Carter',
  'Jordan Lee',
  'Emily Parker',
  'Daniel Reed',
  'Olivia Bennett',
  'Ryan Mitchell',
  'Sophie Turner',
  'Noah Williams',
  'Mia Thompson',
  'Priya Nair',
  'Lucas Martin',
  'Hannah Kim',
]

export function getDisplayAuthor(photoId) {
  const index = Number.parseInt(photoId, 10) || 0
  return DISPLAY_NAMES[index % DISPLAY_NAMES.length]
}

// Picsum lists photos from the same shoot next to each other (ids 0-9 are all
// laptops and desks). Taking every 11th photo, starting from the second one,
// separates them. 11 is prime, so every photo appears exactly once unless the
// list length is a multiple of 11, in which case the order is left alone.
const STEP = 11
const OFFSET = 1

export function spreadOut(photos) {
  const count = photos.length
  if (count < 2 || count % STEP === 0) return photos
  return photos.map((_, position) => photos[(position * STEP + OFFSET) % count])
}
