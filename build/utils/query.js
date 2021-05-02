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
const helper_1 = require("./helper");
const axios_1 = __importDefault(require("axios"));
const logger = require("./logger");
const profileQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let pendingTransactions = []; //all pending transactions
    let pastTxnIds = []; //past ids so we dont create duplicates
    let transactions = yield transaction_1.default.find({
        status: "pending",
        transactiontype: "deposit",
    }).exec();
    let prevTransactions = yield transaction_1.default.find({
        status: "completed",
        transactiontype: "deposit",
    }).exec();
    prevTransactions.forEach((transaction) => pastTxnIds.push(transaction.tx_id));
    transactions.forEach((transaction) => pendingTransactions.push(transaction));
    try {
        const response = yield axios_1.default.post("https://api.bitclout.com/api/v1/transaction-info", JSON.stringify({
            PublicKeyBase58Check: id,
        }), {
            headers: {
                "Content-Type": "application/json",
                Cookie: "__cfduid=d0e96960ab7b9233d869e566cddde2b311619467183; INGRESSCOOKIE=e663da5b29ea8969365c1794da20771c",
            },
        });
        if (response.data.Error === "") {
            let i = 0;
            response.data.Transactions.forEach((transaction) => __awaiter(void 0, void 0, void 0, function* () {
                if (transaction.TransactionType === "BASIC_TRANSFER") {
                    let outputs = transaction.Outputs;
                    // console.log(outputs);
                    if (!pastTxnIds.includes(transaction.TransactionIDBase58Check)) {
                        let inputNanos;
                        let txnMatch = pendingTransactions.find((_) => {
                            var _a;
                            let transactorkey = (transaction === null || transaction === void 0 ? void 0 : transaction.Outputs[1])
                                ? (_a = transaction === null || transaction === void 0 ? void 0 : transaction.Outputs[1]) === null || _a === void 0 ? void 0 : _a.PublicKeyBase58Check.toLowerCase()
                                : transaction.TransactionMetadata.TransactorPublicKeyBase58Check.toLowerCase();
                            inputNanos = outputs[0].AmountNanos;
                            return (_.bitcloutpubkey.toLowerCase() === transactorkey &&
                                helper_1.validAmount(inputNanos, _.bitcloutnanos));
                        });
                        if (txnMatch) {
                            console.log(txnMatch, inputNanos);
                            i += 1;
                            console.log(i);
                            let user = yield user_1.default.findOne({
                                username: txnMatch.username,
                            }).exec();
                            let tx = yield transaction_1.default.findById(txnMatch._id).exec();
                            // console.log(tx, user);
                            if (tx && user) {
                                tx.status = "completed";
                                tx.tx_id = transaction.TransactionIDBase58Check;
                                tx.completed = new Date();
                                user.bitswapbalance += inputNanos / 1e9;
                                user.save((err) => {
                                    if (err) {
                                        logger.error(err);
                                    }
                                    else {
                                        tx === null || tx === void 0 ? void 0 : tx.save((err) => {
                                            if (err) {
                                                logger.error(err);
                                            }
                                            else {
                                                logger.info("Completed deposit for user: ", user === null || user === void 0 ? void 0 : user.username, "| Amount: ", ((tx === null || tx === void 0 ? void 0 : tx.bitcloutnanos) / 1e9).toString());
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                }
            }));
        }
        else {
            logger.error(response.data.Error);
        }
    }
    catch (e) {
        logger.error(e);
    }
});
exports.default = profileQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy9xdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFrQztBQUVsQyx3RUFBZ0Q7QUFDaEQscUNBQXVDO0FBQ3ZDLGtEQUEwQjtBQUMxQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFbkMsTUFBTSxZQUFZLEdBQUcsQ0FBTyxFQUFVLEVBQUUsRUFBRTtJQUN4QyxJQUFJLG1CQUFtQixHQUFxQixFQUFFLENBQUMsQ0FBQywwQkFBMEI7SUFDMUUsSUFBSSxVQUFVLEdBQWEsRUFBRSxDQUFDLENBQUMsdUNBQXVDO0lBRXRFLElBQUksWUFBWSxHQUFHLE1BQU0scUJBQVcsQ0FBQyxJQUFJLENBQUM7UUFDeEMsTUFBTSxFQUFFLFNBQVM7UUFDakIsZUFBZSxFQUFFLFNBQVM7S0FDM0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRVYsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLHFCQUFXLENBQUMsSUFBSSxDQUFDO1FBQzVDLE1BQU0sRUFBRSxXQUFXO1FBQ25CLGVBQWUsRUFBRSxTQUFTO0tBQzNCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVWLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUU5RSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM3RSxJQUFJO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUMvQixrREFBa0QsRUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNiLG9CQUFvQixFQUFFLEVBQUU7U0FDekIs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