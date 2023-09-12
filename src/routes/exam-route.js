import { Router } from "express";
import {
  create,
  deleteExam,
  getAllExam,
  getOneExam,
  updateExam,
} from "../controllers/exam-controller.js";
import { file } from "../middlewares/file-middleware.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const examRouter = Router();
examRouter.post("/exam", isAuth, isAdmin, file, create);
examRouter.put("/exam/:id", isAuth, isAdmin, file, updateExam);
examRouter.get("/exam/:id", isAuth, isAdmin, getOneExam);
examRouter.get("/exams", isAuth, isAdmin, getAllExam);
examRouter.delete("/exam/:id", isAuth, isAdmin, deleteExam);
export default examRouter;
