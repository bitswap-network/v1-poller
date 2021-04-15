const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");
const cron = require("node-cron");
const server = http.createServer(app);
import profileQuery from "./utils/query";
cron.schedule("*/5 * * * *", async () => {
  console.log("---------------------");
  console.log("Running Cron Job");
  await profileQuery("BC1YLjQtaLyForGFpdzmvzCCx1zbSCm58785cABn5zS8KVMeS4Z4aNK");
});

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
