import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  // Routes where footer should NOT be shown
  const hideFooterRoutes = [
    "/admin",
    "/admindashboard",
    "/doctersadmin",
    "/eventadmin",
  ];

  // Check if current path starts with any of the hidden routes
  const shouldHideFooter = hideFooterRoutes.some(route =>
    location.pathname.toLowerCase().startsWith(route)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default Layout;
