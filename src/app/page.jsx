import Hero from "../components/Hero/Hero";
import Special from "../components/Special/Special";
import Categories from "../components/Categories/Categories";
import MostViewed from "../components/MostViewed/MostViewed";
import Featured from "../components/Featured/Featured";
import ShowroomSection from "../components/ShowroomSection/ShowroomSection";
import Map from "../components/Map/Map";
import Footer from "../components/Footer/Footer";

export default function Page() {
  return (
    <div className="bg-white">
      <Hero />
      <Special />
      <Categories />
      <MostViewed />
      <Featured />
      <ShowroomSection imageOnRight={true} />
      <ShowroomSection imageOnRight={false} />
      <Map />
      <Footer />
    </div>
  );
}