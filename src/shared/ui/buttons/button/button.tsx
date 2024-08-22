import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

type TButtonVariant = "primary" | "secondary";

type Props = {
  children: React.ReactNode;
  variant?: TButtonVariant;
  isIconOnly?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant,
  isIconOnly,
  className,
  ...rest
}: Props) => {
  return (
    <button
      className={`${styles.button}
      ${variant === "primary" ? styles.primary : ""}
      ${variant === "secondary" ? styles.secondary : ""}
      ${isIconOnly ? styles["icon-only"] : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
