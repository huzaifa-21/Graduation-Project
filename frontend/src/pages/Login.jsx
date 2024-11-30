import React from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
        <form
          className="login-form"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault()
            navigate("/dashboard");
          }}
          
        >
          <Input
            type={"email"}
            label={"Email Address"}
            placeholder={"hello@example.com"}
            id={"email"}
          />
          <Input
            type={"password"}
            label={"Password"}
            placeholder={"strong password"}
            id={"password"}
          />
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
