import Header from '../components/Header';
import About from '../components/About';
import Slider from '../components/Slider';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <About />
      <Slider />
      <Announcement />
      <Footer />
    </div>
  );
}
