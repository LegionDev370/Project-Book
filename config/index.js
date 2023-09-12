import dotenv from "dotenv";
dotenv.config();
import { env } from "process";
const config = {
  PORT: env.PORT || 3000,
  jwt_key: env.jwt_key || "3#@#****12121",
  db_url: env.DB_URL || "mongodb://localhost:27017/test",
};
export default config;
