import Pool from "../models/pool";
import Transaction from "../models/transaction";
import User from "../models/user";

export const inactivePoolCheck = async () => {
  const activePools = await Pool.find({ active: true }).exec();
  const timeNow = Date.now();
  activePools.forEach(async (pool) => {
    if (pool.activeStart && pool.user) {
      const timeDiff = timeNow - pool.activeStart;
      const user = await User.findById(pool.user).exec();
      //60 minutes
      if (timeDiff > 1000 * 60 * 60) {
        pool.active = false;
        pool.activeStart = null;
        pool.user = null;
        await pool.save();
        const depositCheck = await Transaction.findOne({
          user: user?._id,
          transactionType: "deposit",
          assetType: "ETH",
          completed: false,
        }).exec();

        if (depositCheck) {
          depositCheck.completed = true;
          depositCheck.completionDate = new Date();
          depositCheck.state = "failed";
          depositCheck.error = "Deposit Timed Out";
          await depositCheck.save();
        }
      }
    } else {
      console.log("Pool Error: ", pool);
    }
  });
};
