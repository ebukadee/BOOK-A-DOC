import Services from "../components/Services";
import Header from "../components/Header";
import About from "../components/About";
import Contact from "../components/Contact";
import Testimonial from "../components/Testimonial";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header id="header" />
      <Services id="services" />
      <About id="about" />
      <Testimonial id="testimonial" />
      <Contact id="contact" />
      <Footer />
    </>
  );
};

export default Home;
