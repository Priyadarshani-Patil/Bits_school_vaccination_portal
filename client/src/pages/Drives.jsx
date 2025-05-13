import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Drives = () => {
  const [drives, setDrives] = useState([]);
  const [form, setForm] = useState({ date: '', location: '', targetGroup: '', vaccinationName: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ date: '', location: '', targetGroup: '', vaccinationName: '' });

  const fetchDrives = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/drives', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDrives(res.data);
    } catch (err) {
      console.error('Error fetching drives:', err);
    }
  };

  const addDrive = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/drives', form, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      fetchDrives();
    } catch (err) {
      console.error('Error adding drive:', err);
    }
  };

  const deleteDrive = async id => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/drives/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDrives();
    } catch (err) {
      console.error('Error deleting drive:', err);
    }
  };

  const startEdit = (drive) => {
    setEditingId(drive._id);
    setEditForm({ date: drive.date, location: drive.location, targetGroup: drive.targetGroup, vaccinationName: drive.vaccinationName });
  };

  const saveEdit = async id => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/drives/${id}`, editForm, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      setEditingId(null);
      fetchDrives();
    } catch (err) {
      console.error('Error updating drive:', err);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  return (
    <div>
      <h2>Vaccination Drive Management</h2>
      <form onSubmit={addDrive}>
        <input type="date" name="date" onChange={e => setForm({ ...form, date: e.target.value })} />
        <input name="location" placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
        <input name="targetGroup" placeholder="Target Group" onChange={e => setForm({ ...form, targetGroup: e.target.value })} />
        <input name="vaccinationName" placeholder="Vaccination Name" onChange={e => setForm({ ...form, vaccinationName: e.target.value })} />
        <button type="submit">Add Drive</button>
      </form>

      <h3>All Drives</h3>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Target Group</th>
            <th>Vaccination Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(drives) && drives.map(d => (
            <tr key={d._id}>
              <td>
                {editingId === d._id ? (
                  <input type="date" value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })} />
                ) : (
                  d.date
                )}
              </td>
              <td>
                {editingId === d._id ? (
                  <input value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} />
                ) : (
                  d.location
                )}
              </td>
              <td>
                {editingId === d._id ? (
                  <input value={editForm.targetGroup} onChange={e => setEditForm({ ...editForm, targetGroup: e.target.value })} />
                ) : (
                  d.targetGroup
                )}
              </td>
              <td>
                {editingId === d._id ? (
                  <input value={editForm.vaccinationName} onChange={e => setEditForm({ ...editForm, vaccinationName: e.target.value })} />
                ) : (
                  d.vaccinationName
                )}
              </td>
              <td>
                {editingId === d._id ? (
                  <>
                    <button onClick={() => saveEdit(d._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(d)}>Edit</button>
                    <button onClick={() => deleteDrive(d._id)}>Delete</button>
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

export default Drives;