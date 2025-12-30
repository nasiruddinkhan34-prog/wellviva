const categories = ["All", "Wellness", "Herbal", "Organic", "Supplements"];

export default function Categories({ selected, onSelect }) {
  return (
    <div className="flex overflow-x-auto gap-4 px-6 py-4 bg-white shadow-sm">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-lg ${
            selected === cat
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
