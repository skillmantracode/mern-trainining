import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token// Expects "Bearer <TOKEN>"
  console.log(token)
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach decoded user info to request object

    next();
  } catch (err) {
    res.status(403).json({ message: "Token is invalid or expired" });
  }
};

export default verifyToken;
