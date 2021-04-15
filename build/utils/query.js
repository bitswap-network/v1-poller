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
const logger = require("./logger");
const profileQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield proxy_1.default.initiateProfileQuery(100, id);
    var cloutMap = {};
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
                    const output = response["Transactions"][i].Outputs;
                    if (Object.keys(cloutMap).includes(output[0].PublicKeyBase58Check)) {
                        const user = yield user_1.default.findOne({
                            bitcloutpubkey: output[0].PublicKeyBase58Check,
                        }).exec();
                        if (user) {
                            user.bitcloutbalance += output[0].AmountNanos / 1e9;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy9xdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QiwwREFBa0M7QUFFbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sWUFBWSxHQUFHLENBQU8sRUFBVSxFQUFFLEVBQUU7SUFDeEMsTUFBTSxlQUFLLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRTFDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNsQixNQUFNLGNBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFVBQVUsR0FBRyxFQUFFLEtBQUs7UUFDdEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUk7WUFDMUIsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLGVBQUs7U0FDUixvQkFBb0IsRUFBRTtTQUN0QixJQUFJLENBQUMsQ0FBTyxRQUFRLEVBQUUsRUFBRTtRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4RCxJQUNFLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLGdCQUFnQixFQUNsRTtvQkFDQSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO29CQUNuRCxJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUM5RDt3QkFDQSxNQUFNLElBQUksR0FBRyxNQUFNLGNBQUksQ0FBQyxPQUFPLENBQUM7NEJBQzlCLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CO3lCQUMvQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ1YsSUFBSSxJQUFJLEVBQUU7NEJBQ1IsSUFBSSxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQzt5QkFDckQ7cUJBQ0Y7b0JBQ0Qsc0JBQXNCO2lCQUN2QjthQUNGO1NBQ0Y7SUFDSCxDQUFDLENBQUEsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDO0FBQ0Ysa0JBQWUsWUFBWSxDQUFDIn0=