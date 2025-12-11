import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Target, Eye,  Calendar,  Award, 
  Clock, 
  Shield, 
  Users, 
  Home, 
  Heart  } from "lucide-react";
import hospitalInterior from "@/assets/hospital-interior.jpg";

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We treat every patient with empathy and respect",
  },
  {
    icon: Award,
    title: "Medical Excellence",
    description: "Committed to the highest standards of healthcare",
  },
  {
    icon: Shield,
    title: "Patient Safety",
    description: "Your safety is our top priority in every procedure",
  },
  {
    icon: Users,
    title: "Collaborative Approach",
    description: "Teamwork for the best patient outcomes",
  },
];

const stats = [
  { number: "10+", label: "Years of Service" },
  { number: "50+", label: "Medical Experts" },
  { number: "100K+", label: "Happy Patients" },
  { number: "15+", label: "Departments" },
];

const events = [
  {
    date: "Jan 15, 2025",
    title: "Free Cardiac Checkup Camp",
    description: "A free heart health awareness program led by our cardiology team.",
    location: "Excellence Health Auditorium",
  },
  {
    date: "Feb 5, 2025",
    title: "Diabetes Awareness Workshop",
    description: "Learn about diabetes prevention, symptoms, and early detection.",
    location: "Conference Hall - Block B",
  },
];

const About = () => {
  return (
    <div className="min-h-screen pb-10">

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hospitalInterior}
            alt="Hospital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A5A6A]/90 to-[#4A5A6A]/70" />
        </div>
        <div className="relative z-10 text-center text-white container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            About Excellence Health
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90"
          >
            Committed to Excellence in Healthcare
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#E84D3D] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

 {/* Our Story Section - Box with #FF5733 theme */}
<section className="py-16 md:py-24">
  <div className="container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      {/* Box with #FF5733 top border */}
      <div className="bg-white rounded-lg shadow-lg border-t-4 border-[#FF5733] p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#4A5A6A] mb-6 text-center">
          Our Story
        </h2>

        <p className="text-lg text-gray-600 mb-6">
          Founded over <span className="font-semibold text-[#FF5733]">10 years ago</span>, Excellence Health Institute has been at
          the forefront of medical innovation and patient care. What started as
          a small community hospital has grown into a <span className="font-semibold text-[#4A5A6A]">leading healthcare
          institution</span>, serving thousands of patients every year.
        </p>

        <p className="text-lg text-gray-600">
          Our journey has been guided by a simple principle: to provide
          <span className="font-semibold text-[#FF5733]"> world-class healthcare</span>
          that is accessible, affordable, and compassionate. Today, we continue to invest in cutting-edge technology,
          attract top medical talent, and expand our services to meet the
          evolving needs of our community.
        </p>
      </div>
    </motion.div>
  </div>
</section>

{/* Mission & Vision */}

<section className="py-16 md:py-24 bg-gray-50">
  <div className="container">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-8 h-full bg-gradient-to-br from-[#E84D3D]/5 to-[#4A5A6A]/5 border-2 border-[#E84D3D]/20">
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E84D3D] mb-4">
            <Target className="h-8 w-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-[#4A5A6A] mb-4">
            Our Mission
          </h3>

          <p className="text-gray-600">
            To provide exceptional healthcare services that improve the quality 
            of life for our patients and communities. We are committed to 
            delivering compassionate, patient-centered care using the latest 
            medical advances and technology while maintaining the highest 
            standards of safety and ethics.
          </p>

        </Card>
      </motion.div>

      {/* Vision */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-8 h-full bg-gradient-to-br from-[#4A5A6A]/5 to-[#E84D3D]/5 border-2 border-[#4A5A6A]/20">
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E84D3D] mb-4">
            <Eye className="h-8 w-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-[#4A5A6A] mb-4">
            Our Vision
          </h3>

          <p className="text-gray-600">
            To be recognized as the leading healthcare provider in our region, 
            known for clinical excellence, innovation, and outstanding patient 
            experience. We envision a future where quality healthcare is 
            accessible to all, and where medical innovation continues to 
            improve lives and communities.
          </p>

        </Card>
      </motion.div>

    </div>
  </div>
</section>


    {/* Core Values */}
<section className="py-16 md:py-24">
  <div className="container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-[#4A5A6A] mb-4">Our Core Values</h2>
      <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
    </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {values.map((value, index) => (
        <motion.div
          key={value.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="h-full"
        >
          <Card className="p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 bg-white h-full flex flex-col justify-between border border-gray-100">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[#E84D3D] mb-3 md:mb-4 shadow-md">
                <value.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[#4A5A6A] mb-1 md:mb-2">{value.title}</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>



{/* Why Choose Us - Elegant Box */}
<section className="py-16 md:py-24 bg-[#E84D3D]/5">
  <div className="container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="relative">
        {/* Background decorative elements */}
        
        <Card className="relative p-6 md:p-12 bg-white border border-gray-200 shadow-xl overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to- from-[#E84D3D]"></div>
          
          {/* Header with ee color background and white icon */}
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E84D3D] mb-4 md:mb-6 shadow-lg">
              <Award className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#4A5A6A] mb-3 md:mb-4">
              Why Choose Elettil Hospital?
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              We combine medical expertise with genuine care for our patients.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { 
                icon: Shield, 
                text: "Experienced and board-certified physicians",
                color: "bg-blue-50"
              },
              { 
                icon: Award, 
                text: "Advanced medical technology and equipment",
                color: "bg-green-50"
              },
              { 
                icon: Users, 
                text: "Comprehensive range of medical services",
                color: "bg-purple-50"
              },
              { 
                icon: Heart, 
                text: "Patient-centered care",
                color: "bg-pink-50"
              },
              { 
                icon: Clock, 
                text: "24/7 emergency services",
                color: "bg-orange-50"
              },
              { 
                icon: Home, 
                text: "Comfortable and modern facilities",
                color: "bg-cyan-50"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <div className={`p-4 md:p-6 rounded-xl border border-gray-100 ${item.color} hover:shadow-lg transition-all duration-300 h-full hover:border-[#E84D3D]/20`}>
                  <div className="flex items-start">
                    {/* Icon container with ee color background and white icon */}
                    <div className="h-8 w-8 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-lg bg-[#E84D3D] flex items-center justify-center mr-3 md:mr-4 flex-shrink-0 shadow-md">
                      <item.icon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-700 font-medium pt-0.5 md:pt-1 leading-tight">
                      {item.text}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  </div>
</section>


    </div>
  );
};

export default About;
