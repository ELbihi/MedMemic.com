// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";

// import { 
//   ArrowLeft, Stethoscope, User, FileText, Play, Baby,
//   Leaf, Mountain, Activity, Thermometer, Heart, Target, FlaskConical
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
//   hdm?: string;
//   atcd?: string;
//   lieu_admission?: string;
//   patient_name?: string;
//   patient_age?: string;
//   patient_gender?: string;
//   patient_weight?: string | null;
// }

// interface Vitals {
//   id: number;
//   phase_id: number;
//   fc: number;
//   fr: number;
//   spo2: number;
//   temperature: number;
//   ta_systolic: number;
//   ta_diastolic: number;
// }

// interface Objectives {
//   id: number;
//   scenario_id: number;
//   objectif_principal: string;
//   objectif_secondaire1?: string;
//   objectif_secondaire2?: string;
//   objectif_secondaire3?: string;
//   competence1?: string;
//   competence2?: string;
//   competence3?: string;
//   competence4?: string;
// }

// interface Exam {
//   id: number;
//   phase_id: number;
//   bilans?: string;
//   imagerie?: string;
//   ecg?: string;
//   autres?: string;
// }

// interface PatientPresentationProps {
//   onStartSimulation?: () => void;
// }

// const PatientPresentation = ({ onStartSimulation }: PatientPresentationProps) => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [scenario, setScenario] = useState<Scenario | null>(
//     (location.state as { scenario?: Scenario })?.scenario || null
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [vitals, setVitals] = useState<Vitals[]>([]);
//   const [objectives, setObjectives] = useState<Objectives | null>(null);
//   const [exams, setExams] = useState<Exam[]>([]);

//   const isMobile = window.innerWidth < 768;

//   useEffect(() => {
//     const fetchScenarioData = async () => {
//       try {
//         setLoading(true);

//         // Si pas de scenario, fetch depuis Supabase
//         let currentScenario = scenario;
//         if (!currentScenario && id) {
//           const { data: scenarioData, error: scenarioError } = await supabase
//             .from("scenarios")
//             .select("*")
//             .eq("id",  scenario.id)
//             .maybeSingle();
//           if (scenarioError || !scenarioData) {
//             setError("Scenario not found.");
//             setLoading(false);
//             return;
//           }
//           currentScenario = scenarioData;
//           setScenario(currentScenario);
//         }

//         if (!currentScenario?.id) return;

//         // Récupération objectifs
//         const { data: objectivesData, error: objError } = await supabase
//           .from("objectifs")
//           .select("*")
//           .eq("scenario_id", currentScenario.id)
//           .maybeSingle();
//         if (objError) console.error(objError);
//         setObjectives(objectivesData);

//         // Récupération phases
//         const { data: phases, error: phasesError } = await supabase
//           .from("phases")
//           .select("id")
//           .eq("scenario_id", currentScenario.id);
//         if (phasesError) console.error(phasesError);

//         if (phases && phases.length > 0) {
//           const phaseIds = phases.map((p) => p.id);

//           // Fetch vitals & exams en parallèle
//           const [vitalsRes, examsRes] = await Promise.all([
//             supabase.from("constantes").select("*").in("phase_id", phaseIds),
//             supabase.from("examens").select("*").in("phase_id", phaseIds),
//           ]);

//           if (vitalsRes.error) console.error(vitalsRes.error);
//           if (examsRes.error) console.error(examsRes.error);

//           setVitals(vitalsRes.data || []);
//           setExams(examsRes.data || []);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load patient data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchScenarioData();
//   }, [id]);

//   if (loading) return <div className="flex items-center justify-center min-h-screen text-white text-lg">Loading patient data...</div>;
//   if (error) return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
//       <p>{error}</p>
//       <Button onClick={() => navigate("/case_library")} className="mt-4">Back to Case Library</Button>
//     </div>
//   );
//   if (!scenario) return null;

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
//       {!isMobile && (
//         <>
//           <div className="absolute top-20 left-10 opacity-20">
//             <Leaf className="w-12 h-12 text-emerald-200 animate-float" />
//           </div>
//           <div className="absolute top-40 right-20 opacity-15">
//             <Mountain className="w-16 h-16 text-slate-300 animate-float" style={{ animationDelay: "2s" }} />
//           </div>
//         </>
//       )}

