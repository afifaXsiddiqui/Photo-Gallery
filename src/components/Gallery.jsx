import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import {
  FAVOURITES_STORAGE_KEY,
  TOGGLE_FAVOURITE,
  favouritesReducer,
  loadFavourites,
} from '../reducers/favouritesReducer'
import { getDisplayAuthor, spreadOut } from '../utils/gallery'
import GallerySkeleton from './GallerySkeleton'
import Header from './Header'
import { AlertIcon, HeartIcon, SearchIcon } from './Icons'
import Intro from './Intro'
import PhotoCard from './PhotoCard'
import PhotoGrid from './PhotoGrid'
import SearchBar from './SearchBar'
import StatusMessage from './StatusMessage'
import ViewToggle from './ViewToggle'

export default function Gallery() {
  const { photos, loading, error, retry } = useFetchPhotos()
  const [query, setQuery] = useState('')
  const [view, setView] = useState('all') // 'all' or 'favourites'
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, loadFavourites)

  // Save favourites whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      // Storage can be full or blocked; the app still works without persistence.
    }
  }, [favourites])

  // Stable function identities, so the memoised SearchBar is not re-rendered
  // every time the gallery re-renders (for example when a heart is toggled).
  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value)
  }, [])
  const handleClearSearch = useCallback(() => {
    setQuery('')
  }, [])

  // The list that is shown: spread out so similar photos are not neighbours,
  // then filtered by the author name users see (and by favourites if that view
  // is selected). It is only recomputed when one of these four inputs changes.
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase()
    return spreadOut(photos).filter(
      (photo) =>
        (view === 'all' || favourites.includes(photo.id)) &&
        (!term || getDisplayAuthor(photo.id).toLowerCase().includes(term)),
    )
  }, [photos, query, view, favourites])

  const handleToggleFavourite = (id) => dispatch({ type: TOGGLE_FAVOURITE, id })

  const handleShowFavourites = () => {
    setView('favourites')
    document.getElementById('gallery')?.scrollIntoView()
  }

  const trimmedQuery = query.trim()

  let resultsText = ''
  if (!loading && !error) {
    const noun = filteredPhotos.length === 1 ? 'photograph' : 'photographs'
    resultsText = `Showing ${filteredPhotos.length} ${noun}`
    if (view === 'favourites') resultsText += ' from your favourites'
    if (trimmedQuery) resultsText += ` by authors matching “${trimmedQuery}”`
  }

  // Exactly one of these is shown at a time.
  let content
  if (loading) {
    content = <GallerySkeleton />
  } else if (error) {
    content = (
      <StatusMessage
        role="alert"
        icon={<AlertIcon className="size-6" />}
        title="We couldn’t load the photographs"
        actionLabel="Try again"
        onAction={retry}
      >
        {error}
      </StatusMessage>
    )
  } else if (filteredPhotos.length === 0 && trimmedQuery) {
    content = (
      <StatusMessage
        icon={<SearchIcon className="size-6" />}
        title="No photographs match"
        actionLabel="Clear search"
        onAction={handleClearSearch}
      >
        {view === 'favourites'
          ? `None of your favourites are by an author matching “${trimmedQuery}”.`
          : `No author name matches “${trimmedQuery}”. Try a different name.`}
      </StatusMessage>
    )
  } else if (filteredPhotos.length === 0 && view === 'favourites') {
    content = (
      <StatusMessage
        icon={<HeartIcon className="size-6" />}
        title="No favourites yet"
        actionLabel="Browse photographs"
        onAction={() => setView('all')}
      >
        Select the heart on any photograph to save it here.
      </StatusMessage>
    )
  } else if (filteredPhotos.length === 0) {
    content = (
      <StatusMessage icon={<AlertIcon className="size-6" />} title="No photographs available">
        The gallery is empty right now.
      </StatusMessage>
    )
  } else {
    content = (
      <PhotoGrid>
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavourite={favourites.includes(photo.id)}
            onToggleFavourite={handleToggleFavourite}
          />
        ))}
      </PhotoGrid>
    )
  }

  return (
    <>
      <Header favouritesCount={favourites.length} onShowFavourites={handleShowFavourites} />

      <main className="mx-auto max-w-7xl px-5 sm:px-8">
        <Intro photoCount={loading || error ? null : photos.length} />

        <section id="gallery" aria-label="Photograph gallery" className="scroll-mt-6 pb-20">
          <div className="flex flex-col gap-3 sm:flex-row">
            <SearchBar value={query} onChange={handleSearchChange} onClear={handleClearSearch} />
            <ViewToggle
              view={view}
              onChange={setView}
              allCount={photos.length > 0 ? photos.length : null}
              favouritesCount={favourites.length}
            />
          </div>

          <p aria-live="polite" className="mb-6 mt-4 min-h-5 text-sm text-ink-soft">
            {resultsText}
          </p>

          {content}
        </section>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-6 text-sm text-ink-mute sm:px-8">
          Photographs from{' '}
          <a
            href="https://picsum.photos"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            Picsum Photos
          </a>
          .
        </p>
      </footer>
    </>
  )
}
