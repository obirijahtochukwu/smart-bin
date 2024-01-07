import React from "react";
import styles from "./index.module.scss";
import Loader from "../loader";

export default function Button({
  title,
  onClick,
  type,
  loading,
}: {
  title: string;
  onClick: any;
  type?: string | any;
  loading?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={() => onClick()}
      className={styles.button}
    >
      {loading ? <Loader /> : title}
    </button>
  );
}
