"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import { tabs } from "../../../utils/types";
import { EmptyTrashIcon } from "../../../components/icons/empty-trash";
import { ManageIcon } from "../../../components/icons/manage";
import { AddBucketIcon } from "../../../components/icons/add-bucket";
import { AddZoneIcon } from "../../../components/icons/add-zone";
import { LocationIcon } from "../../../components/icons/location";
import { ImportIcon } from "../../../components/icons/import";
import { ExportIcon } from "../../../components/icons/export";
import BinsTab from "./tabs/bins/bins";
import { CloseIcon } from "../../../components/icons/close";
import ZoneTab from "./tabs/zone/zone";
import CurrentLocationTab from "./tabs/current-location/current-location";
import ImportFileTab from "./tabs/import-bins/current-location";
import EditDialog from "../../../components/ui/edit";
import { useSelector } from "react-redux";
import { useGet } from "../../../utils/functions";
import { getBins } from "../../../redux/authSlice";

export default function ManageStopsModal({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: any;
}) {
  const [tab, setTab] = useState("Add Bins");
  const [openEditModal, setOpenEditModal] = useState(true);

  const tabs: tabs[] = [
    {
      name: "Add Bins",
      icon: <AddBucketIcon className="" />,
      tabTitle: "Bins",
      component: <BinsTab setOpenModal={setOpenModal} />,
    },
    {
      name: "Add Zone",
      icon: <AddZoneIcon className="" />,
      tabTitle: "Zone",
      component: <ZoneTab setOpenModal={setOpenModal} />,
    },
    {
      name: "Current Location",
      icon: <LocationIcon className="" />,
      tabTitle: "Current Location",
      component: <CurrentLocationTab setOpenModal={setOpenModal} />,
    },
    {
      name: "Import Bins",
      icon: <ImportIcon className="" />,
      tabTitle: "Import Bins",
      component: <ImportFileTab setOpenModal={setOpenModal} />,
    },
    {
      name: "Export Bins",
      icon: <ExportIcon className="" />,
      tabTitle: "",
      component: <BinsTab setOpenModal={setOpenModal} />,
    },
  ];

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const closeModal = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !openEditModal
      ) {
        // setOpenModal(false);
        console.log("");
      }
    };
    document.addEventListener("mousedown", closeModal);
  }, [ref]);

  const props = {
    openEditModal,
    setOpenEditModal,
  };

  return (
    <article className={`${openModal ? styles.show : ""} ${styles.container}`}>
      <main
        ref={ref}
        className={`${openModal ? styles.show : ""} ${styles.main}`}
      >
        <aside className={styles.aside}>
          <div className={styles.title}>Manage Stops</div>
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
          ({ name, icon, component, tabTitle }, index) =>
            name == tab && (
              <article key={index} className={styles.tabContainer}>
                <header className="d-flex justify-content-between align-content-center">
                  <div style={{ marginTop: "0" }} className={styles.tabTitle}>
                    {tabTitle}
                  </div>
                  <CloseIcon
                    onClick={() => setOpenModal(false)}
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
