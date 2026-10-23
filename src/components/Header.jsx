import { HeartIcon } from './Icons'

export default function Header({ favouritesCount, onShowFavourites }) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <div>
          <p className="font-display text-2xl font-semibold leading-none tracking-tight">
            Curated Frames
          </p>
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-mute">
            A photography gallery
          </p>
        </div>

        <button
          type="button"
          onClick={onShowFavourites}
          className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm font-medium transition-colors hover:border-sage hover:text-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <HeartIcon
            className={`size-[18px] ${favouritesCount > 0 ? 'text-sage' : ''}`}
            filled={favouritesCount > 0}
          />
          {/* The word stays in the accessible name on small screens, where it is visually hidden. */}
          <span className="sr-only sm:not-sr-only">Favourites</span>
          <span className="min-w-5 rounded-md bg-sage-wash px-1.5 py-0.5 text-center text-xs font-semibold text-sage-deep">
            {favouritesCount}
            <span className="sr-only"> saved</span>
          </span>
        </button>
      </div>
    </header>
  )
}
