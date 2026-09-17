const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map();

function getCached(key) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  cache.delete(key);
  return null;
}

function setCached(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.append("api_key", API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const message =
      response.status === 401
        ? "Invalid API key"
        : response.status === 404
          ? "Resource not found"
          : response.status === 429
            ? "Rate limit reached. Please wait a moment."
            : "Something went wrong";
    throw new Error(message);
  }
  return response.json();
}

export async function searchMovies(query) {
  const trimmed = query?.trim();
  if (!trimmed) {
    return getPopularMovies();
  }
  const cacheKey = `search:${trimmed}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const url = buildUrl("/search/movie", { query: trimmed });
  const data = await fetchJson(url);
  const results = data.results || [];
  setCached(cacheKey, results);
  return results;
}

export async function getPopularMovies() {
  const cacheKey = "popular";
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const url = buildUrl("/movie/popular");
  const data = await fetchJson(url);
  const results = data.results || [];
  setCached(cacheKey, results);
  return results;
}

export async function getMovieDetail(id, { appendToResponse = "" } = {}) {
  const cacheKey = appendToResponse
    ? `detail:${id}:${appendToResponse}`
    : `detail:${id}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const params = appendToResponse
    ? { append_to_response: appendToResponse }
    : {};
  const url = buildUrl(`/movie/${id}`, params);
  const data = await fetchJson(url);
  setCached(cacheKey, data);
  return data;
}

export async function getMovieCredits(id) {
  const cacheKey = `credits:${id}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const url = buildUrl(`/movie/${id}/credits`);
  const data = await fetchJson(url);
  setCached(cacheKey, data);
  return data;
}

export function clearCache() {
  cache.clear();
}
