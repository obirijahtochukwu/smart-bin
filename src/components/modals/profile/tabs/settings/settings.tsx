import { CloseIcon } from "../../../../../components/icons/close";
import React from "react";
import styles from "./index.module.scss";
import { TrashIcon } from "../../../../../components/icons/trash";
import { EditIcon } from "../../../../../components/icons/edit";
import { input, user } from "../../../../../utils/types";
import InputLog from "../../../../../components/ui/input/input";
import NormalInputLog from "../../../../../components/ui/normal-input/input";
import Button from "../../../../../components/ui/button";
import SecondaryButton from "../../../../../components/ui/secondary-button";
import DropdownLog from "../../../../../components/ui/dropdown";
import { DropdownIcon } from "../../../../../components/icons/dropdown";

export default function SettingsTab({
  setOpenProfileModal,
  user,
}: {
  setOpenProfileModal: React.SetStateAction<boolean>;
  user: user;
}) {
  const inputs = [
    {
      name: "full name",
      placeholder: "John Doe",
      type: "text",
    },
    {
      name: "Username",
      placeholder: user?.username,
      type: "text",
    },

    {
      name: "Email Address",
      placeholder: user?.email,
      type: "text",
    },
  ];

  return (
    <article className="w-100">
      <div className="d-flex justify-content-center">
        <img
          src="/media/images/home/edit-profle.svg"
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
