import User from "../models/user";
import Transaction from "../models/transaction";
import axios from "axios";
const logger = require("./logger");
const profileQuery = async (id: string) => {
  let cloutMap = {};
  await User.find({}, function (err, users) {
    users.forEach(function (user) {
      cloutMap[user.bitcloutpubkey.toLowerCase()] = user._id;
    });
  });
  axios
    .post(
      "https://api.bitclout.com/api/v1/transaction-info",
      JSON.stringify({
        PublicKeyBase58Check: id,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "__cfduid=d0e96960ab7b9233d869e566cddde2b311619467183; INGRESSCOOKIE=e663da5b29ea8969365c1794da20771c",
        },
      }
    )
    .then(async (response) => {
      // logger.info(response);
      logger.info("cloutmap ", Object.keys(cloutMap));
      if (response.data.Error === "") {
        logger.info("Encountered Error");
      }
      if (response.data.Transactions) {
        logger.info("valid response");
        for (const txn of response.data.Transactions) {
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
                Object.keys(cloutMap).includes(
                  output[1].PublicKeyBase58Check.toLowerCase()
                )
              ) {
                logger.info("matching txn found");
                let tx_ = await Transaction.findOne({
                  bitcloutpubkey: output[1].PublicKeyBase58Check,
                  status: "pending",
                  transactiontype: "deposit",
                }).exec();
                if (tx_ && output[0].AmountNanos === tx_.bitcloutnanos) {
                  logger.info("txn processed and finished");
                  let user = await User.findOne({
                    username: tx_.username.toString(),
                  }).exec();
                  if (user) {
                    tx_.status = "completed";
                    tx_.tx_id = txn["TransactionIDBase58Check"];
                    tx_.completed = new Date();
                    user.bitswapbalance += output[0].AmountNanos / 1e9;
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
        logger.error("invalid response");
      }
    })
    .catch((error) => {
      logger.error(error.data);
    });
};
export default profileQuery;
