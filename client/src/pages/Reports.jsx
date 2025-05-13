import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [students, setStudents] = useState([]);
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/reports', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(res.data.students);
        setDrives(res.data.drives);
      } catch (err) {
        console.error('Error fetching report:', err);
      }
    };
    fetchReport();
  }, []);

  const downloadCSV = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/reports/download', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'student_report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading report:', err);
    }
  };

  return (
    <div>
      <h2>Reports</h2>
      <button onClick={downloadCSV}>Download Student CSV</button>

      <h3>Students</h3>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Vaccination Status</th>
            <th>Vaccination Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.grade}</td>
              <td>{s.status ? 'Yes' : 'No'}</td>
              <td>{s.status ? (s.vaccinationName || 'N/A') : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Vaccination Drives</h3>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Vaccination Name</th>
          </tr>
        </thead>
        <tbody>
          {drives.map(d => (
            <tr key={d._id}>
              <td>{new Date(d.date).toLocaleDateString()}</td>
              <td>{d.location}</td>
              <td>{d.vaccinationName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
