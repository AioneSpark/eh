import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E84D3D]/5 to-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-[#E84D3D] to-[#4A5A6A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]" />
        </div>
        <div className="relative container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            We're here to help. Reach out to us for appointments or inquiries
          </motion.p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: "Visit Us",
                content: "43/A, Elettil Vattoli, Kizhakkoth, Koduvally, Kerala 673572",
              },
              {
                icon: Phone,
                title: "Call Us",
                content: "0495 2200101, 0495 2200219,20,21",
              },
              {
                icon: Mail,
                title: "Email Us",
                content: "ehmediversityllp@gmail.com",
              },
              {
                icon: Clock,
                title: "Working Hours",
                content: "24/7 Emergency Services",
              },
            ].map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="p-6 text-center bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col justify-between hover:border-[#E84D3D]/20">
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#E84D3D] mb-4 shadow-md">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#4A5A6A] mb-2">{info.title}</h3>
                    <p className="text-sm text-gray-600">{info.content}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Additional Info */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 border border-gray-200 shadow-lg">
                <h2 className="text-2xl font-bold text-[#4A5A6A] mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 focus:border-[#E84D3D] focus:ring-[#E84D3D]/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1 focus:border-[#E84D3D] focus:ring-[#E84D3D]/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 focus:border-[#E84D3D] focus:ring-[#E84D3D]/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="mt-1 focus:border-[#E84D3D] focus:ring-[#E84D3D]/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#E84D3D] hover:bg-[#d43d2d] text-white shadow-md hover:shadow-lg transition-all"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="p-6 bg-gradient-to-br from-[#E84D3D]/5 to-[#4A5A6A]/5 border-2 border-[#E84D3D]/20">
                <h3 className="text-xl font-bold text-[#4A5A6A] mb-4">Emergency Services</h3>
                <p className="text-gray-600 mb-4">
                  For medical emergencies, please call our emergency hotline immediately or visit our emergency department.
                </p>
                <div className="flex items-center space-x-2 text-[#E84D3D] font-bold text-lg">
                  <div className="h-8 w-8 rounded-lg bg-[#E84D3D] flex items-center justify-center">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <span>Emergency: 7593955550, 7593955551</span>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-gray-200 shadow-md">
                <h3 className="text-xl font-bold text-[#4A5A6A] mb-4">Department Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Emergency</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-lg bg-[#E84D3D] flex items-center justify-center">
                        <Clock className="h-3 w-3 text-white" />
                      </div>
                      <span className="font-semibold text-[#4A5A6A]">24/7</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Outpatient Services</span>
                    <span className="font-semibold text-[#4A5A6A]">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pharmacy</span>
                    <span className="font-semibold text-[#4A5A6A]">7:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Laboratory</span>
                    <span className="font-semibold text-[#4A5A6A]">6:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </Card>

              {/* <Card className="p-6 bg-white border border-gray-200 shadow-md">
                <h3 className="text-xl font-bold text-[#4A5A6A] mb-4">Additional Contact Numbers</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-[#E84D3D] flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600">Appointment Desk</p>
                      <p className="font-semibold text-[#4A5A6A]">0495 2200101</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-[#E84D3D] flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600">Billing & Insurance</p>
                      <p className="font-semibold text-[#4A5A6A]">0495 2200219</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-[#E84D3D] flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600">Patient Information</p>
                      <p className="font-semibold text-[#4A5A6A]">0495 2200220</p>
                    </div>
                  </div>
                </div>
              </Card> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-1 md:py-0 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-[#E84D3D] mb-4 shadow-md">
              <Navigation className="h-8 w-8 text-white" />
            </div> */}
            {/* <h2 className="text-3xl md:text-4xl font-bold text-[#4A5A6A] mb-2">Find Us</h2> */}
            {/* <p className="text-gray-600 text-lg mb-4">Visit us at our medical center</p>
            <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#E84D3D]/10 text-[#E84D3D] font-medium">
              <MapPin className="h-4 w-4 mr-2" />
              Kizhakkoth, Elettil, Kerala 673572
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#E84D3D]/20"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.996135174207!2d75.882679!3d11.397442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba667cf0a78a377%3A0x4435f5da6d056fc8!2sElettil%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Elettil Hospital Location Map"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Quick Directions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
           
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;