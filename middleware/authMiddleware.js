// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: "No token" });
//     }

//     try {
//         const decoded = jwt.verify(token, "promod",{ expiresIn: "2d" });
//         req.user = decoded.id;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };



const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // 1. Get the Authorization header
  const authHeader = req.headers.authorization;

  // 2. Check if the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // 3. Extract the actual token string (remove "Bearer ")
  const token = authHeader.split(" ")[1];

  try {
    // 4. Verify the token using your secret key
    // Note: 'expiresIn' is NOT an option for .verify()
    const decoded = jwt.verify(token, "promod");

    // 5. Attach the user ID to the request object
    req.user = decoded.id; 
    next();
  } catch (err) {
    // This will catch expired or tampered tokens
    res.status(401).json({ message: "Token is not valid" });
  }
};