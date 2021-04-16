import { model, Schema, Document } from "mongoose";

export interface transactionDoc extends Document {
  username: String;
  transactiontype: String;
  status: String;
  bitcloutnanos: Number;
  bitcloutpubkey: String;
  created: Date;
  completed: Date;
  tx_id: String;
}

const transactionSchema = new Schema<transactionDoc>({
  username: { type: String, required: true },
  bitcloutpubkey: { type: String },
  transactiontype: { type: String, required: true },
  status: { type: String, required: true },
  bitcloutnanos: { type: Number, required: true },
  created: { type: Date, default: Date.now() },
  completed: { type: Date },
  listing: { type: Schema.Types.ObjectId, ref: "Transaction" },
  tx_id: { type: String },
});

const Transaction = model<transactionDoc>("Transaction", transactionSchema);

export default Transaction;
