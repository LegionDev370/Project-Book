import Express from "express";
const app = Express();
import { run } from "./start/run.js";
import { modules } from "./start/modules.js";
import connectBase from "./utils/connectionBase.js";
modules(app, Express);
run(app);
connectBase();
