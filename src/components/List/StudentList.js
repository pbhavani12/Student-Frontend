import React, { useState, useEffect } from "react";
import "./StudentList.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const StudentList = () => {
  const [students, setStudents] = useState([]);
   const { isAuthenticated } = useAuth();
   const nav = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8082/admin/allstudents");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  useEffect(() => {
    if (!isAuthenticated) {
      nav("/login");
    }
  }, [isAuthenticated, nav]);

  return (
    <div className="student-list-container">
      <h2>Student List</h2>
      <table className="student-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
