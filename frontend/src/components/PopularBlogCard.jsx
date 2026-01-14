import { Link } from "react-router-dom";
import { useBlogAuthor } from "../hooks/useBlogs";

// images
import restaurant1 from "../assets/restaurant1.jpg";
import restaurant2 from "../assets/restaurant2.jpg";
import restaurant3 from "../assets/restaurant3.jpg";
import hotel1 from "../assets/hotel1.jpg";
import jaghori1 from "../assets/jaghori1.jpg";
import jaghori2 from "../assets/jaghori2.jpg";

const blogImages = [
  jaghori2,
  restaurant1,
  jaghori1,
  restaurant2,
  restaurant3,
  hotel1,
];

export const PopularBlogCard = ({ blog, index }) => {
  const { data: author } = useBlogAuthor(blog.user_id);
  return (
    <div key={blog.index} className="flex flex-col gap-3 mb-15">
      <div className="relative h-[170px] overflow-hidden rounded">
        <img
          src={blogImages[index % blogImages.length]}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-white/95 px-3 py-2 text-sm flex gap-2">
          <span>{author.firstname || "Juma Qasimi"}</span>
          <span className="w-px bg-gray-400" />
          <span>{blog.created_at}</span>
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
