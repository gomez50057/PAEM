import Header from '../components/layout/Header';
import About from '../components/home/About';
import Slider from '../components/home/Slider';
import Map from '../components/home/InteractiveMap';
// import Announcement from '../components/home/Announcement';
import Navbar from '../components/layout/Navbar';


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
