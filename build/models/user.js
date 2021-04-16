"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const userSchema = new mongoose_1.Schema({
    name: { type: String },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    emailverified: { type: Boolean, default: false },
    emailverification: { type: String },
    bitcloutpubkey: { type: String, unique: true },
    ethereumaddress: { type: String, unique: true },
    password: { type: String, required: true },
    passwordverification: { type: String },
    incomplete: { type: Boolean, required: true, default: true },
    created: {
        type: Date,
        default: Date.now,
    },
    listings: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Listing" }],
    buys: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Listing" }],
    admin: { type: Boolean, default: false },
    verified: {
        type: String,
        default: "unverified",
        enum: ["unverified", "pending", "verified"],
    },
    ratings: [
        {
            rating: {
                type: Number,
                rater: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            },
        },
    ],
    completedorders: { type: Number, default: 0 },
    bitswapbalance: { type: Number, default: 0 },
    transactions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Transaction" }],
});
// userSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
const User = mongoose_1.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQW1EO0FBQ25ELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQXdCeEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBTSxDQUFVO0lBQ3JDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDdEIsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDeEQsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDckQsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO0lBQ2hELGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUNuQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDOUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQy9DLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUMxQyxvQkFBb0IsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDdEMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDNUQsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLElBQUk7UUFDVixPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUc7S0FDbEI7SUFDRCxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQzNELElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDdkQsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO0lBQ3hDLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLFlBQVk7UUFDckIsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUM7S0FDNUM7SUFDRCxPQUFPLEVBQUU7UUFDUDtZQUNFLE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7YUFDcEQ7U0FDRjtLQUNGO0lBQ0QsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO0lBQzdDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtJQUM1QyxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxDQUFDO0NBQ3BFLENBQUMsQ0FBQztBQUVILDZCQUE2QjtBQUM3QiwrQ0FBK0M7QUFDL0MseURBQXlEO0FBQ3pELGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsT0FBTztBQUNQLE1BQU07QUFFTixVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxVQUFVLFFBQWdCO0lBQzFELE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNoRSxDQUFDLENBQUM7QUFFRixVQUFVLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxVQUFVLFFBQWdCO0lBQzNELE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JELENBQUMsQ0FBQztBQUVGLE1BQU0sSUFBSSxHQUFHLGdCQUFLLENBQVUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELGtCQUFlLElBQUksQ0FBQyJ9