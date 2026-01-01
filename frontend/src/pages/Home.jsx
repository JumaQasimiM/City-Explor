import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { PlaceArtical } from "../components/PlaceArtical";
import { PopularPlaces } from "../components/PopularPlaces";

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
      {/* ============ Popular Restaurants ======= */}
      {/* ============ offer ======= */}
      {/* ============ News and Events ======= */}
      {/* ============ advertisment or offer ======= */}
      {/* ============ footer ======= */}
    </>
  );
};
