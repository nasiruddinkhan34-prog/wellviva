export default function About() {
  return (
    <div className="bg-[#f7f6f2]">
      {/* HERO / ABOUT HEADER */}
      <section className="relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-70" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-green-800 mb-4">
              About Us
            </h1>
            <p className="text-lg text-green-700 italic mb-6">
              Nurturing Your Health, Naturally
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              <strong>Wellviva Organics</strong> – A Brand owned by{" "}
              <strong>Ziyt India Marketing Pvt. Ltd</strong>
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              At Wellviva Organics, we believe that true wellness begins with
              nature. Rooted in the timeless wisdom of Ayurveda and supported by
              modern science, we create high-quality wellness and personal care
              products that nurture health naturally and safely.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              From carefully sourced herbs to thoughtfully crafted
              formulations, every Wellviva product delivers visible results
              while respecting the body and the environment.
            </p>

            {/* PHILOSOPHY ICONS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              <div className="text-center">
                <div className="text-4xl mb-3">🌿</div>
                <h4 className="font-semibold text-green-800">
                  Pure Ingredients
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  Ethically sourced herbs & natural actives.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">🪷</div>
                <h4 className="font-semibold text-green-800">
                  Holistic Wellness
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  Mind, body & skin balance.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">✔️</div>
                <h4 className="font-semibold text-green-800">
                  Trust & Transparency
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  Quality you can rely on.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE COLLAGE */}
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-green-100 rounded-xl -z-10" />
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/about/bottle.webp"
                alt="Wellness"
                className="rounded-xl shadow-lg object-cover h-48 w-full"
              />
              <img
                src="/about/healthy.jpg"
                alt="Herbal"
                className="rounded-xl shadow-lg object-cover h-48 w-full mt-10"
              />
              <img
                src="/about/ayurvedic.webp"
                alt="Ayurveda"
                className="rounded-xl shadow-lg object-cover h-48 w-full col-span-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MORE THAN A BRAND */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif text-green-800 mb-6">
            More Than a Brand
          </h2>

          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
            Wellviva Organics is more than a wellness brand — it is a growing
            community of conscious consumers and entrepreneurs. Through our
            direct selling and affiliate model, we empower individuals to build
            sustainable income while promoting health-focused lifestyles.
          </p>

          <blockquote className="italic text-green-700 text-lg">
            “Harnessing the goodness of nature for a healthier you.”
          </blockquote>
        </div>
      </section>

      {/* OUR PROMISE */}
      <section className="bg-[#f7f6f2] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-green-800 text-center mb-10">
            Our Promise
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Nature-inspired formulations",
              "Scientifically balanced & Ayurvedic principles",
              "Ethical sourcing & responsible manufacturing",
              "Customer-first approach",
              "Opportunity-driven growth for partners",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-5 flex items-center gap-3"
              >
                <span className="text-green-700 text-xl">✔</span>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-12 text-green-800 font-semibold">
            Wellviva Organics — Live Well. Naturally.
          </p>
        </div>
      </section>
    </div>
  );
}
