// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {useLocation, useNavigate, useParams } from 'react-router-dom';
// import { motion } from "framer-motion";

// import { 
//   ArrowLeft, 
//   Stethoscope, 
//   AlertTriangle,
//   Heart, 
//   Thermometer, 
//   Activity, 
//   Clock, 
//   User, 
//   FileText,
//   Play,
//   Baby,
//   Leaf,
//   Mountain
// } from "lucide-react";

// interface PatientData {
// id: string;
//   name: string;
//   age: string;
//   gender: string;
//   weight?: string | null;
//   height?: string | null;
//   chiefComplaint: string;
//   patientWords?: string;
//   atcd?: string;   // 👈 add this
//   vitals?: {
//     heartRate: number;
//     bloodPressure: string;
//     respiratory: number;
//     temperature: number;
//     oxygenSat: number;
//     painScore: number;
//   };
//   triageNotes?: string[];
//   acuity?: "stable" | "urgent" | "critical";
//   difficulty?: "Beginner" | "Intermediate" | "Advanced" | "Débutant";
// }
// interface Scenario {
//   id: string;
//   title: string;
//   description: string;
//   specialty?: string;
//   difficulty: "Beginner" | "Intermediate" | "Advanced";
//   patientData: PatientData; // adjust to how you store
// }


// interface PatientPresentationProps {
//   onStartSimulation: () => void;
// }

// const PatientPresentation = ({ onStartSimulation }: PatientPresentationProps) => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   // Sample patient data - in production this would come from props or API
//   const [patient] = useState<PatientData>({
//     id: "PED001",
//     name: "Emma Thompson",
//     age: "7 years old",
//     gender: "Female",
//     weight: "23 kg",
//     height: "122 cm",
//     chiefComplaint: "Difficulty breathing and fever",
//     patientWords: "My chest feels tight and I can't stop coughing. Mommy says I have a fever.",
//     vitals: {
//       heartRate: 125,
//       bloodPressure: "95/60",
//       respiratory: 28,
//       temperature: 38.9,
//       oxygenSat: 94,
//       painScore: 4
//     },
//     triageNotes: [
//       "Patient appears in mild respiratory distress",
//       "Productive cough with clear sputum",
//       "Mother reports 3-day history of symptoms",
//       "Previously healthy child, no known allergies",
//       "Fully immunized per parent report"
//     ],
//     acuity: "urgent",
//     difficulty: "Intermediate"
//   });

//   const getAcuityColor = (acuity: string) => {
//     switch (acuity) {
//       case "stable": return "normal";
//       case "urgent": return "warning";
//       case "critical": return "critical";
//       default: return "normal";
//     }
//   };

//   const getVitalStatus = (vital: string, value: number) => {
//     // Simplified vital sign status - in production this would be more comprehensive
//     if (vital === "heartRate") {
//       if (value > 130 || value < 60) return "critical";
//       if (value > 110 || value < 70) return "elevated";
//       return "normal";
//     }
//     if (vital === "respiratory") {
//       if (value > 30 || value < 12) return "critical";
//       if (value > 25 || value < 16) return "elevated";
//       return "normal";
//     }
//     if (vital === "oxygenSat") {
//       if (value < 90) return "critical";
//       if (value < 95) return "elevated";
//       return "normal";
//     }
//     return "normal";
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Natural Background */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `linear-gradient(135deg, rgba(22, 78, 99, 0.85) 0%, rgba(15, 23, 42, 0.75) 100%), url('https://images.unsplash.com/photo-1523712999610-f77fbcfc3843')`
//         }}
//       />
      
//       {/* Floating Elements */}
//       <div className="absolute top-20 left-10 opacity-20">
//         <Leaf className="w-12 h-12 text-emerald-200 animate-float" />
//       </div>
//       <div className="absolute top-40 right-20 opacity-15">
//         <Mountain className="w-16 h-16 text-slate-300 animate-float" style={{ animationDelay: "2s" }} />
//       </div>

//       {/* Header with Natural Styling */}
//       <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-2xl">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//                <button
//       onClick={() => {
//         if (window.history.state && window.history.state.idx > 0) {
//           navigate(-1); // Go back
//         } else {
//           navigate("/dashboard"); // Fallback route
//         }
//       }}
//       className="flex items-center text-sm text-white/90 hover:text-white transition-colors backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full"
//     >
//       <ArrowLeft className="w-4 h-4 mr-1" />
//       Return
//     </button>

