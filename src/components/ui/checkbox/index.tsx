import React from "react";
import styles from "./index.module.scss";

export default function Checkbox({ props }: { props: string }) {
  return (
    <div className={styles.checkbox}>
      <input
        id="wp-comment-cookies-consent"
        name="wp-comment-cookies-consent"
        type="checkbox"
        value="yes"
        className={styles.input}
      />
      <label htmlFor="wp-comment-cookies-consent">{props}</label>
    </div>
  );
}
