// import { GlobeIcon } from "../../../../componentsicons/globe";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { hide, input, zone } from "@/utils/types";
import { GlobeIcon } from "../../../components/icons/globe";
import { ArrowdownIcon } from "../../../components/icons/arrow-down";
import { useDispatch, useSelector } from "react-redux";
import { PostionIcon } from "../../../components/icons/position";
import { useGet } from "../../../utils/functions";
import { addZones, getMarkers } from "../../../redux/authSlice";

export default function DropdownLog({ hide }: hide) {
  const dispatch = useDispatch();
  const { zones } = useSelector((state: any) => state.user);
  const [zone, setZone] = useState<zone>({});
  const [clicks, setClicks] = useState(0);
  const [isDropdown, setIsDropdown] = useState(false);

  const ref = useRef<HTMLInputElement | any>(null);
  const { fetch, fetchedData, isLoading } = useGet(`bins/zone/${zone?.id}/`);

  useEffect(() => {
    if (zone?.id) {
      fetch();
    }
  }, [clicks]);

  useEffect(() => {
    dispatch(
      getMarkers(
        fetchedData.map((bin: any) => {
          return {
            lat: bin.Latitude,
            lng: bin.Longitude,
            fill_level: bin["Filled Level"],
          };
        })
      )
    );
  }, [fetchedData]);

  // CLOSE DROPDOWN FUNCTION
  useEffect(() => {
    const closeModal = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdown(false);
      }
    };
    document.addEventListener("mousedown", closeModal);
  }, [ref]);

  return (
    <div ref={ref} className={styles.container}>
      <GlobeIcon
        onClick={() => setIsDropdown(true)}
        className={`${styles.icon} ${hide ? styles.hide : ""}`}
      />
      <input
        readOnly
        onClick={() => setIsDropdown(true)}
        onChange={(e) => setZone({ ...zones, name: e.target.value })}
        className={hide ? "d-none" : "text-capitalize"}
        value={zone?.name || "All Zones"}
      />
      <ArrowdownIcon
        onClick={() => setIsDropdown(true)}
        className={`${styles.icon} ${hide ? "d-none" : ""}`}
      />

      <section
        className={`${styles.dropdown} shadow ${
          isDropdown ? styles.show : null
        }`}
      >
        {zones?.map((zone: zone, idx: number) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setZone(zone);
                setIsDropdown(false);
                setClicks(clicks + 1);
              }}
              className={styles.dropdownItem}
            >
              <PostionIcon className={styles.container_} />
              <div className={"text-capitalize"}>{zone?.name}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
