import { PropsWithChildren } from "react";
import { Flex } from "../flex/flex";
import { Text } from "../text/text";
import styles from "./article.module.scss";

type Props = PropsWithChildren<{
  title: string;
  className?: string;
  isDrawer?: boolean;
}>;

export const Article = ({
  children,
  title,
  className,
  isDrawer = false,
}: Props) => {
  return (
    <Flex
      col
      className={`${styles.article} ${isDrawer ? styles.drawer : ""} ${className}`}
      gap={3}
      tag="article"
    >
      <Flex className={styles.title}>
        <Text tag="h3" size={isDrawer ? 20 : 22} weight={600}>
          {title}
        </Text>
      </Flex>

      <Flex col className={styles.content}>
        {children}
      </Flex>
    </Flex>
  );
};
