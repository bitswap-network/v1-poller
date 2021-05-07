import Pool from "../models/pool"
import Transaction from "../models/transaction";
import User from "../models/user";

export const inactivePoolCheck = async () => {
  const pools = await Pool.find({active:true}).exec()
  const timeNow = Date.now()
  pools.forEach(async(pool)=>{
    let timeDiff = timeNow - pool.activeStart!;
    //30 minutes
    if(timeDiff>1000*60*30){
      pool.active = false;
      pool.activeStart = null;
      pool.user = null;
      await pool.save()
      let user = await User.findById(pool.user!).populate("onGoingDeposit").exec()
      if(user?.onGoingDeposit){
        let transaction = await Transaction.findById(user.onGoingDeposit._id).exec();
        transaction!.completed = true;
        transaction!.completionDate = new Date()
        transaction!.state = "failed";
        transaction!.error = "Deposit Timed Out"
        user.onGoingDeposit = null;
        await transaction!.save()
        await user.save()
      }
    }

  })

}