//       {/* Header */}
//       <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-2xl">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <Button onClick={() => navigate(-1)} className="flex items-center text-sm text-white/90 hover:text-white transition-colors backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
//               <ArrowLeft className="w-4 h-4 mr-1" /> Return
//             </Button>
//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Stethoscope className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-white">MedSim Wellness</h1>
//                 <p className="text-sm text-emerald-100">Natural Healing Simulation</p>
//               </div>
//             </div>
//           </div>
//           <Badge variant="outline" className="bg-emerald-500/20 text-emerald-100 border-emerald-300/30 backdrop-blur-sm">{scenario.difficulty}</Badge>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="relative z-10 container mx-auto px-6 py-8">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto">
//           {/* Intro */}
//           <div className="text-center mb-8">
//             <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">{scenario.title}</h2>
//             <p className="text-xl text-emerald-100 drop-shadow">{scenario.description || "Patient scenario"}</p>
//           </div>

//           {/* Patient Info + HDM */}
//           <div className="grid lg:grid-cols-3 gap-8 mb-8">
//             <Card className="lg:col-span-1 bg-gradient-to-br from-amber-50/95 to-orange-100/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-amber-900">
//                   <User className="w-5 h-5 text-amber-700 mr-2" /> Patient Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3 text-amber-900">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center shadow-inner">
//                     <Baby className="w-10 h-10" />
//                   </div>
//                 </div>
//                 <p><b>Nom:</b> {scenario.patient_name}</p>
//                 <p><b>Âge:</b> {scenario.patient_age}</p>
//                 <p><b>Sexe:</b> {scenario.patient_gender}</p>
//                 {scenario.patient_weight && <p><b>Poids:</b> {scenario.patient_weight} kg</p>}
//                 {scenario.atcd && <p><b>ATCD:</b> {scenario.atcd}</p>}
//               </CardContent>
//             </Card>

//             <Card className="lg:col-span-2 bg-gradient-to-br from-emerald-50/95 to-green-100/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-emerald-900">
//                   <FileText className="w-5 h-5 text-emerald-700 mr-2" /> Histoire de la Maladie
//                 </CardTitle>
//                 <CardDescription className="text-slate-600">HDM + Lieu d’admission</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 text-emerald-900">
//                 {scenario.hdm && <div className="p-4 bg-emerald-100/60 rounded-xl border-l-4 border-emerald-500 shadow-inner">{scenario.hdm}</div>}
//                 {scenario.lieu_admission && <div className="p-4 bg-amber-100/60 rounded-xl border-l-4 border-amber-500 shadow-inner italic">Admission: {scenario.lieu_admission}</div>}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Vitals */}
//           {vitals.length > 0 && (
//             <Card className="mb-8 bg-gradient-to-br from-blue-50/95 to-indigo-100/95 backdrop-blur-lg rounded-2xl shadow-2xl">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-indigo-900"><Activity className="w-5 h-5 text-indigo-700 mr-2" /> Constantes Vitales</CardTitle>
//               </CardHeader>
//               <CardContent className="grid grid-cols-2 gap-4 text-indigo-900">
//                 {vitals.map((v) => (
//                   <div key={v.id} className="space-y-1">
//                     <p><Heart className="inline w-4 h-4 mr-1 text-red-600" /> HR: {v.fc} bpm</p>
//                     <p><Activity className="inline w-4 h-4 mr-1 text-blue-600" /> RR: {v.fr}/min</p>
//                     <p>SpO₂: {v.spo2}%</p>
//                     <p><Thermometer className="inline w-4 h-4 mr-1 text-orange-600" /> Temp: {v.temperature}°C</p>
//                     <p>TA: {v.ta_systolic}/{v.ta_diastolic} mmHg</p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {/* Objectives */}
//           {objectives && (
//             <Card className="mb-8 bg-gradient-to-br from-emerald-50/95 to-teal-100/95 backdrop-blur-lg rounded-2xl shadow-2xl">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-teal-900"><Target className="w-5 h-5 text-teal-700 mr-2" /> Objectifs Pédagogiques</CardTitle>
//               </CardHeader>
//               <CardContent className="text-teal-900 space-y-2">
//                 <p><b>Principal:</b> {objectives.objectif_principal}</p>
//                 {[objectives.objectif_secondaire1, objectives.objectif_secondaire2, objectives.objectif_secondaire3].map((o, idx) => o && <p key={idx}>• {o}</p>)}
//                 <p><b>Compétences:</b></p>
//                 <ul className="list-disc ml-6">
//                   {[objectives.competence1, objectives.competence2, objectives.competence3, objectives.competence4].map((c, idx) => c && <li key={idx}>{c}</li>)}
//                 </ul>
//               </CardContent>
//             </Card>
//           )}

