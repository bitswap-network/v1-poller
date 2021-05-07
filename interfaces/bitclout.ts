import { AxiosResponse } from "axios";

export interface TransactionInfoApi extends AxiosResponse {
  data:{
    Error:string;
    Transactions:TransactionInfo[];
  }
}
export interface TransactionInfo {
  
    TransactionIDBase58Check: string,
    RawTransactionHex: string,
    Inputs: TxnInfoInputs[],
    Outputs:TxnInfoOutputs[],
    SignatureHex: string,
    TransactionType:string,
    BlockHashHex:string,
    TransactionMetadata: {
        BlockHashHex: string,
        TxnIndexInBlock: 1286,
        TxnType:string,
        TransactorPublicKeyBase58Check:string,
        AffectedPublicKeys: [
            {
                PublicKeyBase58Check:string,
                Metadata: string
            },
            {
              PublicKeyBase58Check:string,
              Metadata: string
            }
        ],
        BasicTransferTxindexMetadata: any|null,
        BitcoinExchangeTxindexMetadata: any|null,
        CreatorCoinTxindexMetadata: any|null,
        CreatorCoinTransferTxindexMetadata: any|null,
        UpdateProfileTxindexMetadata: any|null,
        SubmitPostTxindexMetadata: any|null,
        LikeTxindexMetadata: any|null,
        FollowTxindexMetadata: any|null,
        PrivateMessageTxindexMetadata: any|null,
        SwapIdentityTxindexMetadata: any|null
    }
}
interface TxnInfoInputs {
    TransactionIDBase58Check: string,
    Index: number
}

interface TxnInfoOutputs {
  PublicKeyBase58Check: string,
  AmountNanos: number
}