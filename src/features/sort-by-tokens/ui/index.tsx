import { useSearchParams } from "next/navigation";
import styles from "./sort-by-tokens.module.scss";
import Image from "next/image";
import arrowIcon from "@/src/shared/assets/icons/arrowIcon.svg";
import { useUpdateQueryParam } from "@/src/shared/lib/hooks/use-update-query-params";
import { useEffect, useState } from "react";

export const SortByTokens = () => {
  const params = useSearchParams();
  const initial = params.get("orderBy");
  const [orderBy, setOrderBy] = useState(initial ? initial : "desc");

  const updateParams = useUpdateQueryParam();

  useEffect(() => {
    updateParams({ orderBy });
  }, [orderBy]);

  const handleClick = () => {
    setOrderBy((prev) => (prev !== "asc" ? "asc" : "desc"));
  };

  return (
    <button
      onClick={handleClick}
      className={` ${styles.sort} ${orderBy === "asc" ? styles.asc : styles.desc}`}
    >
      <Image alt={"arrowIcon"} src={arrowIcon} className={styles.icon} />
    </button>
  );
};
