import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getUsers } from "../../api/get-users";
import { TOrderBy } from "../../model/order-by.type";

export const useGetUsers = <T>() => {
  const queryParams = useSearchParams();
  const page = queryParams.get("page");
  const search = queryParams.get("search");
  const orderBy = queryParams.get("orderBy");
  return useQuery<T>({
    queryKey: ["users", page, search, orderBy],
    queryFn: () => getUsers(page, search, orderBy as TOrderBy),
  });
};
