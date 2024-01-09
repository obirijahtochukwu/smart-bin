import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { bin, input } from "@/utils/types";
import DropdownLog from "../dropdown";
import { DropdownIcon } from "../../../components/icons/dropdown";
import { EyeIcon } from "../../../components/icons/eye";
import { useSelector } from "react-redux";
import { PostionIcon } from "../../../components/icons/position";

export default function NormalInputLog({
  value,
  onChange,
  placeholder,
  type,
  icon,
  setForm,
  form,
  data,
  loading,
}: {
  form?: bin;
  data?: bin;
  loading?: boolean;
  setForm?: React.Dispatch<bin> | any;
} & input) {
  if (placeholder?.includes("one")) {
    const { zones } = useSelector((state: any) => state.user);
    const [zone, setZone] = useState("");
    const [isDropdown, setIsDropdown] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLInputElement | any>(null);
    const inputRef = useRef<HTMLInputElement | any>(null);
    const menuRef = useRef<HTMLInputElement | any>(null);

    const filteredZones = zones.filter(({ name }: { name: string }) =>
      name.includes(zone)
    );

    // CLOSE DROPDOWN FUNCTION
    useEffect(() => {
      const closeModal = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsDropdown(false);
        }
      };
      document.addEventListener("mousedown", closeModal);
    }, [ref]);

    useEffect(() => {
      if (data?.name) {
        setZone("");
      }
    }, [loading]);

    return (
      <>
        <div
          ref={ref}
          style={{ position: "relative", overflow: "unset" }}
          className={styles.container}
        >
          <input
            ref={inputRef}
            type={type}
            // onChange={(e) => onChange(e)}
            value={zone}
            required
            style={{ background: "black" }}
            onClick={() => setIsDropdown(true)}
            onChange={(e) => setZone(e.target.value)}
            placeholder={placeholder}
          />
          <div className={`${styles.icon}`}>
            <DropdownIcon />
          </div>
          <section
            ref={menuRef}
            className={`${styles.dropdown} shadow ${
              isDropdown && zone && filteredZones.length > 0
                ? styles.show
                : null
            }`}
          >
            {" "}
            {filteredZones?.map(
              ({ name, id }: { name: string; id: string }) => {
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setZone(name);
                      setIsDropdown(false);
                      setForm({ ...form, zone: +id });
                    }}
                    className={styles.dropdownItem}
                  >
                    <PostionIcon className={""} />
                    <div className={"text-capitalize"}>{name}</div>
                  </div>
                );
              }
            )}
          </section>
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      {/* {type} */}
      <input
        type={type}
        onChange={(e) => onChange(e)}
        required
        value={value}
        disabled={icon || false}
        placeholder={placeholder}
      />
      <div
        className={`${styles.icon} d-flex align-items-center ${
          icon ? "" : "d-none"
        }`}
      >
        <DropdownIcon />
      </div>
      <div
        className={`${styles.icon} d-flex align-items-center ${
          type == "password" ? "" : "d-none"
        }`}
      >
        <EyeIcon />
      </div>
    </div>
  );
}
