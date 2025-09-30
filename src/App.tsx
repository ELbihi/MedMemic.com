// // import { Toaster } from "@/components/ui/toaster"; 
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// // import Index from "./pages/Index";
// // import NotFound from "./pages/NotFound";
// // import Dashboard from "./components/Dashboard";
// // import PatientPresentation from "./components/medical/PatientPresentation";
// // import { useCallback } from "react";

// // const queryClient = new QueryClient();

// // // Create a wrapper to use hooks and pass props
// // const DashboardWrapper = () => {
// //   const navigate = useNavigate();

// //   // Navigate to simulation with scenarioId
// //   const handleStartSimulation = useCallback((scenarioId: string) => {
// //     navigate(`/simulation/${scenarioId}`);
// //   }, [navigate]);

// //   // Navigate to scenario creator page
// //   const handleOpenScenarioCreator = useCallback(() => {
// //     navigate("/scenario-creator");
// //   }, [navigate]);

// //   return (
// //     <Dashboard
// //       onStartSimulation={handleStartSimulation}
// //       onOpenScenarioCreator={handleOpenScenarioCreator}
// //     />
// //   );
// // };

// // const PatientPresentationWrapper = () => {
// //   // Fix or remove broken function for now
// //   const handleStartSimulation = useCallback((scenarioId: string) => {
// //     // Implement actual logic or navigate as needed
// //     console.log("Start simulation from PatientPresentation:", scenarioId);
// //   }, []);

// //   return (
// //     <PatientPresentation onStartSimulation={function (): void {
// //             throw new Error("Function not implemented.");
// //           } } />
// //   );
// // };

// // const App = () => (
// //   <QueryClientProvider client={queryClient}>
// //     <TooltipProvider>
// //       <Toaster />
// //       <Sonner />
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/" element={<Index />} />
// //           <Route path="/dashboard" element={<DashboardWrapper />} />
// //           <Route path="/patient-presentation" element={<PatientPresentationWrapper />} />
// //           {/* Define your other routes here */}

// //           {/* Catch all */}
// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       </BrowserRouter>
// //     </TooltipProvider>
// //   </QueryClientProvider>
// // );

// // export default App;



// import { Toaster } from "@/components/ui/toaster"; 
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, useNavigate, useParams, Navigate } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Dashboard from "./components/Dashboard";
// import PatientPresentation from "./components/medical/PatientPresentation";
// import { useCallback, useEffect } from "react";
// import { useAuth } from "@/hooks/useAuth"; 
// const queryClient = new QueryClient();

// // SimulationPage component to handle /simulation/:id route


// // Dashboard wrapper with navigation callbacks
// const DashboardWrapper = () => {
//   const navigate = useNavigate();
//   const { user, signOut } = useAuth();

 

  
//   const handleStartSimulation = useCallback((scenarioId: string) => {
//     navigate(`/patient-presentation/${scenarioId}`);
//   }, [navigate]);

//   const handleOpenScenarioCreator = useCallback(() => {
//     navigate("/scenario-creator");
//   }, [navigate]);

// //   const handleLogout = useCallback(async () => {
// //   await signOut();
// //    navigate("/"); // redirect to home or login after logout
// // }, [signOut, navigate]);

// const handleLogout = useCallback(() => {
//   navigate("/"); // move away from protected page immediately
//   setTimeout(() => {
//     signOut();
//   }, 0);
// }, [signOut, navigate]);

//   return (
//     <Dashboard
//       onStartSimulation={handleStartSimulation}
//       onOpenScenarioCreator={handleOpenScenarioCreator}
//       signOut={handleLogout} // Pass the signOut function
//       // Pass the user object to Dashboard
      
//     />
//   );
// };
// const PrivateRoute = ({ children }: { children: JSX.Element }) => {
//   const { user } = useAuth(); // or however you track auth
//   return user ? children : <Navigate to="/" replace />;
// };

// // PatientPresentation wrapper fixed to use the callback properly
// const PatientPresentationWrapper = () => {
//   const navigate = useNavigate();

//   const handleStartSimulation = useCallback((scenarioId: string) => {
//     // For example, navigate to simulation page
//     navigate(`/simulation/${scenarioId}`);
//   }, [navigate]);

//   return (
//     <PatientPresentation onStartSimulation={function (): void {
//             throw new Error("Function not implemented.");
//           } } />
//   );
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/patient-presentation/:id" element={<PatientPresentationWrapper />} />
//           <Route path="/dashboard" element={<PrivateRoute><DashboardWrapper /></PrivateRoute>} />
//           {/* Add other routes here */}

//           {/* Catch all */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useScenarios } from "@/routes/useScenarios";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";
import PatientPresentation from "./components/medical/PatientPresentation";
import ScenarioCreator from "./components/medical/ScenarioCreator";
import AuthPage from "./components/AuthPage";
// import PatientSimulation from "./components/PatientSimulation";
import CaseLibrary from "@/components/CaseLibrary";
import SimulationRun from "@/components/medical/SimulationRun"
import YourLastCase from "./components/YourLastCase";
import RecommendedForYou from "@/components/RecommendedForYou";
// import  scenarios  from "@/routes/scenarios.js";

const PatientPresentationWrapper = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleStartSimulation = () => {
    if (id) navigate(`/simulation_run/${id}`); // change to /simulation_run
  };

  if (!id) return null; // safeguard

  return <PatientPresentation scenarioId={id} onStartSimulation={handleStartSimulation} />;
};

const SimulationRunWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const { scenarios, loading, error } = useScenarios();
  
  if (!id) return <div>Scenario ID missing</div>;

  if (loading) return <div>Loading scenario...</div>;
  if (error) return <div>Error loading scenarios: {error}</div>;

  const scenario = scenarios.find((s) => String(s.id) === id);
  if (!scenario) return <div>Scenario not found</div>;

  return <SimulationRun scenario={scenario} />;
};
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  // Keep simple redirect behaviour for unauthenticated users.
  // ProtectedRoute component also exists; use it where appropriate.
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
                <Route path="/case_library" element={<CaseLibrary />} />
                {/* <Route path="/patient-presentation/:id" element={<PatientPresentation onStartSimulation={function (): void {
               
              throw new Error("Function not implemented.");
            } } />} /> */}
                <Route path="/patient-presentation/:id" element={<PatientPresentationWrapper/>}/>
            {/* <Route path="/simulation/:id" element={<PatientSimulation />} /> */}
                {/* <Route path="/simulation/:id" element={<PatientSimulation />} /> */}
                {/* <Route path="/patient-simulation/:id" element={<PatientSimulation />} /> */}
                <Route path="/simulation_run/:id" element={<SimulationRunWrapper />} />
                <Route
              path="/your-last-case"
              element={
                <PrivateRoute>
                  <YourLastCase />
                </PrivateRoute>
              }
            />
                 <Route
          path="/recommended"
          element={
            <ProtectedRoute>
              <RecommendedForYou />
            </ProtectedRoute>
          }
        />
                <Route path="/scenario-creator" element={<ScenarioCreator />} />
                <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
function getScenarioById(id: string) {
  throw new Error("Function not implemented.");
}

