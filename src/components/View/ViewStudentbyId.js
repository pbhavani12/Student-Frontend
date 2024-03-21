import React, { useState, useEffect } from "react";
import "./ViewStudentbyId.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


const ViewStudentbyId = () => {
  const [id, setId] = useState(""); // State to store the entered ID
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (!id) return; // Don't fetch if ID is empty

    setLoading(true); // Set loading state to true when fetching data
    setError(null); // Reset error state
    setStudent(null); // Reset student state

    fetch(`http://localhost:8082/admin/studentsbyid/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setStudent(data);
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
        setError("Student with this Id is not found. Please try again."); // Set error state if there's an error
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after data fetching is complete
      });
  }, [id]);
  useEffect(() => {
    if (!isAuthenticated) {
      nav("/login");
    }
  }, [isAuthenticated, nav]);


  const handleInputChange = (event) => {
    setId(event.target.value); // Update the ID state when input changes
  };

  return (
    <div className="student-details">
      <h2>Enter Student ID:</h2>
      <input
        type="text"
        value={id}
        onChange={handleInputChange}
        placeholder="Enter student ID"
      />
      <h2>Student Details</h2>
      {loading && <p>Loading...</p>}{" "}
      {/* Display loading message if loading state is true */}
      {error && <p className="error">{error}</p>}{" "}
      {/* Display error message if error state is not null */}
      {student && (
        <div>
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Age:</strong> {student.age}
          </p>
          <p>
            <strong>Gender:</strong> {student.gender}
          </p>
          <p>
            <strong>Grade:</strong> {student.grade}
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewStudentbyId;
