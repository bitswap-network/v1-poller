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
const proxy_1 = __importDefault(require("./proxy"));
const user_1 = __importDefault(require("../models/user"));
const transaction_1 = __importDefault(require("../models/transaction"));
const logger = require("./logger");
const profileQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield proxy_1.default.initiateProfileQuery(300, id);
    let cloutMap = {};
    yield user_1.default.find({}, function (err, users) {
        users.forEach(function (user) {
            cloutMap[user.bitcloutpubkey] = user._id;
        });
    });
    yield proxy_1.default
        .crawlTransactionInfo()
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info(response);
        if (response["Transactions"]) {
            for (let i = 0; i < response["Transactions"].length; i++) {
                if (response["Transactions"][i]["TransactionType"] == "BASIC_TRANSFER") {
                    let output = response["Transactions"][i].Outputs;
                    if (Object.keys(cloutMap).includes(output[0].PublicKeyBase58Check)) {
                        let tx_ = yield transaction_1.default.findOne({
                            bitcloutpubkey: output[0].PublicKeyBase58Check,
                        }).exec();
                        if (tx_ && output[0].AmountNanos >= tx_.bitcloutnanos) {
                            let user = yield user_1.default.findOne({
                                username: tx_.username.toString(),
                            }).exec();
                            tx_.status = "completed";
                            tx_.tx_id =
                                response["Transactions"][i]["TransactionIDBase58Check"];
                            if (user) {
                                user.bitswapbalance += output[0].AmountNanos;
                                user.save();
                            }
                            tx_.save();
                        }
                    }
                    // console.log(output)
                }
            }
        }
    }))
        .catch((error) => {
        logger.error(error);
    });
});
exports.default = profileQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy9xdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QiwwREFBa0M7QUFDbEMsd0VBQWdEO0FBQ2hELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxNQUFNLFlBQVksR0FBRyxDQUFPLEVBQVUsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sZUFBSyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUUxQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDbEIsTUFBTSxjQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxVQUFVLEdBQUcsRUFBRSxLQUFLO1FBQ3RDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxlQUFLO1NBQ1Isb0JBQW9CLEVBQUU7U0FDdEIsSUFBSSxDQUFDLENBQU8sUUFBUSxFQUFFLEVBQUU7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEQsSUFDRSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxnQkFBZ0IsRUFDbEU7b0JBQ0EsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDakQsSUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFDOUQ7d0JBQ0EsSUFBSSxHQUFHLEdBQUcsTUFBTSxxQkFBVyxDQUFDLE9BQU8sQ0FBQzs0QkFDbEMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7eUJBQy9DLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDVixJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxhQUFhLEVBQUU7NEJBQ3JELElBQUksSUFBSSxHQUFHLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDNUIsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFOzZCQUNsQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ1YsR0FBRyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7NEJBQ3pCLEdBQUcsQ0FBQyxLQUFLO2dDQUNQLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOzRCQUMxRCxJQUFJLElBQUksRUFBRTtnQ0FDUixJQUFJLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7Z0NBQzdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs2QkFDYjs0QkFDRCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7eUJBQ1o7cUJBQ0Y7b0JBQ0Qsc0JBQXNCO2lCQUN2QjthQUNGO1NBQ0Y7SUFDSCxDQUFDLENBQUEsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDO0FBQ0Ysa0JBQWUsWUFBWSxDQUFDIn0=