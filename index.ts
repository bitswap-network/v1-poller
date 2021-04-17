import app from "./app";
const config = require("./utils/config");
const logger = require("./utils/logger");
const cron = require("node-cron");
import profileQuery from "./utils/query";
cron.schedule("*/5 * * * *", async () => {
  console.log("---------------------");
  console.log("Running Poller Job");
  profileQuery("BC1YLgDkS56PRvHnmeW14u8i7PRxGnb8DGvcJYNqeuyqHe7PtmBq68r");
});

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
