import { Flex } from "@/src/shared/ui/primitives/flex/flex";
import { PropsWithChildren } from "react";
import { useDrawer } from "../model/drawer-store";
import { Button } from "@/src/shared/ui/buttons/button/button";
import { Text } from "@/src/shared/ui/primitives/text/text";
import xIcon from "@/src/shared/assets/icons/xIcon.svg";
import styles from "./drawer.module.scss";
import Image from "next/image";

type Props = PropsWithChildren<{
  title: string;
}>;

export const DrawerLayout = ({ children, title }: Props) => {
  const { setDrawer } = useDrawer();
  const close = () => {
    setDrawer(null);
  };
  return (
    <Flex className={styles["drawer-layout"]} col>
      <Flex className={styles["drawer-header"]} center>
        <Text tag="h2" size={20} weight={600}>
          {title}
        </Text>
        <Button isIconOnly onClick={close}>
          <Image src={xIcon} alt="x" />
        </Button>
      </Flex>
      <Flex col className={styles["drawer-content"]}>
        {children}
      </Flex>
    </Flex>
  );
};
