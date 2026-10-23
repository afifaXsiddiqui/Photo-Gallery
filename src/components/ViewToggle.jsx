function ToggleButton({ active, onClick, label, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage sm:flex-none ${
        active ? 'bg-paper font-semibold text-ink shadow-sm' : 'font-medium text-ink-soft hover:text-ink'
      }`}
    >
      {label}
      {count !== null && (
        <span className={`text-xs ${active ? 'text-sage' : 'text-ink-mute'}`}>{count}</span>
      )}
    </button>
  )
}

export default function ViewToggle({ view, onChange, allCount, favouritesCount }) {
  return (
    <div
      role="group"
      aria-label="Choose which photographs to show"
      className="flex gap-1 rounded-lg border border-line bg-sand/60 p-1"
    >
      <ToggleButton
        active={view === 'all'}
        onClick={() => onChange('all')}
        label="All photos"
        count={allCount}
      />
      <ToggleButton
        active={view === 'favourites'}
        onClick={() => onChange('favourites')}
        label="Favourites"
        count={favouritesCount}
      />
    </div>
  )
}
