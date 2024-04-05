import React, { useState, useEffect } from "react";
import "./AddStudent.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    grade: "",
  });
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const { isAuthenticated, login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://backend-4vwz.onrender.com/admin/allstudents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Student created successfully:", data);
        // Reset form
        setStudent({
          name: "",
          email: "",
          age: "",
          gender: "",
          grade: "",
        });
        navigate("/studentlist"); // Use navigate to go to student list page
      })
      .catch((error) => {
        console.error("Error creating student:", error);
      });
  };

  return (
    <div className="add-student-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Enter the Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            placeholder="Enter the Email"
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            placeholder="Enter the Age"
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={student.gender}
            onChange={handleChange}
            placeholder="Enter the Gender"
            required
          />
        </div>
        <div className="form-group">
          <label>Grade</label>
          <input
            type="text"
            name="grade"
            value={student.grade}
            onChange={handleChange}
            placeholder="Enter the Grade"
            required
          />
        </div>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
