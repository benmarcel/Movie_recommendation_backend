import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo'; // Import connect-mongo for session storage in MongoDB
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
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,         
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI, // Use the same DB URI for session storage
    autoRemove: 'native',            // Automatically remove expired sessions
    // Collection name for sessions
    collectionName: 'sessions',     
    ttl: 60 * 60                    
  }),
  cookie: {
    maxAge: 1000 * 60 * 60            // 1 hour
  }
}));

app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Views: ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Welcome! Refresh to count views.');
  }
});

// Import user access routes
import signup from './routes/signup.js';
import login from './routes/login.js';
import profile from './routes/profile.js';
// destructure the functions from profile routes
const {
  getUserProfile,
  updateUserProfile,
  deleteUser
} = profile

import logout from './routes/logout.js';

// Use access routes
app.use(signup);
app.use(login);
app.use(getUserProfile);
app.use(updateUserProfile);
app.use(deleteUser);
app.use(logout);

// listen on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
