
function NoteList({ notes, updateNote, deleteNote, restoreNote }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map(note => (
        <div key={note.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{note.title}</h2>
          <p className="text-sm text-gray-700 mb-2">{note.description}</p>
          <div className="text-xs text-gray-500 mb-2">Tags: {note.tags.join(', ')}</div>
          <div className="space-x-2">
            <button onClick={() => updateNote(note.id, { pinned: !note.pinned })} className="text-blue-500">{note.pinned ? 'Unpin' : 'Pin'}</button>
            <button onClick={() => updateNote(note.id, { archived: !note.archived })} className="text-yellow-500">{note.archived ? 'Unarchive' : 'Archive'}</button>
            {note.trashed ? (
              <button onClick={() => restoreNote(note.id)} className="text-green-500">Restore</button>
            ) : (
              <button onClick={() => deleteNote(note.id)} className="text-red-500">Trash</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
