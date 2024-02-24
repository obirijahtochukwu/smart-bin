import SideBar from "../../components/layout/sidebar";
import styles from "./page.module.scss";
import ManageStopsModal from "../../components/modals/manage-stops";
import { useEffect, useState, useCallback } from "react";
import ProfileModal from "../../components/modals/profile";
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
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
import BucketIcon from "../../components/icons/bucket";
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
    // return () => {
    fetch();
    // };
  }, []);

  const emptyArray: any = [];
  const vehicleLocation = [...emptyArray, fetchedData || {}]?.map(
    ({ latitude, longitude }) => {
      return { lat: latitude, lng: longitude };
    }
  );
  const [directions, setDirections] = useState<any>({});

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
            console.log(result);

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
        // onClick={addMarker}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers?.map(({ lat, lng, fill_level }: marker, idx: number) => (
          <Marker
            icon={{
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(
                  `    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="64"
      viewBox="0 0 42 64"
      fill="none"
    >
      <path
        d="M36.5386 57.1111H5.625V59.4601H36.5386V57.1111Z"
        fill="#1D1D1B"
      />
      <path
        d="M7.06961 62.305C7.06961 62.9674 6.53032 63.5067 5.87158 63.5067C5.20922 63.5067 4.66992 62.971 4.66992 62.305V53.213C4.66992 52.5506 5.20922 52.0113 5.87158 52.0113C6.53394 52.0113 7.06961 52.5506 7.06961 53.213V62.305Z"
        fill="#4F514F"
      />
      <path
        d="M5.8681 52.0113C5.8681 52.0113 5.85001 52.0113 5.84277 52.0113V63.4994C5.84277 63.4994 5.86086 63.4994 5.8681 63.4994C6.53046 63.4994 7.06614 62.9637 7.06614 62.2978V53.2057C7.06614 52.5434 6.52684 52.0041 5.8681 52.0041V52.0113Z"
        fill="#2A2B2A"
      />
      <path
        d="M37.3352 62.305C37.3352 62.9674 36.7996 63.5067 36.1372 63.5067C35.4748 63.5067 34.9355 62.971 34.9355 62.305V53.213C34.9355 52.5506 35.4712 52.0113 36.1372 52.0113C36.7996 52.0113 37.3352 52.5506 37.3352 53.213V62.305Z"
        fill="#4F514F"
      />
      <path
        d="M35.9823 52.0294C35.3923 52.1054 34.9326 52.6013 34.9326 53.213V62.305C34.9326 62.9167 35.3923 63.4162 35.9823 63.4922V52.033V52.0294Z"
        fill="#2A2B2A"
      />
      <path
        d="M29.2337 0.912099C29.2337 0.912099 28.6256 0.0615305 27.29 0H14.7088C13.3733 0.0615305 12.7652 0.912099 12.7652 0.912099L9.97461 5.03826H32.0243L29.2337 0.912099Z"
        fill="#E41831"
      />
      <path
        d="M28.3075 1.37537C28.3075 1.37537 27.7682 0.622521 26.5847 0.56823H15.4151C14.2315 0.622521 13.6922 1.37537 13.6922 1.37537L11.2129 5.03824H30.7868L28.3075 1.37537Z"
        fill="#322507"
      />
      <path
        d="M1.0459 11.8971C1.72273 16.606 6.837 52.1055 7.75272 56.789C8.73359 61.8092 13.4606 61.6029 13.4606 61.6029H28.5392C28.5392 61.6029 33.2662 61.8092 34.2506 56.789C35.1664 52.1055 40.2806 16.606 40.9575 11.8971H1.04951H1.0459Z"
        fill="#EF2305"
      />
      <path
        d="M40.8199 12.8237C40.8778 12.4436 40.9213 12.1324 40.9538 11.8971H1.0459C1.07847 12.1324 1.12552 12.4436 1.17982 12.8237H40.8199Z"
        fill="#CC0402"
      />
      <path
        d="M22.1732 10.1851L40.8676 9.6096L37.8743 5.40019C37.8743 5.40019 37.1468 4.10443 35.7714 4.18768C34.7327 4.24921 26.198 4.21663 22.0972 4.19853V4.18768C22.0972 4.18768 21.6882 4.18768 21.0041 4.1913C20.32 4.1913 19.9111 4.18768 19.9111 4.18768V4.19853C15.8102 4.22025 7.27558 4.24921 6.2368 4.18768C4.86142 4.10443 4.13391 5.40019 4.13391 5.40019L1.14062 9.6096L19.835 10.1851V10.2575L21.0077 10.2213L22.1804 10.2575V10.1851H22.1732Z"
        fill="#E91312"
      />
      <path d="M42 8.92193H0V12.5631H42V8.92193Z" fill="#EF2305" />
      {/* <g style="mix-blend-mode:color-dodge">
        <path d="M42 8.92193H0V9.7725H42V8.92193Z" fill="#EC641C" />
      </g> */}
      <path d="M42 10.9452H0V12.5631H42V10.9452Z" fill="#E02B16" />
       <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="16">${fill_level}</text>
    </svg>`
                ),
              anchor: new window.google.maps.Point(15, 15),
            }}
            position={{ lat, lng }}
          >
            {/* <OverlayView
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            position={{ lat, lng }}
            // getPixelPositionOffset={(width, height) => ({
            //   x: width / 2,
            //   y: height / 2,
            // })}
          >
            <div className="position-relative">
              <BucketIcon />
              <div className={styles.fill_level}>{fill_level}</div>
            </div>
          </OverlayView> */}
          </Marker>
        ))}

        <Marker
          icon={{
            url: "/media/images/home/truck.svg",
            // scaledSize: new window.google.maps.Size(30, 30),
            anchor: new window.google.maps.Point(15, 15),
          }}
          position={vehicleLocation[0]}
        ></Marker>
        <DirectionsRenderer
          directions={directions}
          options={{
            // preserveViewport: true,
            polylineOptions: {
              strokeColor: "#EF4712",
            },
            suppressMarkers: true,
            markerOptions: {
              icon: {
                url: "/media/logo/trash.svg",
              },
            },
          }}
        />
      </GoogleMap>
    </div>
  );
};
