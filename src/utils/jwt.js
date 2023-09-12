import jwt from "jsonwebtoken";
const { verify, sign } = jwt;
import config from "../../config/index.js";
export const generateToken = (data) => {
  return sign(data, config.jwt_key, {
    expiresIn: "500h",
  });
};
export const verifyToken = (token, callback) => {
  return verify(token, config.jwt_key, callback);
};
