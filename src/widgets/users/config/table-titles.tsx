import { SortByTokens } from "@/src/features/sort-by-tokens";
import { Flex } from "@/src/shared/ui/primitives/flex/flex";
import { Text } from "@/src/shared/ui/primitives/text/text";

export const TableTitles = [
  { id: "email", title: <Text>Email</Text>, width: "30%" },
  { id: "name", title: <Text>Имя</Text>, width: "20%" },
  { id: "role", title: <Text>Роль</Text>, width: "10%" },
  { id: "subscription", title: <Text>Подписка</Text>, width: "15%" },
  {
    id: "tokens",
    title: (
      <Flex center justifyCenter>
        <Text key={"tokens"}>Tокен</Text>
        <SortByTokens />
      </Flex>
    ),
    width: "15%",
  },
  { id: "actions", title: <Text>Дейсвия</Text>, width: "10%" },
];
