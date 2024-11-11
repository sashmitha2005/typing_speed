const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    // Extract the token after "Bearer "
    const token = authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Forbidden: Invalid token" });
      
      // Store user ID in request for future use
      req.userId = user.id;
      next();
    });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Token expired or invalid" });
  }
};

module.exports = auth;