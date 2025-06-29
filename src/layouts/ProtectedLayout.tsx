import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export function ProtectedLayout() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#161618]">
                <Outlet />
            </div>
        </ProtectedRoute>
    );
} 