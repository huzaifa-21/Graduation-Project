import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm.js";
import { validateLogin } from "../utils/validate.js";
import { updateUser } from "../context/slices/userSlice.jsx";
import { useDispatch } from "react-redux";
import axios from "axios";
import { config } from "../config/config.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, errors, handleOnChange, resetForm } = useForm(
    { email: "", password: "" },
    {
      email: "email is required",
      password: "password is required",
    },
    validateLogin
  );
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const hasError = Object.values(errors).some((error) => error !== null);

    if (hasError) {
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_URL}users/login`, {
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;

      if (data.success) {
        localStorage.setItem("accessToken", data.token);
        dispatch(updateUser(data.data));
        navigate("/dashboard");
        location.reload();
      }
      
    } catch (error) {
      toast.error(error.response.data.message)
      return 
    }

    resetForm();
  };

  return (
    <motion.div
      className="login"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <img src={assets.letter_logo} alt="" />
        <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="input-holder">
            <label htmlFor="email" className="input-label">
              Eamil
            </label>
            <div>
              <input
                type="email"
                placeholder="hello@example.com"
                id="email"
                name="email"
                className="main-input"
                value={formData.email}
                onChange={handleOnChange}
              />
              {isSubmit && errors.email && (
                <span className="not-valid">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="input-holder">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div>
              <input
                type="password"
                placeholder="Passwrod"
                id="password"
                name="password"
                className="main-input"
                value={formData.password}
                onChange={handleOnChange}
              />
              {isSubmit && errors.password && (
                <span className="not-valid">{errors.password}</span>
              )}
            </div>
          </div>
          <input className="main-btn" type="submit" value="Login" />
        </form>
        <div className="or"></div>
        <button className="main-btn sign-with-google">
          <img src={assets.google_logo} alt="" />
          Continue With Google
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/account/signup">Create account</Link>
        </p>
      </Container>
    </motion.div>
  );
};

export default Login;
