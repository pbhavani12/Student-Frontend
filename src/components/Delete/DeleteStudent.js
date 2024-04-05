import React, { useState, useEffect } from "react";
import "./DeleteStudent.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const DeleteStudent = () => {
  const [studentId, setStudentId] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [studentNotFound, setStudentNotFound] = useState(false);
  const nav = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    // Fetch student details when studentId changes
    if (studentId !== "") {
      fetch(`https://backend-4vwz.onrender.com/admin/studentsbyid/${studentId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Student not found");
          }
          return response.json();
        })
        .then((data) => {
          setStudentDetails(data);
          // Reset success message
          setDeleteSuccess(false);
          // Reset student not found message
          setStudentNotFound(false);
        })
        .catch((error) => {
          console.error("Error fetching student details:", error);
          // Set student not found message
          setStudentNotFound(true);
          // Reset student details
          setStudentDetails(null);
        });
    }

    // Cleanup function to reset delete success message
    return () => {
      setDeleteSuccess(false);
    };
  }, [studentId]);

  useEffect(() => {
    if (!isAuthenticated) {
      nav("/login");
    }
  }, [isAuthenticated, nav]);

  const handleChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8082/admin/deletestudents/${studentId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Student deleted successfully");
        setDeleteSuccess(true);
        // Reset student details after deletion
        setStudentDetails(null);
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  return (
    <div className="delete-student-container">
      <h2>Delete Student</h2>
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
        {studentDetails && (
          <div>
            <h3>Student Details</h3>
            <p>Name: {studentDetails.name}</p>
            <p>Email: {studentDetails.email}</p>
            <p>Age: {studentDetails.age}</p>
            <p>Gender: {studentDetails.gender}</p>
            <p>Grade: {studentDetails.grade}</p>
          </div>
        )}

        <button type="submit">Delete Student</button>
        {deleteSuccess && (
          <p className="success-message">Student successfully deleted</p>
        )}
        {studentNotFound && (
          <p className="error-message">Student with this ID is not found</p>
        )}
      </form>
    </div>
  );
};

export default DeleteStudent;
