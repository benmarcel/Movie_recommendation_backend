import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuthenticated = (req, res, next) => {
   
    const authHeader = req.headers['authorization'];
    try {
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer TOKEN

        if (token == null) {
            // No token provided
            return res.status(401).json({ message: 'Unauthorized: No token provided.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
      // Token is invalid or expired
      return res.status(403).json({ message: 'Forbidden: Invalid or expired token.' });
    }
    // Token is valid, attach user payload to request
    req.user = user;
    next(); // Proceed to the next middleware/route handler
  });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
}
export default isAuthenticated;
// This middleware checks if the user is authenticated by verifying the JWT token stored in the session.
// If the token is valid, it attaches the user information to the request object and calls the next middleware or route handler.
// If the token is invalid or not present, it responds with a 401 Unauthorized status.
// This is useful for protecting routes that require user authentication, such as accessing user profiles or performing actions that require a logged-in user.