import app from "./app";
const config = require("./utils/config");
const logger = require("./utils/logger");
const cron = require("node-cron");
import profileQuery from "./utils/query";
cron.schedule("*/3 * * * *", async () => {
  console.log("---------------------");
  console.log("Running Poller Job");
  profileQuery("BC1YLiYo25DLiUf9XfNPWD4EPcuZkUTFnRCeq9RjRum1gkaYJ2K4Vu1");
});
// profileQuery("BC1YLiYo25DLiUf9XfNPWD4EPcuZkUTFnRCeq9RjRum1gkaYJ2K4Vu1");
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
