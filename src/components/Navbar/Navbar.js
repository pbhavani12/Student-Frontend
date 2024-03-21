import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faEnvelope,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"; // Importing the additional icons
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faHome} /> {/* Home icon */}
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/addstudent" className="nav-link">
            Add Student
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/studentlist" className="nav-link">
            Student List
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/updatestudent" className="nav-link">
            Update Student
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/deletestudent" className="nav-link">
            Delete Student
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/viewstudentbyid" className="nav-link">
            View Student by ID
          </Link>
        </li>
        {/* New navigation items */}
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            <FontAwesomeIcon icon={faInfoCircle} /> {/* About icon */}
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            <FontAwesomeIcon icon={faEnvelope} /> {/* Contact icon */}
            Contact
          </Link>
        </li>
        
        
      </ul>
    </nav>
  );
};

export default Navbar;
