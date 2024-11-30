import { faAnglesRight, faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container } from "react-bootstrap";

const Navbar = () => {
  const date = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <nav className="navbar">
      <Container>
        <h2>Hello Huzaifa</h2>
        <span>
          <FontAwesomeIcon icon={faAnglesRight} /> {month[date.getMonth()]}{" "}
          {date.getDate()}, {date.getFullYear()}
        </span>
        <div className="notification-search">
          <div className="notification">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="search">
            <input
              type="text"
              name="search"
              id=""
              placeholder="Search here"
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
