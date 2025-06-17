import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const getMovieDetails = async (req, res) => {
    const { tmdbId } = req.params; // Get the TMDB ID from the request parameters

    if (!tmdbId) {
        return res.status(400).json({ message: 'TMDB ID is required' });
    }

    try {
        const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,genres`;
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('TMDB API Error:', errorData);
            return res.status(response.status).json({ message: errorData.status_message || 'Error fetching movie details from TMDB' });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Backend fetch error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default getMovieDetails;
// This function retrieves detailed information about a movie from TMDB using its TMDB ID.
// It expects the TMDB ID in the URL parameters and returns the movie details, including videos and genres.