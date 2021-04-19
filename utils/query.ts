import Proxy from "./proxy";
import User from "../models/user";
import Transaction from "../models/transaction";
const logger = require("./logger");
const profileQuery = async (id: string) => {
  let proxy = new Proxy();
  await proxy.initiateProfileQuery(300, id);

  let cloutMap = {};
  await User.find({}, function (err, users) {
    users.forEach(function (user) {
      cloutMap[user.bitcloutpubkey] = user._id;
    });
  });

  await proxy
    .crawlTransactionInfo()
    .then(async (response) => {
      // logger.info(response);
      logger.info("cloutmap ", Object.keys(cloutMap));
      logger.info("valid response");
      let txn_list = JSON.parse(response);
      if (txn_list) {
        await proxy.close();
        for (const txn of txn_list["Transactions"]) {
          if (txn["TransactionType"] == "BASIC_TRANSFER") {
            logger.info("found a basic transaction");
            let output = txn["Outputs"];
            let pastidcheck = await Transaction.find({
              tx_id: txn["TransactionIDBase58Check"],
            }).exec();
            if (pastidcheck.length == 0) {
              logger.info("unique txn found");
              logger.info();
              if (
                Object.keys(cloutMap).includes(output[1].PublicKeyBase58Check)
              ) {
                logger.info("matching txn found");
                let tx_ = await Transaction.findOne({
                  bitcloutpubkey: output[1].PublicKeyBase58Check,
                  status: "pending",
                  transactiontype: "deposit",
                }).exec();
                if (tx_ && output[0].AmountNanos >= tx_.bitcloutnanos) {
                  logger.info("txn processed and finished");
                  let user = await User.findOne({
                    username: tx_.username.toString(),
                  }).exec();
                  if (user) {
                    tx_.status = "completed";
                    tx_.tx_id = txn["TransactionIDBase58Check"];
                    tx_.completed = new Date();
                    user.bitswapbalance += output[0].AmountNanos;
                    await user.save();
                    await tx_.save();
                  } else {
                    logger.error("user not found");
                  }
                } else {
                  logger.error(
                    "cannot find txn in database or invalid amounts"
                  );
                }
              }
            } else {
              logger.error("txn used previously");
            }
          }
        }
      } else {
        await proxy.close();
        logger.error("invalid response");
      }
    })
    .catch(async (error) => {
      await proxy.close();
      logger.error(error);
    });
  await proxy.close();
};
export default profileQuery;
