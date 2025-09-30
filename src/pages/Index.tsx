// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import LandingPage from "@/components/LandingPage";
// import AuthPage from "@/components/AuthPage";
// import Dashboard from "@/components/Dashboard";
// import PatientSimulation from "@/components/PatientSimulation";
// import ScenarioCreator from "@/components/medical/ScenarioCreator";
// import NotFound from "@/pages/NotFound";
// import { useAuth } from "@/hooks/useAuth";
// import { useEffect } from "react";

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/auth");
//     }
    
//   }, [loading, user, navigate]);

//   return children;
// };

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage onNavigateToAuth={function (): void {
//           throw new Error("Function not implemented.");
//         } } />} />
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="/dashboard" element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         } />
//         <Route path="/patient-presentation" element={
//           <ProtectedRoute>
//             <PatientSimulation />
//           </ProtectedRoute>
//         } />
//         <Route path="/scenario-creator" element={
//           <ProtectedRoute>
//             <ScenarioCreator />
//           </ProtectedRoute>
//         } />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


import { useEffect } from "react";
import LandingPage from "@/components/LandingPage";
import AuthPage from "@/components/AuthPage";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect authenticated users straight to dashboard
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show landing or auth
  return (
    <LandingPage onNavigateToAuth={() => navigate("/auth")} />
  );
};

export default Index;
