import React, { useState, useEffect } from "react";
import "./UpdateStudent.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";



const UpdateStudent = () => {
  const [studentId, setStudentId] = useState("");
  const [updatedStudent, setUpdatedStudent] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    grade: "",
  });
  const nav = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const handleChange = async (e) => {
    const { value } = e.target;
    setStudentId(value);

    try {
      const response = await fetch(
        `https://backend-4vwz.onrender.com/admin/studentsbyid/${value}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUpdatedStudent(data);
    } catch (error) {
      console.error("Error fetching student details:", error);
      setUpdatedStudent({
        name: "",
        email: "",
        age: "",
        gender: "",
        grade: "",
      });
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      nav("/login");
    }
  }, [isAuthenticated, nav]);

const handleSubmit = (e) => {
  e.preventDefault();

  fetch(`https://backend-4vwz.onrender.com/admin/studentsbyid/${value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStudent),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Student updated successfully:", data);
      // Reset form
      setStudentId("");
      setUpdatedStudent({
        name: "",
        email: "",
        age: "",
        gender: "",
        grade: "",
      });
      nav("/studentlist"); // Navigate to student list using the navigation hook
    })
    .catch((error) => {
      console.error("Error updating student:", error);
    });
};

  return (
    <div className="update-student-container">
      <h2>Update Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID</label>
          <input
            type="number"
            value={studentId}
            onChange={handleChange}
            placeholder="Enter the Student ID"
            required
          />
        </div>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={updatedStudent.name}
            onChange={(e) =>
              setUpdatedStudent((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            placeholder="Enter the Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={updatedStudent.email}
            onChange={(e) =>
              setUpdatedStudent((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            placeholder="Enter the Email"
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={updatedStudent.age}
            onChange={(e) =>
              setUpdatedStudent((prevState) => ({
                ...prevState,
                age: e.target.value,
              }))
            }
            placeholder="Enter the Age"
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={updatedStudent.gender}
            onChange={(e) =>
              setUpdatedStudent((prevState) => ({
                ...prevState,
                gender: e.target.value,
              }))
            }
            placeholder="Enter the Gender"
            required
          />
        </div>
        <div className="form-group">
          <label>Grade</label>
          <input
            type="text"
            name="grade"
            value={updatedStudent.grade}
            onChange={(e) =>
              setUpdatedStudent((prevState) => ({
                ...prevState,
                grade: e.target.value,
              }))
            }
            placeholder="Enter the Grade"
            required
          />
        </div>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