//           {/* Exams */}
//           {exams.length > 0 && (
//             <Card className="mb-8 bg-gradient-to-br from-gray-50/95 to-slate-100/95 backdrop-blur-lg rounded-2xl shadow-2xl">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-slate-900"><FlaskConical className="w-5 h-5 text-slate-700 mr-2" /> Examens Complémentaires</CardTitle>
//               </CardHeader>
//               <CardContent className="text-slate-900 space-y-3">
//                 {exams.map((exam) => (
//                   <div key={exam.id} className="p-3 bg-white/60 rounded-lg shadow-inner">
//                     {exam.bilans && <p><b>Bilans:</b> {exam.bilans}</p>}
//                     {exam.imagerie && <p><b>Imagerie:</b> {exam.imagerie}</p>}
//                     {exam.ecg && <p><b>ECG:</b> {exam.ecg}</p>}
//                     {exam.autres && <p><b>Autres:</b> {exam.autres}</p>}
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {/* Action Button */}
//           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="text-center">
//             <Button
//               onClick={() => navigate(`/simulation/${id}`, { state: { scenario } })}
//               size="lg"
//               className="px-12 py-6 text-lg group bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-2xl rounded-2xl transition-all duration-300 hover:scale-105"
//             >
//               <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
//               Enter Healing Space
//             </Button>
//             <p className="text-sm text-emerald-100 mt-4 drop-shadow">Step into the wellness sanctuary to begin your natural assessment journey</p>
//           </motion.div>
//         </motion.div>
//       </main>
//     </div>
//   );
// };

// // export default PatientPresentation;
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";

// import { 
//   ArrowLeft, Stethoscope, User, FileText, Play, Baby,
//   Leaf, Mountain, Activity, Thermometer, Heart, Target, FlaskConical
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
//   hdm?: string;
//   atcd?: string;
//   lieu_admission?: string;
//   patient_name?: string;
//   patient_age?: string;
//   patient_gender?: string;
//   patient_weight?: string | null;
//   created_at?: string;
//   updated_at?: string;
//   usage_count?: number; // <-- ajoute cette ligne
//   last_used?: string;
// }

// interface Vitals {
//   id: number;
//   phase_id: number;
//   fc: number;
//   fr: number;
//   spo2: number;
//   temperature: number;
//   ta_systolic: number;
//   ta_diastolic: number;
// }

// interface Objectives {
//   id: number;
//   scenario_id: number;
//   objectif_principal: string;
//   objectif_secondaire1?: string;
//   objectif_secondaire2?: string;
//   objectif_secondaire3?: string;
//   competence1?: string;
//   competence2?: string;
//   competence3?: string;
//   competence4?: string;
// }

// interface Exam {
//   id: number;
//   phase_id: number;
//   bilans?: string;
//   imagerie?: string;
//   ecg?: string;
//   autres?: string;
// }

// const PatientSimulation = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [scenario, setScenario] = useState<Scenario | null>(
//     (location.state as { scenario?: Scenario })?.scenario || null
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [vitals, setVitals] = useState<Vitals[]>([]);
//   const [objectives, setObjectives] = useState<Objectives | null>(null);
//   const [exams, setExams] = useState<Exam[]>([]);

//   const isMobile = window.innerWidth < 768;

//   useEffect(() => {
//     const fetchScenarioData = async () => {
//       try {
//         setLoading(true);

