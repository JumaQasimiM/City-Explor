import { Link } from "react-router-dom";
import { useBlogAuthor } from "../hooks/useBlogs";

// images

import jaghori1 from "../assets/jaghori1.jpg";

export const PopularBlogCard = ({ blog, index }) => {
  const { data: author } = useBlogAuthor(blog.user_id);
  return (
    <div key={blog.index} className="flex flex-col gap-3 mb-15">
      <div className="relative h-[170px] overflow-hidden rounded">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-white/95 px-3 py-2 text-sm flex gap-2">
          <span className="first-letter:uppercase">
            {blog.user?.first_name || "Juma Qasimi"} {blog.user?.last_name}
          </span>
          <span className="w-px bg-gray-400" />
          <span>
            {new Date(blog.created_at).toLocaleDateString("de-DE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <Link
        to={`/blogs/${blog.id}`}
        className="font-semibold dark:text-gray-200 hover:text-green-700 cursor-pointer"
      >
        {blog.title}
      </Link>
    </div>
  );
};
