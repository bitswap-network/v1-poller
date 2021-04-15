import proxy from "./proxy";
import User from "../models/user";
import Transaction from "../models/transaction";
const logger = require("./logger");
const profileQuery = async (id: string) => {
  await proxy.initiateProfileQuery(250, id);

  var cloutMap = {};
  await User.find({}, function (err, users) {
    users.forEach(function (user) {
      cloutMap[user.bitcloutpubkey] = user._id;
    });
  });

  await proxy
    .crawlTransactionInfo()
    .then(async (response) => {
      logger.info(response);
      if (response["Transactions"]) {
        for (let i = 0; i < response["Transactions"].length; i++) {
          if (
            response["Transactions"][i]["TransactionType"] == "BASIC_TRANSFER"
          ) {
            const output = response["Transactions"][i].Outputs;
            if (
              Object.keys(cloutMap).includes(output[0].PublicKeyBase58Check)
            ) {
              const tx_ = await Transaction.findOne({
                bitcloutpubkey: output[0].PublicKeyBase58Check,
              }).exec();
              if (tx_ && output[0].AmountNanos / 1e9 >= tx_.bitcloutvalue) {
                const user = await User.findOne({
                  username: tx_.username.toString(),
                }).exec();
                tx_.status = "payment_completed";
                if (user) {
                  user.bitswapbalance += output[0].AmountNanos / 1e9;
                  user.save();
                }
                tx_.save();
              }
            }
            // console.log(output)
          }
        }
      }
    })
    .catch((error) => {
      logger.error(error);
    });
};
export default profileQuery;
