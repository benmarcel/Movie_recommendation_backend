import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuthenticated = (req, res, next) => {
    const sessionUser = req.session.user;
    if (!sessionUser || !sessionUser.token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    try {
        // Verify the JWT token
        const decoded = jwt.verify(sessionUser.token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
}
export default isAuthenticated;
// This middleware checks if the user is authenticated by verifying the JWT token stored in the session.
// If the token is valid, it attaches the user information to the request object and calls the next middleware or route handler.
// If the token is invalid or not present, it responds with a 401 Unauthorized status.
// This is useful for protecting routes that require user authentication, such as accessing user profiles or performing actions that require a logged-in user.