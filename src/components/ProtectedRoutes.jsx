import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, Outlet } from 'react-router-dom';

// ✅ Redirect to /home if already logged in
export const PublicRoute = () => {
    const user = useSelector(state => state.user);
    const location = useLocation();
    if (user?.emailId && ["/login", "/signup"].includes(location.pathname)) {
        return <Navigate to="/feed" replace />;
    }

    return <Outlet />;

};

// ✅ Redirect to /login if not logged in
export const PrivateRoute = () => {
    const user = useSelector(state => state.user);
    const location = useLocation();
    return user?.emailId ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};