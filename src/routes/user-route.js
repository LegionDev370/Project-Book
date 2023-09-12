import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getOneUser,
  onLogin,
  remove,
  update,
} from "../controllers/user-controller.js";
const userRouter = Router();
userRouter.post("/user", createUser);
userRouter.put("/user/:id", update);
userRouter.get("/users", getAllUsers);
userRouter.get("/user/:id", getOneUser);
userRouter.delete("/user/:id", remove);
userRouter.post("/auth/login", onLogin);
export default userRouter;