//         let currentScenario = scenario;
//         if (!currentScenario && id) {
//           const { data: scenarioData, error: scenarioError } = await supabase
//             .from("scenarios")
//             .select("*")
//             .eq("id", Number(id))
//             .maybeSingle();
//           if (scenarioError || !scenarioData) {
//             setError("Scenario not found.");
//             setLoading(false);
//             return;
//           }
//           currentScenario = scenarioData;
//           setScenario(currentScenario);
//         }

//         if (!currentScenario?.id) return;

//         const { data: objectivesData, error: objError } = await supabase
//           .from("objectifs")
//           .select("*")
//           .eq("scenario_id", currentScenario.id)
//           .maybeSingle();
//         if (objError) console.error(objError);
//         setObjectives(objectivesData);

//         const { data: phases, error: phasesError } = await supabase
//           .from("phases")
//           .select("id")
//           .eq("scenario_id", currentScenario.id);
//         if (phasesError) console.error(phasesError);

//         if (phases && phases.length > 0) {
//           const phaseIds = phases.map((p) => p.id);

//           const [vitalsRes, examsRes] = await Promise.all([
//             supabase.from("constantes").select("*").in("phase_id", phaseIds),
//             supabase.from("examens").select("*").in("phase_id", phaseIds),
//           ]);

//           if (vitalsRes.error) console.error(vitalsRes.error);
//           if (examsRes.error) console.error(examsRes.error);

//           setVitals(vitalsRes.data || []);
//           setExams(examsRes.data || []);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load patient data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchScenarioData();
//   }, [id]);

//   if (loading) return <div className="flex items-center justify-center min-h-screen text-white text-lg">Loading patient data...</div>;
//   if (error) return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
//       <p>{error}</p>
//       <Button onClick={() => navigate("/case_library")} className="mt-4">Back to Case Library</Button>
//     </div>
//   );
//   if (!scenario) return null;

//   // Inline VitalSignsMonitor
//   const VitalSignsMonitor = ({ vitals }: { vitals: Vitals[] }) => (
//     <Card className="mb-8 bg-gradient-to-br from-blue-50/95 to-indigo-100/95 backdrop-blur-lg rounded-2xl shadow-2xl">
//       <CardHeader>
//         <CardTitle className="flex items-center text-indigo-900"><Activity className="w-5 h-5 text-indigo-700 mr-2" /> Constantes Vitales</CardTitle>
//       </CardHeader>
//       <CardContent className="grid grid-cols-2 gap-4 text-indigo-900">
//         {vitals.map((v) => (
//           <div key={v.id} className="space-y-1">
//             <p><Heart className="inline w-4 h-4 mr-1 text-red-600" /> HR: {v.fc} bpm</p>
//             <p><Activity className="inline w-4 h-4 mr-1 text-blue-600" /> RR: {v.fr}/min</p>
//             <p>SpO₂: {v.spo2}%</p>
//             <p><Thermometer className="inline w-4 h-4 mr-1 text-orange-600" /> Temp: {v.temperature}°C</p>
//             <p>TA: {v.ta_systolic}/{v.ta_diastolic} mmHg</p>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );

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
//       {!isMobile && (
//         <>
//           <div className="absolute top-20 left-10 opacity-20">
//             <Leaf className="w-12 h-12 text-emerald-200 animate-float" />
//           </div>
//           <div className="absolute top-40 right-20 opacity-15">
//             <Mountain className="w-16 h-16 text-slate-300 animate-float" style={{ animationDelay: "2s" }} />
//           </div>
//         </>
//       )}

//       {/* Header */}
//       <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-2xl">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <Button onClick={() => navigate(-1)} className="flex items-center text-sm text-white/90 hover:text-white transition-colors backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
//               <ArrowLeft className="w-4 h-4 mr-1" /> Return
//             </Button>
//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Stethoscope className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-white">MedSim Wellness</h1>
//                 <p className="text-sm text-emerald-100">Natural Healing Simulation</p>
//               </div>
//             </div>
//           </div>
//           <Badge variant="outline" className="bg-emerald-500/20 text-emerald-100 border-emerald-300/30 backdrop-blur-sm">{scenario.difficulty}</Badge>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="relative z-10 container mx-auto px-6 py-8">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto">
//           {/* Intro */}
//           <div className="text-center mb-8">
//             <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">{scenario.title}</h2>
//             <p className="text-xl text-emerald-100 drop-shadow">{scenario.description || "Patient scenario"}</p>
//           </div>

