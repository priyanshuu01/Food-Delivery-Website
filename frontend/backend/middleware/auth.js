import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorised. Login Again." });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = token_decode; // Attach user info to request
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid or expired token. Please login again." });
  }
}
export default authMiddleware;