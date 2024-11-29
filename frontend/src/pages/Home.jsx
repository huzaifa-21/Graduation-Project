import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"
const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {

    gsap.from(".hero", {
      opacity: 0,
      x: -50,
      y: -30,
      duration: 1.5,
      ease: "power4.out",
    });

    // Animate each feature with a stagger effect
    gsap.from(".feature", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      stagger: 0.3, // Delay between animations
      ease: "back.out(1.7)", // Adds a spring effect
    });

    // Animate the button in the hero section
    gsap.from(".main-btn", {
      scale: 0,
      duration: 1.5,
      delay: 1, // Delay to match the hero animation
      ease: "elastic.out(1, 0.3)", // Bounce effect
    });
  }, []);

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1,  }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="hero">
        <h1>
          Take Control of Your Family Budget With <span>FinFam</span>
        </h1>
        <p>
          Track your spending, save for the future, and achieve financial
          stability.
        </p>
        <button className="main-btn" onClick={() => navigate("/account/login")}>
          Get Started
        </button>
      </header>
      <section className="features">
        <div className="feature">
          <img src={assets.track_img} alt="Track" />
          <h3>Track Expenses</h3>
          <p>Monitor where your money goes.</p>
        </div>
        <div className="feature">
          <img src={assets.save_img} alt="Save" />
          <h3>Save More</h3>
          <p>Set savings goals and stick to them.</p>
        </div>
        <div className="feature">
          <img src={assets.analyze_img} alt="Analyze" />
          <h3>Analyze Trends</h3>
          <p>Gain insights into your financial habits.</p>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
