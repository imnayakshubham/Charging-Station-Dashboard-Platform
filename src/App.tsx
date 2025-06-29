import { AppLayout } from './layouts/AppLayout'
import { Dashboard } from './components/Dashboard/Dashboard'
import { SignIn, SignUp, useUser } from '@clerk/clerk-react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicLayout } from './layouts/PublicLayout'
import { ProtectedLayout } from './layouts/ProtectedLayout'
import SignInWrapper from './components/Auth/SignInWrapper'
import LandingPage from './components/LandingPage/LandingPage'
import VerifyEmailPage from './components/Auth/VerifyEmailPage'
import SignInWithAuth from './components/Auth/SignInWithAuth'
import FactorOnePage from './components/Auth/FactorOnePage'

function App() {
  const { isSignedIn } = useUser();

  return (
    <Routes>

      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/sign-in"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <SignInWithAuth />
          }
        />


        <Route
          path="/sign-in/factor-one"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <FactorOnePage />
          }
        />


        <Route
          path="/sign-in/*"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <SignInWrapper />
          }
        />

        <Route
          path="/sign-up"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <SignUp
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
                forceRedirectUrl="/dashboard"
              />
          }
        />

        <Route
          path="/sign-up/verify-email-address"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <VerifyEmailPage />
          }
        />


        <Route
          path="/verify-email-address"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <VerifyEmailPage />
          }
        />

        <Route
          path="/sign-up/verify"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <VerifyEmailPage />
          }
        />


        <Route
          path="/verify"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <VerifyEmailPage />
          }
        />


        <Route
          path="/sso-callback"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <SignIn
                routing="path"
                path="/sso-callback"
                signUpUrl="/sign-up"
                forceRedirectUrl="/dashboard"
              />
          }
        />

        <Route
          path="/reset-password"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <SignIn
                routing="path"
                path="/reset-password"
                signUpUrl="/sign-up"
                forceRedirectUrl="/dashboard"
              />
          }
        />

        <Route
          path="/verify-email-address"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <SignIn
                routing="path"
                path="/verify-email-address"
                signUpUrl="/sign-up"
                forceRedirectUrl="/dashboard"
              />
          }
        />


        <Route
          path="/*"
          element={
            isSignedIn
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/" replace />
          }
        />
      </Route>



      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={
          <AppLayout />
        }>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>


      <Route path="*" element={<>404</>} />
    </Routes>
  );
}

export default App;
