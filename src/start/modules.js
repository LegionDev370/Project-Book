import { errorHandler } from "../middlewares/error-handler.js";
import { routes } from "../routes/index.js";
import fileUpload from "express-fileupload";
export const modules = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload());
  app.use(express.static(process.cwd() + "/uploads"));
  app.use("/api", routes);
  app.use(errorHandler);
};
