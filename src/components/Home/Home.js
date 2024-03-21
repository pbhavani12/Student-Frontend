import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Importing the login and register icons
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Student Management System</h2>
      {/* Links to the login and register pages */}
      <div className="auth-links">
        <Link to="/login" className="auth-link">
          <FaSignInAlt /> Log In
        </Link>
        <Link to="/register" className="auth-link">
          <FaUserPlus /> Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
