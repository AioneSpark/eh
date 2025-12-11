import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logoImage from "@/assets/logos/elettil-hospital.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#6d7781] text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hospital Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
             <div className="h-23 w-20 rounded-lg flex items-center justify-center overflow-hidden">
  <img 
    src={logoImage} 
    alt="EH Logo" 
    className="h-full w-full object-contain"
  />
</div>
              <span className="text-xl font-bold"></span>
            </div>
            <p className="text-sm text-white/70 mb-4">
              Providing exceptional healthcare services with compassion and excellence.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/elettilhospital/" className="hover:text-[#E84D3D] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              {/* <a href="#" className="hover:text-[#E84D3D] transition-colors">
                <Twitter className="h-5 w-5" />
              </a> */}
              <a href="https://www.instagram.com/elettil_hospital_?igsh=NDcxYmgxZXFjYXJn" className="hover:text-[#E84D3D] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              {/* <a href="#" className="hover:text-[#E84D3D] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a> {/* <a href="#" className="hover:text-[#E84D3D] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/" className="hover:text-[#E84D3D] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E84D3D] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#E84D3D] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-[#E84D3D] transition-colors">
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E84D3D] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>General Medicine</li>
              <li>Cardiology</li>
              <li>Orthopedics</li>
              <li>Pediatrics</li>
              <li>Emergency Care</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-[#e4e3e3] flex-shrink-0 mt-0.5" />
                <span>43/A, Elettil Vattoli,Kizhakkoth,Koduvally 673572 </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-[#d4d3d3] flex-shrink-0" />
                <span>0495 2200101,0495 2200219 ,20,21,</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-[#dddddd] flex-shrink-0" />
                <span>ehmediversityllp@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-[#dcdcdc] flex-shrink-0" />
                <span className="text-[#ffffff] font-semibold">Emergency: 7593955550, 7593955551</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
          <p>
  &copy; {new Date().getFullYear()} Designed and developed by{" "}
  <a
    href="https://share.google/kG9i46KNtSIhMD8xr"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#0a0a0a] hover:underline hover:text-[#e3e1e1] transition-colors"
  >
    Aione Spark TechHive LLP
  </a>{" "}

</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;