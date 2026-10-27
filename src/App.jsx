import Header from './components/Header';
import Gallery from './components/Gallery';

/**
 * Root Application Component
 *
 * Adheres to functional component paradigm with zero external UI wrappers.
 * Renders the top-level editorial Header followed by the interactive Gallery.
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-zinc-900 selection:bg-rose-100 selection:text-rose-900">
      <Header />
      <Gallery />
    </div>
  );
}
