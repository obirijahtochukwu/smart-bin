import SideBar from "../../components/layout/sidebar";
import styles from "./page.module.scss";
import ManageStopsModal from "../../components/modals/manage-stops";
import { useEffect, useState, useCallback } from "react";
import ProfileModal from "../../components/modals/profile";
import {
  GoogleMap,
  Marker,
  OverlayView,
  OverlayViewF,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { getStore, useGet } from "../../utils/functions";
import { useLayoutEffect } from "react";
import { addBins, addUserAuth, addZones, getBins } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { BucketIcon } from "../../components/icons/bucket";
import { marker } from "../../utils/types";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, bins, markers } = useSelector((state: any) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [hide, setHide] = useState(false);

  const { fetch, fetchedData, isLoading } = useGet("zones/");
  const token = getStore("auth");
  const getbins = useGet("getbins/");
  const bin_list = useGet("bins/");

  useLayoutEffect(() => {
    if (!token?.email) {
      navigate("/login");
    }
    dispatch(addUserAuth(token));
    fetch();
    getbins.fetch();
    bin_list.fetch();
  }, []);

  useLayoutEffect(() => {
    dispatch(addBins(bin_list.fetchedData));
    dispatch(addZones(fetchedData));
    dispatch(getBins(getbins.fetchedData));
    console.log(getbins.fetchedData);
  }, [isLoading, bin_list.isLoading, getbins.isLoading]);

  const props = {
    openModal,
    setOpenModal,
    openProfileModal,
    setOpenProfileModal,
    hide,
    setHide,
    user: auth,
    bins,
    getBins: getbins.fetchedData,
  };

  console.log(markers);

  return (
    <main className={`${styles.container} ${hide ? styles.hide : ""}`}>
      <SideBar {...props} />
      <div className={styles.image}>
        {" "}
        <App markers={markers} />
      </div>

      <ManageStopsModal {...props} />
      <ProfileModal {...props} />
    </main>
  );
};

const libraries = ["places"];

const App = ({ markers }: { markers: marker[] | any }) => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_REACT_APP_MAP_KEY || "",
    // @ts-ignore
    libraries,
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState<any | undefined>({});

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  useEffect(() => {
    if (markers.length > 0) {
      const center = markers.reduce(
        (prev: any, marker: marker) => {
          const acc = { ...prev };
          acc.lat += marker.lat;
          acc.lng += marker.lng;
          return acc;
        }
        // { lat: 0, lng: 0 }
      );
      const newCenter: any = { ...center };
      newCenter.lat /= markers.length;
      newCenter.lng /= markers.length;

      setCenter(newCenter);
      console.log(typeof center);
    }
    //  setmarkers(markers);}
  }, [markers]);

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }: marker) => bounds.extend({ lat, lng }));
    map?.fitBounds(bounds);

    setMap(map);
  }, []);
  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const [markerLocations, setMarkerLocations] = useState<marker[]>([]);

  useEffect(() => {
    // @ts-ignore
    window.addEventListener("load", onload);
  }, [markers]);

  const addMarker = (event: any) => {
    const newMarkerLocations = [...markerLocations, event.latLng.toJSON()];
    setMarkerLocations(newMarkerLocations);
  };

  useEffect(() => {
    console.log(markers);
  }, [markers]);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onClick={addMarker}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {markers?.map(({ lat, lng, fill_level }: marker, idx: number) => (
            <Marker icon={"/media/logo/trash.svg"} position={{ lat, lng }}>
              <OverlayViewF
                key={idx}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                position={{ lat, lng }}
              >
                <div className="position-relative">
                  <BucketIcon />
                  <div className={styles.fill_level}>{fill_level}</div>
                </div>
              </OverlayViewF>
            </Marker>
          ))}

          {/* <Marker icon={"/media/logo/trash.svg"} position={{ lat, lng }}> */}

          {markers.length > 0 && (
            <Polyline
              path={markers}
              options={{
                strokeColor: "#EF4712",
                strokeOpacity: 1.0,
                strokeWeight: 5,
              }}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
};
