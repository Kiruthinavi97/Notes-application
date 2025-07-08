
import { useEffect, useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
import { v4 as uuidv4 } from 'uuid';
import logo from './assets/logo.png';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([{ id: uuidv4(), ...note }, ...notes]);
  };

  const updateNote = (id, updated) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, ...updated } : note)));
  };

  const deleteNote = (id) => {
    updateNote(id, { trashed: true });
  };

  const restoreNote = (id) => {
    updateNote(id, { trashed: false });
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !filterTag || note.tags.includes(filterTag);
    return !note.trashed && matchesSearch && matchesTag;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-3 mb-4">
        <img src={logo} alt="Logo" className="w-14 h-14 " />
        <h1 className="text-3xl font-bold">Notes Application</h1>
        </div>    
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterTag={filterTag} setFilterTag={setFilterTag} />
      <NoteForm addNote={addNote} />
      <NoteList notes={filteredNotes} updateNote={updateNote} deleteNote={deleteNote} restoreNote={restoreNote} />
    </div>
  );
}

export default App;
