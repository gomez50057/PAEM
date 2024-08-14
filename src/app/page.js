import Header from '../components/Header';
import About from '../components/About';
import Slider from '../components/Slider';
import Announcement from '../components/Announcement';

export default function Home() {
  return (
    <div>
      <Header />
      <About />
      <Slider />
      <Announcement />
    </div>
  );
}
