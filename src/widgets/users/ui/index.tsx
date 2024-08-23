"use client";

import { SearchInput } from "@/src/shared/ui/inputs/search/search";
import { Text } from "@/src/shared/ui/primitives/text/text";
import { Table } from "@/src/shared/ui/table/table";
import { TableTitles } from "../config/table-titles";
import { TFormattedUser, TUser, User } from "@/src/entities/user";
import { useEffect, useState } from "react";
import { useGetUsers } from "../lib/hooks/use-get-users";
import { formatUsersList } from "../lib/utils/format-users-list";
import { SearchUser } from "@/src/features/search-user";
import { Flex } from "@/src/shared/ui/primitives/flex/flex";
import { EditUser } from "@/src/features/edit-user";
import { DeleteUser } from "@/src/features/delete-user";
import { Pagination } from "@/src/features/pagination";
import { useDrawer } from "@/src/entities/drawer/model/drawer-store";
import styles from "./users.module.scss";

export const Users = () => {
  const [usersList, setUsersList] = useState<TFormattedUser[]>([]);
  const { data, isSuccess } = useGetUsers<{ data: TUser[]; pages: number }>();
  const { setDrawer } = useDrawer();

  useEffect(() => {
    if (data) {
      const formattedUsers = formatUsersList(data.data);
      setUsersList(formattedUsers);
    }
  }, [data, setUsersList]);

  const openUser = (user: any) => {
    setDrawer(<User {...(user as TUser)} />);
  };

  return (
    <>
      <Text tag="h4" size={22} weight={600} className={styles.title}>
        Пользователи
      </Text>
      <SearchUser />
      <Flex col className={styles["table-container"]}>
        <Table
          titles={TableTitles}
          data={usersList}
          getActionsFunc={(id) => (
            <Flex justifyCenter>
              <EditUser id={id as string} />
              <DeleteUser id={id as string} />
            </Flex>
          )}
          itemAction={openUser}
          minWidth={800}
        />
      </Flex>

      {isSuccess && !data.data.length && (
        <Flex>
          <Text opacity={0.5}>Пусто</Text>
        </Flex>
      )}
      <Pagination pages={data ? data.pages : 1} />
    </>
  );
};
