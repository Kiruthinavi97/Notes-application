
import { useState } from 'react';

function NoteForm({ addNote }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({ title, description, tags: tags.split(',').map(tag => tag.trim()), pinned: false, archived: false, trashed: false });
    setTitle('');
    setDescription('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full" required />
      <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}

export default NoteForm;
