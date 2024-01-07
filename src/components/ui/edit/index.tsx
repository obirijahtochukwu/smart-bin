import { useState } from "react";
import styles from "./index.module.scss";
import { zone } from "@/utils/types";
import Address from "../address-input/input";
import NormalInputLog from "../normal-input/input";
import Loader from "../loader";

export default function EditDialog({
  openEditModal,
  setOpenEditModal,
  closeEditModal,
  loading,
  form,
  onChange,
}: {
  openEditModal: boolean;
  closeEditModal: any;
  loading: string;
  form: zone | any;
  onChange: any;
  setOpenEditModal: React.Dispatch<boolean>;
}) {
  const data = [
    { name: "name", label: "Zone name", value: form?.name || "" },
    {
      name: "pickup_level",
      label: "Pickup level",
      value: form?.pickup_level,
      type: "number-only",
    },
  ];

  return (
    <article
      className={`${openEditModal ? styles.show : ""} ${styles.container}`}
    >
      <form
        onSubmit={closeEditModal}
        style={{ boxShadow: " 0px 0 1000px 1000px rgba(0, 0, 0, 0.5)" }}
        className={`${openEditModal ? styles.show : ""} ${styles.main}`}
      >
        <div className={styles.title}>Modify Zone</div>
        {data.map(({ name, label, value, type }) => {
          return (
            <div className={styles._}>
              <div className={styles._label}>{label}</div>
              <input
                type="text"
                required
                disabled={loading === "pending" ? true : false}
                maxLength={type === "number-only" ? 1 : 5000}
                onChange={(e: any) => onChange(e, name, type)}
                placeholder={value}
                value={form[name]}
                className={styles.input}
              />
            </div>
          );
        })}
        <div className="mt-auto d-flex gap-3 justify-content-end">
          <button
            type="button"
            onClick={() => setOpenEditModal(false)}
            disabled={loading === "pending" ? true : false}
            className={`${styles.button} text-muted`}
            style={{ background: "transparent", boxShadow: "none" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading === "pending" ? true : false}
            className={styles.button}
          >
            {loading === "pending" ? <Loader /> : "Done"}
          </button>
        </div>
      </form>
    </article>
  );
}

function EditBinDialog({
  openEditModal,
  setOpenEditModal,
  closeEditModal,
  loading,
  form,
  setForm,
  onChange,
}: {
  openEditModal: boolean;
  closeEditModal: any;
  loading: string;
  onChange: any;
  form: any;
  setForm: any;
  setOpenEditModal: React.Dispatch<boolean>;
}) {
  const data: zone | any = [
    { name: "name", label: "Zone name", value: form?.name || "" },
    {
      name: "fill_level",
      label: "Fill level",
      value: form?.pickup_level,
      type: "number-only",
    },
    {
      name: "address",
      label: "Pickup level",
      value: form?.address,
      type: "text",
      placeholder: "Address",
    },
    {
      name: "zone",
      label: "Select zone",
      value: "form?.zone",
      type: "text",
      placeholder: "zone",
      icon: "true",
    },
  ];

  return (
    <article
      className={`${openEditModal ? styles.show : ""} ${styles.container}`}
    >
      <form
        onSubmit={closeEditModal}
        style={{ boxShadow: " 0px 0 1000px 1000px rgba(0, 0, 0, 0.5)" }}
        className={`${openEditModal ? styles.show : ""} ${styles.main}`}
      >
        <div className={styles.title}>Modify Bin</div>
        {data.map(
          (
            { name, label, value, type, placeholder, icon }: any,
            idx: number
          ) => {
            const props = { name, placeholder, type, icon };
            if (placeholder === "Address") {
              // return (
              //   <div key={idx} className={styles._}>
              //     <div className={styles._label}>{label}</div>
              //     <Address
              //       label={name}
              //       key={idx}
              //       loading={loading === "pending" ? true : false}
              //       data={data}
              //       setForm={setForm}
              //       form={form}
              //       {...props}
              //     />
              //   </div>
              // );
            }
            return (
              <div key={idx} className={""} style={{ overflow: "unset" }}>
                <div className={styles._label}>{label}</div>
                <NormalInputLog
                  value={form[name]}
                  key={idx}
                  onChange={(e: any) => onChange(e, name, type)}
                  setForm={setForm}
                  form={form}
                  loading={loading ? true : false}
                  data={data}
                  {...props}
                />
              </div>
            );
          }
        )}
        <div className="mt-auto d-flex gap-3 justify-content-end">
          <button
            type="button"
            onClick={() => setOpenEditModal(false)}
            disabled={loading === "pending" ? true : false}
            className={`${styles.button} text-muted`}
            style={{ background: "transparent", boxShadow: "none" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading === "pending" ? true : false}
            className={styles.button}
          >
            {loading === "pending" ? <Loader /> : "Done"}
          </button>
        </div>
      </form>
    </article>
  );
}

export { EditBinDialog };
