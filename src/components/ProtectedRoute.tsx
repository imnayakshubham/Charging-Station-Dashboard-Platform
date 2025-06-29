import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isSignedIn, isLoaded } = useUser();
    const location = useLocation();

    if (!isLoaded) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#161618] text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8E972]"></div>
                <p className="mt-4">Loading...</p>
            </div>
        );
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return <>{children}</>;
} 