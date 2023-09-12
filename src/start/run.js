import config from "../../config/index.js";
export const run = (app) => {
  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
};
