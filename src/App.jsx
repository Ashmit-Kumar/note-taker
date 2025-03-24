import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  // Fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Add a new note
  const addNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/notes', newNote);
      setNotes([...notes, response.data]);
      setNewNote({ title: '', content: '' }); // Reset form
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Delete a note by id
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
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

      {/* Add a new note */}
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          required
        />
        <button type="submit">Add Note</button>
      </form>

      {/* Display all notes */}
      <div className="notes">
        {notes.map((note) => (
          <div key={note.id} className="note">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

