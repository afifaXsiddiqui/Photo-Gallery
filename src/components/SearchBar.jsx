import { memo, useRef } from 'react'
import { CloseIcon, SearchIcon } from './Icons'

function SearchBar({ value, onChange, onClear }) {
  const inputRef = useRef(null)

  const handleClear = () => {
    onClear()
    inputRef.current?.focus()
  }

  return (
    <div className="relative flex-1">
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-mute" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search by author"
        aria-label="Search photographs by author name"
        autoComplete="off"
        className="h-12 w-full rounded-lg border border-line bg-paper pl-12 pr-12 text-base placeholder:text-ink-mute focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/40 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-ink-mute transition-colors hover:bg-sand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <CloseIcon className="size-4" />
        </button>
      )}
    </div>
  )
}

// memo + the stable handlers from Gallery means this skips re-rendering
// when only the favourites change.
export default memo(SearchBar)
