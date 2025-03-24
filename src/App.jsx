import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  // Fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Add a new note
  const addNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`, newNote);
      setNotes([...notes, response.data]);
      setNewNote({ title: '', content: '' }); // Reset form
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Delete a note by id
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Use useEffect to fetch notes when the app loads
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <h1>Note Taker</h1>
      {/* Your JSX code */}
    </div>
  );
}

export default App;
