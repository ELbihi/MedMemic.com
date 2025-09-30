import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth(); // <- user and loading, not profile

  // Show a loader while auth state is loading
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // If not logged in, redirect to Auth page
  if (!user) {
    return <Navigate to="/Auth" replace />;
  }

  // Otherwise, render the protected page
  return <>{children}</>;
};

export default ProtectedRoute;