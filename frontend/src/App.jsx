import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const location = useLocation()
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/signup" element={<Signup />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
export default App;
