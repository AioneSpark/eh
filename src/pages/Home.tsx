import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeroCarousel from "@/components/HeroCarousel";
import {
  Heart,
  Clock,
  Users,
  Award,
  Stethoscope,
  Brain,
  Bone,
  Baby,
  Activity,
  Pill,
  Star,
  AlertCircle,
  Ear,
  Building2,
  GraduationCap,
  Eye,
  HeartHandshake
} from "lucide-react";
import hospitalInterior from "@/assets/hospital-sample.jpg";
import { useState, useEffect } from "react";

const features = [
  { icon: Clock, title: "24/7 Emergency Care", description: "Immediate medical assistance available anytime" },
  { icon: Users, title: "Qualified Specialists", description: "Experienced and certified medical professionals" },
  { icon: Award, title: "Advanced Facilities", description: "Modern infrastructure and world-class equipment" },
  { icon: Pill, title: "Pharmacy & Diagnostics", description: "Fully equipped pharmacy and advanced lab services" },
];

const specialties = [
  { icon: Building2, name: "ELETTIL HOSPITAL", description: "Complete multi-speciality healthcare", link: "/services/elettil-hospital" },
  { icon: GraduationCap, name: "EH ACADEMY", description: "Advanced medical education & training", link: "/services/eh-academy" },
  { icon: Eye, name: "EH EYE HOSPITAL", description: "Specialised eye & vision care", link: "/services/eh-eye-hospital" },
  { icon: Pill, name: "EH HYPER PHARMACY", description: "24/7 pharmacy & medication support", link: "/services/eh-hyper-pharmacy" },
  { icon: Activity, name: "EH PHYSIO & REHAB CENTRE", description: "Physiotherapy & rehabilitation services", link: "/services/eh-physio-rehab" },
  { icon: HeartHandshake, name: "NKM TRUST", description: "Trust-based community healthcare support", link: "/services/nkm-trust" },
];

const testimonials = [
  { 
    name: "Anjana S. Nair", 
    text: "The immediate care my child received during a late-night emergency was exceptional. The pediatric team was compassionate and professional.", 
    rating: 5
  },
  { 
    name: "Rajeev Menon", 
    text: "Advanced cardiology treatment and detailed patient care helped me recover fully from heart surgery. Highly recommended.", 
    rating: 5
  },
  { 
    name: "Harikumar", 
    text: "After suffering from knee pain for years, the orthopedic department's modern treatment and physiotherapy gave me complete relief.", 
    rating: 5
  }
];

const Home = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  
  // Auto change testimonial every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(prev => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Specialties Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A5A6A] mb-4">Our Specialties</h2>
            <p className="text-gray-600 text-lg">Comprehensive healthcare services for all your needs</p>
          </motion.div>

          {/* Updated grid for responsive columns */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="p-4 md:p-6 h-full flex flex-col justify-between hover:shadow-lg transition-all duration-300 card-hover border-0 bg-white">
                  <div className="text-center">
                    <specialty.icon className="h-8 md:h-10 w-8 md:w-10 text-[#E84D3D] mb-3 md:mb-4 mx-auto" />
                    <h3 className="text-sm md:text-lg font-semibold text-[#4A5A6A] mb-2">{specialty.name}</h3>
                    <p className="text-gray-600 text-xs md:text-base">{specialty.description}</p>
                  </div>
                  <div className="mt-3 md:mt-4 text-center">
                    <Link to={specialty.link}>
                      <Button
                        size="sm"
                        className="w-full max-w-[140px] md:w-40 bg-white border-2 border-[#E84D3D] text-[#E84D3D] hover:bg-[#E84D3D] hover:text-white transition text-xs md:text-sm"
                      >
                        Visit Website
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={hospitalInterior} alt="Hospital Interior" className="rounded-2xl shadow-xl w-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#4A5A6A] mb-4">Welcome to our multi-service center</h2>
              <p className="text-gray-600 text-base mb-6">
                We are committed to providing exceptional healthcare services through 
                Elettil Hospital, EH Academy, EH Eye Hospital, EH Hyper Pharmacy, 
                EH Physio & Rehab Centre, and NKM Trust. Our focus is on patient comfort, 
                advanced medical technology, and compassionate care. Our team of experienced 
                professionals works tirelessly to ensure the best outcomes for every patient.
              </p>
              <Link to="/about">
                <Button size="lg" className="bg-[#E84D3D] hover:bg-[#d43d2d] text-white">
                  Read More About Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A5A6A] mb-4">Why Choose Us</h2>
            <p className="text-gray-600 text-lg">Expert Doctors, Modern Care, Trusted Results.</p>
          </motion.div>

          {/* Updated grid for 2 columns on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 card-hover border-0 bg-white h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#E84D3D] mb-3 md:mb-4">
                    <feature.icon className="h-5 w-5 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-[#4A5A6A] mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - One at a time on mobile */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A5A6A] mb-4">What Our Patients Say</h2>
            <p className="text-gray-600 text-lg">Real stories from real patients</p>
          </motion.div>

          {/* Mobile: Single testimonial, Desktop: All testimonials */}
          <div className="block md:hidden">
            {/* Mobile - Single testimonial with navigation */}
            <motion.div
              key={currentTestimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full mb-8"
            >
              <Card className="p-6 bg-white border-0 shadow-md h-full flex flex-col justify-between">
                <div>
                  <div className="flex mb-4 justify-center">
                    {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#E84D3D] text-[#E84D3D] mx-1" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 text-center">"{testimonials[currentTestimonialIndex].text}"</p>
                </div>
                <p className="font-semibold text-[#4A5A6A] text-center">{testimonials[currentTestimonialIndex].name}</p>
              </Card>
            </motion.div>

            {/* Navigation dots for mobile */}
            <div className="flex justify-center space-x-3 mb-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonialIndex === index 
                      ? 'bg-[#E84D3D] w-8' 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation buttons for mobile */}
            {/* <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentTestimonialIndex(prev => 
                  prev === 0 ? testimonials.length - 1 : prev - 1
                )}
                className="px-6 py-2 bg-white border-2 border-[#E84D3D] text-[#E84D3D] rounded-lg hover:bg-[#E84D3D] hover:text-white transition-colors duration-300 font-medium"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentTestimonialIndex(prev => 
                  prev === testimonials.length - 1 ? 0 : prev + 1
                )}
                className="px-6 py-2 bg-[#E84D3D] text-white rounded-lg hover:bg-[#d63c2c] transition-colors duration-300 font-medium"
              >
                Next
              </button>
            </div> */}
          </div>

          {/* Desktop - Show all testimonials */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="p-6 bg-white border-0 shadow-md h-full flex flex-col justify-between">
                  <div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#E84D3D] text-[#E84D3D]" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  </div>
                  <p className="font-semibold text-[#4A5A6A] text-right">{testimonial.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;