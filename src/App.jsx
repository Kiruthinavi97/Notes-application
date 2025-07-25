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
  const [showTrash, setShowTrash] = useState(false); // NEW

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

    return (showTrash ? note.trashed : !note.trashed) && matchesSearch && matchesTag;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-3 mb-4">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <h1 className="text-3xl font-bold">Notes App</h1>
      </div>

      {/* Trash Toggle Buttons */}
      <div className="mb-4 space-x-2">
        <button
          onClick={() => setShowTrash(false)}
          className={`px-4 py-2 rounded ${!showTrash ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Notes
        </button>
        <button
          onClick={() => setShowTrash(true)}
          className={`px-4 py-2 rounded ${showTrash ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Trash
        </button>
      </div>

      {!showTrash && (
        <>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterTag={filterTag}
            setFilterTag={setFilterTag}
          />
          <NoteForm addNote={addNote} />
        </>
      )}

      <NoteList
        notes={filteredNotes}
        updateNote={updateNote}
        deleteNote={deleteNote}
        restoreNote={restoreNote}
      />
    </div>
  );
}

export default App;
