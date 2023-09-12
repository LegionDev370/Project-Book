import { v4 as uuid } from "uuid";
import path from "path";
export const file = (req, res, next) => {
  try {
    const data = req?.files;
    const mimeType = path.extname(data.file?.name);
    const fileName = `${uuid()}${mimeType}`;
    data.file?.mv(`${process.cwd()}/uploads/${fileName}`);
    req.file = fileName;
    return next();
  } catch (error) {
    next(error);
  }
};
