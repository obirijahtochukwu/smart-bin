import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { TrashIcon } from "../../../../../components/icons/trash";
import { EditIcon } from "../../../../../components/icons/edit";
import NormalInputLog from "../../../../../components/ui/normal-input/input";
import Button from "../../../../../components/ui/button";
import SecondaryButton from "../../../../../components/ui/secondary-button";
import {
  usePost,
  useGet,
  useDelete,
  usePut,
} from "../../../../../utils/functions";
import { ToastContainer, toast } from "react-toastify";
import { zone } from "../../../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import EditDialog from "../../../../../components/ui/edit";
import { regrex, uid } from "../../../../../utils/constants";
import { addBins, addZones, modifyZone } from "../../../../../redux/authSlice";
import DeleteDialog from "../../../../../components/ui/delete-modal";
import { useNavigate } from "react-router-dom";

export default function ZoneTab({ setOpenModal }: any) {
  const dispatch = useDispatch();
  const [form, setForm] = useState<string | any>({});
  const [currentPage, setCurrentPage] = useState(1);

  const zones = useSelector((state: any) => state.user.zones);
  const { data, loading, post } = usePost({ url: "add-zone/", form });
  // const { fetchedData, isLoading, fetch } = useGet("zones/");

  const totalPages = Math.ceil(zones.length / 5);

  const inputs = [
    {
      name: "name",
      placeholder: "Name",
      type: "text",
    },

    {
      name: "pickup_level",
      placeholder: "Fill Level",
      type: "number-only",
    },
  ];

  useEffect(() => {
    if (data?.name) {
      dispatch(addZones([...zones, data]));

      setForm({ name: "", pickup_level: "" });
    }
  }, [loading]);

  const onChange = (e: any, name: string, type: string) => {
    if (type === "number-only") {
      const re = /^[0-9 ]+$/;
      if (e.target.value === "" || regrex.test(e.target.value)) {
        setForm({
          ...form,
          [name]: e.target.value,
        });
      }
    } else {
      setForm({ ...form, [name]: e.target.value });
    }
  };

  return (
    <article>
      <ToastContainer />
      <main>
        <div className={styles.tableTitle}>
          <div className="">{"name"}</div>
          <div className="text-center">{"Pickup Level"}</div>
          <div className="">action</div>
        </div>
        {zones?.map(({ id, name, pickup_level }: zone, idx: number) => {
          const props = {
            zone_id: id,
            name,
            pickup_level,
            zones,
          };
          if (idx < currentPage * 4 && idx > currentPage * 4 - 5) {
            return <Zone {...props} />;
          }
        })}
        <div className="d-flex justify-content-end mt-3">
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      <form onSubmit={(e) => post(e)} className="w-100">
        <div className={styles.tabTitle}>Add Zone</div>
        <section className={styles.form}>
          {inputs.map(({ name, placeholder, type }, idx) => {
            const props = { name, placeholder, type };

            return (
              <NormalInputLog
                value={form[name]}
                key={idx}
                onChange={(e: any) => onChange(e, name, type)}
                {...props}
              />
            );
          })}
        </section>

        <div className={styles.btns}>
          <SecondaryButton loading={loading} title="submit" className="" />
        </div>
      </form>
    </article>
  );
}

const Zone = ({
  zone_id,
  name,
  pickup_level,
  zones,
}: { zones: zone[] } & zone) => {
  const { deleteItem, data } = useDelete();
  const { modify, loading, modifyData } = usePut();
  const router = useNavigate();
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [form, setForm] = useState<zone>({
    name,
    pickup_level,
  });

  const onChange = (e: any, name: string, type: string) => {
    if (type === "number-only") {
      if (e.target.value === "" || regrex.test(e.target.value)) {
        setForm({
          ...form,
          [name]: e.target.value,
        });
      }
    } else {
      setForm({ ...form, [name]: e.target.value });
    }
  };

  const closeEditModal = (e: any) => {
    e.preventDefault();
    modify({
      url: `zones/${zone_id}/`,
      data: zones,
      form,
    });
  };

  const deleteZone = () => {
    deleteItem({
      url: `zones/${zone_id}/delete/`,
      id: zone_id,
      data: zones,
    });
  };

  useEffect(() => {
    if (data.length > 0) {
      dispatch(addZones(data));
    }
  }, [data]);

  useEffect(() => {
    if (loading === "success") {
      setOpenEditModal(false);
      dispatch(addZones(modifyData));

      router(`/`);
    }
  }, [loading]);

  const props = {
    openEditModal,
    setOpenEditModal,
    closeEditModal,
    openDeleteModal,
    setOpenDeleteModal,
    name,
    loading,
    form,
    onChange,
    deleteZone,
  };
  return (
    <div key={name} className={styles.table}>
      <EditDialog {...props} />
      <DeleteDialog
        open={openDeleteModal}
        confirm={() => {
          router(`/`);
          setOpenDeleteModal(false);
          deleteZone();
        }}
        cancel={() => {
          router(`/`);
          setOpenDeleteModal(false);
        }}
        label={"Delete Zone?"}
        description={`Are you sure you want to delete "${name}"?`}
        warn={`You can't undo this action`}
      />

      <div className="text-capitalize">{name}</div>
      <div className="text-center">{pickup_level}</div>
      <div className={styles.tableIcons}>
        <EditIcon
          className={styles.tableIcon}
          onClick={() => {
            router(`?modify=${name?.split(" ").join("-")}_${uid}`);
            setOpenEditModal(true);
          }}
        />
        <TrashIcon
          onClick={() => {
            router(`?delete=${name?.split(" ").join("-")}_${uid}`);
            setOpenDeleteModal(true);
          }}
          className={styles.tableIcon}
        />
      </div>
    </div>
  );
};
