import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
// react markdwon
import ReactMarkdwon from "react-markdown";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useBlogCategory, useBlogs } from "../hooks/useBlogs";

// image
import blog_cover from "../assets/jaghori.png";

import { Loader } from "./helper/Loading";
import { ErrorMessage } from "./helper/Error";

export const LatestBlogsSwiper = () => {
  const { blogs = [], loading, error } = useBlogs();

  /* ================= LOADING / ERROR ================= */
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        // slidesPerView={2}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1, // موبایل
          },
          580: {
            slidesPerView: 2, // sm
          },
          640: {
            slidesPerView: 2, // sm
          },
          768: {
            slidesPerView: 2, // md و بالاتر
          },
          1024: {
            slidesPerView: 2, // lg
          },
        }}
        pagination={{ clickable: true }}
        navigation
      >
        {blogs?.slice(0, 4).map((blog, index) => (
          <SwiperSlide key={blog}>
            <article className="group mb-10 border-b-3 border-b-gray-600 pb-3">
              {/* Image */}
              <div className="overflow-hidden h-[170px] sm:h-[200px] md:h-[280px]">
                <img
                  src={blog.image || blog_cover}
                  alt={blog.title || "Blog Image"}
                  onError={(e) => (e.target.src = blog_cover)}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>

              {/* Text */}
              <div className="mt-5 space-y-3">
                <h3 className="hover:text-orange-500 text-sm md:text-xl font-semibold text-slate-900 dark:text-white leading-snug">
                  <Link to={`blogs/${blog.id}`}>{blog.title.slice(0, 30)}</Link>
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed text-justify">
                  <ReactMarkdwon>
                    {blog.description.slice(0, 150)}
                  </ReactMarkdwon>
                </p>

                <div className="flex flex-col items-left sm:flex-row gap-3 text-xs text-slate-500 dark:text-slate-400 mt-5 mb-3">
                  <span>
                    {new Date(blog.created_at).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