//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
//                   <Stethoscope className="w-7 h-7 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-xl font-bold text-white">MedSim Wellness</h1>
//                   <p className="text-sm text-emerald-100">Natural Healing Simulation</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Badge variant="outline" className="bg-amber-500/20 text-amber-100 border-amber-300/30 backdrop-blur-sm">
//                 <AlertTriangle className="w-3 h-3 mr-1" />
//                 {patient.acuity.toUpperCase()} ACUITY
//               </Badge>
//               <Badge variant="outline" className="bg-emerald-500/20 text-emerald-100 border-emerald-300/30 backdrop-blur-sm">
//                 {patient.difficulty}
//               </Badge>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content with Natural Cards */}
//       <main className="relative z-10 container mx-auto px-6 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-6xl mx-auto"
//         >
//           {/* Case Introduction */}
//           <div className="text-center mb-8">
//             <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
//               Incoming Patient
//             </h2>
//             <p className="text-xl text-emerald-100 drop-shadow">
//               Review the patient information below, then enter the healing space to begin your assessment.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8 mb-8">
//             {/* Patient Demographics - Wood Texture */}
//             <Card className="lg:col-span-1 bg-gradient-to-br from-amber-50/95 to-orange-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
//               <div className="absolute inset-0 opacity-10 bg-repeat" style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2691E' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//               }} />
//               <CardHeader className="relative z-10">
//                 <CardTitle className="flex items-center text-amber-900">
//                   <User className="w-5 h-5 text-amber-700 mr-2" />
//                   Patient Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="relative z-10 space-y-4">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center shadow-inner">
//                     <Baby className="w-10 h-10 text-amber-800" />
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-amber-700">Name:</span>
//                     <span className="font-medium text-amber-900">{patient.name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-amber-700">Age:</span>
//                     <span className="font-medium text-amber-900">{patient.age}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-amber-700">Gender:</span>
//                     <span className="font-medium text-amber-900">{patient.gender}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-amber-700">Weight:</span>
//                     <span className="font-medium text-amber-900">{patient.weight}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-amber-700">Height:</span>
//                     <span className="font-medium text-amber-900">{patient.height}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Vital Signs - Stone Texture */}
//             <Card className="lg:col-span-1 bg-gradient-to-br from-slate-50/95 to-gray-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
//               <div className="absolute inset-0 opacity-15 bg-repeat" style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23708090' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-11.046 8.954-20 20-20v40c-11.046 0-20-8.954-20-20z'/%3E%3C/g%3E%3C/svg%3E")`
//               }} />
//               <CardHeader className="relative z-10">
//                 <CardTitle className="flex items-center text-slate-800">
//                   <Activity className="w-5 h-5 text-slate-600 mr-2" />
//                   Initial Vital Signs
//                 </CardTitle>
//                 <CardDescription className="text-slate-600">Natural assessment values</CardDescription>
//               </CardHeader>
//               <CardContent className="relative z-10 space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-inner border border-white/30">
//                     <div className="flex items-center justify-center mb-1">
//                       <Heart className={`w-4 h-4 mr-1 text-${getVitalStatus("heartRate", patient.vitals.heartRate)}`} />
//                     </div>
//                     <div className={`text-lg font-bold text-${getVitalStatus("heartRate", patient.vitals.heartRate)}`}>
//                       {patient.vitals.heartRate}
//                     </div>
//                     <div className="text-xs text-slate-600">HR (bpm)</div>
//                   </div>
//                   <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-inner border border-white/30">
//                     <div className="flex items-center justify-center mb-1">
//                       <Activity className={`w-4 h-4 mr-1 text-${getVitalStatus("respiratory", patient.vitals.respiratory)}`} />
//                     </div>
//                     <div className={`text-lg font-bold text-${getVitalStatus("respiratory", patient.vitals.respiratory)}`}>
//                       {patient.vitals.respiratory}
//                     </div>
//                     <div className="text-xs text-slate-600">RR (/min)</div>
//                   </div>
//                   <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-inner border border-white/30">
//                     <div className="flex items-center justify-center mb-1">
//                       <Thermometer className="w-4 h-4 mr-1 text-critical" />
//                     </div>
//                     <div className="text-lg font-bold text-critical">
//                       {patient.vitals.temperature}°C
//                     </div>
//                     <div className="text-xs text-slate-600">Temp</div>
//                   </div>
//                   <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-inner border border-white/30">
//                     <div className="flex items-center justify-center mb-1">
//                       <Activity className={`w-4 h-4 mr-1 text-${getVitalStatus("oxygenSat", patient.vitals.oxygenSat)}`} />
//                     </div>
//                     <div className={`text-lg font-bold text-${getVitalStatus("oxygenSat", patient.vitals.oxygenSat)}`}>
//                       {patient.vitals.oxygenSat}%
//                     </div>
//                     <div className="text-xs text-slate-600">SpO₂</div>
//                   </div>
//                 </div>
//                 <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-inner border border-white/30">
//                   <div className="text-sm text-slate-600 mb-1">Blood Pressure</div>
//                   <div className="text-lg font-bold text-slate-800">{patient.vitals.bloodPressure} mmHg</div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Chief Complaint - Greenery */}
//             <Card className="lg:col-span-1 bg-gradient-to-br from-emerald-50/95 to-green-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
//               <div className="absolute inset-0 opacity-10 bg-repeat" style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23228B22' fill-opacity='0.2'%3E%3Cpath d='M25 25c0-13.807 11.193-25 25-25v50c-13.807 0-25-11.193-25-25z'/%3E%3C/g%3E%3C/svg%3E")`
//               }} />
//               <CardHeader className="relative z-10">
//                 <CardTitle className="flex items-center text-emerald-900">
//                   <FileText className="w-5 h-5 text-emerald-700 mr-2" />
//                   Chief Complaint
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="relative z-10 space-y-4">
//                 <div className="p-4 bg-emerald-100/60 backdrop-blur-sm rounded-xl border-l-4 border-emerald-500 shadow-inner">
//                   <p className="font-medium text-emerald-900 mb-2">Presenting Problem:</p>
//                   <p className="text-sm text-emerald-800">{patient.chiefComplaint}</p>
//                 </div>
//                 <div className="p-4 bg-amber-100/60 backdrop-blur-sm rounded-xl border-l-4 border-amber-500 shadow-inner">
//                   <p className="font-medium text-amber-900 mb-2">In Patient's Words:</p>
//                   <p className="text-sm text-amber-800 italic">"{patient.patientWords}"</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Triage Notes - Natural Stone Slab */}
//           <Card className="mb-8 bg-gradient-to-br from-slate-100/95 to-gray-200/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
//             <div className="absolute inset-0 opacity-10 bg-repeat" style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23696969' fill-opacity='0.15'%3E%3Cpath d='M40 40c0-22.091 17.909-40 40-40v80c-22.091 0-40-17.909-40-40z'/%3E%3C/g%3E%3C/svg%3E")`
//             }} />
//             <CardHeader className="relative z-10">
//               <CardTitle className="flex items-center text-slate-800">
//                 <Clock className="w-5 h-5 text-slate-600 mr-2" />
//                 Natural Assessment Notes
//               </CardTitle>
//               <CardDescription className="text-slate-600">Initial observations from wellness practitioners</CardDescription>
//             </CardHeader>
//             <CardContent className="relative z-10">
//               <div className="grid md:grid-cols-2 gap-4">
//                 {patient.triageNotes.map((note, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-start space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-inner border border-white/30"
//                   >
//                     <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0 shadow-sm" />
//                     <p className="text-sm text-slate-700">{note}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Action Button - Natural Entrance */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.5 }}
//             className="text-center"
//           >
//             <Button
//              onClick={() => navigate(`/simulation/${id}`)}
//              size="lg"
//              className="px-12 py-6 text-lg group bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-2xl backdrop-blur-sm border border-white/20 rounded-2xl transition-all duration-300 hover:scale-105"
//             >
//             <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
//                     Enter Healing Space
// </Button>
//             <p className="text-sm text-emerald-100 mt-4 drop-shadow">
//               Step into the wellness sanctuary to begin your natural assessment journey
//             </p>
//           </motion.div>
//         </motion.div>
//       </main>
//     </div>
//   );
// };

