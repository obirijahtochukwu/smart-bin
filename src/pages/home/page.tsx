import SideBar from "../../components/layout/sidebar";
import styles from "./page.module.scss";
import ManageStopsModal from "../../components/modals/manage-stops";
import { useEffect, useState, useCallback } from "react";
import ProfileModal from "../../components/modals/profile";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  MarkerF,
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
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState<any | undefined>({});
  const { fetchedData, isLoading, fetch } = useGet("current-location/");

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  useEffect(() => {
    if (markers.length > 0) {
      const center = markers.reduce(
        (prev: any, marker: marker) => {
          const acc = { ...prev };
          acc.lat += +marker.lat;
          acc.lng += +marker.lng;
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
    return () => {
      fetch();
    };
  }, []);
  const emptyArray: any = [];
  const vehicleLocation = [...emptyArray, fetchedData || {}]?.map(
    ({ latitude, longitude }) => {
      return { lat: latitude, lng: longitude };
    }
  );
  const [directions, setDirections] = useState<any>({});
  console.log(vehicleLocation);
  console.log(
    markers?.map(({ lat, lng }: marker) => {
      return { location: { lat, lng } };
    })
  );

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    console.log(vehicleLocation);
    if (vehicleLocation.length > 0) {
      const origin = vehicleLocation[0]; // Your origin coordinates
      const destination = { lat: 41.878113, lng: -87.629799 }; // Your destination coordinates
      const waypoints = markers?.map(({ lat, lng }: marker) => {
        return { location: { lat, lng } };
      });
      directionsService.route(
        {
          origin: origin,
          destination: origin,
          waypoints: waypoints,
          optimizeWaypoints: true, // Adjust the order of waypoints to minimize travel time
          //@ts-ignore
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            console.log(status);
          } else {
            console.error("Error fetching directions:", result);
          }
        }
      );
    }
  }, [vehicleLocation]);

  return (
    <div className="App">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onClick={addMarker}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers?.map(({ lat, lng, fill_level }: marker, idx: number) => (
          <MarkerF
            icon={"/media/logo/trash.svg"}
            position={{ lat, lng }}
          ></MarkerF>
        ))}

        <MarkerF
          icon={"/media/images/home/truck.svg"}
          position={vehicleLocation[0]}
        ></MarkerF>
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "#EF4712",
            },
            suppressMarkers: true,
          }}
        />
      </GoogleMap>
    </div>
  );
};
