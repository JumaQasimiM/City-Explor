import { FaUserAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

import restaurant1 from "../assets/restaurant1.jpg";
import restaurant2 from "../assets/restaurant2.jpg";
import restaurant3 from "../assets/restaurant3.jpg";
import hotel1 from "../assets/hotel1.jpg";
import jaghori1 from "../assets/jaghori1.jpg";
import jaghori2 from "../assets/jaghori2.jpg";

import { useBlogAuthor, useBlogs } from "../hooks/useBlogs";

const blogImages = [
  jaghori2,
  restaurant1,
  jaghori1,
  restaurant2,
  restaurant3,
  hotel1,
];

export const Blog = () => {
  const { blogs } = useBlogs();

  const BlogCard = ({ blog, index }) => {
    const { data: author } = useBlogAuthor(blog.user_id);
    return (
      <div key={blog.id} className="mb-12 dark:bg-slate-800 overflow-hidden">
        <div className="relative h-[240px] sm:h-[360px]">
          <img
            src={blogImages[index % blogImages.length]}
            alt={blog.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 left-0 bg-white/95 dark:bg-slate-800/95 px-6 py-4 flex flex-wrap gap-6 text-sm">
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
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white hover:text-green-700">
            <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
          </h2>

          <p className="text-gray-600 dark:text-gray-300">
            {blog.description ||
              "Jaghori is one of the most peaceful and beautiful districts in central Afghanistan, famous for its culture, education, and natural beauty."}
          </p>

          <Link
            to={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 rounded-lg transition"
          >
            Learn more
            <IoIosArrowRoundForward size={22} />
          </Link>
        </div>
      </div>
    );
  };
  const PopularBlagCard = ({ blog, index }) => {
    const { data: author } = useBlogAuthor(blog.user_id);
    return (
      <div key={blog.id} className="flex flex-col gap-3 mb-15">
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
          className="font-semibold hover:text-green-700 cursor-pointer"
        >
          {blog.title}
        </Link>
      </div>
    );
  };
  return (
    <section className="my-16 bg-gray-100 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* ================= HERO ================= */}
        <div className="relative h-[260px] sm:h-[380px] md:h-[520px] overflow-hidden">
          <img
            src={restaurant1}
            alt="Jaghori travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <span className="uppercase tracking-widest text-green-400 font-semibold mb-2">
              Tours & Travels
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              Amazing Places in Jaghori
            </h1>
            <p className="text-white/80">
              Discover nature, culture, and unforgettable experiences
            </p>
            <span className="mt-4 text-white/70 text-sm">
              December 12, 2025
            </span>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ========= MAIN BLOG ========= */}
          <article className="lg:col-span-2 dark:bg-slate-800 overflow-hidden">
            {blogs.map((blog, index) => (
              <BlogCard blog={blog} key={blog.id} index={index} />
            ))}
          </article>

          {/* ========= SIDEBAR ========= */}
          <aside className="space-y-6 bg-gray-200 dark:bg-slate-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Popular Blogs</h3>

            {blogs.map((blog, index) => (
              <PopularBlagCard blog={blog} index={index} key={blog.id} />
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
};
