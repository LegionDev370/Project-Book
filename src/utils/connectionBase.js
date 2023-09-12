import { connect } from "mongoose";
import config from "../../config/index.js";

const connectBase = async () => {
  await connect(config.db_url);
  console.log("Connected to MongoDB");
};
export default connectBase;
