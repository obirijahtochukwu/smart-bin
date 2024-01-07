import { useState } from "react";
import styles from "./index.module.scss";
import { zone } from "@/utils/types";

export default function ModalDialog({
  open,
  confirm,
  cancel,
  label,
  description,
  warn,
}: {
  open: boolean;
  confirm: any;
  cancel: any;
  label: string;
  description: string;
  warn: string;
}) {
  return (
    <article className={`${open ? styles.show : ""} ${styles.container}`}>
      <main className={`${open ? styles.show : ""} ${styles.main}`}>
        <div className={styles.title}>{label}</div>
        <div className={styles.desc}>{description}</div>
        <div className={styles.desc}>{warn}</div>

        <div className="mt-3 d-flex gap-4 justify-content-center">
          <button
            onClick={cancel}
            style={{ background: "#fff", color: "#66a57e" }}
            className={styles.button}
          >
            No, cancel
          </button>
          <button onClick={confirm} className={styles.button}>
            Yes, Confirm
          </button>
        </div>
      </main>
    </article>
  );
}
