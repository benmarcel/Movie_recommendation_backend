import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const getMovies = async (req, res) => {
    const { query, genre, year, rating, sortBy, page = 1 } = req.query; // Assuming page is also passed from frontend

let url;
const params = new URLSearchParams(); // Use URLSearchParams for robust parameter handling

params.append('api_key', process.env.TMDB_API_KEY); // Use your TMDB API Key from environment variables
params.append('language', 'en-US');
params.append('page', page);
params.append('include_adult', 'false');

if (query) {
    // If a search query is provided, use the search endpoint
    url = `https://api.themoviedb.org/3/search/movie`;
    params.append('query', query);
    params.append('include_adult', 'false'); // Exclude adult content in search results
    // If you need advanced filtering with search, you'd typically:
    // 1. Perform the search.
    // 2. Filter the *results* on your backend or frontend *after* receiving them.
    // Or, prompt the user to clear the search query if they want to use detailed filters.
} else {
    // If no search query, use the discover endpoint for filtering/sorting
    url = `https://api.themoviedb.org/3/discover/movie`;

    if (genre) {
        params.append('with_genres', genre);
    }
    if (year) {
        params.append('primary_release_year', year); // Use primary_release_year for discover
    }
    if (rating) {
        params.append('vote_average.gte', rating);
    }
    if (sortBy) {
        params.append('sort_by', sortBy);
    }
}

try {
    const fullUrl = `${url}?${params.toString()}`; // Construct the full URL with query parameters
    const response = await fetch(fullUrl);

    if (!response.ok) {
        // Handle non-2xx responses from TMDB API
        const errorData = await response.json();
        console.error('TMDB API Error:', errorData);
        return res.status(response.status).json({ message: errorData.status_message || 'Error fetching data from TMDB' });
    }

    const data = await response.json();
    res.status(200).json(data);
} catch (error) {
    console.error('Backend fetch error:', error);
    res.status(500).json({ message: 'Internal server error' });
}

};

export default getMovies; // Export the function to be used in your routes