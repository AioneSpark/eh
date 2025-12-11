import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logos/Mediversity LOGO copy.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/doctors", label: "Doctors" },
    { path: "/events", label: "Events" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
     

      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-28 sm:w-36 md:w-40 flex-shrink-0">
              <img src={logo} alt="Logo" className="object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#E84D3D] ${
                  isActive(link.path) ? "text-[#E84D3D]" : "text-[#4A5A6A]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Emergency Contact */}
          <div className="hidden md:flex items-center space-x-4 text-red-500">
            <a
              href="tel:+917593955550"
              className="flex items-center space-x-2 text-sm animate-blink-red transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Emergency: 7593955550, 7593955551</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#4A5A6A]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur"
            >
              <nav className="container py-4 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-[#E84D3D] ${
                      isActive(link.path) ? "text-[#E84D3D]" : "text-[#4A5A6A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Emergency Contact */}
                <a
                  href="tel:+917593955550"
                  className="flex items-center space-x-2 text-sm animate-blink-red text-red-500"
                >
                  <Phone className="h-4 w-4" />
                  <span>Emergency: 7593955550, 7593955551</span>
                </a>

                {/* Mobile Book Appointment Button
                <Button className="w-full bg-[#E84D3D] hover:bg-[#d43d2d] text-white">
                  Book Appointment
                </Button> */}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
