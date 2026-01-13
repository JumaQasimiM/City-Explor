import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import jaghoriImage from "../assets/hero.jpeg";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useBlogAuthor, useBlogCategory, useBlogs } from "../hooks/useBlogs";

// image

import Hotel1 from "../assets/Hotel1.jpg";
import HotelRoom1 from "../assets/HotelRoom1.jpg";
import restaurant1 from "../assets/restaurant1.jpg";
import jaghori1 from "../assets/jaghori1.jpg";
const placeImages = [Hotel1, HotelRoom1, restaurant1, jaghori1];

const ShowCategory = ({ cate_id }) => {
  const { data: category } = useBlogCategory(cate_id);

  return <span>{category.name}</span>;
};

const BlogAuthor = ({ author_id }) => {
  const { data: author } = useBlogAuthor(author_id);
  return (
    <span>
      By {author.firstname} {author.lastname}
    </span>
  );
};
export const PopularPlacesSwiper = () => {
  const { blogs } = useBlogs();
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={2}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
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
                  src={placeImages[index % placeImages.length]}
                  alt="Jaghori Afghanistan"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>

              {/* Text */}
              <div className="mt-5 space-y-3">
                <span className="text-xs tracking-widest uppercase text-green-600">
                  <ShowCategory cate_id={blog.category_id} /> ·{" "}
                  {blog.tags[0 + index]}
                </span>

                <h3 className="hover:text-orange-500 text-sm md:text-xl font-semibold text-slate-900 dark:text-white leading-snug">
                  <Link to={`blogs/${blog.id}`}>{blog.title.slice(0, 40)}</Link>
                </h3>

                <p className="text-slate-600 dark:text-slate-300  text-sm leading-relaxed">
                  {blog.description.slice(0, 150)}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-5 mb-3">
                  <span>{blog.created_at}</span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                  <BlogAuthor author_id={blog.user_id} />
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
