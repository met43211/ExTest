import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/get-transactions";

export const useGetTransactions = <T>(id: string) => {
  return useQuery<T>({
    queryKey: ["transactions", id],
    queryFn: () => getTransactions(id),
  });
};
