import User from '../models/user_schema.js';
import dotenv from "dotenv";
dotenv.config()

const personalizedRecc = async (req, res) => {

  
  const userId = req.user.id;
  const TMDB_API_KEY = process.env.TMDB_API_KEY; // Make sure this is set in your .env file
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

  try {
    const user = await User.findById(userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favorites = user.favorites;

    // If no favorites, return early with an empty array
    if (favorites.length === 0) {
      return res.status(200).json({ recommendations: [], message: "No favorites found to generate recommendations. Add some movies!" });
    }

    // --- Core Recommendation Logic ---

    // 1. Get all genre names from user's favorites
    const allFavoriteGenreNames = [];
    favorites.forEach(movie => {
      // Assuming 'movie.genres' is an array of strings (e.g., ["Action", "Comedy"])
      if (movie.genres && Array.isArray(movie.genres)) {
        allFavoriteGenreNames.push(...movie.genres);
      }
    });

    if (allFavoriteGenreNames.length === 0) {
      return res.status(200).json({ recommendations: [], message: "Could not find any genres in your favorite movies." });
    }

    // 2. Determine the most frequent genre
    const genreCounts = {};
    allFavoriteGenreNames.forEach(genreName => {
      genreCounts[genreName] = (genreCounts[genreName] || 0) + 1;
    });

    let topGenreName = '';
    let maxCount = 0;
    for (const genre in genreCounts) {
      if (genreCounts[genre] > maxCount) {
        maxCount = genreCounts[genre];
        topGenreName = genre;
      }
    }

    if (!topGenreName) {
      return res.status(200).json({ recommendations: [], message: "No dominant favorite genre found." });
    }

    // 3. Get TMDB's list of genres to find the ID for our top genre name
    let topGenreId = null;
    try {
      const genreListUrl = `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`;
      const genreListResponse = await fetch(genreListUrl);

      if (!genreListResponse.ok) {
        throw new Error(`Failed to fetch TMDB genre list: ${genreListResponse.status}`);
      }
      const genreListData = await genreListResponse.json();

      const foundGenre = genreListData.genres.find(g => g.name === topGenreName);
      if (foundGenre) {
        topGenreId = foundGenre.id;
      }
    } catch (error) {
      console.error("Error fetching TMDB genre list:", error);
      // It's crucial to still return something or handle this gracefully
      return res.status(500).json({ message: "Error fetching genre information, cannot proceed with recommendations." });
    }

    if (!topGenreId) {
      return res.status(200).json({ recommendations: [], message: `Could not find TMDB ID for '${topGenreName}'. Recommendations might be limited.` });
    }

    // 4. Fetch a broader set of popular movies from TMDB (e.g., first 3 pages)
    let allPopularMovies = [];
    const numberOfPagesToFetch = 3; // Fetch from multiple pages for more variety

    for (let page = 1; page <= numberOfPagesToFetch; page++) {
      try {
        const popularMoviesUrl = new URL(`${TMDB_BASE_URL}/movie/popular`);
        popularMoviesUrl.searchParams.append('api_key', TMDB_API_KEY);
        popularMoviesUrl.searchParams.append('page', page.toString());
        popularMoviesUrl.searchParams.append('include_adult', 'false'); // Exclude adult content

        const response = await fetch(popularMoviesUrl.toString());

        if (!response.ok) {
          console.warn(`Failed to fetch popular movies from TMDB page ${page}: ${response.status}`);
          // Continue to next page even if one fails
          continue;
        }
        const data = await response.json();
        if (data.results) {
          allPopularMovies.push(...data.results);
        }
      } catch (error) {
        console.error(`Error fetching popular movies from TMDB page ${page}:`, error);
        // Continue to next page
      }
    }

    if (allPopularMovies.length === 0) {
        return res.status(200).json({ recommendations: [], message: "Could not fetch any popular movies from TMDB." });
    }

    // 5. Filter the fetched movies by the top genre ID
    // TMDB movies have a 'genre_ids' array, which contains the IDs of their genres
    const genreFilteredMovies = allPopularMovies.filter(movie =>
      movie.genre_ids && movie.genre_ids.includes(topGenreId)
    );

    // If no movies match the top genre after broad fetch and filter
    if (genreFilteredMovies.length === 0) {
      return res.status(200).json({ recommendations: [], message: `No popular movies found matching your top genre '${topGenreName}'.` });
    }

    // 6. Filter out movies already in the user's favorites
    // This assumes your favorite movie objects have a 'tmdbId' field
    const favoriteTmdbIds = new Set(favorites.map(fav => fav.tmdbId).filter(id => id != null));
    const finalRecommendations = genreFilteredMovies.filter(
      (movie) => !favoriteTmdbIds.has(movie.id)
    );

    // Send back a limited number of recommendations (e.g., top 10)
    res.status(200).json({ recommendations: finalRecommendations.slice(0, 10) });

  } catch (error) {
    console.error("General error in personalizedRecc:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default personalizedRecc;
