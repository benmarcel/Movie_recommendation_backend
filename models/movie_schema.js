import mongoose from "mongoose";
import { Schema } from "mongoose";

const movieSchema = new Schema({
    tmdbId: { // This is the unique identifier from TMDB
        type: String, // String is safer for external IDs
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    posterPath: { // e.g., /some/path/to/poster.jpg (will be prepended with TMDB base URL on frontend)
        type: String,
        required: true,
        trim: true
    },
    overview: {
        type: String,
        required: true,
        trim: true
    },
    videoKey: { // YouTube video key for the trailer (e.g., dQw4w9WgXcQ)
        type: String,
        required: false, // Not all movies might have trailers
        trim: true
    },
    genres: { // Array of genre names (e.g., ["Action", "Science Fiction"])
        type: [String],
        required: true      
    },
    voteAverage: { // TMDB's average user rating (0-10 scale)
        type: Number,
        required: false, // Not all movies might have a rating yet
        min: 0,
        max: 10
    },
    popularity: { // TMDB's popularity score
        type: Number,
        required: false
    },
   

    createdAt: { // When this movie was added to the database
        type: Date,
        default: Date.now
    },
    updatedAt: { // When this movie's details were last updated in the database
        type: Date,
        default: Date.now
    }
});

// Add a pre-save hook to update `updatedAt` on each save
movieSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Movie = mongoose.model("Movie", movieSchema); // Renamed to singular 'Movie'
export default Movie;