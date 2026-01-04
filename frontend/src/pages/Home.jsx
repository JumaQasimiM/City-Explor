import { Hero } from "../components/Hero";
import { PlaceArtical } from "../components/PlaceArtical";
import { PopularHotels } from "../components/PopularHotels";
import { PopularPlaces } from "../components/PopularPlaces";
import { PopularRestaurants } from "../components/PopularRestaurants";

export const Home = () => {
  return (
    <>
      {/* ============ Hero ======= */}
      <Hero />
      {/* ============ serach ======= */}

      {/* ============ Place Artical  ======= */}
      <PlaceArtical />
      {/* ============ Popular place ======= */}
      <PopularPlaces />

      {/* ============ Popular Hotels ======= */}
      <PopularHotels />
      {/* ============ Popular Restaurants ======= */}
      <PopularRestaurants />
      {/* ============ testmonial ======= */}

      {/* ============ advertisment or offer ======= */}
    </>
  );
};
