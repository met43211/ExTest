import { Flex } from "@/src/shared/ui/primitives/flex/flex";
import styles from "./header.module.scss";
import { Text } from "@/src/shared/ui/primitives/text/text";
import { MyOrganization } from "@/src/features/my-organization";
import { Profile } from "@/src/entities/profile";

export const Header = () => {
  return (
    <Flex className={styles.header} center>
      <Flex center className={styles["header-left"]}>
        <Text weight={600} size={22} tag="h1" className={styles.logo}>
          ExTest
        </Text>
        <MyOrganization />
      </Flex>
      <Profile />
    </Flex>
  );
};
