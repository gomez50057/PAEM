import Header from '@/components/home/Header';
import About from '@/components/home/About';
import Slider from '@/components/home/Slider';
import Map from '@/components/home/InteractiveMap';
// import Announcement from '@/components/home/Announcement';
import Navbar from '@/components/shared/Navbar';


export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
      <Slider />
      <Map />
      {/* <Announcement /> */}
    </div>
  );
}
