import { Outlet } from "react-router-dom";
import SideBar from "../pages/admin/SideBar";
import TopBar from "../pages/admin/TopBar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function AdminLayout() {
  const navigate = useNavigate();
  const { isLoggedin } = useAuth();

  // useEffect(()=>{
  //   if(!isLoggedin){
  //      navigate("/login")
  //   }
  // },[])
  return (
    <>
      {/* {isLoggedin ? ( */}
        <div className="h-screen overflow-hidden bg-slate-100 text-slate-800 flex font-sans">
          {/* Sidebar */}
          <div className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white p-4">
            <div className="min-h-0 flex-1 overflow-y-auto">
              <SideBar />
            </div>
          </div>
          {/* Right Side */}
          <main className="flex-1 flex flex-col min-w-0 h-screen">
            {/* Top Bar */}
            <div className="h-14 shrink-0 bg-white border-b border-slate-200 px-6 flex items-center justify-between backdrop-blur-2xl">
              <TopBar />
            </div>

            {/* Main Dynamic Body - ONLY THIS SCROLLS */}
            <div className="p-6 space-y-6 flex-1 min-h-0 overflow-y-auto">
              <Outlet />
            </div>
          </main>
        </div>
      {/* ) : (
        <div>UnAuthorized</div>
      )} */}
    </>
  );
}
