import jaghori1 from "../assets/jaghori1.jpg";
import { useBlogs } from "../hooks/useBlogs";
import { BlogCard } from "../components/BlogCard";
import { PopularBlogCard } from "../components/PopularBlogCard";

import { Loader } from "../components/helper/Loading";
import { ErrorMessage } from "../components/helper/Error";

export const Blog = () => {
  const { blogs = [], loading, error } = useBlogs();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <section className="bg-gray-50 dark:bg-slate-900 ">
      <div className="max-w-7xl mx-auto px-4 space-y-12 pt-20">
        {/* ================= HERO ================= */}
        <div className="relative h-[220px] md:h-[320px] rounded overflow-hidden">
          <img
            src={jaghori1}
            alt="Travel"
            className="w-full h-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* content */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
            <span className="text-green-400 text-xs uppercase tracking-widest mb-2">
              Travel Blog
            </span>

            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Discover Beautiful Places
            </h1>

            <p className="text-white/80 text-sm mt-2 max-w-xl">
              Explore travel stories, tips, and hidden gems from around the
              world.
            </p>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ===== MAIN BLOG LIST ===== */}
          <article className="lg:col-span-2 space-y-8">
            {blogs.map((blog) => (
              <BlogCard blog={blog} key={blog.id} />
            ))}
          </article>

          {/* ===== SIDEBAR ===== */}
          <aside
            className="
              h-fit sticky top-24
              bg-white dark:bg-slate-900
              border border-gray-200 dark:border-slate-700
              rounded-2xl p-6 space-y-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Popular Blogs
            </h3>

            <div className="space-y-4">
              {blogs.slice(0, 4).map((blog, index) => (
                <PopularBlogCard blog={blog} index={index} key={blog.id} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
