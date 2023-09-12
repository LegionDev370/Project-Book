import { Router } from "express";
import {
  create,
  getAllGroup,
  getOneGroup,
  removeGroup,
  updateGroup,
  joinGroup
} from "../controllers/group-controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const groupRouter = Router();
groupRouter.post("/group", isAuth, isAdmin, create);
groupRouter.get("/groups/:id", isAuth, isAdmin, getOneGroup);
groupRouter.get("/groups", isAuth, isAdmin, getAllGroup);
groupRouter.put("/groups/:id", isAuth, isAdmin, updateGroup);
groupRouter.delete("/groups/:id", isAuth, isAdmin, removeGroup);
groupRouter.post("/group/join", isAuth, isAdmin, joinGroup);
export default groupRouter;
