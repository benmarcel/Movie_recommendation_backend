import mongoose from "mongoose";
import { Schema } from "mongoose";

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema
        required: true
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movies', // Reference to the Movie schema
        required: true
    },
    comment: {
        type: String,
        required: false, // user may not comment on a movie
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0, // Default rating is 0 if not provided
        min: 0,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure a user can only rate a specific movie once
reviewSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model('Reviews', reviewSchema);



