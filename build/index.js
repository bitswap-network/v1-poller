"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config = require("./utils/config");
const logger = require("./utils/logger");
const cron = require("node-cron");
const query_1 = __importDefault(require("./utils/query"));
// cron.schedule("*/3 * * * *", async () => {
//   console.log("---------------------");
//   console.log("Running Poller Job");
//   profileQuery("BC1YLiYo25DLiUf9XfNPWD4EPcuZkUTFnRCeq9RjRum1gkaYJ2K4Vu1");
// });
query_1.default("BC1YLiYo25DLiUf9XfNPWD4EPcuZkUTFnRCeq9RjRum1gkaYJ2K4Vu1");
app_1.default.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF3QjtBQUN4QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN6QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN6QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEMsMERBQXlDO0FBQ3pDLDZDQUE2QztBQUM3QywwQ0FBMEM7QUFDMUMsdUNBQXVDO0FBQ3ZDLDZFQUE2RTtBQUM3RSxNQUFNO0FBQ04sZUFBWSxDQUFDLHlEQUF5RCxDQUFDLENBQUM7QUFDeEUsYUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN2RCxDQUFDLENBQUMsQ0FBQyJ9