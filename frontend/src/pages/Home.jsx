import { Hero } from "../components/Hero";
import { PlaceArtical } from "../components/PlaceArtical";
import { PopularHotels } from "../components/PopularHotels";
import { PopularPlaces } from "../components/PopularPlaces";
import { PopularRestaurants } from "../components/PopularRestaurants";
import { TestimonialsSlider } from "../components/Testimonials";

export const Home = () => {
  return (
    <>
      {/* ============ Hero ======= */}
      <Hero />

      {/* ============ Place Artical  ======= */}
      <PlaceArtical />
      {/* ============ Popular place ======= */}
      <PopularPlaces />

      {/* ============ Popular Hotels ======= */}
      <PopularHotels />
      {/* ============ Popular Restaurants ======= */}
      <PopularRestaurants />
      {/* ============ testmonial ======= */}
      <TestimonialsSlider />
      {/* ============ advertisment or offer ======= */}
    </>
  );
};
