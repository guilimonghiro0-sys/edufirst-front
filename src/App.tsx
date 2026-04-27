import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import LanguageSwitcher from "./components/LanguageSwitcher"; // ← import du sélecteur

// Pages (imports conservés)
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import AdminDashboard from "./pages/admin/dashboards/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentDashboardV2 from "./pages/student/StudentDashboardV2";
import ParentDashboard from "./pages/parent/ParentDashboard";
import StudentsPage from "./pages/admin/StudentsPage";
import AccessManagementPage from "./pages/admin/AccessManagementPage";
import OverviewPage from "./pages/admin/OverviewPage";
import DisciplinePage from "./pages/admin/DisciplinePage";
import HRPage from "./pages/admin/HRPage";
import TransportPage from "./pages/admin/TransportPage";
import GradesEntryPage from "./pages/teacher/GradesEntryPage";
import EduStore from "./pages/store/EduStore";
import CheckoutPage from "./pages/store/CheckoutPage";
import ProfilePage from "./pages/shared/ProfilePage";
import SettingsPage from "./pages/shared/SettingsPage";
import NotificationsPage from "./pages/shared/NotificationsPage";
import ChatPage from "./pages/shared/ChatPage";
import CalendarPage from "./pages/shared/CalendarPage";
import SchoolWallPage from "./pages/shared/SchoolWallPage";
import HonorBoardPage from "./pages/shared/HonorBoardPage";
import ChildrenPage from "./pages/parent/ChildrenPage";
import WalletPage from "./pages/parent/WalletPage";
import RegisterInscription from "./pages/RegisterInscription";
import NotFound from "./pages/NotFound";
import RegistrationsPage from "./pages/admin/RegistrationsPage";
import Finances from "./pages/admin/Finances";
import RegisterTeacher from "./pages/RegisterTeacher";
import RegisterParent from "./pages/RegisterParent";
import ConfirmAccountPage from "./pages/ConfirmAccountPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {loading ? (
            <Preloader key="preloader" />
          ) : (
            <BrowserRouter key="app">
              {/* Sélecteur de langue global (visible sur toutes les pages) */}
              <LanguageSwitcher />
              <Routes>
                {/* Toutes tes routes existantes, inchangées */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/inscription" element={<RegisterInscription />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/confirm-account/:token" element={<ConfirmAccountPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/reset-password/confirm/:token" element={<ResetPasswordConfirmPage />} />

                {/* Admin */}
                <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/admin/overview" element={<OverviewPage />} />
                <Route path="/dashboard/admin/students" element={<StudentsPage />} />
                <Route path="/dashboard/admin/access" element={<AccessManagementPage />} />
                <Route path="/dashboard/admin/registrations" element={<RegistrationsPage />} />
                <Route path="/dashboard/admin/finances" element={<Finances />} />
                <Route path="/dashboard/admin/discipline" element={<DisciplinePage role="admin" />} />
                <Route path="/dashboard/admin/hr" element={<HRPage />} />
                <Route path="/dashboard/admin/calendar" element={<CalendarPage role="admin" />} />
                <Route path="/dashboard/admin/transport" element={<TransportPage />} />
                <Route path="/dashboard/admin/chat" element={<ChatPage role="admin" />} />
                <Route path="/dashboard/admin/wall" element={<SchoolWallPage role="admin" />} />
                <Route path="/dashboard/admin/honor" element={<HonorBoardPage role="admin" />} />
                <Route path="/dashboard/admin/store" element={<EduStore role="admin" />} />
                <Route path="/dashboard/admin/profile" element={<ProfilePage role="admin" />} />
                <Route path="/dashboard/admin/settings" element={<SettingsPage role="admin" />} />
                <Route path="/dashboard/admin/notifications" element={<NotificationsPage role="admin" />} />

                {/* Teacher */}
                <Route path="/dashboard/teacher" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/teacher/grades" element={<GradesEntryPage />} />
                <Route path="/dashboard/teacher/discipline" element={<DisciplinePage role="teacher" />} />
                <Route path="/dashboard/teacher/calendar" element={<CalendarPage role="teacher" />} />
                <Route path="/dashboard/teacher/chat" element={<ChatPage role="teacher" />} />
                <Route path="/dashboard/teacher/wall" element={<SchoolWallPage role="teacher" />} />
                <Route path="/dashboard/teacher/profile" element={<ProfilePage role="teacher" />} />
                <Route path="/dashboard/teacher/settings" element={<SettingsPage role="teacher" />} />
                <Route path="/dashboard/teacher/notifications" element={<NotificationsPage role="teacher" />} />

                {/* Student */}
                <Route path="/dashboard/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/student/v2" element={<StudentDashboardV2 />} />
                <Route path="/dashboard/student/calendar" element={<CalendarPage role="student" />} />
                <Route path="/dashboard/student/wall" element={<SchoolWallPage role="student" />} />
                <Route path="/dashboard/student/honor" element={<HonorBoardPage role="student" />} />
                <Route path="/dashboard/student/profile" element={<ProfilePage role="student" />} />
                <Route path="/dashboard/student/settings" element={<SettingsPage role="student" />} />
                <Route path="/dashboard/student/notifications" element={<NotificationsPage role="student" />} />

                {/* Parent */}
                <Route path="/dashboard/parent" element={<ProtectedRoute allowedRoles={['parent']}><ParentDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/parent/children" element={<ChildrenPage />} />
                <Route path="/dashboard/parent/wallet" element={<WalletPage />} />
                <Route path="/dashboard/parent/calendar" element={<CalendarPage role="parent" />} />
                <Route path="/dashboard/parent/chat" element={<ChatPage role="parent" />} />
                <Route path="/dashboard/parent/wall" element={<SchoolWallPage role="parent" />} />
                <Route path="/dashboard/parent/honor" element={<HonorBoardPage role="parent" />} />
                <Route path="/dashboard/parent/store" element={<EduStore role="parent" />} />
                <Route path="/dashboard/parent/profile" element={<ProfilePage role="parent" />} />
                <Route path="/dashboard/parent/settings" element={<SettingsPage role="parent" />} />
                <Route path="/dashboard/parent/notifications" element={<NotificationsPage role="parent" />} />

                {/* Store */}
                <Route path="/store" element={<EduStore />} />
                <Route path="/checkout" element={<CheckoutPage />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;