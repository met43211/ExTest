import { InputHTMLAttributes } from "react";
import styles from "./search.module.scss";
import Image from "next/image";
import searchIcon from "@/src/shared/assets/icons/searchIcon.svg";

export const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles.input}>
      <Image alt="searchIcon" src={searchIcon} className={styles.icon} />
      <input className={styles.search} {...props}></input>
    </div>
  );
};
