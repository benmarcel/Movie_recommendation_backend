import Movie from  "../models/movie_schema.js";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
const TMDB_API_KEY = process.env.TMDB_API_KEY; // Ensure this is in your .env file
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const getOrCreateMovieLocally = async (tmdbId) => {
  let movie = await Movie.findOne({ tmdbId: tmdbId });

  if (!movie) {
    const url = `${TMDB_API_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=videos,genres`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Failed to fetch movie ${tmdbId} from TMDB: ${response.status}`);
      return null;
    }
    const data = await response.json();

    if (!data.id || !data.title) {
      console.error(`Incomplete movie data from TMDB for ID ${tmdbId}`);
      return null;
    }

    const videoKey = data.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key || null;

    movie = new Movie({
      tmdbId: data.id,
      title: data.title,
      releaseDate: data.release_date,
      posterPath: data.poster_path,
      overview: data.overview,
      videoKey: videoKey,
      genres: data.genres?.map(genre => genre.name) || [],
      voteAverage: data.vote_average,
      backdrop_path: data.backdrop_path || null,
      popularity: data.popularity || 0,
      // Add other fields you deem necessary from TMDB response
    });
    await movie.save();
  }
  return movie;
};
export default getOrCreateMovieLocally;