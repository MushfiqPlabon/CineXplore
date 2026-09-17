import { memo } from "react";

const MovieCard = memo(function MovieCard({ movie, onSeeDetails }) {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const rating = movie.vote_average
    ? Number(movie.vote_average).toFixed(1)
    : "N/A";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      <div className="aspect-[2/3] bg-secondary flex items-center justify-center overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No poster available
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-foreground font-semibold text-lg mb-2 line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-primary"
            >
              <path d="M12 2l3.09 6.26L19.41 9.27 14.75 14.17 15.55 20.09 12 17 8.45 20.09 9.25 14.17 4.59 9.27 8.91 8.26z"></path>
            </svg>
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{releaseYear}</span>
          </div>
        </div>
        <button
          type="button"
          className="mt-auto px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => onSeeDetails(movie.id)}
        >
          See Details
        </button>
      </div>
    </div>
  );
});

export default MovieCard;
