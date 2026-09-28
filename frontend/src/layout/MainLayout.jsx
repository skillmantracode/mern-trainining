import { Outlet } from "react-router-dom";

import Navigation from "../components/header/Navigation";
import Footer from "../components/footer/Footer";
import TopBar from "../components/header/TopBar";

export default function MainLayout() {
  return (
    <div className="min-h-screen ">
      <TopBar/>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
