
function SearchBar({ searchQuery, setSearchQuery, filterTag, setFilterTag }) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Filter by tag..."
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
        className="border p-2 w-full"
      />
    </div>
  );
}

export default SearchBar;
