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
const user_1 = __importDefault(require("../models/user"));
const transaction_1 = __importDefault(require("../models/transaction"));
const axios_1 = __importDefault(require("axios"));
const logger = require("./logger");
const profileQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let cloutMap = {};
    yield user_1.default.find({}, function (err, users) {
        users.forEach(function (user) {
            cloutMap[user.bitcloutpubkey.toLowerCase()] = user._id;
        });
    });
    axios_1.default
        .post("https://api.bitclout.com/api/v1/transaction-info", JSON.stringify({
        PublicKeyBase58Check: id,
    }), {
        headers: {
            "Content-Type": "application/json",
            Cookie: "__cfduid=d0e96960ab7b9233d869e566cddde2b311619467183; INGRESSCOOKIE=e663da5b29ea8969365c1794da20771c",
        },
    })
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        // logger.info(response);
        logger.info("cloutmap ", Object.keys(cloutMap));
        if (response.data.Error !== "") {
            logger.info("Encountered Error", response.data.Error);
        }
        if (response.data.Transactions) {
            logger.info("valid response");
            for (const txn of response.data.Transactions) {
                if (txn["TransactionType"] == "BASIC_TRANSFER") {
                    logger.info("found a basic transaction");
                    let output = txn["Outputs"];
                    let pastidcheck = yield transaction_1.default.find({
                        tx_id: txn["TransactionIDBase58Check"],
                    }).exec();
                    if (pastidcheck.length == 0) {
                        logger.info("unique txn found");
                        logger.info();
                        if (Object.keys(cloutMap).includes(output[1].PublicKeyBase58Check.toLowerCase())) {
                            logger.info("matching txn found");
                            let tx_ = yield transaction_1.default.findOne({
                                bitcloutpubkey: output[1].PublicKeyBase58Check,
                                status: "pending",
                                transactiontype: "deposit",
                            }).exec();
                            if (tx_ && output[0].AmountNanos === tx_.bitcloutnanos) {
                                logger.info("txn processed and finished");
                                let user = yield user_1.default.findOne({
                                    username: tx_.username.toString(),
                                }).exec();
                                if (user) {
                                    tx_.status = "completed";
                                    tx_.tx_id = txn["TransactionIDBase58Check"];
                                    tx_.completed = new Date();
                                    user.bitswapbalance += output[0].AmountNanos / 1e9;
                                    yield user.save();
                                    yield tx_.save();
                                }
                                else {
                                    logger.error("user not found");
                                }
                            }
                            else {
                                logger.error("cannot find txn in database or invalid amounts");
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
    }))
        .catch((error) => {
        logger.error(error.data);
    });
});
exports.default = profileQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy9xdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFrQztBQUNsQyx3RUFBZ0Q7QUFDaEQsa0RBQTBCO0FBQzFCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxNQUFNLFlBQVksR0FBRyxDQUFPLEVBQVUsRUFBRSxFQUFFO0lBQ3hDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNsQixNQUFNLGNBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFVBQVUsR0FBRyxFQUFFLEtBQUs7UUFDdEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUk7WUFDMUIsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxlQUFLO1NBQ0YsSUFBSSxDQUNILGtEQUFrRCxFQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2Isb0JBQW9CLEVBQUUsRUFBRTtLQUN6QixDQUFDLEVBQ0Y7UUFDRSxPQUFPLEVBQUU7WUFDUCxjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLE1BQU0sRUFDSixzR0FBc0c7U0FDekc7S0FDRixDQUNGO1NBQ0EsSUFBSSxDQUFDLENBQU8sUUFBUSxFQUFFLEVBQUU7UUFDdkIseUJBQXlCO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxD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