// export default PatientPresentation;
// // src/pages/PatientPresentation.tsx
// import { motion } from "framer-motion";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { 
//   ArrowLeft, 
//   Stethoscope, 
//   AlertTriangle,
//   Heart, 
//   Thermometer, 
//   Activity, 
//   Clock, 
//   User, 
//   FileText,
//   Play,
//   Baby,
//   Leaf,
//   Mountain
// } from "lucide-react";

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// interface Scenario {
//   id: number;
//   uuid: string;
//   title: string;
//   description?: string;
//   specialty?: string;
//   difficulty: string;
//   hdm?: string;              // histoire de la maladie
//   atcd?: string;             // antécédents
//   lieu_admission?: string;
//   patient_name?: string;
//   patient_age?: string;
//   patient_gender?: string;
//   patient_weight?: string | null;
//   created_at?: string;
//   updated_at?: string;
// }
//  interface PatientPresentationProps {
//   onStartSimulation: () => void;
// }

// const PatientPresentation = ({ onStartSimulation }: PatientPresentationProps) => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ scenario comes from CaseLibrary navigate(..., { state: { scenario } })
//   const scenario = (location.state as { scenario?: Scenario })?.scenario;

//   if (!scenario) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <p className="text-lg text-gray-700">No scenario data found.</p>
//         <Button onClick={() => navigate("/case_library")} className="mt-4">
//           Back to Case Library
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Background */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `linear-gradient(135deg, rgba(22, 78, 99, 0.85) 0%, rgba(15, 23, 42, 0.75) 100%), url('https://images.unsplash.com/photo-1523712999610-f77fbcfc3843')`
//         }}
//       />

//       {/* Floating Elements */}
//       <div className="absolute top-20 left-10 opacity-20">
//         <Leaf className="w-12 h-12 text-emerald-200 animate-float" />
//       </div>
//       <div className="absolute top-40 right-20 opacity-15">
//         <Mountain className="w-16 h-16 text-slate-300 animate-float" style={{ animationDelay: "2s" }} />
//       </div>

