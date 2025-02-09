import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin } from "../utils/validate";
import axios from "axios";
import { config } from "../config/config";
import { useDispatch } from "react-redux";
import { updateUser } from "../context/slices/userSlice";
const Signup = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const { resetForm, handleOnChange, errors, formData } = useForm(
    { name: "", email: "", password: "" },
    {
      name: "name is required",
      email: "email is required",
      password: "password is required",
    },
    validateSignin
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasError = Object.values(errors).some((error) => error !== null);
    if (hasError) {
      setIsSubmit(true);
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_URL}users/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      const data = response.data;
      console.log(data)
      if (data.success) {
        localStorage.setItem("accessToken", data.token);
        dispatch(updateUser(data.data));
        navigator("/dashboard");
      }
    } catch (error) {}
  };
  return (
    <motion.div
      className="signup"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <Container>
        <img src={assets.letter_logo} alt="" />
        <h5 className="create-head">Create an account</h5>
        <form className="sign-form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="input-holder">
            <label htmlFor="name" className="input-label">
              Name
            </label>
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Huzaifa Ali"
                className="main-input"
                onChange={handleOnChange}
                value={formData.name}
              />
              {isSubmit && errors.name && (
                <span className="not-valid">{errors.name}</span>
              )}
            </div>
          </div>
          <div className="input-holder">
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="hello@example.com"
                className="main-input"
                onChange={handleOnChange}
                value={formData.email}
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
                name="password"
                id="password"
                placeholder="strong password"
                className="main-input"
                onChange={handleOnChange}
                value={formData.password}
              />
              {isSubmit && errors.password && (
                <span className="not-valid">{errors.password}</span>
              )}
            </div>
          </div>

          <p>
            By continuing, you agree to <Link>terms of service</Link>{" "}
          </p>
          <input className="main-btn w-100" type="submit" value="Sign up" />
        </form>
        <div className="or"></div>
        <button className="main-btn sign-with-google">
          <img src={assets.google_logo} alt="" />
          Continue With Google
        </button>
        <p className="text-center">
          Already have an account? <Link to="/account/login">Sign in</Link>{" "}
        </p>
      </Container>
    </motion.div>
  );
};

export default Signup;
