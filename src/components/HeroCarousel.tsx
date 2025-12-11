import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroHospital from "@/assets/hero-hospital.jpg";
import heroDoctors from "@/assets/hero-doctors.jpg";
import heroEmergency from "@/assets/hero-emergency.jpg";
import { Link } from "react-router-dom";const slides = [
  {
  image: heroHospital,
  title: "Compassionate Care, Advanced Healing",
  description: "Receive world-class treatment with compassion, comfort, and cutting-edge medical technology.",
},
{
  image: heroDoctors,
  title: "Expert Doctors. Modern Facilities.",
  description: "A dedicated team of specialists delivering trusted, personalized healthcare for every patient.",
},
{
  image: heroEmergency,
  title: "24/7 Emergency Care",
  description: "Immediate, reliable emergency support available any time — day or night.",
},

];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[600px] md:h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 to-slate-800/20" />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center ">
        <div className="container mx-auto px-4 ">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base md:text-xl mb-8 text-gray-100">
              {slides[currentSlide].description}
            </p>
            <div className="flex gap-4">
              <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-[#E84D3D] hover:bg-white/20 text-white">
                Contact us
              </Button>
              </Link>
              <Link to="/doctors">
              <Button size="lg" variant="outline" className="bg-bg-white/20 text-white hover:bg-[#d43d2d]">
                Find a Doctor
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
  );
};

export default HeroCarousel;
