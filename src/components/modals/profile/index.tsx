"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import { tabs, user } from "../../../utils/types";
import { AddBucketIcon } from "../../../components/icons/add-bucket";
import { AddZoneIcon } from "../../../components/icons/add-zone";
import { CloseIcon } from "../../../components/icons/close";
import ZoneTab from "./tabs/change-password/change-password";
import SettingsTab from "./tabs/settings/settings";
import { EditUserIcon } from "../../../components/icons/edit-user";
import { KeyIcon } from "../../../components/icons/key";

export default function ProfileModal({
  openProfileModal,
  setOpenProfileModal,
  user,
}: {
  openProfileModal: boolean;
  setOpenProfileModal: any;
  user: user;
}) {
  const [tab, setTab] = useState("General");

  const tabs: tabs[] = [
    {
      name: "General",
      icon: <EditUserIcon className="" />,
      tabTitle: "General",
      component: (
        <SettingsTab setOpenProfileModal={setOpenProfileModal} user={user} />
      ),
    },
    {
      name: "Change Password",
      icon: <KeyIcon className="" />,
      tabTitle: "Change Password",
      component: <ZoneTab setOpenProfileModal={setOpenProfileModal} />,
    },
  ];

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const closeModal = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenProfileModal(false);
      }
    };
    document.addEventListener("mousedown", closeModal);
  }, [ref]);

  return (
    <article
      className={`${openProfileModal ? styles.show : ""} ${styles.container}`}
    >
      <main
        ref={ref}
        className={`${openProfileModal ? styles.show : ""} ${styles.main}`}
      >
        <aside className={styles.aside}>
          <div className={styles.title}>Profile</div>
          <div className={styles.tabs}>
            {tabs.map(({ name, icon }, index) => {
              return (
                <div
                  key={name}
                  style={{
                    background: tab == name ? "#fff" : "",
                    borderColor: tab == name ? "#e1e2e6" : "",
                    borderLeftColor: tab == name ? "#66a57e" : "",
                  }}
                  className={styles.tab}
                  onClick={() => setTab(name)}
                >
                  {icon}
                  {name}
                </div>
              );
            })}
          </div>
        </aside>
        {tabs.map(
          ({ name, component, tabTitle }, index) =>
            name == tab && (
              <article key={index} className={styles.tabContainer}>
                <header className="d-flex justify-content-between align-content-center">
                  <div style={{ marginTop: "0" }} className={styles.tabTitle}>
                    {tabTitle}
                  </div>
                  <CloseIcon
                    onClick={() => setOpenProfileModal(false)}
                    className={styles.tabIcon}
                  />
                </header>
                {component}
              </article>
            )
        )}
      </main>
    </article>
  );
}