//       {/* Header */}
//       <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-2xl">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => {
//                   if (window.history.state && window.history.state.idx > 0) {
//                     navigate(-1);
//                   } else {
//                     navigate("/dashboard");
//                   }
//                 }}
//                 className="flex items-center text-sm text-white/90 hover:text-white transition-colors backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-1" />
//                 Return
//               </button>

//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
//                   <Stethoscope className="w-7 h-7 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-xl font-bold text-white">MedSim Wellness</h1>
//                   <p className="text-sm text-emerald-100">Natural Healing Simulation</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Badge variant="outline" className="bg-emerald-500/20 text-emerald-100 border-emerald-300/30 backdrop-blur-sm">
//                 {scenario.difficulty}
//               </Badge>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="relative z-10 container mx-auto px-6 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-6xl mx-auto"
//         >
//           {/* Intro */}
//           <div className="text-center mb-8">
//             <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
//               {scenario.title}
//             </h2>
//             <p className="text-xl text-emerald-100 drop-shadow">
//               {scenario.description || "Patient scenario"}
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8 mb-8">
//             {/* Patient Demographics */}
//             <Card className="lg:col-span-1 bg-gradient-to-br from-amber-50/95 to-orange-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-amber-900">
//                   <User className="w-5 h-5 text-amber-700 mr-2" />
//                   Patient Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center shadow-inner">
//                     <Baby className="w-10 h-10 text-amber-800" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-amber-700">Nom:</span>
//                     <span className="font-medium text-amber-900">{scenario.patient_name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-amber-700">Âge:</span>
//                     <span className="font-medium text-amber-900">{scenario.patient_age}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-amber-700">Sexe:</span>
//                     <span className="font-medium text-amber-900">{scenario.patient_gender}</span>
//                   </div>
//                   {scenario.patient_weight && (
//                     <div className="flex justify-between">
//                       <span className="text-amber-700">Poids:</span>
//                       <span className="font-medium text-amber-900">{scenario.patient_weight} kg</span>
//                     </div>
//                   )}
//                   {scenario.atcd && (
//                     <div className="flex justify-between">
//                       <span className="text-amber-700">ATCD:</span>
//                       <span className="font-medium text-amber-900">{scenario.atcd}</span>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Chief Complaint */}
//             <Card className="lg:col-span-2 bg-gradient-to-br from-emerald-50/95 to-green-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-emerald-900">
//                   <FileText className="w-5 h-5 text-emerald-700 mr-2" />
//                   Histoire de la Maladie
//                 </CardTitle>
//                 <CardDescription className="text-slate-600">HDM + Lieu d’admission</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {scenario.hdm && (
//                   <div className="p-4 bg-emerald-100/60 backdrop-blur-sm rounded-xl border-l-4 border-emerald-500 shadow-inner">
//                     <p className="text-sm text-emerald-800">{scenario.hdm}</p>
//                   </div>
//                 )}
//                 {scenario.lieu_admission && (
//                   <div className="p-4 bg-amber-100/60 backdrop-blur-sm rounded-xl border-l-4 border-amber-500 shadow-inner">
//                     <p className="text-sm text-amber-800 italic">
//                       Admission: {scenario.lieu_admission}
//                     </p>
//                   </div>
//                 )}
//                 {scenario.lieu_admission && (
//                   <div className="p-4 bg-amber-100/60 backdrop-blur-sm rounded-xl border-l-4 border-bleu-500 shadow-inner">
//                     <p className="text-sm text-amber-800 italic">
//                       Admission: {scenario.description}
//                     </p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Action Button */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.5 }}
//             className="text-center"
//           >
//             <Button
//               onClick={() => navigate(`/simulation/${id}`, { state: { scenario } })}
//               size="lg"
//               className="px-12 py-6 text-lg group bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-2xl backdrop-blur-sm border border-white/20 rounded-2xl transition-all duration-300 hover:scale-105"
//             >
//               <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
//               Enter Healing Space
//             </Button>
//             <p className="text-sm text-emerald-100 mt-4 drop-shadow">
//               Step into the wellness sanctuary to begin your natural assessment journey
//             </p>
//           </motion.div>
//         </motion.div>
//       </main>
//     </div>
//   );
// };

// export default PatientPresentation;

// import { motion } from "framer-motion";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { 
//   ArrowLeft, 
//   Stethoscope, 
//   User, 
//   FileText,
//   Play,
//   Baby,
//   Leaf,
//   Mountain,
//   Activity,
//   Thermometer,
//   Heart,
//   Target,
//   FlaskConical
// } from "lucide-react";

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// // Scenario type
// interface Scenario {
//   id: number;
//   uuid: string;
//   title: string;
//   description?: string;
//   specialty?: string;
//   difficulty: string;
//   hdm?: string;
//   atcd?: string;
//   lieu_admission?: string;
//   patient_name?: string;
//   patient_age?: string;
//   patient_gender?: string;
//   patient_weight?: string | null;
//   created_at?: string;
//   updated_at?: string;
// }

