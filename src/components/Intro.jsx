// photoCount is null while loading or after a failed request.
export default function Intro({ photoCount }) {
  return (
    <section className="flex flex-col gap-8 pb-10 pt-12 sm:pt-16 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          A little inspiration, <em className="italic text-sage">captured.</em>
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
          Explore a small collection of photographs and save the ones you love to your favourites.
        </p>
      </div>

      <div className="flex items-baseline gap-3 border-t border-line pt-4 lg:min-w-52 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
        <span className="font-display text-5xl font-medium leading-none text-sage">
          {photoCount ?? '–'}
        </span>
        <span className="text-sm leading-snug text-ink-soft">
          photographs
          <br />
          in the collection
        </span>
      </div>
    </section>
  )
}
