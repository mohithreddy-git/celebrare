import React from 'react';
import HeartIcon from './HeartIcon';

/**
 * PhotoCard Component
 *
 * Wrapped in React.memo to prevent unnecessary re-renders.
 * Because the parent Gallery maintains query and favorites state,
 * memoizing PhotoCard ensures that typing into the search bar or
 * toggling a favorite on one card does NOT re-render unrelated cards.
 *
 * Adheres to:
 * - 4:3 aspect ratio (`aspect-[4/3]`)
 * - Curated 800x600 image URL (`https://picsum.photos/id/${photo.id}/800/600`)
 * - Explicit width & height, lazy loading, and descriptive alt text
 * - Accessible 40px minimum hit area button with aria-pressed, aria-label, and focus ring
 * - Subtle backdrop behind the heart button ensuring WCAG AA (verified) 3:1 contrast over any photo
 *
 * @param {{
 *   photo: { id: string, author: string, width: number, height: number, url: string, download_url: string },
 *   isFavourite: boolean,
 *   onToggleFavourite: (id: string) => void
 * }} props
 */
function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const author = photo.author || 'Unknown Artist';
  const imageUrl = `https://picsum.photos/id/${photo.id}/800/600`;

  return (
    <article className="group relative flex flex-col bg-white border border-[#E5E5DF] rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transition-none motion-reduce:hover:transform-none">
      {/* 4:3 Aspect Ratio Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <img
          src={imageUrl}
          alt={`Photo by ${author}`}
          width="800"
          height="600"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />

        {/* Heart Favorite Button with subtle backdrop for guaranteed contrast */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? `Remove photo by ${author} from favourites` : `Add photo by ${author} to favourites`}
          className="absolute top-2.5 right-2.5 min-w-[40px] min-h-[40px] w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs cursor-pointer hover:bg-white hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          <HeartIcon isFilled={isFavourite} className="w-5 h-5" />
        </button>
      </div>

      {/* Card Metadata Footer */}
      <div className="p-3.5 flex items-center justify-between border-t border-zinc-100 bg-white">
        <div className="truncate">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Photograph
          </p>
          <h2
            className="text-sm font-medium text-zinc-900 truncate mt-0.5 font-sans"
            title={author}
          >
            {author}
          </h2>
        </div>
      </div>
    </article>
  );
}

// React.memo wrapper ensures cards only re-render if photo, isFavourite, or onToggleFavourite changes
export default React.memo(PhotoCard);
