/**
 * Header Component
 *
 * Renders ONLY the editorial branding, title, and subtitle.
 * In accordance with architecture guidelines, all search and gallery state
 * resides in Gallery.jsx.
 */
export default function Header() {
  return (
    <header className="pt-12 pb-8 text-center border-b border-zinc-200/60 bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400 mb-2 font-sans">
          Curated Exhibition
        </p>
        <h1 className="text-4xl sm:text-5xl font-normal font-serif text-zinc-900 tracking-tight">
          Celebrare Gallery
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-zinc-500 max-w-xl mx-auto font-sans leading-relaxed">
          An archival showcase of thirty photographs capturing light, geometry, and human perspective.
        </p>
      </div>
    </header>
  );
}
