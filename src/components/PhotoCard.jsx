import { useState } from 'react'
import { getDisplayAuthor } from '../utils/gallery'
import { HeartIcon, ImageIcon } from './Icons'

export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const [imageFailed, setImageFailed] = useState(false)
  const author = getDisplayAuthor(photo.id)

  return (
    <li
      className={`group overflow-hidden rounded-xl border bg-paper shadow-[0_1px_2px_rgb(37_39_42/0.05)] transition-shadow hover:shadow-[0_8px_24px_-8px_rgb(37_39_42/0.18)] ${
        isFavourite ? 'border-sage ring-1 ring-sage' : 'border-line'
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        {imageFailed ? (
          <div className="flex size-full flex-col items-center justify-center gap-2 text-ink-mute">
            <ImageIcon className="size-8" />
            <p className="text-sm">Photo unavailable</p>
          </div>
        ) : (
          <img
            src={`https://picsum.photos/id/${photo.id}/800/1000`}
            alt={`Photograph ${photo.id}`}
            width="800"
            height="1000"
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          />
        )}

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove photograph by ${author} from favourites`
              : `Add photograph by ${author} to favourites`
          }
          className={`absolute right-3 top-3 flex size-11 items-center justify-center rounded-full shadow-sm transition active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 ${
            isFavourite
              ? 'bg-sage text-white hover:bg-sage-deep'
              : 'bg-paper/90 text-ink backdrop-blur hover:bg-paper hover:text-sage'
          }`}
        >
          <HeartIcon className="size-5" filled={isFavourite} />
        </button>
      </div>

      <div className="px-4 py-3.5">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-mute">Author</p>
        <p className="mt-0.5 truncate font-medium">{author}</p>
      </div>
    </li>
  )
}
