// // src/pages/CaseLibrary.tsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useScenarios } from "@/routes/useScenarios";
// import { Search, Filter} from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Loader2, Heart, Activity, BookOpen, Clock, Target, Calendar, PlayCircle, Star,User, Award,ArrowRight, Users, CheckCircle, Library,Brain, Settings as SettingsIcon, LogOut, Plus, TrendingUp } from "lucide-react";
// import { useUserProfile } from "@/hooks/useUserProfile";
// import { useUserProgress } from "@/hooks/useUserProgress";
// import { useAuth } from "@/hooks/useAuth";
// import doctorHero from "@/assets/hero-medical-students.jpg";
// import React from "react";
// import { progress } from "framer-motion";

// interface DashboardProps {
//   onStartSimulation?: (scenarioId: string) => void;
// }
// export default function CaseLibrary({ onStartSimulation }: DashboardProps) {

//   const [search, setSearch] = useState("");
//   const [specialtyFilter, setSpecialtyFilter] = useState("all");
//    const { profile, loading: profileLoading } = useUserProfile();
//     const { progress, recentSessions, loading: progressLoading } = useUserProgress();
//   const { scenarios, incrementScenarioUsage, loading: scenariosLoading } = useScenarios();
// const [startingScenario, setStartingScenario] = useState<string | null>(null);
// const navigate = useNavigate();



// // Extract unique specialties for filter dropdown
// const specialties = Array.from(
//   new Set(scenarios?.map((s) => s.specialty) || [])
// );
  
//     // const handleStartCase = async (difficulty: string) => {
//     //   const scenariosForDifficulty = getScenariosByDifficulty(difficulty);
//     //   if (scenariosForDifficulty.length === 0) return;
  
//     //   const randomScenario = scenariosForDifficulty[Math.floor(Math.random() * scenariosForDifficulty.length)];
//     //   setStartingScenario(difficulty);
//     //   try {
//     //     await incrementScenarioUsage(randomScenario.id);
  
//     //     if (onStartSimulation) {
//     //       onStartSimulation(randomScenario.id);
//     //     } else {
//     //       navigate(`/patient-presentation/${randomScenario.id}`);
//     //     }
//     //   } catch (error) {
//     //     console.error("Error incrementing scenario usage:", error);
//     //   } finally {
//     //     setStartingScenario(null);
//     //   }
//     // }


// const handleStartCase = async (id: string) => {
//   setStartingScenario(id);

//   try {
//     await incrementScenarioUsage(Number(id));

//     if (onStartSimulation) {
//       onStartSimulation(id);
//     } else {
//       navigate(`/patient-presentation/${id}`);
//     }
//   } catch (error) {
//     console.error("Error incrementing scenario usage:", error);
//   } finally {
//     setStartingScenario(null);
//   }
// };




//   // Filter scenarios

  

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">
//           Case Library
//         </h1>

//         {/* Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           {/* Search */}
//           <div className="flex items-center flex-1 bg-white rounded-lg shadow-sm px-3 py-2">
//             <Search className="h-5 w-5 text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search cases..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full border-none focus:ring-0 text-gray-700 placeholder-gray-400"
//             />
//           </div>

//           {/* Specialty Filter */}
//           <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
//             <Filter className="h-5 w-5 text-gray-400 mr-2" />
//             <select
//               value={specialtyFilter}
//               onChange={(e) => setSpecialtyFilter(e.target.value)}
//               className="border-none focus:ring-0 text-gray-700"
//             >
//               <option value="all">All Specialties</option>
//               {specialties.map((sp) => (
//                 <option key={sp} value={sp}>
//                   {sp}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>


//          {/* Case Selection */}


// <div className="grid lg:grid-cols-3 gap-6 mb-8">
//   {scenarios.map((scenario) => (
//     <Card
//       key={scenario.id}
//       className="hover:shadow-warm transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden bg-gradient-card"
//     >
//       <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />

//       <CardHeader>
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
//             <PlayCircle className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <CardTitle className="text-lg">{scenario.title || "Untitled Scenario"}</CardTitle>
//             <CardDescription className="text-sm">
//               {scenario.description || "No description available"}
//             </CardDescription>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <div className="flex justify-between text-sm mb-3">
//           <span>Difficulty</span>
//           <span className="font-medium capitalize">{scenario.difficulty || "N/A"}</span>
//         </div>

//         <Button
//           variant="default"
//           className="w-full hover:shadow-warm transition-all duration-200 active:scale-95"
//           onClick={() => handleStartCase(scenario.id)}
//           disabled={startingScenario !== null}
//         >
//           {startingScenario === scenario.id ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Starting Practice...
//             </>
//           ) : (
//             <>
//               <PlayCircle className="w-4 h-4 mr-2" />
//               Start Practice
//             </>
//           )}
//         </Button>
//       </CardContent>
//     </Card>
//   ))}

//   {scenarios.length === 0 && !scenariosLoading && (
//     <p className="col-span-full text-center text-gray-500">
//       No cases found.
//     </p>
//   )}
// </div>


//         {/* Cases Grid */}
//         {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {filteredScenarios?.map((scenario) => (
//             <div
//               key={scenario.id}
//               className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden"
//             >
//               <div className="p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {scenario.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 line-clamp-3 mb-4">
//                   {scenario.description}
//                 </p>
//                 <p className="text-xs text-gray-500 mb-4">
//                   Specialty: {scenario.specialty}
//                 </p>
//                 <button
//                   onClick={() => handleStartCase(scenario.id)}
//                   className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 transition-colors"
//                 >
//                   Start Case
//                 </button>
//               </div>
//             </div>
//           ))}

