"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");
const cron = require("node-cron");
const server = http.createServer(app);
const query_1 = __importDefault(require("./utils/query"));
cron.schedule("*/10 * * * *", () => {
    console.log("---------------------");
    console.log("Running Cron Job");
    query_1.default("BC1YLjQtaLyForGFpdzmvzCCx1zbSCm58785cABn5zS8KVMeS4Z4aNK");
});
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDekMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDekMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMsMERBQXlDO0FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hDLGVBQVksQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0FBQzFFLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN2RCxDQUFDLENBQUMsQ0FBQyJ9