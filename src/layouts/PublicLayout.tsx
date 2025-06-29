import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export function PublicLayout() {
    const { isSignedIn, isLoaded } = useUser();

    // Show loading while checking authentication
    if (!isLoaded) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#161618] text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8E972]"></div>
                <p className="mt-4">Loading...</p>
            </div>
        );
    }

    // Redirect to dashboard if already signed in
    if (isSignedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#161618]">
            <Outlet />
        </div>
    );
} 