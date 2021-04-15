"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');
const cron = require('node-cron');
const server = http.createServer(app);
const query_1 = __importDefault(require("./utils/query"));
cron.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('---------------------');
    console.log('Running Cron Job');
    yield query_1.default("BC1YLjLGsTQvahXpu3afEd3hkkMqyx651NJ3SgcruiL8drN4XjQEukT");
}));
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDekMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDekMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMsMERBQXdDO0FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQVMsRUFBRTtJQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQy9CLE1BQU0sZUFBWSxDQUFDLHlEQUF5RCxDQUFDLENBQUE7QUFDL0UsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVMLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFDeEQsQ0FBQyxDQUFDLENBQUMifQ==