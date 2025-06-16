import mongoose from "mongoose";
import { Schema } from "mongoose";

const movieSchema = new Schema({
  tmdbId: { type: Number, required: true, unique: true },

  title: {
    type: String,
    required: true,
    trim: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  posterPath: {
    // e.g., /some/path/to/poster.jpg (will be prepended with TMDB base URL on frontend)
    type: String,
    required: false,
    trim: true,
  },
  overview: {
    type: String,
    required: false,
    trim: true,
  },
  videoKey: {
    // YouTube video key for the trailer (e.g., dQw4w9WgXcQ)
    type: String,
    required: false, // Not all movies might have trailers
    trim: true,
  },
  genres: {
    // Array of genre names (e.g., ["Action", "Science Fiction"])
    type: [String],
    required: true,
  },
  voteAverage: {
    // Average user rating from TMDB (e.g., 7.5)
    type: Number,
    required: false,
  },
  popularity: {
    // TMDB's popularity score
    type: Number,
    required: false,
  },
  backdrop_path: {
    // Path to the movie's backdrop image (e.g., /some/path/to/backdrop.jpg)
    type: String,
    required: false,
    trim: true,
  },

  createdAt: {
    // When this movie was added to the database
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    // When this movie's details were last updated in the database
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save hook to update `updatedAt` on each save
movieSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Movie = mongoose.model("Movie", movieSchema); // Renamed to singular 'Movie'
export default Movie;
