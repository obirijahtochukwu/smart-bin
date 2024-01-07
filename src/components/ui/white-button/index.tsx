import React from "react";
import styles from "./index.module.scss";

export default function WhiteButton({
  title,
  icon,
  transparent,
  hide,
  onClick,
  active,
}: {
  title?: string;
  icon?: any;
  transparent?: boolean;
  hide?: boolean;
  onClick?: any;
  active?: boolean;
}) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={active}
      style={{
        background:
          transparent && !active
            ? "rgba(117, 174, 139)"
            : active
            ? "#66a57e"
            : "",
        color: transparent ? "white" : "",
        borderColor: transparent ? " rgba(255, 255, 255, 0.50)" : "",
      }}
    >
      {icon}
      {hide ? "" : title}
    </button>
  );
}
