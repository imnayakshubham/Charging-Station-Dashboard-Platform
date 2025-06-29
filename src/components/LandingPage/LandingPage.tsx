import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function LandingPage() {
    const { isSignedIn } = useUser();


    if (isSignedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#161618] text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
            <p className="text-lg mb-8">This is the public landing page. Please sign in to access the dashboard.</p>
            <a href="/sign-in" className="px-6 py-2 bg-[#23291E] text-[#C8E972] rounded-lg font-semibold border border-[#C8E972] hover:bg-[#C8E972] hover:text-[#23291E] transition">Sign In</a>
        </div>
    )
}


export default LandingPage