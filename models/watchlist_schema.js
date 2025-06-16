import mongoose from "mongoose";
import { Schema } from "mongoose";

const watchlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },
  name: {
    // This is the name the user gives to the specific watchlist (e.g., "My Fantasy Movies")
    type: String,
    required: true,
    trim: true,
  },
  movies: [
    {
      // This array will hold the movieIds for this specific watchlist
      type: Schema.Types.ObjectId,
      ref: "Movies", // Reference to the Movie schema
    },
  ],
  sharedWith: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    // When this specific named watchlist was created
    type: Date,
    default: Date.now,
  },
});

// unique index to ensure a user can't have two watchlists with the exact same name
watchlistSchema.index({ userId: 1, name: 1 }, { unique: true });

export default mongoose.model("Watchlist", watchlistSchema);
