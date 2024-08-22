import { Text } from "@/src/shared/ui/primitives/text/text";
import styles from "./my-organization.module.scss";
import Image from "next/image";
import { Flex } from "@/src/shared/ui/primitives/flex/flex";
import bagIcon from "@/src/shared/assets/icons/bagIcon.svg";

export const MyOrganization = () => {
  return (
    <button className={styles.organization}>
      <Flex className={styles.icon}>
        <Image alt="bag-icon" src={bagIcon} />
      </Flex>
      <Text>Моя организация</Text>
    </button>
  );
};
