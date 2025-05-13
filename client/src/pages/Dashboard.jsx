import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [vaccinatedCount, setVaccinatedCount] = useState(0);
  const [notVaccinatedCount, setNotVaccinatedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/students', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(res.data);

        const vaccinated = res.data.filter(student => student.status === true).length;
        const notVaccinated = res.data.filter(student => student.status === false).length;

        setVaccinatedCount(vaccinated);
        setNotVaccinatedCount(notVaccinated);
        setTotalCount(res.data.length);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="page-title">Dashboard Overview</h2>
      <h3 className="welcome-text">Welcome to School Vaccination Portal</h3>

      <div className="summary-box">
        <h3>Summary</h3>
        <p>Total Students: <strong>{totalCount}</strong></p>
        <p>Vaccinated Students: <strong>{vaccinatedCount}</strong></p>
        <p>Not Vaccinated Students: <strong>{notVaccinatedCount}</strong></p>
      </div>

      <h3 className="section-title">Student Details</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Status</th>
            <th>Vaccination Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.grade}</td>
              <td>{s.status ? 'Vaccinated' : 'Not Vaccinated'}</td>
              <td>{s.vaccinationName || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
