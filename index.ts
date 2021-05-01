import app from "./app";
const config = require("./utils/config");
const logger = require("./utils/logger");
const cron = require("node-cron");
import profileQuery from "./utils/query";
cron.schedule("*/2 * * * *", async () => {
  console.log("---------------------");
  console.log("Running Poller Job");
  profileQuery("BC1YLiYo25DLiUf9XfNPWD4EPcuZkUTFnRCeq9RjRum1gkaYJ2K4Vu1");
});

app.listen(config.PORT, () => {
  process.setMaxListeners(Infinity);
  logger.info(`Server running on port ${config.PORT}`);
});
