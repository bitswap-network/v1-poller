import app from "./app";
const config = require("./utils/config");
const logger = require("./utils/logger");
const cron = require("node-cron");
import { profileQuery } from "./jobs/query";
import { inactivePoolCheck } from "./jobs/inactive";

cron.schedule("*/3 * * * *", async () => {
  console.log("---------------------");
  console.log("Running Poller Job");
  profileQuery(config.PublicKeyBase58Check);
});
cron.schedule("*/1 * * * *", async () => {
  console.log("---------------------");
  console.log("Running Inactive Pool Check");
  inactivePoolCheck()
});
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