//           {/* Patient Info + HDM */}
//           <div className="grid lg:grid-cols-3 gap-8 mb-8">
//             <Card className="lg:col-span-1 bg-gradient-to-br from-amber-50/95 to-orange-100/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-amber-900">
//                   <User className="w-5 h-5 text-amber-700 mr-2" /> Patient Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3 text-amber-900">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center shadow-inner">
//                     <Baby className="w-10 h-10" />
//                   </div>
//                 </div>
//                 <p><b>Nom:</b> {scenario.patient_name}</p>
//                 <p><b>Âge:</b> {scenario.patient_age}</p>
//                 <p><b>Sexe:</b> {scenario.patient_gender}</p>
//                 {scenario.patient_weight && <p><b>Poids:</b> {scenario.patient_weight} kg</p>}
//                 {scenario.atcd && <p><b>ATCD:</b> {scenario.atcd}</p>}
//               </CardContent>
//             </Card>

//             <Card className="lg:col-span-2 bg-gradient-to-br from-emerald-50/95 to-green-100/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-emerald-900">
//                   <FileText className="w-5 h-5 text-emerald-700 mr-2" /> Histoire de la Maladie
//                 </CardTitle>
//                 <CardDescription className="text-slate-600">HDM + Lieu d’admission</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 text-emerald-900">
//                 {scenario.hdm && <div className="p-4 bg-emerald-100/60 rounded-xl border-l-4 border-emerald-500 shadow-inner">{scenario.hdm}</div>}
//                 {scenario.lieu_admission && <div className="p-4 bg-amber-100/60 rounded-xl border-l-4 border-amber-500 shadow-inner italic">Admission: {scenario.lieu_admission}</div>}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Vitals */}
//           <VitalSignsMonitor vitals={vitals} />

//           {/* Objectives */}
//           {objectives && (
//             <Card className="mb-8 bg-gradient-to-br from-emerald-50/95 to-teal-100/95 backdrop-blur-lg rounded-2xl shadow-2xl">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-teal-900"><Target className="w-5 h-5 text-teal-700 mr-2" /> Objectifs Pédagogiques</CardTitle>
//               </CardHeader>
//               <CardContent className="text-teal-900 space-y-2">
//                 <p><b>Principal:</b> {objectives.objectif_principal}</p>
//                 {[objectives.objectif_secondaire1, objectives.objectif_secondaire2, objectives.objectif_secondaire3].map((o, idx) => o && <p key={idx}>• {o}</p>)}
//                 <p><b>Compétences:</b></p>
//                 <ul className="list-disc ml-6">
//                   {[objectives.competence1, objectives.competence2, objectives.competence3, objectives.competence4].map((c, idx) => c && <li key={idx}>{c}</li>)}
//                 </ul>
//               </CardContent>
//             </Card>
//           )}

//           {/* Exams */}
//           {exams.length > 0 && (
//             <Card className="mb-8 bg-gradient-to-br from-gray-50/95 to-slate-100/95 backdrop-blur-lg rounded-2xl shadow-2xl">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-slate-900"><FlaskConical className="w-5 h-5 text-slate-700 mr-2" /> Examens Complémentaires</CardTitle>
//               </CardHeader>
//               <CardContent className="text-slate-900 space-y-3">
//                 {exams.map((exam) => (
//                   <div key={exam.id} className="p-3 bg-white/60 rounded-lg shadow-inner">
//                     {exam.bilans && <p><b>Bilans:</b> {exam.bilans}</p>}
//                     {exam.imagerie && <p><b>Imagerie:</b> {exam.imagerie}</p>}
//                     {exam.ecg && <p><b>ECG:</b> {exam.ecg}</p>}
//                     {exam.autres && <p><b>Autres:</b> {exam.autres}</p>}
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {/* Action Button */}
//           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="text-center">
//             <Button
//               onClick={() => navigate(`/simulation/${id}`, { state: { scenario } })}
//               size="lg"
//               className="px-12 py-6 text-lg group bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-2xl rounded-2xl transition-all duration-300 hover:scale-105"
//             >
//               <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
//               Enter Healing Space
//             </Button>
//             <p className="text-sm text-emerald-100 mt-4 drop-shadow">Step into the wellness sanctuary to begin your natural assessment journey</p>
//           </motion.div>
//         </motion.div>
//       </main>
//     </div>
//   );
// };

