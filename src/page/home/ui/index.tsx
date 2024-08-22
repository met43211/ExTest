import { Article } from "@/src/shared/ui/primitives/article/article";
import { Users } from "@/src/widgets/users";

export const HomePage = () => {
  return (
    <Article title="Моя организация">
      <Users />
    </Article>
  );
};
