import { useBlogAuthor } from "../hooks/useBlogs";
import { Link } from "react-router-dom";
// react icons
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";

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

export const BlogCard = ({ blog, index }) => {
  const { data: author } = useBlogAuthor(blog.user_id);
  return (
    <div key={blog.id} className="mb-12 dark:bg-slate-800 overflow-hidden">
      <div className="relative h-[240px] sm:h-[360px]">
        <img
          src={blogImages[index % blogImages.length]}
          alt={blog.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 bg-white/95 px-6 py-4 flex flex-wrap gap-6 text-sm">
          <span className="flex items-center gap-2">
            <FaUserAlt className="text-green-500" />
            {author.firstname || "Juma Qasimi"}
          </span>
          <span className="flex items-center gap-2">
            <MdOutlineDateRange className="text-blue-500" />
            {blog.created_at || "Jan 12, 2026"}
          </span>
          <span className="flex items-center gap-2">
            <BiCategory className="text-orange-500" />
            Travel
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h2 className="font-caveat font-extrabold text-2xl md:text-4xl text-gray-800 dark:text-white hover:text-green-700">
          <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 ">
          {blog.description ||
            "Jaghori is one of the most peaceful and beautiful districts in central Afghanistan, famous for its culture, education, and natural beauty."}
        </p>

        <Link
          to={`/blogs/${blog.id}`}
          className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 rounded-lg transition"
        >
          Learn more
          <IoIosArrowRoundForward size={22} />
        </Link>
      </div>
    </div>
  );
};
