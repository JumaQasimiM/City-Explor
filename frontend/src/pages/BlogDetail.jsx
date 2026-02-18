import { useParams, Link } from "react-router-dom";
import {
  FaUserAlt,
  FaCalendarAlt,
  FaEye,
  FaArrowLeft,
  FaStar,
} from "react-icons/fa";

import { useBlogAuthor, useBlogById } from "../hooks/useBlogs";
import { BlogComments } from "../components/BlogComments";

import jaghori2 from "../assets/jaghori2.jpg";
import restaurant1 from "../assets/restaurant1.jpg";

export const BlogDetail = () => {
  const { id } = useParams();
  const { data: blog, loading, error } = useBlogById(id);
  const { data: author } = useBlogAuthor(blog?.user_id);

  if (loading) {
    return (
      <section className="py-32 text-center text-lg font-medium">
        Loading blog...
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="py-32 text-center space-y-4">
        <p className="text-xl font-semibold">Blog not found.</p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
        >
          <FaArrowLeft />
          Back to Blogs
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      {/* ================= HERO ================= */}
      <div className="relative h-[350px] md:h-[500px] overflow-hidden">
        <img
          src={jaghori2}
          alt={blog.title}
          className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center px-6 max-w-3xl">
          <h1 className="text-xl md:text-4xl font-semibold md:font-bold text-white drop-shadow-lg">
            {blog.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-2 md:gap-6 text-white/80 text-lg mt-6">
            <span className="flex items-center gap-2 text-bold text-white">
              <FaUserAlt /> {author?.firstname || "Author"}
            </span>
            <span className="flex items-center gap-2 text-bold text-white">
              <FaCalendarAlt /> {blog.created_at}
            </span>
            <span className="flex items-center gap-2 text-bold text-white">
              <FaEye /> {blog.views || 0} views
            </span>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* ===== MAIN CONTENT ===== */}
        <article className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-md shadow-2xl p-10 md:p-14 space-y-10 backdrop-blur-sm">
          <div className="flex justify-between ">
            <div>
              <h1 className="text-md font-semibold">{blog.title}</h1>
              {/* Rating */}
              <div className="flex items-center gap-2 text-amber-400 text-lg">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  5.0 Rating
                </span>
              </div>

              <h1 className="block md:hidden">
                <span className="flex items-center gap-2 text-bold text-gray-500">
                  <FaCalendarAlt /> {blog.created_at}
                </span>
              </h1>
            </div>
            <h1
              className="
            hidden md:block text-gray-600"
            >
              <span className="flex items-center gap-2 text-bold text-gray-500">
                <FaCalendarAlt /> {blog.created_at}
              </span>
            </h1>
          </div>

          {/* Image */}
          <img
            src={jaghori2}
            alt=""
            className="rounded shadow-lg border border-gray-100 dark:border-slate-700"
          />

          {/* Description */}
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {blog.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 pt-6">
            {blog.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-green-700 dark:text-green-300 text-sm rounded-full hover:scale-105 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-all"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* ===== SIDEBAR ===== */}
        <aside className="space-y-10">
          {/* Author Card */}
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl p-8 text-center backdrop-blur-md hover:scale-105 transition-transform duration-300">
            <img
              src={restaurant1}
              alt="author"
              className="w-28 h-28 mx-auto rounded-full object-cover border-3 border-emerald-500 shadow-xl mb-4"
            />
            <h3 className="font-semibold text-xl text-gray-500">
              {author?.firstname || "Author"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Travel writer & local guide
            </p>
          </div>

          {/* Back Button */}
          <Link
            to="/blogs"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white py-4 rounded transition-all shadow-xl font-semibold"
          >
            <FaArrowLeft />
            Back to Blogs
          </Link>
        </aside>
      </div>

      {/* ================= COMMENTS ================= */}
      <div className="max-w-5xl mx-auto border-t border-gray-200 dark:border-slate-800 py-8 md:py-16 px-6">
        <BlogComments blog_id={blog?.id} />
      </div>
    </section>
  );
};
