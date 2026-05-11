import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { PopularPlaces } from "../components/PopularPlaces";
import { HowUse } from "../components/HowUse";
import { LatestBlogs } from "../components/LatestBlogs";
import { Advertisment } from "../components/advertisment";
import { SocialMedia } from "../components/socialMedia";
import { Newsletter } from "../components/Newsletter";

export const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Advertisment />
      <HowUse />
      <PopularPlaces />
      <SocialMedia />
      <LatestBlogs />
      <Newsletter />
      {/* <TestimonialsSlider /> */}
    </>
  );
};