// // Vitals type
// interface Vitals {
//   fc: number;
//   fr: number;
//   spo2: number;
//   temperature: number;
//   ta_systolic: number;
//   ta_diastolic: number;
// }

// // Objectives type
// interface Objectives {
//   objectif_principal: string;
//   objectif_secondaire1?: string;
//   objectif_secondaire2?: string;
//   objectif_secondaire3?: string;
//   competence1?: string;
//   competence2?: string;
//   competence3?: string;
//   competence4?: string;
// }

// // Exam type
// interface Exam {
//   bilans?: string;
//   imagerie?: string;
//   ecg?: string;
//   autres?: string;
// }

// interface PatientPresentationProps {
//   onStartSimulation: () => void;
// }

// const PatientPresentation = ({ onStartSimulation }: PatientPresentationProps) => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // scenario from CaseLibrary
//   const scenario = (location.state as { scenario?: Scenario })?.scenario;

//   // TODO: replace with DB fetch (supabase) for vitals, objectives, exams
//   const vitals: Vitals = {
//     fc: 95,
//     fr: 20,
//     spo2: 96,
//     temperature: 37.8,
//     ta_systolic: 130,
//     ta_diastolic: 80,
//   };

//   const objectives: Objectives = {
//     objectif_principal: "Recognize acute asthma exacerbation",
//     objectif_secondaire1: "Practice initial emergency assessment",
//     objectif_secondaire2: "Interpret basic vital signs",
//     competence1: "Clinical reasoning",
//     competence2: "Emergency response",
//   };

//   const exams: Exam[] = [
//     { bilans: "CBC: normal", imagerie: "Chest X-ray: hyperinflated lungs" },
//     { ecg: "Normal sinus rhythm" },
//   ];

//   if (!scenario) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <p className="text-lg text-gray-700">No scenario data found.</p>
//         <Button onClick={() => navigate("/case_library")} className="mt-4">
//           Back to Case Library
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Background */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `linear-gradient(135deg, rgba(22, 78, 99, 0.85) 0%, rgba(15, 23, 42, 0.75) 100%), url('https://images.unsplash.com/photo-1523712999610-f77fbcfc3843')`
//         }}
//       />

//       {/* Floating Elements */}
//       <div className="absolute top-20 left-10 opacity-20">
//         <Leaf className="w-12 h-12 text-emerald-200 animate-float" />
//       </div>
//       <div className="absolute top-40 right-20 opacity-15">
//         <Mountain className="w-16 h-16 text-slate-300 animate-float" style={{ animationDelay: "2s" }} />
//       </div>

//       {/* Header */}
//       <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-2xl">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => {
//                   if (window.history.state && window.history.state.idx > 0) {
//                     navigate(-1);
//                   } else {
//                     navigate("/dashboard");
//                   }
//                 }}
//                 className="flex items-center text-sm text-white/90 hover:text-white transition-colors backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-1" />
//                 Return
//               </button>

//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
//                   <Stethoscope className="w-7 h-7 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-xl font-bold text-white">MedSim Wellness</h1>
//                   <p className="text-sm text-emerald-100">Natural Healing Simulation</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Badge variant="outline" className="bg-emerald-500/20 text-emerald-100 border-emerald-300/30 backdrop-blur-sm">
//                 {scenario.difficulty}
//               </Badge>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="relative z-10 container mx-auto px-6 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-6xl mx-auto"
//         >
//           {/* Intro */}
//           <div className="text-center mb-8">
//             <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
//               {scenario.title}
//             </h2>
//             <p className="text-xl text-emerald-100 drop-shadow">
//               {scenario.description || "Patient scenario"}
//             </p>
//           </div>

