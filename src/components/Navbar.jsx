import { useState } from "react";

export default function Navbar({ navigateTo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div
          className="text-xl font-semibold text-foreground cursor-pointer"
          onClick={() => navigateTo("home")}
        >
          CineXplore
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => navigateTo("movies")}
          >
            Movies
          </button>
        </div>
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
        {menuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-card border-b border-border md:hidden">
            <button
              type="button"
              className="w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => {
                setMenuOpen(false);
                navigateTo("movies");
              }}
            >
              Movies
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
