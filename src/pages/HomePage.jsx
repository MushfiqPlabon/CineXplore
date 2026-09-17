import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";

export default function HomePage({ navigateTo }) {
  return (
    <>
      <Navbar navigateTo={navigateTo} />
      <main className="flex-1">
        <HeroBanner navigateTo={navigateTo} />
      </main>
      <Footer />
    </>
  );
}
