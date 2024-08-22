import { useUpdateQueryParam } from "@/src/shared/lib/hooks/use-update-query-params";
import { SearchInput } from "@/src/shared/ui/inputs/search/search";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

export const SearchUser = () => {
  const [search, setSearch] = useState("");
  const updateParams = useUpdateQueryParam();

  const [, cancel] = useDebounce(
    () => {
      updateParams({ page: 1, search });
    },
    500,
    [search]
  );

  return (
    <SearchInput
      placeholder="Поиск"
      value={search}
      onChange={(e) => {
        cancel();
        setSearch(e.target.value);
      }}
    />
  );
};
