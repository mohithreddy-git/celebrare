import PhotoCard from './PhotoCard';

/**
 * PhotoGrid Component
 *
 * Renders the responsive grid of photo cards adhering to requirement R3:
 * - Mobile (< 768px): 1 column
 * - Tablet (768px - 1023px): 2 columns
 * - Desktop (>= 1024px): 4 columns
 *
 * @param {{
 *   photos: Array<Object>,
 *   favourites: string[],
 *   onToggleFavourite: (id: string) => void
 * }} props
 */
export default function PhotoGrid({ photos, favourites, onToggleFavourite }) {
  return (
    <section aria-label="Photo Gallery" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo) => {
          const isFav = favourites.includes(String(photo.id));

          return (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={isFav}
              onToggleFavourite={onToggleFavourite}
            />
          );
        })}
      </div>
    </section>
  );
}
