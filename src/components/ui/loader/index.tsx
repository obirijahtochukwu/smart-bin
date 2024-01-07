import React from "react";
import styles from "./styles.module.scss";

export default function Loader() {
  return (
    <div style={{ background: `` }} className={styles.custom_loader} />
  );
}
