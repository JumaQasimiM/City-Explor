// BlogDetail.jsx
import { useParams, Link } from "react-router-dom";
import { FaUserAlt, FaCalendarAlt, FaEye, FaArrowLeft } from "react-icons/fa";
import { useBlogAuthor, useBlogById } from "../hooks/useBlogs"; // custom hook to fetch blog by id

import restaurant1 from "../assets/restaurant1.jpg";
import restaurant2 from "../assets/restaurant2.jpg";
import restaurant3 from "../assets/restaurant3.jpg";
import hotel1 from "../assets/hotel1.jpg";
import jaghori1 from "../assets/jaghori1.jpg";
import jaghori2 from "../assets/jaghori2.jpg";

export const BlogDetail = () => {
  const { id } = useParams();
  const { data: blog, loading, error } = useBlogById(id); // fetch single blog
  const { data: author } = useBlogAuthor(blog.user_id);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p>Loading blog...</p>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="py-20 text-center">
        <p>Blog not found.</p>
        <Link
          to="/blogs"
          className="mt-4 inline-block bg-sky-700 hover:bg-sky-800 text-white py-2 px-4 rounded"
        >
          Back to Blogs
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-100">
      {/* ================= HERO ================= */}
      <div className="relative h-[280px] sm:h-[400px] md:h-[520px]">
        <img
          src={jaghori2}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <span className="uppercase tracking-widest text-green-400 font-semibold mb-3">
            {blog.category || "Uncategorized"}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white max-w-4xl">
            {blog.title}
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm mt-4">
            <span className="flex items-center gap-2">
              <FaUserAlt /> {author.firstname || "Author"}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendarAlt /> {blog.created_at}
            </span>
            <span className="flex items-center gap-2">
              <FaEye /> {blog.views || 0} views
            </span>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ========= MAIN CONTENT ========= */}
        <article className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow p-6 md:p-10 space-y-6">
          <img src={jaghori2} alt="" />
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {blog.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 pt-4">
            {blog.tags?.map((tag, index) => (
              <span
                key={`${tag}-${index}`} // unique key for safety
                className="px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* ========= SIDEBAR ========= */}
        <aside className="space-y-6">
          {/* Author Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 text-center">
            <img
              src={restaurant1 || "/images/blogs/author.jpg"}
              alt={blog.author_name || "Author"}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">
              {author.firstname || "Author"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Travel writer & local guide
            </p>
          </div>

          {/* Back Button */}
          <Link
            to="/blogs"
            className="flex items-center justify-center gap-2 bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-lg transition"
          >
            <FaArrowLeft />
            Back to Blogs
          </Link>
        </aside>
      </div>
    </section>
  );
};
