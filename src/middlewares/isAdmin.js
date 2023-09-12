import { User } from "../models/user-model.js";
export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    if (user?.isAdmin) {
      return next();
    } else {
      return res.status(401).json({ message: "permission denied" });
    }
  } catch (error) {
    next(error);
  }
};
