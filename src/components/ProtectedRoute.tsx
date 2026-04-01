import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
// Assuming you have an auth store or context for user roles
// For now, placeholder - you need to implement actual auth logic

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    // Placeholder: check if user is authenticated and has required role
    // const { user, isAuthenticated } = useAuth(); // Implement this
    const isAuthenticated = true; // Placeholder
    const userRole = 'admin'; // Placeholder

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;