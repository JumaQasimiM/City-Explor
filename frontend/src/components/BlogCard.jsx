import { useBlogAuthor } from "../hooks/useBlogs";
import { Link } from "react-router-dom";

import { FaUserAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";

import blog_cover from "../assets/blog_cover2.jpg";

export const BlogCard = ({ blog, index }) => {
  const { data: author } = useBlogAuthor(blog.user_id);

  const isOdd = index % 2 !== 0;

  return (
    <article
      className={`
        group
        grid
        grid-cols-1
        md:grid-cols-2
        bg-white
        border
        border-slate-200
        rounded
        overflow-hidden
        shadow-sm
        transition-all
        duration-300
        ${isOdd ? "md:flex-row-reverse" : ""}
      `}
    >
      {/* IMAGE */}
      <div
        className={`
          h-[300px]
          overflow-hidden
          ${isOdd ? "md:order-2" : "md:order-1"}
        `}
      >
        <img
          src={blog.image || blog_cover}
          alt={blog.title}
          onError={(e) => (e.target.src = blog_cover)}
          className="
            w-full
            h-full
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className={`
          p-8
          flex
          flex-col
          justify-center
          ${isOdd ? "md:order-1" : "md:order-2"}
        `}
      >
        {/* META */}
        <div
          className="
            flex
            flex-wrap
            gap-5
            text-xs
            text-slate-500
            mb-5
          "
        >
          <span className="flex items-center gap-1">
            <FaUserAlt />
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
            text-2xl
            font-bold
            text-slate-900
            leading-tight
            group-hover:text-green-600
            transition
          "
        >
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
            mt-4
            text-slate-600
            leading-relaxed
            line-clamp-3
          "
        >
          {blog.description || "No description available."}
        </p>

        {/* BUTTON */}
        <Link
          to={`/blogs/${blog.id}`}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            text-green-600
            font-semibold
            hover:gap-3
            transition-all
          "
        >
          Read more
          <IoIosArrowRoundForward size={22} />
        </Link>
      </div>
    </article>
  );
};
