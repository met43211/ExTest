import { Article } from "@/src/shared/ui/primitives/article/article";
import { DrawerLayout } from "../../drawer";
import { useGetTransactions } from "../lib/hooks/use-get-transactions";
import { TFormattedTransaction, TTransaction } from "../model/transaction.type";
import { TUser } from "../model/user.type";
import styles from "./user.module.scss";
import { Table } from "@/src/shared/ui/table/table";
import { TransactionTitles } from "../config/transaction-titles";
import { useEffect, useState } from "react";
import { Flex } from "@/src/shared/ui/primitives/flex/flex";
import { formatTransactions } from "../lib/utils/format-transactions";
import CanvasChart from "@/src/shared/ui/canvas-chart/canvas-chart";
import RangeSlider from "@/src/shared/ui/range-slidebar/range-slidebar";

export const User = ({ id, email }: TUser) => {
  const [transactions, setTransactions] = useState<TFormattedTransaction[]>([]);
  const { data } = useGetTransactions<TTransaction[]>(id as string);
  const [minValue, setMinValue] = useState(0);
  const [hState, setHState] = useState<number[]>([]);
  const [vState, setVState] = useState<number[]>([]);
  const [initialTime, setInitialTime] = useState<number[]>([]);
  const [initialValues, setInitialValues] = useState<number[]>([]);
  const [maxValue, setMaxValue] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  useEffect(() => {
    if (data) {
      setTransactions(formatTransactions(data, styles));
      const sorted = structuredClone(data).sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      const filtered = sorted.filter(
        (transaction) => transaction.type === "WRITE_OFF"
      );
      const hours = filtered.map((transaction) =>
        new Date(transaction.created_at).getTime()
      );
      setHState(hours);
      setInitialTime(hours);
      const values = filtered.map((transaction) => transaction.amount);
      setVState(values);
      setInitialValues(values);
      setMin(hours[0]);
      setMax(hours[hours.length - 1]);
      setMinValue(hours[0]);
      setMaxValue(hours[hours.length - 1]);
    }
  }, [data]);

  useEffect(() => {
    const validIndices = initialTime
      .map((h, i) => (h >= minValue && h <= maxValue ? i : -1))
      .filter((index) => index !== -1);

    const newTime = validIndices.map((index) => initialTime[index]);
    const newValues = validIndices.map((index) => initialValues[index]);

    setHState(newTime);
    setVState(newValues);
  }, [minValue, maxValue]);

  return (
    <DrawerLayout title={email}>
      <Article title="Использование токенов" isDrawer>
        {data ? (
          <>
            <CanvasChart time={hState} values={vState} />
            <RangeSlider
              minValue={minValue}
              maxValue={maxValue}
              setMinValue={setMinValue}
              setMaxValue={setMaxValue}
              min={min}
              max={max}
            />
          </>
        ) : null}
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
