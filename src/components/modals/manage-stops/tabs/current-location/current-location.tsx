import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import NormalInputLog from "../../../../../components/ui/normal-input/input";
import SecondaryButton from "../../../../../components/ui/secondary-button";
import { Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { getStore, useGet } from "../../../../../utils/functions";
import { toast } from "react-toastify";

export default function CurrentLocationTab({ setOpenModal }: any) {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<string | any>("");
  const [location, setLocation] = useState("");

  const { fetchedData, isLoading, fetch } = useGet("current-location/");

  const onLoad = (autocomplete: any) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      setLocation(formattedAddress);
    } else {
      alert("Please enter text");
    }
  };

  const addLocation = (e: any) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL + "add-vehicle-location/"}`,
        { address: location },
        {
          headers: { Authorization: `Token ${getStore("auth").token}` },
        }
      )
      .then((res) => {
        setLocation("");
        toast.success("Vehicle location added🌍🚚.");
        setLoading(false);
      });
  };

  return (
    <article>
      <form onSubmit={addLocation} className="w-100">
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <input
            required
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            style={{ width: "100%" }}
            placeholder={"Enter address"}
          />
        </Autocomplete>

        <div className={styles.btns}>
          <SecondaryButton loading={loading} className="" title="submit" />
        </div>
      </form>
    </article>
  );
}
