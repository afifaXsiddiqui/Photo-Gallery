import PhotoGrid from './PhotoGrid'

const SKELETON_COUNT = 8

export default function GallerySkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading photographs…</span>
      <PhotoGrid aria-hidden="true">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <li key={index} className="overflow-hidden rounded-xl border border-line bg-paper">
            <div className="aspect-[4/5] bg-sand motion-safe:animate-pulse" />
            <div className="space-y-2 px-4 py-3.5">
              <div className="h-2.5 w-14 rounded bg-sand motion-safe:animate-pulse" />
              <div className="h-4 w-32 rounded bg-sand motion-safe:animate-pulse" />
            </div>
          </li>
        ))}
      </PhotoGrid>
    </div>
  )
}
