import mongoose from "mongoose";
import { Schema } from "mongoose";
import review from "./review_schema.js";
import watchlist from "./watchlist_schema.js";
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie' 
    }],
    followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  age: {
    type: String,
    default: ''
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
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  const userId = this._id  
  if (!userId) return next(new Error("User ID not found"));
  
  // If using document, this._id will be available
  try {
    // Remove all reviews by this user
    await review.deleteMany({ userId });

    // Remove all watchlists created by this user
    await watchlist.deleteMany({ userId });

    // Remove user from other users' followers/following arrays
    await mongoose.model('User').updateMany(
      { $or: [{ followers: userId }, { following: userId }] },
      {
        $pull: {
          followers: userId,
          following: userId
        }
      }
    );

    next();
  } catch (err) {
    next(err); // Pass error to Express error handler
  }
});

export default mongoose.model('User', userSchema);