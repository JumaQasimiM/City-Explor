import { useBlogAuthor } from "../hooks/useBlogs";
import { Link } from "react-router-dom";

import { FaUserAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";

export const BlogCard = ({ blog }) => {
  const { data: author } = useBlogAuthor(blog.user_id);

  return (
    <article
      className="
        group
        bg-white dark:bg-slate-900
        border border-gray-200 dark:border-slate-700
        rounded overflow-hidden
        shadow-sm hover:shadow-md
        transition duration-300
      "
    >
      {/* ===== IMAGE ===== */}
      <div className="h-[220px] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="
            w-full h-full object-cover
            transition duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-6 space-y-4">
        {/* META */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1 uppercase">
            <FaUserAlt className="opacity-70" />{" "}
            {blog.user?.first_name || "Unknown"} {blog.user?.last_name}
          </span>

          <span className="flex items-center gap-1">
            <MdOutlineDateRange />
            {new Date(blog.created_at).toLocaleDateString("de-DE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>

          <span className="flex items-center gap-1">
            <BiCategory />
            Travel
          </span>
        </div>

        {/* TITLE */}
        <h2
          className="
            text-xl md:text-2xl font-semibold
            text-gray-900 dark:text-white
            leading-snug
            group-hover:text-green-600 transition
          "
        >
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {blog.description || "No description available."}
        </p>

        {/* BUTTON */}
        <Link
          to={`/blogs/${blog.id}`}
          className="
            inline-flex items-center gap-1
            text-green-600 font-medium text-sm
            hover:gap-2 transition-all
          "
        >
          Read more
          <IoIosArrowRoundForward size={20} />
        </Link>
      </div>
    </article>
  );
};
