import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import styles from "./index.module.scss";
import { Autocomplete } from "@react-google-maps/api";

export default function Address({
  form,
  label,
  setForm,
  loading,
  data,
}: {
  form: any;
  label: string;
  setForm: React.Dispatch<any>;
  loading: boolean;
  data: any;
}) {
  const [searchResult, setSearchResult] = useState<string | any>("");
  const [location, setLocation] = useState(form?.address || "");

  function onLoad(autocomplete: any) {
    setSearchResult(autocomplete);
  }
  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
      setForm({ ...form, [label]: formattedAddress });
      setLocation(name);
    } else {
      alert("Please enter text");
    }
  }

  useEffect(() => {
    if (data?.name) {
      setLocation("");
    }
  }, [loading]);

  return (
    <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
      <div className={styles.container}>
        <input
          required
          disabled={loading}
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder={"Enter address"}
        />
      </div>
    </Autocomplete>
  );
}
