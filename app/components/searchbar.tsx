import { useState } from "react";

function Searchbar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (query.trim() === "") return;
    console.log("Searching for:", query);
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center bg-white rounded-lg shadow overflow-hidden`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full px-3 py-2 text-sm text-blue-800 focus:outline-none"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-green-600 text-white text-sm hover:bg-green-700"
      >
        Go
      </button>
    </form>
  );
}

export default Searchbar;
