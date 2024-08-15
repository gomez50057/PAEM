import Header from '../components/Header';
import About from '../components/About';
import Slider from '../components/Slider';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';


export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
      <Slider />
      <Announcement />
    </div>
  );
}