//           {filteredScenarios?.length === 0 && (
//             <p className="text-gray-600 col-span-full text-center">
//               No cases found.
//             </p>
//           )} */}
//         {/* </div> */}
//       </div>
//     </div>
//   );
  
// }

// src/pages/CaseLibrary.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useScenarios } from "@/routes/useScenarios";
import { Search, Filter, Plus,Heart, Star, SettingsIcon, User, LogOut, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlayCircle, Clock } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

interface DashboardProps {
  onStartSimulation?: (scenarioId: string) => void;
}

export default function CaseLibrary({ onStartSimulation }: DashboardProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const [search, setSearch] = useState("");
  const { profile, loading: profileLoading } = useUserProfile();
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [startingScenario, setStartingScenario] = useState<string | null>(null);

  const { scenarios, incrementScenarioUsage, loading: scenariosLoading } = useScenarios();

useEffect(() => {
  if (!User) navigate("/login");
}, [User, navigate]);

  // Extract unique specialties for the filter dropdown
  const specialties = Array.from(new Set(scenarios?.map((s) => s.specialty).filter(Boolean)));

  // Compute displayed scenarios based on search and specialty filter
 const displayedScenarios = scenarios.filter((s) => {
  const matchesSearch =
    s.title?.toLowerCase().includes(search.toLowerCase()) ||
    s.description?.toLowerCase().includes(search.toLowerCase());
  const matchesSpecialty = specialtyFilter === "all" || s.specialty === specialtyFilter;
  return matchesSearch && matchesSpecialty;
});

 const handleStartCase = async (scenarioId: string) => {
  const scenario = scenarios.find((s) => s.id === scenarioId);
  if (!scenario) return;

  setStartingScenario(scenarioId);

  try {
     await incrementScenarioUsage(scenarioId);

    if (onStartSimulation) {
      onStartSimulation(scenarioId);
    } else {
      navigate(`/patient-presentation/${scenarioId}`, {
          state: { scenario }, // 👈 now PatientPresentation gets full scenario
        });
    }
  } catch (error) {
    console.error("Error starting scenario:", error);
  } finally {
    setStartingScenario(null);
  }
};

  function handleSettingsClick(): void {
    navigate("/settings");
  }



  return (
    
    <div className="min-h-screen bg-gray-50 py-12">
     <header className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md shadow-md">
             <div className="container mx-auto px-6 py-4 flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 <Button 
                   size="sm" 
                   className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all"
                   onClick={() =>  navigate("/dashboard")}
                 >
                   <ArrowLeft className="w-4 h-4 mr-1" />
                    Return
                 </Button> 
                 <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                   <Heart className="w-5 h-5 text-white" />
                 </div>
                 <span className="text-xl font-bold text-gray-900">MedSim</span>
               </div>
               <div className="flex items-center space-x-3">
                 <Badge variant="outline" className="bg-white/30 text-gray-900 border-white/30">
                   <Star className="w-3 h-3 mr-1" />
                   {profile?.year_of_study || "Medical Student"}
                 </Badge>
                
                 <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-white/20 rounded-lg" onClick={handleSettingsClick}>
                   <SettingsIcon className="w-4 h-4" />
                 </Button>
                 <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-white/20 rounded-lg" onClick={signOut}>
                   <LogOut className="w-4 h-4" />
                 </Button>
               </div>
             </div>
           </header>
          {/* <header className="bg-[#4D88F6] text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">MedSim</span>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-white/20 text-white border-white/30">
            <Star className="w-3 h-3 mr-1" />
            {profile?.year_of_study || "Medical Student"}
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/scenario-creator")}
            title="Create Scenario"
            className="hover:bg-white/20 text-white border-white/30"
          >
            <Plus className="w-4 h-4 mr-1" />
            Create Scenario
          </Button>
          <Button variant="ghost" size="sm" title="Settings" onClick={handleSettingsClick} className="text-white hover:bg-white/20">
            <SettingsIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={signOut} title="Logout" className="text-white hover:bg-white/20">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header> */}
      <div className="max-w-7xl mt-16 mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Case Library</h1>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex items-center flex-1 bg-white rounded-lg shadow-sm px-3 py-2">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search cases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-none focus:ring-0 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Specialty Filter */}
          <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="border-none focus:ring-0 text-gray-700"
            >
              <option value="all">All Specialties</option>
              {specialties.map((sp) => (
                <option key={sp} value={sp}>
                  {sp}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display Scenarios */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {scenariosLoading ? (
            <p>Loading scenarios...</p>
          ) : displayedScenarios.length > 0 ? (
            displayedScenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className="hover:shadow-warm transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden bg-gradient-card"
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />

                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <PlayCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{scenario.title || "Untitled Scenario"}</CardTitle>
                      <CardDescription className="text-sm">{scenario.patient_name || "No description available"}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between text-sm mb-3">
                    <span>Difficulty</span>
                    <span className="font-medium capitalize">{scenario.difficulty || "N/A"}</span>
                  </div>

                  <Button
                    variant="default"
                    className="w-full hover:shadow-warm transition-all duration-200 active:scale-95"
                    onClick={() => handleStartCase(scenario.id)}
                    disabled={startingScenario !== null}
                  >
                    {startingScenario === scenario.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Starting Practice...
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Practice
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">No cases found.</p>
          )}
        </div>
      </div>
    </div>
  );
}



