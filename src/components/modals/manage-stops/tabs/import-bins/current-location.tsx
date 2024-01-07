import { CloseIcon } from "../../../../../components/icons/close";
import React from "react";
import styles from "./index.module.scss";
import { TrashIcon } from "../../../../../components/icons/trash";
import { EditIcon } from "../../../../../components/icons/edit";
import { input } from "../../../../../utils/types";
import InputLog from "../../../../../components/ui/input/input";
import NormalInputLog from "../../../../../components/ui/normal-input/input";
import Button from "../../../../../components/ui/button";
import SecondaryButton from "../../../../../components/ui/secondary-button";
import DropdownLog from "../../../../../components/ui/dropdown";
import { DropdownIcon } from "../../../../../components/icons/dropdown";
import { ImportFileIcon } from "../../../../../components/icons/import-file";

export default function ImportFileTab({ setOpenModal }: any) {
  const inputs = [
    {
      name: "name",
      placeholder: "96 Clyde Avenue, Mount Pearl, NL, Canada",
      type: "text",
    },
  ];

  return (
    <article>
      <main className={styles.main}>
        <ImportFileIcon className={styles.icon} />
        <div className={styles.title}>Import File</div>
        <div className={styles.text}>Supported format Excel(.xlsx)</div>
      </main>
      <div className={styles.btns}>
        <SecondaryButton className="" title="submit" />
      </div>
    </article>
  );
}
