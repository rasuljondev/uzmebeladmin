import Hero from "./pages/home/components/Hero/Hero";
import Special from "./pages/home/components/Special/Special";
import Categories from "./pages/home/components/Categories/Categories";
import MostViewed from "./pages/home/components/MostViewed/MostViewed";
import Featured from "./pages/home/components/Featured/Featured";
import ShowroomSection from "./pages/home/components/ShowroomSection/ShowroomSection";
import Map from "./pages/home/components/Map/Map";
import Footer from "./pages/home/components/Footer/Footer";

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