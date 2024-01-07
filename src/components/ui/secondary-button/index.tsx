import React from "react";
import styles from "./index.module.scss";
import Loader from "../loader";

export default function SecondaryButton({
  title,
  className,
  onClick,
  loading,
}: {
  title?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
}) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      style={{ borderColor: className && "#66a57e" }}
      className={`${styles.button}  ${className}`}
    >
      {loading ? <Loader /> : title}
    </button>
  );
}
