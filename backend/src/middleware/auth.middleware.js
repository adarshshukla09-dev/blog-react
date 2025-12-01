import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookie.token;

  if (!token) {
    return res.status(401).json({ message: "not authenicated " });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECERT);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
