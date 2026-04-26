import { useParams, Link } from "react-router-dom";
import { FaUserAlt, FaCalendarAlt, FaEye, FaArrowLeft } from "react-icons/fa";

import { useBlogById } from "../hooks/useBlogs";
import { BlogComments } from "../components/BlogComments";

// import { formatDistanceToNow } from "date-fns";

export const BlogDetail = () => {
  const { id } = useParams();
  const { data: blog, loading, error } = useBlogById(id);

  if (loading) {
    return (
      <section className="py-32 text-center text-gray-500">
        Loading blog...
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="py-32 text-center space-y-4">
        <p className="text-lg font-medium">Blog not found</p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black dark:hover:text-white"
        >
          <FaArrowLeft />
          Back to Blogs
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-slate-900 py-10 mt-14">
      {/* ===== IMAGE ===== */}
      {blog.image && (
        <div className="max-w-5xl mx-auto px-5">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[300px] md:h-[420px] object-cover rounded"
          />
        </div>
      )}

      {/* ===== CONTENT ===== */}

      <div className="max-w-5xl mx-auto px-10 py-8 space-y-8">
        {/* TITLE */}
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight">
          {blog.title}
        </h1>

        {/* META (optional but very German UX style) */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 border-b pb-4">
          <span>By {blog.user?.first_name || "Author"}</span>
          <span>•</span>
          <span>
            {new Date(blog.created_at).toLocaleString("de-DE", {
              dateStyle: "long",

              timeStyle: "short",
            })}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl">
          {blog.description}
        </p>

        {/* TAGS */}
        {blog.tags && (
          <div className="flex flex-wrap gap-2 pt-4">
            {blog.tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="
            px-3 py-1 rounded-full text-sm
            bg-gray-100 dark:bg-slate-800
            text-gray-700 dark:text-gray-300
            border border-gray-200 dark:border-slate-700
            hover:bg-gray-200 dark:hover:bg-slate-700
            transition
          "
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ===== AUTHOR + ACTION ===== */}
      <div className="max-w-5xl mx-auto px-10 py-8 border-t border-gray-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={blog.user?.avatar || "/default-avatar.png"}
            className="w-14 h-14 rounded-full object-cover border"
          />

          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {blog.user?.first_name || "Author"}
            </p>
            <p className="text-sm text-gray-500">Travel writer & local guide</p>
          </div>
        </div>

        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black dark:hover:text-white"
        >
          <FaArrowLeft />
          Back to Blogs
        </Link>
      </div>

      {/* ===== COMMENTS ===== */}
      <div className="max-w-5xl mx-auto px-5 py-12 border-t border-gray-200 dark:border-slate-700">
        <BlogComments blog_id={blog?.id} />
      </div>
    </section>
  );
};
