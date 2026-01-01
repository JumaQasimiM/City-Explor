import jaghoriImage from "../assets/hero.jpeg";

export const PlaceArtical = () => {
  return (
    <section className="w-full py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="font-milonga text-3xl md:text-4xl text-slate-900 dark:text-white leading-tight">
            Best destinations in Afghanistan for budget travelers
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            Carefully selected destinations offering beauty, culture, and
            affordability for modern explorers.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <span className="uppercase tracking-widest text-sm text-green-600 font-semibold">
              Hotels & Travel
            </span>

            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white leading-snug">
              A beginner’s guide to Jaghori: where culture meets calm
            </h2>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Jaghori offers breathtaking landscapes, rich traditions, and
              welcoming hospitality. This guide highlights where to stay, what
              to explore, and how to enjoy your visit on a budget.
            </p>

            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span>December 13, 2024</span>
              <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
              <span>By Mohammad Juma Qasimi</span>
            </div>

            {/* Read More */}
            <button className="cursor-pointer mt-4 inline-flex items-center gap-2 border-b border-slate-900 dark:border-white pb-1 text-slate-900 dark:text-white hover:opacity-70 transition">
              Read full story
              <span className="text-lg">→</span>
            </button>
          </div>

          {/* Image */}
          <div className="relative group">
            <div className="overflow-hidden">
              <img
                src={jaghoriImage}
                alt="Jaghori Afghanistan"
                className="w-full h-[420px] object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
