import jaghori1 from "../assets/jaghori1.jpg";
import { useBlogs } from "../hooks/useBlogs";
import { BlogCard } from "../components/BlogCard";
import { PopularBlogCard } from "../components/PopularBlogCard";

import { Loader } from "../components/helper/Loading";
import { ErrorMessage } from "../components/helper/Error";
export const Blog = () => {
  const { blogs = [], loading, error } = useBlogs();

  // =========== error and laoding
  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <section className="mt-16 bg-gray-100 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* ================= hero ================= */}
        <div className="relative h-[260px] sm:h-[380px] md:h-[520px] overflow-hidden">
          <img
            src={jaghori1}
            alt="Jaghori travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <span className="uppercase tracking-widest text-green-400 font-semibold mb-2">
              Tours & Travels
            </span>
            <h1 className="font-caveat text-2xl sm:text-6xl md:text-8xl font-bold text-white mb-3">
              Amazing Places in Jaghori
            </h1>
            <p className="text-white/80  font-semibold">
              Discover nature, culture, and unforgettable experiences
            </p>
            <span className="mt-4 text-white/80 text-sm font-semibold">
              December 12, 2025
            </span>
          </div>
        </div>

        {/* ================= content ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
          {/* ========= main blog crads ========= */}
          <article className="lg:col-span-2 dark:bg-slate-800 overflow-hidden">
            {blogs.map((blog, index) => (
              <BlogCard blog={blog} key={blog.id} index={index} />
            ))}
          </article>

          {/* ========= sidebar ========= */}
          <aside className="space-y-6 bg-gray-200 dark:bg-slate-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold dark:text-gray-200">
              Popular Blogs
            </h3>

            {blogs.map((blog, index) => (
              <PopularBlogCard blog={blog} index={index} key={blog.id} />
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
};
