import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Make sure you have this file for CSS

const Students = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', grade: '', status: null, vaccinationName: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', grade: '', status: null, vaccinationName: '' });

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const addStudent = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/students', form, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      setForm({ name: '', grade: '', status: null, vaccinationName: '' });
      fetchStudents();
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  const deleteStudent = async id => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setEditForm({
      name: student.name,
      grade: student.grade,
      status: student.status,
      vaccinationName: student.vaccinationName || ''
    });
  };

  const saveEdit = async id => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/students/${id}`, editForm, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="students-container">
      <h2>Student Management</h2>
      <form className="student-form" onSubmit={addStudent}>
        <input
          className="input-field"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="input-field"
          name="grade"
          placeholder="Grade"
          value={form.grade}
          onChange={e => setForm({ ...form, grade: e.target.value })}
        />

        <div className="radio-group">
          <label>Vaccinated:</label><br />
          <label>
            <input
              type="radio"
              name="status"
              checked={form.status === true}
              onChange={() => setForm({ ...form, status: true })}
            /> Yes
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="status"
              checked={form.status === false}
              onChange={() => setForm({ ...form, status: false, vaccinationName: '' })}
            /> No
          </label>
        </div>

        {form.status === true && (
          <div className="vaccination-name">
            <label>Vaccination Name:</label><br />
            <input
              className="input-field"
              type="text"
              name="vaccinationName"
              placeholder="Enter vaccination name"
              value={form.vaccinationName}
              onChange={e => setForm({ ...form, vaccinationName: e.target.value })}
            />
          </div>
        )}

        <button className="submit-btn" type="submit">Add Student</button>
      </form>

      <h3>All Students</h3>
      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Status</th>
            <th>Vaccination Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>
                {editingId === s._id ? (
                  <input
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  />
                ) : (
                  s.name
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <input
                    value={editForm.grade}
                    onChange={e => setEditForm({ ...editForm, grade: e.target.value })}
                  />
                ) : (
                  s.grade
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <>
                    <label>
                      <input
                        type="radio"
                        name={`edit-status-${s._id}`}
                        checked={editForm.status === true}
                        onChange={() => setEditForm({ ...editForm, status: true })}
                      /> Yes
                    </label>
                    <label style={{ marginLeft: '1rem' }}>
                      <input
                        type="radio"
                        name={`edit-status-${s._id}`}
                        checked={editForm.status === false}
                        onChange={() => setEditForm({ ...editForm, status: false, vaccinationName: '' })}
                      /> No
                    </label>
                  </>
                ) : (
                  s.status ? 'Yes' : 'No'
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  editForm.status === true ? (
                    <input
                      value={editForm.vaccinationName}
                      onChange={e => setEditForm({ ...editForm, vaccinationName: e.target.value })}
                    />
                  ) : null
                ) : (
                  s.vaccinationName || 'N/A'
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <>
                    <button className="action-btn" onClick={() => saveEdit(s._id)}>Save</button>
                    <button className="action-btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="action-btn" onClick={() => startEdit(s)}>Edit</button>
                    <button className="action-btn" onClick={() => deleteStudent(s._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
