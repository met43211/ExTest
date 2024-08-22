import { Text } from "@/src/shared/ui/primitives/text/text";
import {
  ETransaction,
  TFormattedTransaction,
  TTransaction,
} from "../../model/transaction.type";
import { formatDate } from "@/src/shared/lib/utils/format-date";

export const formatTransactions = (
  transactions: TTransaction[],
  styles: any
): TFormattedTransaction[] => {
  return transactions.map((transaction) => ({
    id: transaction.id,
    type: ETransaction[transaction.type],
    amount: (
      <Text
        className={`
          ${transaction.type === "WRITE_OFF" ? styles.red : ""}
          ${transaction.type === "REPLENISH" ? styles.green : ""}
        `}
      >
        {transaction.type === "WRITE_OFF" && "- "}
        {transaction.type === "REPLENISH" && "+ "}
        {transaction.amount} {transaction.currency}
      </Text>
    ),
    created_at: formatDate(transaction.created_at),
  }));
};
