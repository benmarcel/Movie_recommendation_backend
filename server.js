import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import cors from 'cors';


const app = express();

// MongoDB connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully!");
})
.catch((error) => {
  console.error("MongoDB connection failed:", error.message);
});

// Middleware to parse JSON bodies
app.use(express.json());
// CORS middleware
const allowedOrigins = [
  'http://localhost:5173', // Your development frontend
  'https://685172266cd7d0268d28c184--movierecc.netlify.app',
  'https://movierecc.netlify.app' // Your deployed frontend domain
  // Add other origins if your API serves multiple frontends
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
  credentials: true, // Allow cookies to be sent across origins
  optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
 res.send('Welcome to the Movie Recommendation API!'); // Simple welcome message
});

// user access routes
import signup from './routes/signup.js';
import login from './routes/login.js';
import logout from './routes/logout.js';
import userAuth from './routes/user_auth.js'; // Import the route for checking session
//  movie-related routes
import addToFavorites from './routes/add_to_favorites.js';
import createWatchlist from './routes/create_watchlist.js';
import addToWatchlist from './routes/add_to_watchlist.js';
import displayWatchlist from './routes/display_watchlist.js';
import getWatchlistMovies from './routes/get_watchlist_movies.js';
import rateMovie from './routes/rate_movie.js';
import commentMovie from './routes/comment_movie.js';
import getMovieReview from './routes/get_movie_review.js';
import getMovies from './routes/get_movies.js'; // Import the route for getting movies
import getWatchlistStatus from './routes/get_watchlist_status.js'; // Import the route for getting watchlist status
import getFavoriteStatus from './routes/get_favorite_status.js'; // Import the route for getting favorite status
import removeFromFavourites from './routes/remove_from_favorites.js'; // Import the route for removing from favorites
import removeFromWatchlist from './routes/remove_from_watchlist.js'; // Import the route for removing from watchlist
import getMovieDetails from './routes/get_movie_details.js'; // Import the route for getting movie details
// profile management routes
import getUserProfile from './routes/get_profile.js';
import updateUserProfile from './routes/update_profile.js';
import deleteUser from './routes/delete_user.js';

// social features routes
import getUsers from './routes/get_users.js';
import getAUser from './routes/get_a_user.js';
import followUser from './routes/follow_user.js';
import unfollowUser from './routes/unfollow_user.js';
import shareWatchlist from './routes/share_list.js';
import getSharedList from './routes/get_sharedList.js'; 

// personalized recommendations route
import personalizedRecc from './routes/personalized_recc.js'; // Import the route for personalized recommendations
// Use routes
app.use(signup); // Use the route for user signup
app.use(login); // Use the route for user login
app.use(getMovieDetails); // Use the route for getting movie details
app.use(getUserProfile); // Use the route for getting user profile
app.use(updateUserProfile); // Use the route for updating user profile
app.use(deleteUser); // Use the route for deleting user account
app.use(logout); // Use the route for user logout
app.use(addToFavorites); // Use the route for adding to favorites
app.use(addToWatchlist); // Use the route for adding to watchlist
app.use(createWatchlist); // Use the route for creating a watchlist
app.use(displayWatchlist); // Use the route for displaying watchlist
app.use(getWatchlistMovies); // Use the route for getting watchlist movies
app.use(rateMovie); // Use the route for rating a movie
app.use(commentMovie); // Use the route for commenting on a movie
app.use(getMovieReview); // Use the route for getting movie reviews
app.use(getUsers); // Use the route for getting all users
app.use(getAUser); // Use the route for getting a specific user
app.use(followUser); // Use the route for following a user
app.use(unfollowUser); // Use the route for unfollowing a user
app.use(shareWatchlist); // Use the route for sharing a watchlist
app.use(getSharedList); // Use the route for getting a shared list
app.use(getMovies); // Use the route for getting movies
app.use(userAuth); // Use the route for authenticating user 
app.use(getWatchlistStatus); // Use the route for getting watchlist status
app.use(getFavoriteStatus); // Use the route for getting favorite status
app.use(removeFromFavourites); // Use the route for removing from favorites
app.use(removeFromWatchlist); // Use the route for removing from watchlist
app.use(personalizedRecc); // Use the route for personalized recommendations

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// 404 Not Found handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});
const PORT = process.env.PORT || 3000;
// listen on port 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
