import { axiosInstance } from "@/src/shared/lib/axios";
import { TOrderBy } from "../model/order-by.type";

export const getUsers = async (
  page?: string | null,
  search?: string | null,
  orderBy?: TOrderBy | null
) => {
  const { data } = await axiosInstance.get("user/list", {
    params: {
      page: page || 1,
      search,
      orderBy: orderBy ? `tokens:${orderBy}` : "tokens:desc",
    },
  });
  return data;
};
