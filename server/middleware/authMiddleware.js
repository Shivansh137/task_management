import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Remove 'Bearer ' from the token if present
  token = token.startsWith('Bearer ') ? token.slice(7) : token;

  try {
    // Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.user = decoded?.id
      next();
  })
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Token is not valid' });
  }
};

export default protect;
