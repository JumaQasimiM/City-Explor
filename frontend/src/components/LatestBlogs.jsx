import qalaIRaiss from "../assets/post.jpg";

import { LatestBlogsSwiper } from "./LatestBlogsSwiper";

export const LatestBlogs = () => {
  return (
    <section className="w-full pt-3 md:py-15 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section title */}
        <div className="text-center mb-12 md:mb-16">
          {/* small label */}
          <span className="inline-block text-sm uppercase tracking-widest text-emerald-500 mb-3">
            Blog & Stories
          </span>

          {/* main title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-quicksand font-bold text-slate-900 dark:text-white leading-tight">
            Latest <span className="text-emerald-500">Blogs</span>
          </h1>

          {/* underline */}
          <div className="mt-4 w-25 h-1 bg-emerald-500 mx-auto rounded-full"></div>

          {/* description */}
          <p className="max-w-2xl mx-auto mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Discover stories, guides, and insights from different places. Stay
            updated with the latest travel experiences and local highlights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* FEATURED ARTICLE */}
          <div className="relative group lg:col-span-1">
            <div className="overflow-hidden">
              <img
                src={qalaIRaiss}
                alt="Architecture Budapest"
                className="w-full h-[520px] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* Text overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-green-400">
                Jaghori - Qala-i-Raiss
              </span>

              <h2 className="text-2xl font-semibold leading-snug">
                Historical castles are a symbol of Jaghori
              </h2>

              <p className="text-sm text-white/80">
                Apr 01, 2026 · By Mohammad Juma Qasimi
              </p>
            </div>
          </div>

          {/* RIGHT ARTICLES */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-1 gap-10">
            <LatestBlogsSwiper />
          </div>
        </div>
      </div>
    </section>
  );
};
