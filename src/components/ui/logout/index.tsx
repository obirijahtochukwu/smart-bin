import React from "react";
import styles from "./index.module.scss";
import dropdownStyles from "../dropdown/index.module.scss";
import { LogoutIcon } from "../../../components/icons/logout";
import { user } from "@/utils/types";

export default function LogoutLog({
  hide,
  setOpenProfileModal,
  setIsModal,
  user,
}: {
  hide: boolean | any;
  setOpenProfileModal: React.Dispatch<boolean>;
  setIsModal: React.Dispatch<boolean>;
  user: user;
}) {
  return (
    <div className={hide ? "d-flex justify-content-center" : styles.button}>
      <img
        src="/media/images/sidebar/user.svg"
        alt={""}
        onClick={() => setOpenProfileModal(true)}
        className={`${hide ? styles.hide : ""}`}
      />
      <div
        onClick={() => setOpenProfileModal(true)}
        className={hide ? "d-none" : ""}
      >
        <div className={styles.title}>{user?.username}</div>
        <div className={styles.text}>{user?.email}</div>
      </div>
      <LogoutIcon
        onClick={() => setIsModal(true)}
        className={`ml-auto ${hide ? "d-none" : ""} ${dropdownStyles.icon}`}
      />
    </div>
  );
}