//           {/* Patient + Chief Complaint */}
//           <div className="grid lg:grid-cols-3 gap-8 mb-8">
//             {/* Patient Demographics */}
//             <Card className="lg:col-span-1 bg-gradient-to-br from-amber-50/95 to-orange-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-amber-900">
//                   <User className="w-5 h-5 text-amber-700 mr-2" />
//                   Patient Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center shadow-inner">
//                     <Baby className="w-10 h-10 text-amber-800" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <p><b>Nom:</b> {scenario.patient_name}</p>
//                   <p><b>Âge:</b> {scenario.patient_age}</p>
//                   <p><b>Sexe:</b> {scenario.patient_gender}</p>
//                   {scenario.patient_weight && <p><b>Poids:</b> {scenario.patient_weight} kg</p>}
//                   {scenario.atcd && <p><b>ATCD:</b> {scenario.atcd}</p>}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Chief Complaint */}
//             <Card className="lg:col-span-2 bg-gradient-to-br from-emerald-50/95 to-green-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-emerald-900">
//                   <FileText className="w-5 h-5 text-emerald-700 mr-2" />
//                   Histoire de la Maladie
//                 </CardTitle>
//                 <CardDescription className="text-slate-600">HDM + Lieu d’admission</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {scenario.hdm && (
//                   <div className="p-4 bg-emerald-100/60 rounded-xl border-l-4 border-emerald-500 shadow-inner">
//                     <p className="text-sm text-emerald-800">{scenario.hdm}</p>
//                   </div>
//                 )}
//                 {scenario.lieu_admission && (
//                   <div className="p-4 bg-amber-100/60 rounded-xl border-l-4 border-amber-500 shadow-inner">
//                     <p className="text-sm text-amber-800 italic">
//                       Admission: {scenario.lieu_admission}
//                     </p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Vitals */}
//           <Card className="mb-8 bg-gradient-to-br from-blue-50/95 to-indigo-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl">
//             <CardHeader>
//               <CardTitle className="flex items-center text-indigo-900">
//                 <Activity className="w-5 h-5 text-indigo-700 mr-2" />
//                 Constantes Vitales
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="grid grid-cols-2 gap-4 text-indigo-900">
//               <p><Heart className="inline w-4 h-4 mr-1 text-red-600" /> HR: {vitals.fc} bpm</p>
//               <p><Activity className="inline w-4 h-4 mr-1 text-blue-600" /> RR: {vitals.fr}/min</p>
//               <p>SpO₂: {vitals.spo2}%</p>
//               <p><Thermometer className="inline w-4 h-4 mr-1 text-orange-600" /> Temp: {vitals.temperature}°C</p>
//               <p>TA: {vitals.ta_systolic}/{vitals.ta_diastolic} mmHg</p>
//             </CardContent>
//           </Card>

//           {/* Objectives */}
//           <Card className="mb-8 bg-gradient-to-br from-emerald-50/95 to-teal-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl">
//             <CardHeader>
//               <CardTitle className="flex items-center text-teal-900">
//                 <Target className="w-5 h-5 text-teal-700 mr-2" />
//                 Objectifs Pédagogiques
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="text-teal-900 space-y-2">
//               <p><b>Principal:</b> {objectives.objectif_principal}</p>
//               {objectives.objectif_secondaire1 && <p>• {objectives.objectif_secondaire1}</p>}
//               {objectives.objectif_secondaire2 && <p>• {objectives.objectif_secondaire2}</p>}
//               {objectives.objectif_secondaire3 && <p>• {objectives.objectif_secondaire3}</p>}
//               <p><b>Compétences:</b></p>
//               <ul className="list-disc ml-6">
//                 {objectives.competence1 && <li>{objectives.competence1}</li>}
//                 {objectives.competence2 && <li>{objectives.competence2}</li>}
//                 {objectives.competence3 && <li>{objectives.competence3}</li>}
//                 {objectives.competence4 && <li>{objectives.competence4}</li>}
//               </ul>
//             </CardContent>
//           </Card>

//           {/* Exams */}
//           <Card className="mb-8 bg-gradient-to-br from-gray-50/95 to-slate-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl">
//             <CardHeader>
//               <CardTitle className="flex items-center text-slate-900">
//                 <FlaskConical className="w-5 h-5 text-slate-700 mr-2" />
//                 Examens Complémentaires
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="text-slate-900 space-y-3">
//               {exams.map((exam, idx) => (
//                 <div key={idx} className="p-3 bg-white/60 rounded-lg shadow-inner">
//                   {exam.bilans && <p><b>Bilans:</b> {exam.bilans}</p>}
//                   {exam.imagerie && <p><b>Imagerie:</b> {exam.imagerie}</p>}
//                   {exam.ecg && <p><b>ECG:</b> {exam.ecg}</p>}
//                   {exam.autres && <p><b>Autres:</b> {exam.autres}</p>}
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Action Button */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.5 }}
//             className="text-center"
//           >
//             <Button
//               onClick={() => navigate(`/simulation/${id}`, { state: { scenario } })}
//               size="lg"
//               className="px-12 py-6 text-lg group bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-2xl rounded-2xl transition-all duration-300 hover:scale-105"
//             >
//               <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
//               Enter Healing Space
//             </Button>
//             <p className="text-sm text-emerald-100 mt-4 drop-shadow">
//               Step into the wellness sanctuary to begin your natural assessment journey
//             </p>
//           </motion.div>
//         </motion.div>
//       </main>
//     </div>
//   );
// };

// export default PatientPresentation;




