import {
  faAnglesRight,
  faBell,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { showDate } from "../utils/months";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../context/slices/userSlice";
const Navbar = () => {
  const { name } = useSelector((state) => state.user);
 
  return (
    <nav className="navbar">
      <Container>
        <h2>Hello {name}</h2>
        <span>
          <FontAwesomeIcon icon={faAnglesRight} /> {showDate(Date.now())}
        </span>
        <div className="notification-search">
          <div className="notification">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="search">
            <input type="text" name="search" id="" placeholder="Search here" />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
