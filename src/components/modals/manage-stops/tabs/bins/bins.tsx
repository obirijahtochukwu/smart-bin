import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { TrashIcon } from "../../../../../components/icons/trash";
import { EditIcon } from "../../../../../components/icons/edit";
import { bin } from "../../../../../utils/types";
import NormalInputLog from "../../../../../components/ui/normal-input/input";
import SecondaryButton from "../../../../../components/ui/secondary-button";
import Address from "../../../../../components/ui/address-input/input";
import { useDelete, usePost, usePut } from "../../../../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ResponsivePagination from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import { EditBinDialog } from "../../../../../components/ui/edit";
import { regrex, uid } from "../../../../../utils/constants";
import DeleteDialog from "../../../../../components/ui/delete-modal";
import { addBins } from "../../../../../redux/authSlice";

export default function BinsTab({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<boolean>;
}) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState<bin | any>({});
  const { data, loading, post } = usePost({ url: "add-bin/", form });
  const bins: bin[] = useSelector((state: any) => state.user.binList) || [];
  const totalPages = Math.ceil(bins.length / 4);

  const inputs = [
    {
      name: "name",
      placeholder: "Name",
      type: "text",
    },
    {
      name: "address",
      placeholder: "Address",
      type: "text",
    },
    {
      name: "fill_level",
      placeholder: "Fill Level",
      type: "number-only",
    },
    {
      name: "zone",
      placeholder: "Select Zone",
      type: "text",
      icon: "true",
    },
  ];

  const onChange = (e: any, name: string, type: string) => {
    if (type === "number-only") {
      const re = /[0-9 ]+$/;
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

  useEffect(() => {
    if (data?.name) {
      dispatch(addBins([...bins, data]));
      setForm({ name: "", fill_level: "", zone: "", address: "" });
    }
  }, [loading]);
  console.log(bins);

  return (
    <article>
      <ToastContainer />
      <main className="w-100">
        <div className={styles.tableTitle}>
          <div className="">{"name"}</div>
          <div className="">{"address"}</div>
          <div className="">{"zone"}</div>
          <div className="">{"fill level"}</div>
          <div className="">action</div>
        </div>
        {bins?.map(({ id, name, address, zone, fill_level }, idx: number) => {
          const bin_id = id;
          const props = { bin_id, name, address, zone, fill_level, bins };
          if (idx < currentPage * 4 && idx > currentPage * 4 - 5) {
            return <Bin key={id} {...props} />;
          }
          return null;
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
        <div className={styles.title}>Add Bin</div>
        <section className={styles.form}>
          {inputs.map(({ name, placeholder, type, icon }, idx) => {
            const props = { name, placeholder, type, icon };
            if (placeholder === "Address") {
              return (
                <Address
                  label={name}
                  key={idx}
                  loading={loading}
                  data={data}
                  setForm={setForm}
                  form={form}
                  {...props}
                />
              );
            }
            return (
              <NormalInputLog
                value={form[name]}
                key={idx}
                onChange={(e: any) => onChange(e, name, type)}
                setForm={setForm}
                form={form}
                loading={loading}
                data={data}
                {...props}
              />
            );
          })}
        </section>

        <div className={styles.btns}>
          <SecondaryButton loading={loading} className="" title="submit" />
          <SecondaryButton className="bg-white text-success" title="Optimise" />
        </div>
      </form>
    </article>
  );
}

const Bin = ({
  bin_id,
  name,
  address,
  zone,
  fill_level,
  bins,
}: { bins: bin[]; bin_id?: string | number } & bin) => {
  const { data, deleteItem } = useDelete();
  const { modify, loading, modifyData } = usePut();
  const router = useNavigate();
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [form, setForm] = useState({
    name,
    address,
    fill_level,
    zone,
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
      url: `bins/${bin_id}/`,
      form,
      data: bins,
    });
  };

  const deleteZone = () => {
    deleteItem({
      url: `bins/${bin_id}/delete/`,
      id: bin_id,
      data: bins,
    });
  };

  useEffect(() => {
    if (data.length > 0) {
      dispatch(addBins(data));
    }
  }, [data]);

  useEffect(() => {
    if (loading === "success") {
      setOpenEditModal(false);
      dispatch(addBins(modifyData));

      router(`/`);
    }
  }, [loading]);

  useEffect(() => {
    if (!openEditModal && !openDeleteModal) {
      router(`/`);
    }
  }, [openEditModal, openDeleteModal]);

  const props = {
    openEditModal,
    setOpenEditModal,
    closeEditModal,
    openDeleteModal,
    setOpenDeleteModal,
    name,
    loading,
    form,
    setForm,
    onChange,
    deleteZone,
  };

  return (
    <div key={name} className={styles.table}>
      <EditBinDialog {...props} />
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

      <div className="">{name}</div>
      <div className="">{address}</div>
      <div className="">{zone}</div>
      <div className="mx-auto">{fill_level || "-"}</div>
      <div className={styles.tableIcons}>
        <EditIcon
          onClick={() => {
            router(`?modify=${name?.split(" ").join("-")}_${uid}`);
            setOpenEditModal(true);
          }}
          className={styles.tableIcon}
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
