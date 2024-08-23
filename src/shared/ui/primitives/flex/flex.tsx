import { ReactNode } from "react";
import styles from "./flex.module.scss";

type Props = {
  children: ReactNode;
  tag?:
    | "div"
    | "section"
    | "menu"
    | "aside"
    | "header"
    | "footer"
    | "span"
    | "article"
    | "nav"
    | "ul"
    | "ol"
    | "main";
  className?: string;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  gap?: number;
  width?: number | string;
  editable?: boolean;
  wrap?: boolean;
  col?: boolean;
  center?: boolean;
  justifyCenter?: boolean;
};

export const Flex = ({
  children,
  className,
  tag = "div",
  direction = "row",
  gap = 4,
  width = "100%",
  editable = false,
  wrap = false,
  col = false,
  center = false,
  justifyCenter = false,
}: Props) => {
  const Tag = tag;

  return (
    <Tag
      className={`${styles.flex} ${center ? styles.center : ""} ${justifyCenter ? styles.justify : ""} ${wrap ? styles.wrap : ""} ${className}`}
      style={
        !editable
          ? { flexDirection: col ? "column" : direction, gap: gap * 4, width }
          : undefined
      }
    >
      {children}
    </Tag>
  );
};
