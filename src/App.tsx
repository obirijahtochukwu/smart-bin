import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { HomePage, LoginPage, SignupPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
