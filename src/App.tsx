import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Keep only if needed
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/Adminpage/AdminLogin";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/Adminpage/ProtectedRoute";
import AdminDashboard from "./pages/Adminpage/AdminDashboard";
import DoctersAdmin from "./pages/Adminpage/DoctersAdmin";
import EventsAdmin from "./pages/Adminpage/EventAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
             <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/doctersadmin" element={<DoctersAdmin />} />
              <Route path="/eventadmin" element={<EventsAdmin />} />
          </Route>

          {/* Example of protected route for AdminDashboard */}
          {/* <Route path="/AdminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> */}

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
