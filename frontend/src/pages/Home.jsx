import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { PlaceArtical } from "../components/PlaceArtical";
import { PopularHotels } from "../components/PopularHotels";
import { PopularPlaces } from "../components/PopularPlaces";
import { PopularRestaurants } from "../components/PopularRestaurants";

export const Home = () => {
  return (
    <>
      {/* ========= header ============= */}
      <Header />
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
      {/* ============  ======= */}
      {/* ============ News and Events ======= */}
      {/* ============ advertisment or offer ======= */}
      {/* ============ footer ======= */}
    </>
  );
};
