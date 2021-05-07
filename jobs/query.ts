import User from "../models/user";
import { transactionDoc } from "../models/transaction";
import {TransactionInfo} from "../interfaces/bitclout"
import Transaction from "../models/transaction";
import {postTransactionInfo} from "../helpers/bitclout"
import { validAmount } from "../utils/functions";
const logger = require("./logger");

export const profileQuery = async (id: string) => {
  let pendingTransactions: transactionDoc[] = []; //all pending transactions
  let pastTxnIds: string[] = []; //past ids so we dont create duplicates

  let transactions = await Transaction.find({
    complete: false,
    transactiontype: "deposit",
  })
    .populate("user")
    .exec();

  let prevTransactions = await Transaction.find({
    completed: true,
    transactionType: "deposit",
  }).exec();

  prevTransactions.forEach((transaction) =>
    pastTxnIds.push(transaction.txnHash!)
  );

  transactions.forEach((transaction) => pendingTransactions.push(transaction));
  try {
    const response = await postTransactionInfo(id);

    if (response.data.Error === "") {
      let i = 0;
      response.data.Transactions.forEach(async (transaction:TransactionInfo) => {
        if (transaction.TransactionType === "BASIC_TRANSFER") {
          let outputs = transaction.Outputs;

          if (!pastTxnIds.includes(transaction.TransactionIDBase58Check)) {
            let inputNanos:number;

            let txnMatch = pendingTransactions.find((_) => {
              let transactorkey = transaction?.Outputs[1]
                ? transaction?.Outputs[1]?.PublicKeyBase58Check.toLowerCase()
                : transaction.TransactionMetadata.TransactorPublicKeyBase58Check.toLowerCase();
              inputNanos = outputs[0].AmountNanos;
              return (
                _.user.bitclout.publicKey.toLowerCase() === transactorkey &&
                validAmount(inputNanos, _.value)
              );
            });
            if (txnMatch) {
              console.log(txnMatch, inputNanos!);
              i += 1;
              console.log(i);
              let user = await User.findById(txnMatch.user).exec();
              let tx = await Transaction.findById(txnMatch._id).exec();
              // console.log(tx, user);
              if (tx && user) {
                tx.completed = true;
                tx.txnHash = transaction.TransactionIDBase58Check;
                tx.completionDate = new Date();
                user.balance.bitclout += inputNanos! / 1e9;
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
                          (tx?.value! / 1e9).toString()
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