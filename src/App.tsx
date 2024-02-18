import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { HomePage, LoginPage, SignupPage } from "./pages";
import { LoadScriptNext } from "@react-google-maps/api";
import Event from "./pages/event";
import { ToastContainer } from "react-toastify";

const libraries: any = ["places"];

function App() {
  return (
    <LoadScriptNext
      libraries={libraries}
      googleMapsApiKey={process.env.REACT_APP_REACT_APP_MAP_KEY || ""}
    >
      <>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event" element={<Event />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </>
    </LoadScriptNext>
  );
}

export default App;