// export default PatientSimulation;import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import PatientPresentation from "./medical/PatientPresentation";
// // import PatientVisualization from "./medical/PatientVisualization";
// // import VitalSignsMonitor from "./medical/VitalSignsMonitor";
// // import ClinicalDecisionInterface from "./medical/ClinicalDecisionInterface";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { useEffect, useState } from "react";

// // // ---------------------
// // // Types & Interfaces
// // // ---------------------
// // interface Patient {
// //   name: string;
// //   age: number;
// //    gender: "male" | "female" | "other";
// //   condition: "stable" | "uncomfortable" | "distressed" | "critical";
// // }

// // interface Vitals {
// //   heartRate: number;
// //   bloodPressure: string;
// //   temperature: number;
// //   respiratoryRate: number;
// // }

// // interface ActionSummary {
// //   id: number;
// //   text: string;
// // }

// // interface SimulationData {
// //   patient: Patient;
// //   vitals: Vitals;
// //   condition: Patient["condition"];
// //   timeElapsed: number;
// //   decisions: any[];
// //   score: number;
// //   actionSummaries: ActionSummary[];
// // }

// // type Phase = "presentation" | "active" | "completed";

// // type PopupType = "dialogue" | "physical" | "complementary" | "diagnosis" | "notes";

// // // ---------------------
// // // Component
// // // ---------------------
// // interface PatientSimulationProps {
// //   patient: Patient;
// // }

// // export default function PatientSimulation({ patient }: PatientSimulationProps) {
// //   const [simulationData, setSimulationData] = useState<SimulationData>({
// //     patient: patient || { 
// //     name: "Unknown", 
// //     age: "0", 
// //     gender: "Unknown", 
// //     condition: "stable"  // <-- required property
// //   },
// //     vitals: {
// //       heartRate: 80,
// //       bloodPressure: "120/80",
// //       temperature: 37,
// //       respiratoryRate: 16,
// //     },
// //     // condition: "stable",
// //     timeElapsed: 0,
// //     decisions: [],
// //     score: 0,
// //     actionSummaries: [],
// //   });

// //   const [phase, setPhase] = useState<Phase>("presentation");
// //   const [activePopup, setActivePopup] = useState<PopupType | null>(null);

// //   // Timer for active simulation
// //   useEffect(() => {
// //     if (phase !== "active") return;
// //     const timer = setInterval(() => {
// //       setSimulationData((prev) => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, [phase]);

// //   // Handle clinical decisions
// //   const handleClinicalDecision = (decision: { type: PopupType; detail: string; effect?: Partial<Vitals> }) => {
// //     setSimulationData((prev) => {
// //       let updatedVitals = { ...prev.vitals };
// //       let updatedScore = prev.score;
// //       let summary = "";

// //       switch (decision.type) {
// //         case "dialogue":
// //           summary = `History taken: ${decision.detail}`;
// //           updatedScore += 2;
// //           break;
// //         case "physical":
// //           summary = `Exam performed: ${decision.detail}`;
// //           updatedScore += 3;
// //           updatedVitals.heartRate += decision.effect?.heartRate || 0;
// //           updatedVitals.bloodPressure = decision.effect?.bloodPressure || updatedVitals.bloodPressure;
// //           break;
// //         case "complementary":
// //           summary = `Test ordered: ${decision.detail}`;
// //           updatedScore += 4;
// //           break;
// //         case "diagnosis":
// //           summary = `Diagnosis: ${decision.detail}`;
// //           updatedScore += 5;
// //           break;
// //         case "notes":
// //           summary = `Notes: ${decision.detail}`;
// //           break;
// //         default:
// //           summary = decision.detail;
// //       }

// //       return {
// //         ...prev,
// //         decisions: [...prev.decisions, decision],
// //         vitals: updatedVitals,
// //         score: updatedScore,
// //         actionSummaries: [{ id: Date.now(), text: summary }, ...prev.actionSummaries],
// //       };
// //     });
// //     setActivePopup(null);
// //   };

