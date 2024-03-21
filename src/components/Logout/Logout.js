// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// const Logout = () => {
//   const { isAuthenticated } = useAuth();
//   const nav = useNavigate();

//   useEffect(() => {
//     // Define a function to handle logout logic
//     const handleLogout = () => {
//       if (!isAuthenticated) {
//         nav("/"); // Redirect to login page if not authenticated
//       }
//     };

//     handleLogout(); // Call the logout handler

//     // Cleanup function (optional for useEffect)
//     return () => {
//       // Any cleanup code here (if needed)
//     };
//   }, [isAuthenticated, nav]);

//   // This component doesn't return anything directly related to rendering,
//   // so you might want to return null or something else here.
//   return null;
// };

// export default Logout;
