import { Article } from "@/src/shared/ui/primitives/article/article";
import { DrawerLayout } from "../../drawer";
import { useGetTransactions } from "../lib/hooks/use-get-transactions";
import {
  ETransaction,
  TFormattedTransaction,
  TTransaction,
} from "../model/transaction.type";
import { TUser } from "../model/user.type";
import styles from "./user.module.scss";
import { Table } from "@/src/shared/ui/table/table";
import { TransactionTitles } from "../config/transaction-titles";
import { useEffect, useState } from "react";
import { Text } from "@/src/shared/ui/primitives/text/text";
import { formatDate } from "@/src/shared/lib/utils/format-date";
import { Flex } from "@/src/shared/ui/primitives/flex/flex";
import { formatTransactions } from "../lib/utils/format-transactions";
import ExpensesChart from "./chart";
import { TChartData } from "../model/chart-data.type";
import { getChartData } from "../lib/utils/get-chart-data";

export const User = ({ id, email }: TUser) => {
  const [transactions, setTransactions] = useState<TFormattedTransaction[]>([]);
  const { data } = useGetTransactions<TTransaction[]>(id as string);
  const [chartData, setChartData] = useState<TChartData | null>(null);
  useEffect(() => {
    if (data) {
      setTransactions(formatTransactions(data, styles));
      const chart = getChartData(data);
      setChartData(chart);
    }
  }, [data]);

  return (
    <DrawerLayout title={email}>
      <Article title="Использование токенов" isDrawer>
        <ExpensesChart data={chartData} />
      </Article>
      <div className={styles.line} />
      <Article title="История операций" isDrawer>
        <Flex col className={styles["table-container"]}>
          <Table
            titles={TransactionTitles}
            data={transactions}
            minWidth={300}
          />
        </Flex>
      </Article>
    </DrawerLayout>
  );
};
