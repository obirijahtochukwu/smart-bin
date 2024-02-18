import React from "react";
import styles from "./event.module.scss";

export default function Event() {
  const list = [
    "Issues boarding peace and unity of UMU-OBIRIJA kindred",
    "Guidelines and methods of allocating of our landed properties to quality individuals",
    `Security of our landed properties against "encroachment and government"`,
  ];

  const signs = [
    { title: "obirija bernard", name: "chairman" },
    { title: "nweke sunday", name: "P.R.O" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        You are cordially invited to this year{" "}
        <b className=" text-lowercase">easter general</b> return of{" "}
        <b>umu OBIRIJA </b>KINDRED.
      </div>

      <section>
        <div className={styles.agenda}>AGENDA</div>
        {list.map((item) => (
          <div
            style={{ paddingLeft: "20px" }}
            className="d-flex position-relative align-items-start mb-3"
          >
            <div
              style={{
                padding: "1x",
                borderRadius: "100%",
                height: "5px",
                width: "5px",
                left: "0px",
                top: "8px",
              }}
              className=" position-absolute left-0 bg-black rounded-100"
            ></div>
            <div style={{ fontFamily: "poppins" }} className="">
              {item}.
            </div>
          </div>
        ))}
      </section>
      <div className="">
        <div className={styles.agenda}>Date</div>
        {["Sunday, 31st march, 2024", "Monday 01st April, 2024"].map((item) => (
          <div
            style={{ paddingLeft: "20px" }}
            className="d-flex position-relative align-items-start mb-3"
          >
            <div
              style={{
                padding: "1x",
                height: "5px",
                width: "5px",
                left: "0px",
                top: "8px",
              }}
              className=" position-absolute left-0 bg-black rounded-100"
            ></div>
            <div
              style={{ fontFamily: "bitter", fontSize: "18px" }}
              className=""
            >
              {item}.
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <div style={{ textAlign: "center" }} className={styles.agenda}>
          AGENDA
        </div>
        <div className="d-flex justify-content-between pt-4 text-center">
          {signs.map(({ title, name }) => (
            <div style={{ width: "200px" }} className="">
              <div style={{ height: "1px" }} className="w-100 bg-black"></div>
              <div
                style={{ fontFamily: "poppins" }}
                className="mt-1 text-capitalize"
              >
                {title}
              </div>
              <div className=" text-muted text-capitalize">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
