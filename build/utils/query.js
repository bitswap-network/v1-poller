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
        logger.info("cloutmap ", Object.keys(cloutMap));
        // if (response["Transactions"]) {
        logger.info("valid response");
        let txn_list = JSON.parse(response);
        if (txn_list) {
            for (const txn of txn_list["Transactions"]) {
                if (txn["TransactionType"] == "BASIC_TRANSFER") {
                    logger.info("found a basic transaction");
                    let output = txn["Outputs"];
                    let pastidcheck = yield transaction_1.default.find({
                        tx_id: txn["TransactionIDBase58Check"],
                    }).exec();
                    if (pastidcheck.length == 0) {
                        logger.info("unique txn found");
                        logger.info();
                        if (Object.keys(cloutMap).includes(output[1].PublicKeyBase58Check)) {
                            logger.info("matching txn found");
                            let tx_ = yield transaction_1.default.findOne({
                                bitcloutpubkey: output[1].PublicKeyBase58Check,
                            }).exec();
                            if (tx_ && output[0].AmountNanos >= tx_.bitcloutnanos) {
                                logger.info("txn processed and finished");
                                let user = yield user_1.default.findOne({
                                    username: tx_.username.toString(),
                                }).exec();
                                tx_.status = "completed";
                                tx_.tx_id = txn["TransactionIDBase58Check"];
                                if (user) {
                                    user.bitswapbalance += output[0].AmountNanos;
                                    user.save();
                                }
                                tx_.save();
                            }
                        }
                    }
                    else {
                        logger.error("txn used previously");
                    }
                }
            }
        }
        else {
            logger.error("invalid response");
        }
        // }
    }))
        .catch((error) => {
        logger.error(error);
    });
});
exports.default = profileQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy9xdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QiwwREFBa0M7QUFDbEMsd0VBQWdEO0FBQ2hELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxNQUFNLFlBQVksR0FBRyxDQUFPLEVBQVUsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sZUFBSyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUUxQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDbEIsTUFBTSxjQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxVQUFVLEdBQUcsRUFBRSxLQUFLO1FBQ3RDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxlQUFLO1NBQ1Isb0JBQW9CLEVBQUU7U0FDdEIsSUFBSSxDQUFDLENBQU8sUUFBUSxFQUFFLEVBQUU7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDaEQsa0NBQWtDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksUUFBUSxFQUFFO1lBQ1osS0FBSyxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7Z0JBQzFDLElBQUksR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksZ0JBQWdCLEVBQUU7b0JBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztvQkFDekMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1QixJQUFJLFdBQVcsR0FBRyxNQUFNLHFCQUFXLENBQUMsSUFBSSxDQUFDO3dCQUN2QyxLQUFLLEVBQUUsR0FBRyxDQUFDLDBCQUEwQixDQUFDO3FCQUN2QyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1YsSUFBSSxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTt3QkFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2QsSUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFDOUQ7NEJBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOzRCQUNsQyxJQUFJLEdBQUcsR0FBRyxNQUFNLHFCQUFXLENBQUMsT0FBTyxDQUFDO2dDQUNsQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjs2QkFDL0MsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUNWLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLGFBQWEsRUFBRTtnQ0FDckQsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dDQUMxQyxJQUFJLElBQUksR0FBRyxNQUFNLGNBQUksQ0FBQyxPQUFPLENBQUM7b0NBQzVCLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtpQ0FDbEMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dDQUNWLEdBQUcsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO2dDQUN6QixHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dDQUM1QyxJQUFJLElBQUksRUFBRTtvQ0FDUixJQUFJLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7b0NBQzdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQ0FDYjtnQ0FDRCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7NkJBQ1o7eUJBQ0Y7cUJBQ0Y7eUJBQU07d0JBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3FCQUNyQztpQkFDRjthQUNGO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNsQztRQUNELElBQUk7SUFDTixDQUFDLENBQUEsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDO0FBQ0Ysa0JBQWUsWUFBWSxDQUFDIn0=