import proxy from "./proxy";
const logger = require("./logger")

const profileQuery = async (id:string) => {

    await proxy.initiateProfileQuery(100,id);
    await proxy.crawlTransactionInfo()
    .then((response)=>{
        logger.info(response);
        response["Transactions"].forEach(transaction => {
            if(transaction["TransactionType"]=="BASIC_TRANSFER")
            {
                const output = transaction.Outputs;
                console.log(output)
            }
        });
    })
    .catch((error)=>{
        logger.error(error)
    });
    
}
export default profileQuery;