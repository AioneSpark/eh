// pages/Doctors.tsx
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Phone, Mail, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { supabase } from "../supabaseClient";

// Doctor Card Component
const DoctorCard = ({ doctor, index }) => {
  const [imageError, setImageError] = useState(false);

  // Use education from backend (not qualification)
  const educationText = doctor.education || "";

  return (
    <motion.div
      key={doctor.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full group"
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 h-full flex flex-col justify-between bg-white rounded-3xl">
        
        {/* Doctor Image with Overlay Effect */}
        <div className="relative h-48 md:h-56 lg:h-64 w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          
          <div className="relative h-full w-full flex items-center justify-center p-4">
            {doctor.image && !imageError ? (
              <img
                src={doctor.image}
                alt={doctor.name}
                className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                onError={() => {
                  console.error("Image failed to load:", doctor.image);
                  setImageError(true);
                }}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E84D3D] to-[#4A5A6A] flex items-center justify-center">
                <div className="text-white text-xl font-bold">
                  {doctor.name?.split(' ').map(n => n[0]).join('') || 'DR'}
                </div>
              </div>
            )}
          </div>

          {/* Floating Specialty Badge */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full shadow-lg z-20" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}>
            <span className="text-xs font-bold text-[#E84D3D]">
              {doctor.specialization || "General"}
            </span>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="p-4 md:p-5 flex flex-col justify-between flex-1 text-center space-y-3">
          <div>
            {/* Doctor Name with Decorative Line */}
            <h3 className="text-lg md:text-xl font-bold text-[#4A5A6A] mb-2">
              {doctor.name || "Unknown Doctor"}
            </h3>
            <div className="h-1 w-12 rounded-full mx-auto mb-3" style={{
              background: 'linear-gradient(90deg, #E84D3D 0%, #4A5A6A 100%)'
            }} />

            {/* Education Box (not Qualification) */}
            <div className="mb-4 rounded-xl p-3 space-y-2" style={{
              background: 'linear-gradient(135deg, rgba(232, 77, 61, 0.05) 0%, rgba(74, 90, 106, 0.05) 100%)'
            }}>
              <div className="flex items-center justify-center text-xs text-[#E84D3D] mb-2">
                <GraduationCap className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-wide">Education</span>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                {educationText}
              </p>
              
              {/* Contact info if available */}
              {(doctor.phone || doctor.email) && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                  {doctor.phone && (
                    <div className="flex items-center justify-center text-xs text-gray-600">
                      <Phone className="h-2.5 w-2.5 mr-1 flex-shrink-0" />
                      <span className="text-xs">{doctor.phone}</span>
                    </div>
                  )}
                  {doctor.email && (
                    <div className="flex items-center justify-center text-xs text-gray-600">
                      <Mail className="h-2.5 w-2.5 mr-1 flex-shrink-0" />
                      <span className="text-xs truncate">{doctor.email}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Contact Button */}
          <div className="mt-3">
            <Link to="/contact" state={{ doctorName: doctor.name }} className="inline-block w-full">
              <Button 
                className="w-full text-white py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-[#d63d2d] text-sm"
                style={{
                  background: '#E84D3D',
                  boxShadow: '0 8px 20px rgba(232, 77, 61, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(232, 77, 61, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(232, 77, 61, 0.3)';
                }}
              >
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const Doctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend-ൽ നിന്നും doctors fetch ചെയ്യുക
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching doctors from Supabase...");
        
        const { data, error: supabaseError } = await supabase
          .from("doctors")
          .select("*")
          .order("name", { ascending: true });

        if (supabaseError) {
          console.error("Supabase error details:", supabaseError);
          setError("Failed to load doctors. Please try again.");
          return;
        }

        console.log("Raw doctors data from backend:", data);
        
        if (!data) {
          console.log("No data returned from database");
          setDoctors([]);
          setLoading(false);
          return;
        }

        // ഡാറ്റ format ചെയ്യുക - ശരിയായ column names ഉപയോഗിക്കുക
        const formattedData = data.map(doctor => {
          // Log each doctor for debugging
          console.log("Processing doctor:", {
            id: doctor.id,
            name: doctor.name,
            specialization: doctor.specialization,
            education: doctor.education,
            phone: doctor.phone,
            email: doctor.email,
            image: doctor.image
          });
          
          return {
            id: doctor.id,
            name: doctor.name || "",
            specialization: doctor.specialization || "General",
            education: doctor.education || "", // Backend-ൽ education എന്ന column ആണ്
            phone: doctor.phone || "",
            email: doctor.email || "",
            image: doctor.image || null
          };
        });

        console.log("Formatted doctors data:", formattedData);
        setDoctors(formattedData);
        
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while loading doctors: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Get all unique specialties for filter buttons
  const allSpecialties = useMemo(() => {
    if (!doctors.length) {
      console.log("No doctors for specialties");
      return ["All"];
    }
    
    const specialties = doctors
      .map(doctor => doctor.specialization || "General")
      .filter(Boolean);
    
    const uniqueSpecialties = ["All", ...new Set(specialties)].sort();
    console.log("Available specialties:", uniqueSpecialties);
    
    return uniqueSpecialties;
  }, [doctors]);

  // Filter doctors based on selected specialty and search term
  const filteredDoctors = useMemo(() => {
    if (!doctors.length) {
      console.log("No doctors to filter");
      return [];
    }
    
    const filtered = doctors.filter(doctor => {
      const doctorSpecialty = doctor.specialization || "";
      const doctorName = doctor.name || "";
      const doctorEducation = doctor.education || ""; // education column ഉപയോഗിക്കുക
      
      const matchesSpecialty = selectedSpecialty === "All" || 
                             doctorSpecialty === selectedSpecialty;
      
      const matchesSearch = doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctorSpecialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctorEducation.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSpecialty && matchesSearch;
    });
    
    console.log("Filtered doctors:", filtered.length);
    return filtered;
  }, [doctors, selectedSpecialty, searchTerm]);

  // Search input handler
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#E84D3D] mb-4 mx-auto"></div>
          <p className="text-gray-600 text-lg font-medium">Loading doctors...</p>
          <p className="text-gray-400 text-sm mt-2">Fetching the latest information from database</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Error Loading Doctors</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          
          <div className="text-sm text-gray-500 mb-8 p-4 bg-gray-50 rounded-lg text-left">
            <p className="font-medium mb-2">Possible issues:</p>
            <ul className="space-y-1">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Database connection issue</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>"doctors" table doesn't exist</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>No data in the table</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => window.location.reload()}
              className="bg-[#E84D3D] hover:bg-[#d43d2d] text-white px-8 py-3 rounded-lg font-medium"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => {
                // Check database connection
                console.log("Checking database...");
                console.log("Doctors in state:", doctors.length);
                console.log("Supabase client:", supabase);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              Debug Info
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Debug Info - Development മോഡിൽ മാത്രം */}
    
      {/* Header Section */}
      <section className="pt-6 pb-4 md:pt-10 md:pb-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A5A6A] mb-4">
              Our Expert Doctors
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mb-6">
              Meet our team of highly qualified and experienced medical professionals 
              dedicated to providing exceptional healthcare services.
            </p>
            
            {/* Search Bar */}
            
            
           
          </motion.div>

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
           
            
            {/* Desktop - Horizontal Scroll */}
            <div className="hidden md:flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {allSpecialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedSpecialty === specialty
                      ? 'bg-[#E84D3D] text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>

            {/* Mobile - Dropdown */}
            <div className="md:hidden">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-[#E84D3D] focus:ring-2 focus:ring-[#E84D3D]/20 outline-none transition-all duration-300 text-base shadow-sm"
              >
                {allSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === "All" ? "All Specialties" : specialty}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid Section */}
      <section className="py-8 md:py-10 bg-gray-50">
        <div className="container px-4">
          {/* Active filters info */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-gray-600 text-base">
                Showing <span className="font-bold text-[#4A5A6A]">{filteredDoctors.length}</span> 
                {filteredDoctors.length === 1 ? " doctor" : " doctors"}
                {selectedSpecialty !== "All" && (
                  <span> in <span className="font-bold text-[#E84D3D]">{selectedSpecialty}</span></span>
                )}
                {searchTerm && (
                  <span> for "<span className="font-bold text-[#4A5A6A]">{searchTerm}</span>"</span>
                )}
              </p>
            </div>
            
            {(selectedSpecialty !== "All" || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedSpecialty("All");
                  setSearchTerm("");
                }}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center gap-2 font-medium"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear filters
              </button>
            )}
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredDoctors.map((doctor, index) => (
                <DoctorCard key={doctor.id} doctor={doctor} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No doctors found</h3>
              <p className="text-gray-600 text-base mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? `No doctors found matching "${searchTerm}"`
                  : `No doctors found in ${selectedSpecialty} specialty`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedSpecialty("All");
                    setSearchTerm("");
                  }}
                  className="px-6 py-3 bg-[#E84D3D] text-white rounded-lg hover:bg-[#d43d2d] transition-colors duration-300 font-medium"
                >
                  View all doctors
                </button>
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 font-medium"
                >
                  Clear search
                </button>
              </div>
            </motion.div>
          )}


        </div>
      </section>
    </div>
  );
};

export default Doctors;