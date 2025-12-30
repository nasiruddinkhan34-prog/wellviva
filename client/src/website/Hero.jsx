export default function Hero() {
  return (
    <section className="bg-cover bg-center h-64 text-white" style={{ backgroundImage: "url('https://placehold.co/1600x400/4ade80/ffffff?text=Welcome+to+Wellviva')" }}>
      <div className="bg-black bg-opacity-40 h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Healthy Products, Happy Life</h2>
          <p className="mt-2">Explore our wide range of natural products</p>
          <button className="mt-4 px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
