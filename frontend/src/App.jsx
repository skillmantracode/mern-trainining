import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProgramPage from "./pages/ProgramPage";
import EventPage from "./pages/EventPage";
import SyllabusPage from "./pages/SyllabusPage";
import NoticePage from "./pages/NoticePage";
import Login from "./components/user/Login";
import StudentRegistration from "./components/user/StudentRegistration";
import StudentDetails from "./pages/admin/student/StudentDetail";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import WelcomeMessage from "./pages/admin/WelcomeMessage";
import GalleryPage from "./pages/GalleryPage";
import StudentList from "./pages/admin/student/ManageStudent";
import AdminAbout from "./pages/admin/landing/About";
import AdminAchievement from "./pages/admin/landing/Achievement";
import AdminWhyChooseUs from "./pages/admin/landing/ChooseReason";
import AdminGallerySection from "./pages/admin/gallery/Gallery";
import AdminNoticeSection from "./pages/admin/notice/Notice";
import AdminEventSection from "./pages/admin/events/Event";
import AdminSyllabusSection from "./pages/admin/syllabus/Syllabus";
import AdminProgramsSection from "./pages/admin/program/Program";
import ManageStaff from "./pages/admin/staff/ManageStaff";
import Settings from "./pages/admin/Setting";
import TotalStudent from "./pages/admin/student/TotalStudent";
import AddStudent from "./pages/admin/student/AddStudent";
import UpdateStudent from "./pages/admin/student/UpdateStudent";
import Toast from "./components/Toast";
import TotalStaff from "./pages/admin/staff/TotalStaff";
import UpdatedStudent from "./pages/admin/staff/UpdateStaff";
import StaffDetails from "./pages/admin/staff/StaffDetails";

function App() {
  return (
    <>
      <Toast />

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}

          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/programs" element={<ProgramPage />} />
            <Route path="/syllabus" element={<SyllabusPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/notices" element={<NoticePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoutes/>}>
            <Route path="/admin" element={<AdminLayout/>}>
              <Route path="/admin/" element={<Dashboard />} />
              <Route
                path="/admin/studentdetails"
                element={<StudentDetails />}
              />
              <Route path="/admin/students" element={<StudentList />} />
              <Route
                path="/admin/welcome-message"
                element={<WelcomeMessage />}
              />
              <Route path="/admin/about" element={<AdminAbout />} />
              <Route path="/admin/achievement" element={<AdminAchievement />} />
              <Route
                path="/admin/choose-reason"
                element={<AdminWhyChooseUs />}
              />
              <Route path="/admin/gallery" element={<AdminGallerySection />} />
              <Route path="/admin/notices" element={<AdminNoticeSection />} />
              <Route
                path="/admin/syllabus"
                element={<AdminSyllabusSection />}
              />
              <Route path="/admin/events" element={<AdminEventSection />} />
              <Route
                path="/admin/programs"
                element={<AdminProgramsSection />}
              />
              <Route path="/admin/staffs" element={<ManageStaff />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/staffs/all-staff" element={<TotalStaff />} />
              <Route path="/admin/staffs/add-staffs" element={<AddStaff />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/users/create" element={<CreateUser />} />
              <Route path="/admin/users/total" element={<TotalUser />} />
              <Route path="/admin/users/:id" element={<TotalProfileUser />} />
              <Route
                path="/admin/department/add-department"
                element={<AddDepartment />}
              />
              <Route
                path="/admin/designation/add-designation"
                element={<AddDesignation />}
              />

              <Route
                path="/admin/designation/update/:id"
                element={<UpdateDesignation />}
              />
              <Route path="/admin/department" element={<ManageDepartment />} />
              <Route
                path="/admin/designation/"
                element={<ManageDesignation />}
              />
              <Route
                path="/admin/department/update/:id"
                element={<UpdateDepartment />}
              />
              <Route
                path="/admin/staffs/update/:id"
                element={<UpdatedStudent />}
              />
              <Route path="/admin/staffs/:id" element={<StaffDetails />} />

              <Route
                path="/admin/students/add-students"
                element={<AddStudent />}
              />
              <Route
                path="/admin/students/all-student"
                element={<TotalStudent />}
              />
              <Route path="/admin/students/:id" element={<StudentDetails />} />
              <Route
                path="/admin/students/update/:id"
                element={<UpdateStudent />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
import AddStaff from "./pages/admin/staff/AddStaff";
import Users from "./pages/admin/user/Users";
import CreateUser from "./pages/admin/CreateUser";
import Profile from "./components/user/Profile";
import ScrollToTop from "./ScrollToTop";
import TotalUser from "./pages/admin/user/TotalUser";
import TotalProfileUser from "./pages/admin/user/ViewUser";
import AddDepartment from "./pages/admin/department/AddDepartment";
import AddDesignation from "./pages/admin/designation/AddDesignation";

import UpdateDesignation from "./pages/admin/designation/UpdateDesignation";
import UpdateDepartment from "./pages/admin/department/UpdateDepartment";
import ManageDesignation from "./pages/admin/designation/ManageDesignation";
import ManageDepartment from "./pages/admin/department/ManageDepartment";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";

export default App;
