import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import styles from "./index.module.scss";
import { input } from "@/utils/types";
import { EyeIcon } from "@/components/icons/eye";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { PostionIcon } from "@/components/icons/position";
import {
  Autocomplete,
  LoadScript,
  LoadScriptNext,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import axios from "axios";
import ReactGoogleAutocomplete, {
  usePlacesWidget,
} from "react-google-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
const libraries: any = ["places"];

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
      //variable to store the result
      const place = searchResult.getPlace();
      //variable to store the name from place details result
      const name = place.name;
      //variable to store the status from place details result
      const status = place.business_status;
      //variable to store the formatted address from place details result
      const formattedAddress = place.formatted_address;
      // console.log(place);
      //console log all results
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
    <LoadScriptNext
      libraries={libraries}
      googleMapsApiKey={process.env.REACT_APP_MAP_KEY || ""}
    >
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
    </LoadScriptNext>
  );
}
