import { SignIn, useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

function SignInWithAuth() {
    const { isSignedIn } = useUser();


    React.useEffect(() => {
        if (isSignedIn) {
            console.log('User signed in from SignInWithAuth, redirecting to dashboard...');
            window.location.href = '/dashboard';
        }
    }, [isSignedIn]);


    if (isSignedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/dashboard"
            appearance={{
                elements: {
                    formButtonPrimary: "bg-[#C8E972] text-[#23291E] hover:bg-[#C8E972]/90",
                    card: "bg-[#161618] border-[#23291E]",
                    headerTitle: "text-white",
                    headerSubtitle: "text-gray-400",
                    formFieldLabel: "text-white",
                    formFieldInput: "bg-[#23291E] border-[#23291E] text-white",
                    footerActionLink: "text-[#C8E972] hover:text-[#C8E972]/90",
                }
            }}
        />
    );
}

export default SignInWithAuth