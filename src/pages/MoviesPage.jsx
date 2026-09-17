import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { searchMovies } from "../api/tmdb";

export default function MoviesPage({ navigateTo }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function loadPopular() {
      try {
        const data = await searchMovies("");
        if (!cancelled) setMovies(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadPopular();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(query);
      setMovies(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSeeDetails = useCallback((movieId) => {
    setSelectedMovieId(movieId);
  }, []);

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  const handleRetry = () => {
    setError(null);
    handleSearch("");
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <button
            type="button"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            onClick={handleRetry}
          >
            Retry
          </button>
        </div>
      );
    }

    if (movies.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No results found</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSeeDetails={handleSeeDetails}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar navigateTo={navigateTo} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <SearchBar onSearch={handleSearch} loading={loading} />
          {renderContent()}
        </div>
      </main>
      <Footer />
      {selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </>
  );
}
