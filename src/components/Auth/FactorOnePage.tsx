import { useSignIn, useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

function FactorOnePage() {
    const { signIn, isLoaded } = useSignIn();
    const { isSignedIn } = useUser();
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);


    React.useEffect(() => {
        if (isSignedIn) {
            console.log('User signed in, redirecting to dashboard...');
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


    if (isSignedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) {
            setError('Please enter your password');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            console.log('Attempting to sign in with password...');
            const result = await signIn.attemptFirstFactor({
                strategy: 'password',
                password,
            });
            console.log('Sign in result:', result);


            setPassword('');


            if (result.status === 'complete') {
                console.log('Sign in successful, redirecting to dashboard');
                window.location.href = '/dashboard';
            } else {
                console.log('Sign in completed but status is:', result.status);

                setTimeout(() => {
                    if (isSignedIn) {
                        window.location.href = '/dashboard';
                    }
                }, 1000);
            }

        } catch (err: any) {
            console.error('Sign in error:', err);
            setError(err.errors?.[0]?.message || 'Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#161618] text-white">
            <div className="bg-[#23291E] border border-[#C8E972] rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Enter Password</h2>
                <p className="text-gray-400 mb-6 text-center">
                    Please enter your password to continue signing in.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full bg-[#161618] border border-[#C8E972] text-white px-4 py-2 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8E972] focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !password.trim()}
                        className="w-full bg-[#C8E972] text-[#23291E] py-2 px-4 rounded-lg font-semibold hover:bg-[#C8E972]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing In...' : 'Continue'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FactorOnePage