// //   const startSimulation = () => setPhase("active");
// //   const endSimulation = () => setPhase("completed");

// //   return (
// //     <div className="w-full h-full relative bg-gray-100 p-4 flex flex-col items-center">
// //       {/* Patient Visualization */}
// //       <PatientVisualization
// //   patient={{
// //     name: simulationData.patient.name,
// //     age: simulationData.patient.age.toString(),
// //     gender: simulationData.patient.gender, // keep only expected props
// //   }}
// //   vitals={{
// //     heartRate: simulationData.vitals.heartRate,
// //     respiratory: simulationData.vitals.respiratoryRate,
// //     oxygenSat: 100,
// //     temperature: simulationData.vitals.temperature,
// //   }}
// //   onBodyPartClick={(bodyPart: string) => console.log("Clicked:", bodyPart)}
// // />

// //       {/* Vital Signs Monitor */}
// //       <VitalSignsMonitor
// //         patient={{
// //           name: simulationData.patient.name,
// //           age: simulationData.patient.age.toString(),
// //           condition: simulationData.condition,
// //         }}
// //         isActive={phase === "active"}
// //       />

// //       {/* Control Buttons */}
// //       {phase === "presentation" && (
// //         <button className="px-6 py-2 bg-blue-600 text-white rounded-lg mt-4" onClick={startSimulation}>
// //           Start Simulation
// //         </button>
// //       )}

// //       {phase === "active" && (
// //         <div className="mt-4 flex space-x-2">
// //           {(["dialogue", "physical", "complementary", "diagnosis", "notes"] as PopupType[]).map((popup) => (
// //             <button
// //               key={popup}
// //               className="px-4 py-2 bg-green-600 text-white rounded-lg"
// //               onClick={() => setActivePopup(popup)}
// //             >
// //               {popup.charAt(0).toUpperCase() + popup.slice(1)}
// //             </button>
// //           ))}
// //           <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={endSimulation}>
// //             End Simulation
// //           </button>
// //         </div>
// //       )}

// //       {/* Popups */}
// //       <AnimatePresence>
// //         {activePopup && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -50 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -50 }}
// //             className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 p-4 bg-white shadow-lg rounded-lg z-50"
// //           >
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>{activePopup.charAt(0).toUpperCase() + activePopup.slice(1)}</CardTitle>
// //               </CardHeader>
// //               <CardContent className="flex flex-col space-y-2">
// //                 <input
// //                   type="text"
// //                   placeholder={`Enter ${activePopup} details`}
// //                   className="border p-2 rounded"
// //                   onKeyDown={(e) => {
// //                     if (e.key === "Enter") {
// //                       const target = e.target as HTMLInputElement;
// //                       handleClinicalDecision({ type: activePopup, detail: target.value });
// //                       target.value = "";
// //                     }
// //                   }}
// //                 />
// //                 <p className="text-sm text-gray-500">Press Enter to confirm</p>
// //               </CardContent>
// //             </Card>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* Action Summaries */}
// //       <div className="absolute bottom-4 left-4 w-80 flex flex-col-reverse space-y-reverse space-y-2">
// //         {simulationData.actionSummaries.map((summary) => (
// //           <motion.div
// //             key={summary.id}
// //             initial={{ opacity: 0, x: -50 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             exit={{ opacity: 0, x: 50 }}
// //             className="bg-white p-2 rounded shadow text-sm"
// //           >
// //             {summary.text}
// //           </motion.div>
// //         ))}
// //       </div>

// //       {/* Score Display */}
// //       <div className="absolute top-4 right-4 bg-white p-2 rounded shadow">
// //         Score: {simulationData.score}
// //       </div>

// //       {/* Time Elapsed */}
// //       {phase === "active" && (
// //         <div className="absolute top-16 right-4 bg-white p-2 rounded shadow">
// //           Time: {simulationData.timeElapsed}s
// //         </div>
// //       )}

// //       {/* Presentation Phase */}
// //       {phase === "presentation" && (
// //   <PatientPresentation onStartSimulation={startSimulation} />
// // )}
// //     </div>
// //   );
// // }
