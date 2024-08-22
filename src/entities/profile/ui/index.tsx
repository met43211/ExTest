import { Button } from "@/src/shared/ui/buttons/button/button";
import profileIcon from "@/src/shared/assets/icons/profileIcon.svg";
import Image from "next/image";
import { Flex } from "@/src/shared/ui/primitives/flex/flex";
import { Text } from "@/src/shared/ui/primitives/text/text";

import styles from "./profile.module.scss";

export const Profile = () => {
  return (
    <Button variant="secondary" className={styles.profile}>
      <Image alt="profileIcon" src={profileIcon} className={styles.icon} />
      <Flex col className={styles.text} gap={0}>
        <Text size={12} className={styles.status}>
          Вы авторизованы
        </Text>
        <Text size={14}>Администратор</Text>
      </Flex>
    </Button>
  );
};
