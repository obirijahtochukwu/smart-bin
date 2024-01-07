import React, { useLayoutEffect, useState } from "react";
import styles from "./index.module.scss";
import { UserIcon } from "../../../components/icons/user";
import { LockIcon } from "../../../components/icons/lock";
import InputLog from "../../../components/ui/input/input";
import { input } from "../../../utils/types";
import Checkbox from "../../../components/ui/checkbox";
import Button from "../../../components/ui/button";
import axios from "axios";
import { addUserAuth } from "../../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/ReactToastify.css";
import { getStore, useSignup } from "../../../utils/functions";
import { useDispatch } from "react-redux";
export default function SignupDialog() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<string | any>({});
  const [success, setSuccess] = useState(false);
  const { loading, signup } = useSignup();

  const inputs: input[] = [
    {
      name: "Full name",
      placeholder: "Enter your Full name",
      type: "text",
      objectKey: "full_name",
      icon: <UserIcon className="" />,
    },
    {
      name: "Username",
      placeholder: "Enter your username",
      type: "text",
      objectKey: "username",
      icon: <UserIcon className="" />,
    },
    {
      name: "Email",
      placeholder: "Enter your email",
      type: "email",
      objectKey: "email",
      icon: <UserIcon className="" />,
    },
    {
      name: "password",
      placeholder: "Enter your password",
      type: "password",
      objectKey: "password",
      icon: <LockIcon className="" />,
    },
  ];

  const token = getStore("auth");

  // useLayoutEffect(() => {
  //   if (token?.email) {
  //     redirect("/");
  //     // window.location.href = "/";
  //   }
  // }, []);

  return (
    <div
      style={{ backgroundImage: "url('/media/images/login/background.svg')" }}
      className={styles.container}
    >
      <ToastContainer />
      <section
        style={{ width: "fit-content", zIndex: "1" }}
        className="position-relative"
      >
        <img
          src="/media/images/login/truck.svg"
          alt={""}
          className={styles.truck}
        />

        <img
          src="/media/images/login/earth.svg"
          alt={""}
          className={styles.earth}
        />
        <img
          src="/media/images/login/zigzag.svg"
          alt={""}
          className={styles.zigzag}
        />
        <form onSubmit={(e) => signup(form, e)} className={styles.main}>
          <div className="d-flex justify-content-center">
            <img src="/media/logo/logo.svg" alt={""} className={styles.logo} />
          </div>
          <div className={styles.title}>Create new account</div>
          <div className={styles.desc}>Welcome to smartbin</div>
          <section className={styles.inputs}>
            {inputs.map(({ name, placeholder, type, icon, objectKey }, idx) => {
              const props = {
                name,
                placeholder,
                type,
                icon,
                objectKey,
                loading,
              };
              return (
                <InputLog
                  key={idx}
                  {...props}
                  value={form[objectKey]}
                  onChange={(e: any) =>
                    setForm({ ...form, [objectKey]: e.target.value })
                  }
                />
              );
            })}
          </section>
          <div className={styles.text}>Forgot Password?</div>
          <Checkbox props={"Remember me"} />
          <Button
            type={"submit"}
            onClick={() => console.log("")}
            title="Signup"
            loading={loading}
          />
        </form>
      </section>
    </div>
  );
}
