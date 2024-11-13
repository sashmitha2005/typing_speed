import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminPage.css'; // Ensure this is imported to apply the CSS

const AdminPage = () => {
  const [text, setText] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [paragraphs, setParagraphs] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch paragraphs from the server
  const fetchParagraphs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/paragraphs/all');
      setParagraphs(response.data);
    } catch (error) {
      console.error('Error fetching paragraphs:', error);
    }
  };

  // Use effect to fetch paragraphs on component mount
  useEffect(() => {
    fetchParagraphs();
  }, []);

  // Handle form submission for adding/updating paragraphs
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/paragraphs/${editId}`, { text, difficulty });
        toast.success('Paragraph updated successfully!');
      } else {
        await axios.post('http://localhost:5000/paragraphs', { text, difficulty });
        toast.success('Paragraph added successfully!');
      }
      setText('');
      setDifficulty('');
      setEditId(null);
      fetchParagraphs();
    } catch (error) {
      console.error('Error adding/updating paragraph:', error.response ? error.response.data : error.message);
      toast.error('Failed to add/update paragraph');
    }
  };

  // Handle paragraph edit
  const handleEdit = (paragraph) => {
    setText(paragraph.text);
    setDifficulty(paragraph.difficulty);
    setEditId(paragraph._id);
  };

  // Handle paragraph deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/paragraphs/${id}`);
      toast.success('Paragraph deleted successfully!');
      fetchParagraphs();
    } catch (error) {
      console.error('Error deleting paragraph:', error);
      toast.error('Failed to delete paragraph');
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2>Admin Page</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Text</label>
            <input
              type="text"
              className="form-control"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="difficulty" className="form-label">Difficulty</label>
            <select
              className="form-control"
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block">{editId ? 'Update' : 'Submit'}</button>
        </form>
        <div className="mt-5">
          <h3 className="text-center">Paragraphs</h3>
          <ul className="list-group">
            {paragraphs.map((paragraph) => (
              <li key={paragraph._id} className="list-group-item">
                <div>
                  <strong>{paragraph.text}</strong> ({paragraph.difficulty})
                </div>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(paragraph)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(paragraph._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminPage;
