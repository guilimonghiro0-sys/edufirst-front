import { createBrowserRouter, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Index from './pages/Index';
import DashboardLayout from './components/DashboardLayout';
import StudentsPage from './pages/admin/StudentsPage';
import OverviewPage from './pages/admin/OverviewPage';
import DisciplinePage from './pages/admin/DisciplinePage';
import HRPage from './pages/admin/HRPage';
import TransportPage from './pages/admin/TransportPage';
import AccessManagementPage from './pages/admin/AccessManagementPage';
import StudentDetails from './pages/shared/StudentDetails';
import AdminAddStudentPage from './pages/admin/AdminAddStudentPage';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterTeacher from './pages/RegisterTeacher';
import RegisterStudent from './pages/RegisterStudent';
import RegisterInscription from './pages/RegisterInscription';
import GradesEntryPage from './pages/teacher/GradesEntryPage';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ChildrenPage from './pages/parent/ChildrenPage';
import WalletPage from './pages/parent/WalletPage';
import Finances from './pages/admin/Finances';
import AdminDashboard from './pages/admin/dashboards/AdminDashboard';
import AdminDashboardPage from './pages/admin/dashboards/AdminDashboardPage';
import ConfirmAccountPage from './pages/ConfirmAccountPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentDashboardV2 from './pages/student/StudentDashboardV2';
import EduStore from './pages/store/EduStore';
import CheckoutPage from './pages/store/CheckoutPage';

// Dans le bloc des routes (par exemple après les routes parent)
export const router = createBrowserRouter([

{
    path:"/dashboard/student", 
    element:<StudentDashboard />
},
{
    path:"/dashboard/student/v2", 
    element:<StudentDashboardV2 />
},
{
    path:"/store", 
    element:<EduStore />
},
{
    path:"/checkout", 
    element:<CheckoutPage />
},

    {
        path: "/page/confirm-account/:token",
        element: <ConfirmAccountPage />
    },
    {
        path: "/page/reset-password",
        element: <ResetPasswordPage />
    },
    {
        path: "/page/reset-password/confirm/:token",
        element: <ResetPasswordConfirmPage />
    },

    {
        path: '/admin/finances',
        element: <Finances />,
    },
    {
        path: '/register/teacher',
        element: <RegisterTeacher />,
    },
    {
        path: '/register/student',
        element: <RegisterStudent />,
    },
    {
        path: '/register/inscription',
        element: <RegisterInscription />,
    },
    {
        path: '/onboarding/school',
        element: <Onboarding />,
    },
    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/admin',
        element: <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <AdminDashboardPage /> },
            { path: 'students', element: <StudentsPage /> },
            { path: 'students/add', element: <AdminAddStudentPage /> },
            { path: 'discipline', element: <DisciplinePage /> },
            { path: 'hr', element: <HRPage /> },
            { path: 'transport', element: <TransportPage /> },
            { path: 'access', element: <AccessManagementPage /> },
            // autres routes admin...
        ],
    },
    {
        path: '/student/:studentId',
        element: <ProtectedRoute allowedRoles={['admin', 'teacher', 'parent', 'student']}><StudentDetails /></ProtectedRoute>,
    },
    {
        path: '/teacher',
        element: <ProtectedRoute allowedRoles={['teacher']}><DashboardLayout /></ProtectedRoute>,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <TeacherDashboard /> },
            { path: 'grades', element: <GradesEntryPage /> },
            { path: 'students', element: <StudentsPage /> },
            {path: 'students/:studentId', element: <StudentDetails /> },
            { path: 'overview', element: <OverviewPage /> },
            { path: 'discipline', element: <DisciplinePage /> },
            { path: 'settings', element: <div>Paramètres du professeur</div> },
            { path: 'library', element: <div>Bibliothèque du professeur</div> },
            { path : 'calendar', element: <div>Calendrier du professeur</div> },
            { path : 'chat', element: <div>Chat du professeur</div> },
            { path : 'classes', element: <div>Gestion des classes du professeur</div> },

            // autres routes teacher...
        ],
    },
    {
        path: '/parent',
        element: <ProtectedRoute allowedRoles={['parent']}><DashboardLayout /></ProtectedRoute>,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <div>Dashboard Parent</div> },
            { path: 'children', element: <ChildrenPage /> },
            { path: 'wallet', element: <WalletPage /> },
            // autres routes parent...
        ],
    },
    {
        path: '/student',
        element: <ProtectedRoute allowedRoles={['student']}><DashboardLayout /></ProtectedRoute>,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <div>Dashboard Étudiant</div> },
            // autres routes student...
        ],
    },
    {
        path: '/unauthorized',
        element: <div className="p-8 text-center">Accès refusé</div>,
    },
    // autres routes pour teacher, parent, student...
]);