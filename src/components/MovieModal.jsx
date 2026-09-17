import { useEffect, useState } from "react";
import { getMovieDetail } from "../api/tmdb";

export default function MovieModal({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("Unknown");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    let cancelled = false;

    async function fetchData() {
      try {
        const detail = await getMovieDetail(movieId, {
          appendToResponse: "credits",
        });
        if (cancelled) return;
        setMovie(detail);
        const dir = detail.credits?.crew?.find((c) => c.job === "Director");
        setDirector(dir ? dir.name : "Unknown");
      } catch (err) {
        if (cancelled) return;
        setError(err.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.classList.add("overflow-y-hidden");
    return () => document.body.classList.remove("overflow-y-hidden");
  }, []);

  const backdropUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const rating = movie?.vote_average
    ? Number(movie.vote_average).toFixed(1)
    : "N/A";

  const releaseDate = movie?.release_date
    ? new Date(movie.release_date).toLocaleDateString()
    : "N/A";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-foreground hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {loading ? (
          <div className="p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <button
              type="button"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          movie && (
            <>
              <div className="relative">
                {backdropUrl ? (
                  <img
                    src={backdropUrl}
                    alt={movie.title}
                    className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                  />
                ) : posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="w-full h-64 md:h-80 bg-secondary rounded-t-2xl flex items-center justify-center">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-muted-foreground"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="2.5"></rect>
                      <path d="M7 22h10"></path>
                      <path d="M2 2l20 20"></path>
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl"></div>
              </div>

              <div className="p-6 md:p-8">
                <h2
                  id="modal-title"
                  className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                >
                  {movie.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-primary"
                    >
                      <path d="M12 2l3.09 6.26L19.41 9.27 14.75 14.17 15.55 20.09 12 17 8.45 20.09 9.25 14.17 4.59 9.27 8.91 8.26z"></path>
                    </svg>
                    <span>Rating: {rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Release: {releaseDate}</span>
                  </div>
                </div>

                {movie.genres && movie.genres.length > 0 && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Genres: {movie.genres.map((g) => g.name).join(", ")}
                  </p>
                )}

                <p className="text-sm text-muted-foreground mb-4">
                  Director: {director}
                </p>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    Overview
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {movie.overview || "No overview available"}
                  </p>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
