# 🎬 Movie Recommendation App – Backend

This is the backend server for the **Movie Recommendation Web App**, built with **Node.js**, **Express**, and **MongoDB**. It provides RESTful API endpoints for user authentication, movie interactions (watchlists, favorites, ratings, reviews), social features (following/unfollowing users), and personalized recommendations.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Environment**: dotenv

---

## 📁 Project Structure

```bash
Movie_recommendation_backend/
├── controllers/               # All route controller logic (e.g., auth, movie, user)
│   ├── login.js
│   ├── signup.js
│   ├── logout.js
│   ├── get_movies.js
│   ├── get_movie_details.js
│   ├── rate_movie.js
│   ├── comment_movie.js
│   ├── follow_user.js
│   ├── unfollow_user.js
│   ├── get_profile.js
│   ├── update_profile.js
│   ├── create_watchlist.js
│   ├── add_to_watchlist.js
│   ├── get_watchlist_movies.js
│   ├── remove_from_watchlist.js
│   ├── get_favorite_status.js
│   ├── remove_from_favorite.js
│   ├── personalized_recc.js
│   └── ...
├── middleware/                 # Custom middleware (auth checks, validators, etc.)
                ├──  isAuthenticated # Custom middleware (auth checks, validators, etc.)
├── models/                    # Mongoose schemas/models (e.g., User, Movie, Review)
├── routes/                    # Express route definitions
│   ├── follow_user.js
│   ├── unfollow_user.js
│   └── ...
├── services/                  # External service logic (e.g., TMDB API)
│   └── get_or_save_movie.js
├── .env                       # Environment variables (not committed to Git)
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js                  # Main Express server file

🔑 Features
✅ User Signup, Login & Logout

🔒 JWT Authentication

🎥 Add, View & Comment on Movies

⭐ Rate Movies (1 to 5 stars)

❤️ Favorite Movies

📑 Create & Manage Watchlists

👥 Follow/Unfollow Users

🧠 Personalized Movie Recommendations

🔄 Shared Movie Lists

📄 Update User Profile

🚀 Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/movie_recommendation_backend.git
cd movie_recommendation_backend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Create .env File
Create a .env file in the root directory and add the following:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
TMDB_API_KEY=your_tmdb_api_key
4. Run the Server
bash
Copy
Edit
npm start
Your backend will be running at: http://localhost:5000

