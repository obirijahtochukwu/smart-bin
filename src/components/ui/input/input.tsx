import React from "react";
import styles from "./index.module.scss";
import { input } from "@/utils/types";
import { EyeIcon } from "../../../components/icons/eye";

export default function InputLog({
  value,
  onChange,
  placeholder,
  type,
  icon,
  loading,
}: input) {
  return (
    <div className={styles.container}>
      <div className={`${styles.icon} d-flex align-items-center`}>{icon}</div>
      <input
        type={type}
        required
        onChange={(e) => onChange(e)}
        value={value}
        disabled={loading}
        placeholder={placeholder}
      />
      {type == "password" && (
        <div className={`${styles.icon} d-flex align-items-center`}>
          <EyeIcon />
        </div>
      )}
    </div>
  );
}
