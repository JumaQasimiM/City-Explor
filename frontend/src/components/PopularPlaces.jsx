import jaghoriImage from "../assets/hero.jpeg";

export const PopularPlaces = () => {
  return (
    <section className="w-full py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section title */}
        <h1 className="text-4xl font-milonga mb-14 text-slate-900 dark:text-white">
          Popular Places
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* FEATURED ARTICLE */}
          <div className="relative group lg:col-span-1">
            <div className="overflow-hidden">
              <img
                src={jaghoriImage}
                alt="Architecture Budapest"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl"></div>

            {/* Text overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
              <span className="text-xs tracking-widest uppercase text-green-400">
                Architecture
              </span>

              <h2 className="text-2xl font-semibold leading-snug">
                5 Stunning Buildings in the Center of Budapest
              </h2>

              <p className="text-sm text-white/80">
                July 01, 2024 · By Anna Windsor
              </p>
            </div>
          </div>

          {/* RIGHT ARTICLES */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2].map((item) => (
              <article key={item} className="group">
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={jaghoriImage}
                    alt="Jaghori Afghanistan"
                    className="w-full h-[240px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Text */}
                <div className="mt-5 space-y-3">
                  <span className="text-xs tracking-widest uppercase text-green-600">
                    Hotel · Jaghori
                  </span>

                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-snug">
                    Stunning Buildings in the Center of Budapest
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    Discover affordable stays, cultural landmarks, and hidden
                    gems perfect for budget travelers.
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span>Dec 13, 2024</span>
                    <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                    <span>By Mohammad Juma Qasimi</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
