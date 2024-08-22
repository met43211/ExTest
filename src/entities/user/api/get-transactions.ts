import { axiosInstance } from "@/src/shared/lib/axios";

export const getTransactions = async (id: string) => {
  const { data } = await axiosInstance.get(`/user/${id}/transactions`);
  return data;
};
