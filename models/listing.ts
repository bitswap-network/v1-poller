import { model, Schema, Document } from "mongoose";

export interface listingDoc extends Document {
  seller: Schema.Types.ObjectId;
  buyer: Schema.Types.ObjectId;
  currencysaletype: string;
  bitcloutamount: number;
  usdamount: number;
  etheramount: number;
  ongoing: boolean;
  escrow: { balance: number; full: Boolean };
  bitcloutsent: boolean;
  bitcloutrTransactionId: string;
  finalTransactionId: string;
  created: Date;
  completed: { status: boolean; date: Date };
}

const listingSchema = new Schema<listingDoc>({
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  buyer: { type: Schema.Types.ObjectId, ref: "User", default: null },
  currencysaletype: { type: String, required: true, enum: ["ETH", "USD"] },
  bitcloutamount: { type: Number, required: true },
  usdamount: { type: Number },
  etheramount: { type: Number },
  ongoing: { type: Boolean, default: false },
  escrow: {
    balance: { type: Number, default: 0 },
    full: { type: Boolean, default: false },
  },
  bitcloutsent: { type: Boolean, default: true },
  bitcloutTransactionId: { type: String, default: "" },
  finalTransactionId: { type: String, default: "" },
  created: {
    type: Date,
    default: Date.now,
  },
  completed: {
    status: { type: Boolean, default: false },
    date: { type: Date },
  },
});
const Listing = model<listingDoc>("Listing", listingSchema);

export default Listing;
