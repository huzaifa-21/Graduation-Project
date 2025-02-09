import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./context/slices/userSlice";
import { useEffect } from "react";
import Spinner from "./utils/Spinner";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  if (status == "loading") {
    return <Spinner />;
  }

  if (status === "succeeded")
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} />
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
