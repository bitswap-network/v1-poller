import app from "./app";
const config = require("./utils/config");
const logger = require("./utils/logger");
const cron = require("node-cron");
import { profileQuery, inactiveBuyCheck } from "./utils/query";
cron.schedule("*/3 * * * *", async () => {
  console.log("---------------------");
  console.log("Running Poller Job");
  profileQuery("BC1YLiYo25DLiUf9XfNPWD4EPcuZkUTFnRCeq9RjRum1gkaYJ2K4Vu1");
});
cron.schedule("*/30 * * * *", async () => {
  console.log("---------------------");
  console.log("Running Inactive Buy Check");
  inactiveBuyCheck();
});
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
