import { useSignUp, useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

function VerifyEmailPage() {
    const { signUp, isLoaded } = useSignUp();
    const { isSignedIn } = useUser();
    const [verificationCode, setVerificationCode] = React.useState('');
    const [isVerifying, setIsVerifying] = React.useState(false);
    const [error, setError] = React.useState('');
    const [isVerified, setIsVerified] = React.useState(false);


    if (isSignedIn) {
        return <Navigate to="/dashboard" replace />;
    }


    React.useEffect(() => {
        if (signUp?.status === "complete") {
            console.log('SignUp status changed to complete, redirecting...');
            setIsVerified(true);

            window.location.href = '/dashboard';
        }
    }, [signUp?.status]);


    React.useEffect(() => {
        if (isSignedIn) {
            console.log('User is signed in, redirecting to dashboard...');
            window.location.href = '/dashboard';
        }
    }, [isSignedIn]);

    if (!isLoaded) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#161618] text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8E972]"></div>
                <p className="mt-4">Loading...</p>
            </div>
        );
    }


    console.log('VerifyEmailPage - signUp:', signUp);
    console.log('VerifyEmailPage - signUp status:', signUp?.status);
    console.log('VerifyEmailPage - signUp verifications:', signUp?.verifications);


    if (signUp?.status === "complete") {
        return <Navigate to="/dashboard" replace />;
    }


    if (!signUp) {
        return <Navigate to="/sign-up" replace />;
    }

    const handleVerifyEmail = async () => {
        if (!verificationCode.trim()) {
            setError('Please enter the verification code');
            return;
        }

        setIsVerifying(true);
        setError('');

        try {
            console.log('Attempting verification with code:', verificationCode);
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });
            console.log('Verification result:', result);


            setVerificationCode('');


            if (signUp.status === "complete") {
                console.log('Verification successful, redirecting to dashboard');
                window.location.href = '/dashboard';
            } else {
                console.log('Verification completed but status is:', signUp.status);

                setTimeout(() => {
                    if (signUp.status === "complete") {
                        window.location.href = '/dashboard';
                    }
                }, 1000);
            }

        } catch (err: any) {
            console.error('Verification error:', err);
            setError(err.errors?.[0]?.message || 'Verification failed. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendCode = async () => {
        try {
            await signUp.prepareEmailAddressVerification();
            setError('');
        } catch (err: any) {
            setError(err.errors?.[0]?.message || 'Failed to resend code. Please try again.');
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#161618] text-white">
            <div className="bg-[#23291E] border border-[#C8E972] rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Verify Your Email</h2>

                {isVerified ? (
                    <div className="text-center">
                        <div className="text-green-400 text-6xl mb-4">✓</div>
                        <p className="text-green-400 mb-4">Email verified successfully!</p>
                        <p className="text-gray-400">Redirecting to dashboard...</p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-400 mb-6 text-center">
                            We've sent a verification code to your email address. Please enter the code below to verify your account.
                        </p>


                        <div className="text-xs text-gray-500 mb-4 p-2 bg-gray-800 rounded">
                            Debug: Status: {signUp?.status}, Verification: {signUp?.verifications?.emailAddress?.status}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="verificationCode" className="block text-sm font-medium text-white mb-2">
                                    Verification Code
                                </label>
                                <input
                                    id="verificationCode"
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="Enter 6-digit code"
                                    className="w-full bg-[#161618] border border-[#C8E972] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8E972] focus:border-transparent"
                                    maxLength={6}
                                />
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleVerifyEmail}
                                disabled={isVerifying || !verificationCode.trim()}
                                className="w-full bg-[#C8E972] text-[#23291E] py-2 px-4 rounded-lg font-semibold hover:bg-[#C8E972]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isVerifying ? 'Verifying...' : 'Verify Email'}
                            </button>

                            <button
                                onClick={handleResendCode}
                                className="w-full bg-transparent border border-[#C8E972] text-[#C8E972] py-2 px-4 rounded-lg font-semibold hover:bg-[#C8E972] hover:text-[#23291E] transition"
                            >
                                Resend Verification Code
                            </button>

                            <button
                                onClick={() => window.location.href = '/sign-up'}
                                className="w-full bg-transparent border border-gray-600 text-gray-400 py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition"
                            >
                                Back to Sign Up
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default VerifyEmailPage