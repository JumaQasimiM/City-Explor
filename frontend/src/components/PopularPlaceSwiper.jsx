import { Swiper, SwiperSlide } from "swiper/react";
import jaghoriImage from "../assets/hero.jpeg";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export const PopularPlacesSwiper = () => {
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
        {[1, 2, 3, 4].map((item) => (
          <SwiperSlide key={item}>
            <article className="group mb-10 border-b-3 border-b-gray-600 pb-3">
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={jaghoriImage}
                  alt="Jaghori Afghanistan"
                  className="w-full h-[240px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Text */}
              <div className="mt-5 space-y-3">
                <span className="text-xs tracking-widest uppercase text-green-600">
                  Hotel · Jaghori
                </span>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-snug">
                  Stunning Buildings in the Center of Budapest
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Discover affordable stays, cultural landmarks, and hidden gems
                  perfect for budget travelers.
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>Dec 13, 2024</span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                  <span>By Mohammad Juma Qasimi</span>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
