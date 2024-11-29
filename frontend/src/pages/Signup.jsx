import React from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { Link } from "react-router-dom";
const Signup = () => {
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
        <form className="sign-form" autoComplete="off">
          <Input
            type={"text"}
            label={"Name"}
            placeholder={"Huzaifa salah"}
            id={"name"}
          />
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
          <p>By continuing, you agree to <Link>terms of service</Link> </p>
          <input className="main-btn w-100" type="submit" value="Sign up" />
        </form>
        <div className="or"></div>
        <button className="main-btn sign-with-google">
          <img src={assets.google_logo} alt="" />
          Continue With Google
        </button>
        <p className="text-center">Already have an account? <Link to="/account/login">Sign in</Link> </p>
      </Container>
    </motion.div>
  );
};

export default Signup;
