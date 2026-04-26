import jaghori1 from "../assets/jaghori1.jpg";
import { useBlogAuthor, useBlogs } from "../hooks/useBlogs";
import { Link } from "react-router-dom";
import { CityWeather } from "./CityWeather";
import { Loader } from "./helper/Loading";
import { ErrorMessage } from "./helper/Error";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

export const PlaceArtical = () => {
  const { blogs = [], loading, error } = useBlogs();

  const BlogAuthor = ({ author_id }) => {
    const { data: author } = useBlogAuthor(author_id);

    return (
      <span className="font-medium text-gray-700 dark:text-gray-300">
        By {author?.firstname} {author?.lastname}
      </span>
    );
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="w-full py-14 md:py-24 bg-gray-50 dark:bg-slate-900 transition-colors">
      {blogs.slice(0, 1).map((blog) => (
        <div key={blog.id} className="max-w-7xl mx-auto px-5 space-y-10">
          {/* ===== IMAGE ===== */}
          <div className="rounded overflow-hidden shadow-lg group">
            <img
              src={jaghori1}
              alt="Blog cover"
              className="w-full h-[420px] object-cover transform scale-105 group-hover:scale-100 transition duration-700"
            />
          </div>

          {/* ===== CONTENT GRID ===== */}
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-6">
              <span className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                Hotels & Travel
              </span>

              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                {blog.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {blog.description}
              </p>

              {/* META */}
              <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt />
                  {blog.created_at}
                </span>

                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>

                <BlogAuthor author_id={blog.user_id} />
              </div>

              {/* READ MORE */}
              <Link
                to={`blogs/${blog.id}`}
                className="inline-flex items-center gap-2 mt-4 text-gray-900 dark:text-white font-medium border-b border-gray-400 dark:border-gray-500 hover:opacity-70 transition"
              >
                Read full story
                <FaArrowRight />
              </Link>
            </div>

            {/* RIGHT SIDE (WEATHER CARD) */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
              <CityWeather city_name={"jaghori"} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
