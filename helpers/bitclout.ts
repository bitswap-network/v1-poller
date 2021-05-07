import axios from "axios";
import { AxiosResponse } from "axios";
import {TransactionInfoApi} from "../interfaces/bitclout"
import * as config from "../utils/config";

const cfIngressCookie = {
  Cookie: `__cfduid=${config.cfuid}; INGRESSCOOKIE=${config.ingressCookie}`,
};
export const bitcloutCfHeader = {
  headers: {
    ...cfIngressCookie,
    "Content-Type": "application/json",
  },
}

export const postTransactionInfo: (
  PublicKeyBase58Check: string,
) => Promise<TransactionInfoApi> = async function (
  PublicKeyBase58Check: string,
): Promise<TransactionInfoApi> {
  return await axios.post(
    "https://api.bitclout.com/api/v1/transaction-info",
    JSON.stringify({
      PublicKeyBase58Check: PublicKeyBase58Check,
    }),
    bitcloutCfHeader
  );
};