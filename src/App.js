import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import AddStudent from "./components/Add/AddStudent";
import DeleteStudent from "./components/Delete/DeleteStudent";
import UpdateStudent from "./components/Update/UpdateStudent";
import ViewStudentbyId from "./components/View/ViewStudentbyId";
import StudentList from "./components/List/StudentList";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import { AuthProvider } from "./components/AuthContext";
import Home2 from "./components/Home/Home2";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/deletestudent" element={<DeleteStudent />} />
          <Route path="/updatestudent" element={<UpdateStudent />} />
          <Route path="/viewstudentbyid" element={<ViewStudentbyId />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Home2" element={<Home2 />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
