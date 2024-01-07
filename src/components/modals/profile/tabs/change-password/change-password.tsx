import React from "react";
import styles from "./index.module.scss";
import NormalInputLog from "../../../../../components/ui/normal-input/input";
import SecondaryButton from "../../../../../components/ui/secondary-button";

export default function SettingsTab({ setOpenProfileModal }: any) {
  const inputs = [
    {
      name: "Current password",
      placeholder: "",
      type: "password",
    },
    {
      name: "New password",
      placeholder: "",
      type: "password",
    },
    {
      name: "Confirm password",
      placeholder: "",
      type: "password",
    },
  ];

  return (
    <article className="w-100">
      <div className="d-flex justify-content-center">
        <img
          src="/media/images/home/undraw_mobile_encryption.svg"
          alt=""
          className={styles.logo}
        />
      </div>
      <section className={styles.form}>
        {inputs.map(({ name, placeholder, type }, idx) => {
          const props = { name, placeholder, type };
          return (
            <>
              <div className={styles.title}>{name}</div>
              <NormalInputLog key={idx} {...props} />
            </>
          );
        })}
      </section>
      <div className={styles.btns}>
        <SecondaryButton className="" title="save" />
      </div>
    </article>
  );
}
