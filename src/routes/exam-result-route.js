import { Router } from "express";
import {
  getAllExmResults,
  getExamResults,
  removeExamResult,
  sendResult,
  updExmResult,
} from "../controllers/exam-res-controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { file } from "../middlewares/file-middleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const examResRouter = Router();
examResRouter.post("/exam/result", isAuth, file, sendResult);
examResRouter.put("/exam/results/:id", isAuth, isAdmin, updExmResult);
examResRouter.get("/exam/results/:id", isAuth, getExamResults);
examResRouter.get("/exam/results", isAuth, getAllExmResults);
examResRouter.delete("/exam/results/:id", isAuth, isAdmin, removeExamResult);
export default examResRouter;
