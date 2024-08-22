"use client";

import { RemoveScroll } from "react-remove-scroll";
import { useDrawer } from "../model/drawer-store";
import styles from "./drawer.module.scss";
import { useEffect } from "react";

export const Drawer = () => {
  const { drawer, setDrawer } = useDrawer();

  const closeDrawer = () => {
    setDrawer(false);
  };

  useEffect(() => {
    if (drawer) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [drawer]);

  return (
    <>
      {drawer ? (
        <>
          <button onClick={closeDrawer} className={styles["drawer-wrapper"]} />
          <div className={styles.drawer}>{drawer}</div>
        </>
      ) : null}
    </>
  );
};
