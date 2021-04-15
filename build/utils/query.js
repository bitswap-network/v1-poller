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
const logger = require("./logger");
const profileQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield proxy_1.default.initiateProfileQuery(100, id);
    yield proxy_1.default.crawlTransactionInfo()
        .then((response) => {
        logger.info(response);
        response["Transactions"].forEach(transaction => {
            if (transaction["TransactionType"] == "BASIC_TRANSFER") {
                const output = transaction.Outputs;
                console.log(output);
            }
        });
    })
        .catch((error) => {
        logger.error(error);
    });
});
exports.default = profileQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy9xdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFFbEMsTUFBTSxZQUFZLEdBQUcsQ0FBTyxFQUFTLEVBQUUsRUFBRTtJQUVyQyxNQUFNLGVBQUssQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsTUFBTSxlQUFLLENBQUMsb0JBQW9CLEVBQUU7U0FDakMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFDLEVBQUU7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDM0MsSUFBRyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBRSxnQkFBZ0IsRUFDbkQ7Z0JBQ0ksTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztnQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTthQUN0QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFDLEVBQUU7UUFDWixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFBLENBQUE7QUFDRCxrQkFBZSxZQUFZLENBQUMifQ==