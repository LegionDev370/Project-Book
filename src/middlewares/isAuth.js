import config from "../../config/index.js";
import { verifyToken } from "../utils/jwt.js";
export const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded = verifyToken(token, config.jwt_key);
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};
