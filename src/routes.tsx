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
import ProtectedRoute from './components/ProtectedRoute';
import RegisterTeacher from './pages/RegisterTeacher';
import RegisterStudent from './pages/RegisterStudent';
import RegisterParent from './pages/RegisterParent';
import GradesEntryPage from './pages/teacher/GradesEntryPage';
import ChildrenPage from './pages/parent/ChildrenPage';
import WalletPage from './pages/parent/WalletPage';

export const router = createBrowserRouter([
    {
        path: '/register/teacher',
        element: <RegisterTeacher />,
    },
    {
        path: '/register/student',
        element: <RegisterStudent />,
    },
    {
        path: '/register/parent',
        element: <RegisterParent />,
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
        element: <ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <OverviewPage /> },
            { path: 'students', element: <StudentsPage /> },
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
            { path: 'dashboard', element: <div>Dashboard Enseignant</div> },
            { path: 'grades', element: <GradesEntryPage /> },
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