import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import hero from "@/assets/1732476869927.jpg";
import { 
  ArrowLeft, 
  Stethoscope, 
  User, 
  FileText,
  Play,
  Baby,
  Leaf,
  Mountain,
  Activity,
  Thermometer,
  Heart,
  Target,
  FlaskConical
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Scenario type
interface Scenario {
  id: number;
  uuid: string;
  title: string;
  description?: string;
  specialty?: string;
  difficulty: string;
  hdm?: string;
  atcd?: string;
  lieu_admission?: string;
  patient_name?: string;
  patient_age?: string;
  patient_gender?: string;
  patient_weight?: string | null;
  created_at?: string;
  updated_at?: string;
  usage_count?: number; // <-- ajoute cette ligne
  last_used?: string;
}


// Vitals type
interface Vitals {
  id: number;
  phase_id: number;
  fc: number;
  fr: number;
  spo2: number;
  temperature: number;
  ta_systolic: number;
  ta_diastolic: number;
}

// Objectives type
interface Objectives {
  id: number;
  scenario_id: number;
  objectif_principal: string;
  objectif_secondaire1?: string;
  objectif_secondaire2?: string;
  objectif_secondaire3?: string;
  competence1?: string;
  competence2?: string;
  competence3?: string;
  competence4?: string;
}

// Exam type
interface Exam {
  id: number;
  phase_id: number;
  bilans?: string;
  imagerie?: string;
  ecg?: string;
  autres?: string;
}
interface Action {
  id: number;
  label: string;
  next_phase?: number | null;
}

interface Phase {
  // id: number;
  // scenario_id: number;
  // name: string;
  // description: string;
  // fin_action: boolean;
  // fin_temps: boolean;
  // prochaine_phase?: number | null;
  // actions: Action[];
  // duration?: number;
  id: number;
  name: string;
  description: string;
  actions: any[];
  nextPhase: string;
  endAction: boolean;
  endTime: boolean;
  scenarioId: number; // durée en secondes si fin_temps = true
}
interface PatientPresentationProps {
 scenarioId: string;
  onStartSimulation: () => void;
  
}

const PatientPresentation = ({ scenarioId, onStartSimulation  }: PatientPresentationProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [phases, setPhases] = useState<Phase[]>([]);

   const [scenario, setScenario] = useState<Scenario | null>(
    (location.state as { scenario?: Scenario })?.scenario || null
  );
  const handleEnterHealingSpace = () => {
    onStartSimulation(); // Switch phase in SimulationRun
    navigate(`/simulation_run/${scenarioId}`); // Optional: change URL
  };

   if (!scenarioId) {
    return <div>Loading scenario...</div>;
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [vitals, setVitals] = useState<Vitals[]>([]);
  const [objectives, setObjectives] = useState<Objectives | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [currentPhase, setCurrentPhase] = useState<Phase | null>(null);

 useEffect(() => {
    const fetchScenarioData = async () => {
       try {
        setLoading(true);

        let currentScenario = scenario;
        if (!currentScenario && id) {
          const { data: scenarioData, error: scenarioError } = await supabase
            .from("scenarios")
            .select("*")
            .eq("id", Number(id))
            .maybeSingle();
          if (scenarioError || !scenarioData) {
            setError("Scenario not found.");
            setLoading(false);
            return;
          }
          currentScenario = scenarioData;
          setScenario(currentScenario);
        }

        if (!currentScenario?.id) return;

        const { data: objectivesData, error: objError } = await supabase
          .from("objectifs")
          .select("*")
          .eq("scenario_id", currentScenario.id)
          .maybeSingle();
        if (objError) console.error(objError);
        setObjectives(objectivesData);

        const { data: phases, error: phasesError } = await supabase
          .from("phases")
          .select("id")
          .eq("scenario_id", currentScenario.id);
        if (phasesError) console.error(phasesError);

        if (phases && phases.length > 0) {
          const phaseIds = phases.map((p) => p.id);

          const [vitalsRes, examsRes] = await Promise.all([
            supabase.from("constantes").select("*").in("phase_id", phaseIds),
            supabase.from("examens").select("*").in("phase_id", phaseIds),
          ]);

          if (vitalsRes.error) console.error(vitalsRes.error);
          if (examsRes.error) console.error(examsRes.error);

          setVitals(vitalsRes.data || []);
          setExams(examsRes.data || []);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load patient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchScenarioData();
  }, [scenarioId]);
  

  if (!scenario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-gray-700">No scenario data found.</p>
        <Button onClick={() => navigate("/case_library")} className="mt-4">
          Back to Case Library
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-lg">
        Loading patient data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
        <Button onClick={() => navigate("/case_library")} className="mt-4">
          Back to Case Library
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(22, 78, 99, 0.85) 0%, rgba(15, 23, 42, 0.75) 100%), url(${hero})`
        }}
      />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Leaf className="w-12 h-12 text-emerald-200 animate-float" />
      </div>
      <div className="absolute top-40 right-20 opacity-15">
        <Mountain className="w-16 h-16 text-slate-300 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                    navigate("/case_library");
                }}
                className="flex items-center text-sm text-white/90 hover:text-white transition-colors backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Return
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">MedSim Wellness</h1>
                  <p className="text-sm text-emerald-100">Natural Healing Simulation</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-100 border-emerald-300/30 backdrop-blur-sm">
                {scenario.difficulty}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Intro */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              {scenario.title}
            </h2>
            <p className="text-xl text-emerald-100 drop-shadow">
              {scenario.description || "Patient scenario"}
            </p>
          </div>

          {/* Patient + Chief Complaint */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Patient Demographics */}
            <Card className="lg:col-span-1 bg-gradient-to-br from-amber-50/95 to-orange-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-900">
                  <User className="w-5 h-5 text-amber-700 mr-2" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center shadow-inner">
                    <Baby className="w-10 h-10 text-amber-800" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p><b>Nom:</b> {scenario.patient_name}</p>
                  <p><b>Âge:</b> {scenario.patient_age}</p>
                  <p><b>Sexe:</b> {scenario.patient_gender}</p>
                  {scenario.patient_weight && <p><b>Poids:</b> {scenario.patient_weight} kg</p>}
                  {scenario.atcd && <p><b>ATCD:</b> {scenario.atcd}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Chief Complaint */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-emerald-50/95 to-green-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-900">
                  <FileText className="w-5 h-5 text-emerald-700 mr-2" />
                  Histoire de la Maladie
                </CardTitle>
                <CardDescription className="text-slate-600">HDM + Lieu d’admission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {scenario.hdm && (
                  <div className="p-4 bg-emerald-100/60 rounded-xl border-l-4 border-emerald-500 shadow-inner">
                    <p className="text-sm text-emerald-800">{scenario.hdm}</p>
                  </div>
                )}
                {scenario.lieu_admission && (
                  <div className="p-4 bg-amber-100/60 rounded-xl border-l-4 border-amber-500 shadow-inner">
                    <p className="text-sm text-amber-800 italic">
                      Admission: {scenario.lieu_admission}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          Vitals
          {vitals.length > 0 && (
            <Card className="mb-8 bg-gradient-to-br from-blue-50/95 to-indigo-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-900">
                  <Activity className="w-5 h-5 text-indigo-700 mr-2" />
                  Constantes Vitales
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-indigo-900">
                {vitals.map((v) => (
                  <div key={v.id} className="space-y-1">
                    <p><Heart className="inline w-4 h-4 mr-1 text-red-600" /> HR: {v.fc} bpm</p>
                    <p><Activity className="inline w-4 h-4 mr-1 text-blue-600" /> RR: {v.fr}/min</p>
                    <p>SpO₂: {v.spo2}%</p>
                    <p><Thermometer className="inline w-4 h-4 mr-1 text-orange-600" /> Temp: {v.temperature}°C</p>
                    <p>TA: {v.ta_systolic}/{v.ta_diastolic} mmHg</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Objectives */}
          {objectives && (
            <Card className="mb-8 bg-gradient-to-br from-emerald-50/95 to-teal-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-teal-900">
                  <Target className="w-5 h-5 text-teal-700 mr-2" />
                  Objectifs Pédagogiques
                </CardTitle>
              </CardHeader>
              <CardContent className="text-teal-900 space-y-2">
                <p><b>Principal:</b> {objectives.objectif_principal}</p>
                {objectives.objectif_secondaire1 && <p>• {objectives.objectif_secondaire1}</p>}
                {objectives.objectif_secondaire2 && <p>• {objectives.objectif_secondaire2}</p>}
                {objectives.objectif_secondaire3 && <p>• {objectives.objectif_secondaire3}</p>}
                <p><b>Compétences:</b></p>
                <ul className="list-disc ml-6">
                  {objectives.competence1 && <li>{objectives.competence1}</li>}
                  {objectives.competence2 && <li>{objectives.competence2}</li>}
                  {objectives.competence3 && <li>{objectives.competence3}</li>}
                  {objectives.competence4 && <li>{objectives.competence4}</li>}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Exams */}
          {exams.length > 0 && (
            <Card className="mb-8 bg-gradient-to-br from-gray-50/95 to-slate-100/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <FlaskConical className="w-5 h-5 text-slate-700 mr-2" />
                  Examens Complémentaires
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-900 space-y-3">
                {exams.map((exam) => (
                  <div key={exam.id} className="p-3 bg-white/60 rounded-lg shadow-inner">
                    {exam.bilans && <p><b>Bilans:</b> {exam.bilans}</p>}
                    {exam.imagerie && <p><b>Imagerie:</b> {exam.imagerie}</p>}
                    {exam.ecg && <p><b>ECG:</b> {exam.ecg}</p>}
                    {exam.autres && <p><b>Autres:</b> {exam.autres}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
             <div>
      {/* <h2>Patient Presentation</h2> */}
      <Button onClick={handleEnterHealingSpace}>
        Enter Healing Space
      </Button>
    </div>
            <p className="text-sm text-emerald-100 mt-4 drop-shadow">
              Step into the bihi wellness sanctuary to begin your natural assessment journey
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default PatientPresentation;
