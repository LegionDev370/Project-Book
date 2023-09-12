import adminRouter from "./user-route.js";
import examRouter from "./exam-route.js";
import groupRouter from "./group-route.js";
import examResRouter from "./exam-result-route.js";
export const routes = [
  adminRouter,
  groupRouter,
  examRouter,
  examResRouter,
];
