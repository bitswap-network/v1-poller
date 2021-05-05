import User from "../models/user";
import { transactionDoc } from "../models/transaction";
import Transaction from "../models/transaction";
import Listing from "../models/listing";
import Pool from "../models/pool";
import { validAmount } from "./helper";
import axios from "axios";
const logger = require("./logger");

const inactiveBuyCheck = async () => {
  const listings = await Listing.find({
    ongoing: true,
    "escrow.balance": 0,
    "escrow.full": false,
  }).exec();

  if (listings) {
    listings.forEach(async (listing) => {
      let now = new Date();
      let buy_start = new Date(listing.buy_time!);
      let elapsed = now.getTime() - buy_start.getTime();
      if (elapsed > 1000 * 60 * 60 * 8) {
        const buyer = await User.findById(listing.buyer).exec();
        const pool = await Pool.findById(listing.pool).exec();
        listing.ongoing = false;
        listing.buyer = null;
        listing.buy_time = null;
        listing.pool = null;
        pool!.active = false;
        pool!.listing = null;
        buyer!.buystate = false;
        try {
          await User.findOneAndUpdate(
            { username: buyer!.username },
            { $pull: { buys: listing._id } }
          ).exec();
          await listing.save();
          await buyer?.save();
          await pool?.save();
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
};

const profileQuery = async (id: string) => {
  let pendingTransactions: transactionDoc[] = []; //all pending transactions
  let pastTxnIds: string[] = []; //past ids so we dont create duplicates

  let transactions = await Transaction.find({
    status: "pending",
    transactiontype: "deposit",
  }).exec();

  let prevTransactions = await Transaction.find({
    status: "completed",
    transactiontype: "deposit",
  }).exec();

  prevTransactions.forEach((transaction) => pastTxnIds.push(transaction.tx_id));

  transactions.forEach((transaction) => pendingTransactions.push(transaction));
  try {
    const response = await axios.post(
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
    );

    if (response.data.Error === "") {
      let i = 0;
      response.data.Transactions.forEach(async (transaction) => {
        if (transaction.TransactionType === "BASIC_TRANSFER") {
          let outputs = transaction.Outputs;
          // console.log(outputs);
          if (!pastTxnIds.includes(transaction.TransactionIDBase58Check)) {
            let inputNanos;
            let txnMatch = pendingTransactions.find((_) => {
              let transactorkey = transaction?.Outputs[1]
                ? transaction?.Outputs[1]?.PublicKeyBase58Check.toLowerCase()
                : transaction.TransactionMetadata.TransactorPublicKeyBase58Check.toLowerCase();
              inputNanos = outputs[0].AmountNanos;
              return (
                _.bitcloutpubkey.toLowerCase() === transactorkey &&
                validAmount(inputNanos, _.bitcloutnanos)
              );
            });

            if (txnMatch) {
              console.log(txnMatch, inputNanos);
              i += 1;
              console.log(i);
              let user = await User.findOne({
                username: txnMatch.username,
              }).exec();
              let tx = await Transaction.findById(txnMatch._id).exec();
              // console.log(tx, user);
              if (tx && user) {
                tx.status = "completed";
                tx.tx_id = transaction.TransactionIDBase58Check;
                tx.completed = new Date();
                user.bitswapbalance += inputNanos / 1e9;
                user.save((err: any) => {
                  if (err) {
                    logger.error(err);
                  } else {
                    tx?.save((err: any) => {
                      if (err) {
                        logger.error(err);
                      } else {
                        logger.info(
                          "Completed deposit for user: ",
                          user?.username,
                          "| Amount: ",
                          (tx?.bitcloutnanos! / 1e9).toString()
                        );
                      }
                    });
                  }
                });
              }
            }
          }
        }
      });
    } else {
      logger.error(response.data.Error);
    }
  } catch (e) {
    logger.error(e);
  }
};
export { profileQuery, inactiveBuyCheck };
