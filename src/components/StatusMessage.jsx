// Shared layout for the error state and the empty states.
export default function StatusMessage({ icon, title, children, actionLabel, onAction, role }) {
  return (
    <div
      role={role}
      className="mx-auto flex max-w-lg flex-col items-center rounded-xl border border-dashed border-line bg-paper/60 px-6 py-14 text-center"
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-sand text-sage">
        {icon}
      </div>
      <h2 className="mt-5 font-display text-2xl font-medium tracking-tight">{title}</h2>
      <p className="mt-2 text-ink-soft">{children}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-lg bg-sage px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
