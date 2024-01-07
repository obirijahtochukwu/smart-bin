"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import dropdownStyles from "../../ui/dropdown/index.module.scss";
import DropdownLog from "../../../components/ui/dropdown";
import WhiteButton from "../../../components/ui/white-button";
import { RoutesIcon } from "./../../icons/routes";
import { FilledTrashIcon } from "../../../components/icons/filled-trash";
import { EmptyTrashIcon } from "../../../components/icons/empty-trash";
import { ManageIcon } from "../../../components/icons/manage";
import LogoutLog from "../../../components/ui/logout";
import { ArrowleftIcon } from "../../../components/icons/arrow-left";
import { bin, marker, user } from "../../../utils/types";
import { logout } from "../../../utils/functions";
import ModalDialog from "../../../components/ui/delete-modal";
import { useDispatch, useSelector } from "react-redux";
import { getMarkers } from "../../../redux/authSlice";

interface props {
  hide?: boolean;
  setOpenModal?: any;
  setHide?: any;
  user: user;
  bins: bin[];
  setMarkers?: React.Dispatch<marker[]>;
  getBins?: any;
}

export default function SideBar({
  hide,
  setOpenModal,
  setHide,
  bins,
  user,
  setOpenProfileModal,
}: { setOpenProfileModal: React.Dispatch<boolean> } & props) {
  const dispatch = useDispatch();
  const isIntersectingRef = useRef<any | any>(null);
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const [fillLevel, setFillLevel] = useState("");
  const [isModal, setIsModal] = useState(false);
  console.log(bins);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });
    observer.observe(isIntersectingRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (bins.length > 0) {
      const markers = bins?.filter(
        (bin: bin | any) =>
          (fillLevel == "Filled" && +bin["Filled Level"] == 100) ||
          (fillLevel == "Not Filled" && +bin["Filled Level"] < 100) ||
          fillLevel == ""
      );

      dispatch(
        getMarkers(
          markers.map((bin) => {
            return {
              lat: bin.Latitude,
              lng: bin.Longitude,
              fill_level: bin["Filled Level"],
            };
          })
        )
      );
      console.log(markers);
    }
  }, [fillLevel, bins]);

  return (
    <aside className={`${styles.container} ${hide ? styles.hide : ""}`}>
      <ModalDialog
        open={isModal}
        confirm={() => {
          logout();
          setIsModal(false);
        }}
        cancel={() => setIsModal(false)}
        label={"Logout"}
        description={`Are you sure you want to logout from this platform?`}
        warn={`You can't undo this action`}
      />

      <img
        src="/media/logo/logo-white.svg"
        alt={""}
        className={`${styles.logo} ${hide ? styles.hide : ""}`}
      />
      <div className={styles.zones}>
        <DropdownLog hide={hide} />
        <WhiteButton
          hide={hide}
          title="Routes"
          transparent={false}
          icon={<RoutesIcon className={dropdownStyles.icon} />}
        />
      </div>
      <div className={styles.zones}>
        <div className={styles.text}>Filter</div>
        <div className={styles.zones}>
          <WhiteButton
            hide={hide}
            title="Filled"
            active={fillLevel == "Filled" ? true : false}
            onClick={() => setFillLevel("Filled")}
            transparent={true}
            icon={<FilledTrashIcon className={""} />}
          />
          <WhiteButton
            hide={hide}
            onClick={() => setFillLevel("Not Filled")}
            title="Not Filled"
            active={fillLevel == "Not Filled" ? true : false}
            transparent={true}
            icon={<EmptyTrashIcon className={dropdownStyles.icon} />}
          />
        </div>
      </div>
      <div className={styles.zones}>
        <div className={styles.text}>Stops</div>
        <div className={styles.zones}>
          <WhiteButton
            hide={hide}
            title="Manage Stops"
            transparent={false}
            onClick={() => setOpenModal(true)}
            icon={<ManageIcon className={dropdownStyles.icon} />}
          />
        </div>
      </div>
      <section className="mt-auto">
        <LogoutLog
          hide={hide}
          user={user}
          setOpenProfileModal={setOpenProfileModal}
          setIsModal={setIsModal}
        />
        <button
          ref={isIntersectingRef}
          onClick={() => setHide(!hide)}
          className={styles.button}
        >
          <ArrowleftIcon
            style={{ transform: hide ? "rotate(180deg)" : "" }}
            className={dropdownStyles.icon}
          />
          {hide ? "" : "Hide Sidebar"}
        </button>
      </section>
      <div
        style={{ opacity: isIntersecting ? "0" : "1" }}
        className={styles.sticky}
      ></div>
    </aside>
  );
}
