// // ...existing code...
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import PatientPresentation from "@/components/medical/PatientPresentation";
// import PatientVisualization from "@/components/medical/PatientVisualization";
// import VitalSignsMonitor from "@/components/medical/VitalSignsMonitor";
// import ClinicalDecisionInterface from "@/components/medical/ClinicalDecisionInterface";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { 
//   Clock, 
//   User, 
//   Target, 
//   Award,
//   CheckCircle2,
//   AlertTriangle,
//   Heart,
//   Brain,
//   TrendingUp,
//   ArrowLeft,
//   Loader2,
//   Activity,
//   X,
//   FileText,
//   Stethoscope
// } from "lucide-react";
// import { useUserProgress } from "@/hooks/useUserProgress";
// import { useScenarios } from "@/hooks/useScenarios";
// import { useAuth } from "@/hooks/useAuth";
// import { toast } from "@/hooks/use-toast";
// import patientBedAerial from "@/assets/patient-bed-aerial.jpg";
// import wellnessRetreatInterior from "@/assets/wellness-retreat-interior.jpg";
// import { useNavigate, useParams } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// // ...existing code...

// type SimulationPhase = "presentation" | "active" | "completed";

// interface SimulationData {
//   patient: {
//     id: string;
//     name: string;
//     age: string;
//     gender: string;
//   };
//   vitals: {
//     heartRate: number;
//     bloodPressure: { systolic: number; diastolic: number };
//     respiratory: number;
//     temperature: number;
//     oxygenSat: number;
//     painScore: number;
//   };
//   condition: "stable" | "uncomfortable" | "distressed" | "critical";
//   timeElapsed: number;
//   maxTime: number;
//   score: {
//     accuracy: number;
//     efficiency: number;
//     safety: number;
//     total: number;
//   };
//   decisions: any[];
// }

// interface SimulationRunProps {
//    scenario: { id: string; name: string }; // Pass the scenario object
//   onBackToDashboard?: () => void; 
// }

// const SimulationRun = ({ scenario,onBackToDashboard }: SimulationRunProps) => {
//   const { scenarioId } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { createSession, updateSession, addDecisionToSession } = useUserProgress();
//   const { scenarios } = useScenarios();
  
//   const [phase, setPhase] = useState<"presentation" | "active" | "completed">("presentation");
//   const [currentScenario, setCurrentScenario] = useState<any>(null);
//   const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
//   const [simulationData, setSimulationData] = useState<SimulationData>({
//     patient: {
//       id: "PED001",
//       name: "Emma Thompson",
//       age: "7 years old", 
//       gender: "Female"
//     },
//     vitals: {
//       heartRate: 125,
//       bloodPressure: { systolic: 95, diastolic: 60 },
//       respiratory: 28,
//       temperature: 38.9,
//       oxygenSat: 94,
//       painScore: 4
//     },
//     condition: "uncomfortable",
//     timeElapsed: 0,
//     maxTime: 1800, // 30 minutes
//     score: {
//       accuracy: 85,
//       efficiency: 78,
//       safety: 92,
//       total: 85
//     },
//     decisions: []
//   });

//   const [isSimulationActive, setIsSimulationActive] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [activePopup, setActivePopup] = useState<string | null>(null);
//   const [actionSummaries, setActionSummaries] = useState<{
//     dialogue?: { discovered: string; impact: string };
//     physical?: { discovered: string; impact: string };
//     complementary?: { discovered: string; impact: string };
//     diagnosis?: { discovered: string; impact: string };
//     notes?: { discovered: string; impact: string };
//     treatment?: { discovered: string; impact: string };
//   }>({});
//   const [clinicalActions, setClinicalActions] = useState<any[]>([]);

//   // Initialize with random scenario or mock data
//   useEffect(() => {
//      if (scenarioId) {
//       setPhase("active");
//     }
//     initializeScenario();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [scenarioId, scenarios]);

//   const initializeScenario = async () => {
//     setLoading(true);
    
//     if (Array.isArray(scenarios) && scenarios.length > 0) {
//       // If a param scenarioId provided prefer that else random
//       let selected: any = null;
//       if (scenarioId) {
//         selected = scenarios.find((s: any) => String(s.id) === String(scenarioId));
//       }
//       if (!selected) {
//         selected = scenarios[Math.floor(Math.random() * scenarios.length)];
//       }
//       setCurrentScenario(selected);
      
//       // Load scenario data into simulation
//       if (selected?.scenario_data) {
//         const scenarioData = selected.scenario_data;
//         setSimulationData(prev => ({
//           ...prev,
//           patient: {
//             id: scenarioData.patient?.id || prev.patient.id,
//             name: scenarioData.patient?.name || prev.patient.name,
//             age: scenarioData.patient?.age || prev.patient.age,
//             gender: scenarioData.patient?.gender || prev.patient.gender
//           },
//           vitals: scenarioData.vitals || prev.vitals,
//           condition: scenarioData.condition || prev.condition,
//           maxTime: scenarioData.maxTime || prev.maxTime
//         }));
//       }

//       // Build clinical actions (merge scenario_data.clinicalActions with DB examens/traitements)
//       await buildClinicalActionsFromDB(selected);
//     }
    
//     setLoading(false);
//   };

//   const buildClinicalActionsFromDB = async (selectedScenario: any) => {
//     try {
//       const baseActions: any[] = Array.isArray(selectedScenario?.scenario_data?.clinicalActions)
//         ? selectedScenario.scenario_data.clinicalActions.map((a: any) => ({ ...a })) 
//         : [];

//       // Fetch phases with examens and traitements
//       const { data: phaseRows, error } = await supabase
//         .from("phases")
//         .select(`
//           id,
//           nom_phase,
//           examens(id, ecg, bilans, imagerie, autres),
//           traitements(id, medicaments, gestes)
//         `)
//         .eq("scenario_id", selectedScenario.id);

//       const dbActions: any[] = [];

//       if (!error && Array.isArray(phaseRows)) {
//         phaseRows.forEach((phase: any) => {
//           // examens: array of rows
//           const examensArr = Array.isArray(phase.examens) ? phase.examens : [];
//           examensArr.forEach((ex: any) => {
//             const fields = [
//               { key: "ecg", labelPrefix: "ECG" },
//               { key: "bilans", labelPrefix: "Lab tests" },
//               { key: "imagerie", labelPrefix: "Imaging" },
//               { key: "autres", labelPrefix: "Other exam" },
//             ];
//             fields.forEach((f) => {
//               const value = ex?.[f.key];
//               if (value && String(value).trim()) {
//                 String(value)
//                   .split(",")
//                   .map((s) => s.trim())
//                   .filter(Boolean)
//                   .forEach((labelItem: string, idx: number) => {
//                     dbActions.push({
//                       id: `exam-${phase.id}-${ex?.id ?? Math.random().toString(36).slice(2)}-${f.key}-${idx}`,
//                       label: `${f.labelPrefix}: ${labelItem}`,
//                       type: "examination",
//                       phaseId: phase.id,
//                       source: "db",
//                       raw: value
//                     });
//                   });
//               }
//             });
//           });

//           // traitements: array of rows
//           const traitementsArr = Array.isArray(phase.traitements) ? phase.traitements : [];
//           traitementsArr.forEach((tr: any) => {
//             ["medicaments", "gestes"].forEach((key) => {
//               const value = tr?.[key];
//               if (value && String(value).trim()) {
//                 String(value)
//                   .split(",")
//                   .map((s) => s.trim())
//                   .filter(Boolean)
//                   .forEach((labelItem: string, idx: number) => {
//                     dbActions.push({
//                       id: `treat-${phase.id}-${tr?.id ?? Math.random().toString(36).slice(2)}-${key}-${idx}`,
//                       label: `${key === "medicaments" ? "Medication" : "Action"}: ${labelItem}`,
//                       type: "treatment",
//                       phaseId: phase.id,
//                       source: "db",
//                       raw: value
//                     });
//                   });
//               }
//             });
//           });
//         });
//       } else {
//         // If error or no phases, proceed with baseActions only
//         if (error) console.warn("Error fetching phases for clinical actions:", error);
//       }

//       // Merge dedupe by id (prefer baseActions if ids match)
//       const merged = [
//         ...baseActions,
//         ...dbActions.filter((a) => !baseActions.some((b) => String(b.id) === String(a.id)))
//       ];

//       setClinicalActions(Array.isArray(merged) ? merged : []);
//     } catch (err) {
//       console.error("buildClinicalActionsFromDB error:", err);
//       setClinicalActions(Array.isArray(selectedScenario?.scenario_data?.clinicalActions) ? selectedScenario.scenario_data.clinicalActions : []);
//     }
//   };

//   // Timer for simulation
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isSimulationActive && phase === "active") {
//       interval = setInterval(() => {
//         setSimulationData(prev => ({
//           ...prev,
//           timeElapsed: prev.timeElapsed + 1
//         }));
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isSimulationActive, phase]);

//   // Dynamic condition changes based on time and decisions
//   useEffect(() => {
//     if (phase === "active") {
//       const { timeElapsed, decisions } = simulationData;
      
//       // Simulate condition deterioration if no appropriate interventions
//       if (timeElapsed > 600 && decisions.length < 3) { // 10 minutes with few decisions
//         setSimulationData(prev => ({
//           ...prev,
//           condition: "distressed",
//           vitals: {
//             ...prev.vitals,
//             heartRate: Math.min(140, prev.vitals.heartRate + 5),
//             oxygenSat: Math.max(85, prev.vitals.oxygenSat - 2)
//           }
//         }));
//       }
//     }
//   }, [simulationData.timeElapsed, simulationData.decisions.length, phase]);

//   const handleStartSimulation = async () => {
//     if (!user) {
//       toast({
//         title: "Authentication required",
//         description: "Please sign in to start the simulation.",
//         variant: "destructive"
//       });
//       return;
//     }

//     try {
//       // Create a new session in the database
//       const session = await createSession(
//         currentScenario?.id || null,
//         currentScenario?.scenario_data || simulationData
//       );
//       if (session) {
//         setCurrentSessionId(session.id);
//         setPhase("active");
//         setIsSimulationActive(true);
        
//         toast({
//           title: "Simulation started",
//           description: "Good luck with your medical case!",
//         });
//       } else {
//         throw new Error("Failed to create session");
//       }
//     } catch (error) {
//       console.error("Error starting simulation:", error);
//       toast({
//         title: "Error starting simulation",
//         description: "Please try again later.",
//         variant: "destructive"
//       });
//     }
//   };

//   const handleClinicalDecision = async (decision: any) => {
//     const decisionWithTimestamp = { ...decision, timestamp: simulationData.timeElapsed };
    
//     setSimulationData(prev => ({
//       ...prev,
//       decisions: [...prev.decisions, decisionWithTimestamp]
//     }));

//     // Save decision to database if we have an active session
//     if (currentSessionId) {
//       await addDecisionToSession(currentSessionId, decisionWithTimestamp);
//     }

//     // Generate summary based on decision type and update patient condition
//     let discovered = "";
//     let impact = "";
//     let vitalChanges: any = {};

//     switch (decision.type) {
//       case 'examination':
//         discovered = `${decision.label ?? decision.system ?? "Physical exam"} performed`;
//         impact = "Findings recorded";
//         // sample effect: respiratory exam improves information but not vitals
//         setActionSummaries(prev => ({ ...prev, physical: { discovered, impact } }));
//         break;
      
//       case 'test':
//       case 'complementary':
//         discovered = `${decision.label ?? decision.test ?? "Test"} completed`;
//         impact = "Diagnostic data obtained";
//         setActionSummaries(prev => ({ ...prev, complementary: { discovered, impact } }));
//         break;

//       case 'treatment':
//         discovered = `${decision.label ?? decision.treatment ?? "Treatment"} administered`;
//         impact = "Therapeutic intervention applied";
//         // simple treatment effect example
//         vitalChanges = { oxygenSat: Math.min(100, simulationData.vitals.oxygenSat + 4) };
//         setActionSummaries(prev => ({ ...prev, treatment: { discovered, impact } }));
//         break;
      
//       case 'diagnosis':
//         discovered = `Working diagnosis: ${decision.diagnosis}`;
//         impact = "Guides treatment";
//         setActionSummaries(prev => ({ ...prev, diagnosis: { discovered, impact } }));
//         break;
      
//       case 'history':
//         discovered = "Complete medical history and timeline obtained";
//         impact = "Better understanding of symptom progression";
//         setActionSummaries(prev => ({ ...prev, dialogue: { discovered, impact } }));
//         break;
      
//       case 'notes':
//         discovered = "Clinical observations documented";
//         impact = "Comprehensive case notes updated";
//         setActionSummaries(prev => ({ ...prev, notes: { discovered, impact } }));
//         break;
//     }

//     // Apply vital changes
//     if (Object.keys(vitalChanges).length > 0) {
//       setSimulationData(prev => ({
//         ...prev,
//         vitals: { ...prev.vitals, ...vitalChanges },
//         condition: (vitalChanges as any).condition || prev.condition
//       }));
//     }

//     // Small scoring logic example
//     if (decision.type === "examination") {
//       setSimulationData(prev => ({
//         ...prev,
//         score: {
//           ...prev.score,
//           accuracy: Math.min(100, prev.score.accuracy + 2)
//         }
//       }));
//     }
//   };

//   const handleBodyPartExamination = (bodyPart: string) => {
//     handleClinicalDecision({ type: "examination", system: bodyPart, label: `${bodyPart} Exam` });
//   };

//   const handleCompleteCase = async () => {
//     if (currentSessionId && user) {
//       try {
//         // Calculate final scores
//         const finalAccuracy = simulationData.score.accuracy;
//         const timeToDiagnosis = simulationData.timeElapsed;
        
//         // Update session as completed
//         await updateSession(currentSessionId, {
//           end_time: new Date().toISOString(),
//           session_completed: true,
//           accuracy_score: finalAccuracy,
//           time_to_diagnosis: timeToDiagnosis,
//           final_diagnosis: "Pediatric Asthma",
//           correct_diagnosis: currentScenario?.scenario_data?.correct_diagnosis || "Pediatric Asthma",
//           feedback_received: {
//             scores: simulationData.score,
//             learning_points: [
//               "Excellent systematic approach to history taking",
//               "Appropriate focus on respiratory examination",
//               "Consider earlier chest imaging for respiratory symptoms",
//               "Monitor vital signs more frequently in febrile patients"
//             ]
//           }
//         });

//         toast({
//           title: "Case completed successfully!",
//           description: `Final accuracy: ${Math.round(finalAccuracy)}%`,
//         });
//       } catch (error) {
//         console.error("Error completing session:", error);
//         toast({
//           title: "Error saving results",
//           description: "Your case was completed but results may not be saved.",
//           variant: "destructive"
//         });
//       }
//     }
    
//     setPhase("completed");
//     setIsSimulationActive(false);
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const getTimeProgress = () => {
//     return (simulationData.timeElapsed / simulationData.maxTime) * 100;
//   };

//   const getTimeColor = () => {
//     const progress = getTimeProgress();
//     if (progress > 80) return "critical";
//     if (progress > 60) return "warning";
//     return "normal";
//   };

//   // Safe filtered lists used in UI
//   const examinationActions = Array.isArray(clinicalActions) ? clinicalActions.filter(a => a.type === "examination") : [];
//   const complementaryActions = Array.isArray(clinicalActions) ? clinicalActions.filter(a => a.type === "test" || a.type === "complementary") : [];
//   const treatmentActions = Array.isArray(clinicalActions) ? clinicalActions.filter(a => a.type === "treatment") : [];

//   // Show loading while initializing
//   if (loading) {
//     return (
//       <div 
//         className="min-h-screen flex items-center justify-center relative"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(76, 89, 63, 0.4), rgba(101, 117, 80, 0.6)),
//             url(${wellnessRetreatInterior})
//           `,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat'
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-green-50/10 to-stone-50/30"></div>
//         <div className="relative z-10 text-center">
//           <div className="backdrop-blur-xl bg-white/10 p-12 rounded-3xl border border-white/20 shadow-2xl max-w-md mx-auto">
//             <Loader2 className="w-12 h-12 animate-spin text-amber-700 mx-auto mb-6" />
//             <h3 className="text-2xl font-serif text-stone-800 mb-3">Preparing Healing Sanctuary</h3>
//             <p className="text-stone-700 font-medium opacity-80">Creating your immersive medical environment...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (phase === "presentation") {
//     return (
//        <PatientPresentation
//         scenarioId={scenario.id}
//         onStartSimulation={() => setPhase("active")}
//       />
//      );
//   }

//   if (phase === "active") {
//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Full-screen patient background */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${patientBedAerial})`,
//           filter: 'brightness(1.1) contrast(1.05)'
//         }}
//       />
      
//       {/* Overlay for better UI visibility */} 
//       <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

//       {/* Top floating header */} 
//       <header className="absolute top-4 left-4 right-4 z-50 border-none">
//        <div className="backdrop-blur-xl bg-white border border-white rounded-2xl shadow-2xl p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button 
//                 variant="ghost" 
//                 onClick={onBackToDashboard}
//                 className="backdrop-blur-sm bg-white/30 border border-white/40 text-stone-800 hover:bg-white/40 rounded-xl shadow-lg"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Exit
//               </Button>
//               <div className="text-stone-800">
//                 <h1 className="text-lg font-serif font-bold">{simulationData.patient.name}</h1>
//                 <p className="text-sm opacity-80">{simulationData.patient.age} • {simulationData.patient.gender}</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-3">
//               <div className={`backdrop-blur-sm px-3 py-2 rounded-xl text-sm font-semibold border shadow-lg ${
//                 getTimeColor() === "critical" ? "bg-red-100/40 text-red-800 border-red-200/50" :
//                 getTimeColor() === "warning" ? "bg-amber-100/40 text-amber-800 border-amber-200/50" :
//                 "bg-emerald-100/40 text-emerald-800 border-emerald-200/50"
//               }`}>
//                 <Clock className="w-4 h-4 inline mr-2" />
//                 {formatTime(simulationData.timeElapsed)}
//               </div>
              
//               <div className={`backdrop-blur-sm px-3 py-2 rounded-xl text-sm font-semibold border shadow-lg ${
//                 simulationData.condition === "stable" ? "bg-emerald-100/40 text-emerald-800 border-emerald-200/50" :
//                 simulationData.condition === "uncomfortable" ? "bg-amber-100/40 text-amber-800 border-amber-200/50" :
//                 "bg-red-100/40 text-red-800 border-red-200/50"
//               }`}>
//                 <Heart className="w-4 h-4 inline mr-2" />
//                 {simulationData.condition}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <VitalSignsMonitor 
//         patient={{
//           name: simulationData.patient.name,
//           age: simulationData.patient.age,
//           condition: simulationData.condition
//         }}
//         isActive={isSimulationActive}
//       />

//       {/* Clinical Action Panel (Right Side) */}
//       <div className="absolute right-6 top-1/2 transform -translate-y-1/2 w-80 z-40">
//         <motion.div
//           initial={{ x: 300, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.8, duration: 0.6 }}
//           className="backdrop-blur-xl bg-amber-900/25 border border-amber-600/30 shadow-2xl rounded-3xl overflow-hidden"
//         >
//           {/* Header */}
//           <div className="bg-emerald-700/80 px-6 py-4 flex items-center justify-between rounded-t-3xl">
//             <h3 className="text-lg font-serif text-white">Clinical Action</h3>
//             <Button 
//               variant="ghost" 
//               size="icon"
//               className="text-white hover:bg-white/20 rounded-xl w-8 h-8"
//             >
//               <ArrowLeft className="w-4 h-4" />
//             </Button>
//           </div>
          
//           {/* Action Items */}
//           <div className="p-6 space-y-3">
//             <Button 
//               variant="ghost" 
//               onClick={() => setActivePopup('dialogue')}
//               className="w-full justify-start backdrop-blur-sm bg-amber-800/30 border border-amber-600/40 text-amber-100 hover:bg-amber-700/40 rounded-2xl font-medium shadow-lg p-4 h-auto transition-all duration-300 hover:shadow-xl hover:bg-amber-700/50"
//             >
//               <Heart className="w-5 h-5 mr-3 text-amber-200" />
//               <span className="text-left">Dialogue</span>
//             </Button>
            
//             <Button 
//               variant="ghost" 
//               onClick={() => setActivePopup('physical')}
//               className="w-full justify-start backdrop-blur-sm bg-amber-800/30 border border-amber-600/40 text-amber-100 hover:bg-amber-700/40 rounded-2xl font-medium shadow-lg p-4 h-auto transition-all duration-300 hover:shadow-xl hover:bg-amber-700/50"
//             >
//               <Activity className="w-5 h-5 mr-3 text-amber-200" />
//               <span className="text-left">Physical Examination</span>
//             </Button>
            
//             <Button 
//               variant="ghost" 
//               onClick={() => setActivePopup('complementary')}
//               className="w-full justify-start backdrop-blur-sm bg-amber-800/30 border border-amber-600/40 text-amber-100 hover:bg-amber-700/40 rounded-2xl font-medium shadow-lg p-4 h-auto transition-all duration-300 hover:shadow-xl hover:bg-amber-700/50"
//             >
//               <TrendingUp className="w-5 h-5 mr-3 text-amber-200" />
//               <span className="text-left">Complementary Examination</span>
//             </Button>

//             <Button 
//               variant="ghost" 
//               onClick={() => setActivePopup('diagnosis')}
//               className="w-full justify-start backdrop-blur-sm bg-amber-800/30 border border-amber-600/40 text-amber-100 hover:bg-amber-700/40 rounded-2xl font-medium shadow-lg p-4 h-auto transition-all duration-300 hover:shadow-xl hover:bg-amber-700/50"
//             >
//               <Target className="w-5 h-5 mr-3 text-amber-200" />
//               <span className="text-left">Diagnosis to be Evoked</span>
//             </Button>

//             <Button 
//               variant="ghost" 
//               onClick={() => setActivePopup('notes')}
//               className="w-full justify-start backdrop-blur-sm bg-amber-800/30 border border-amber-600/40 text-amber-100 hover:bg-amber-700/40 rounded-2xl font-medium shadow-lg p-4 h-auto transition-all duration-300 hover:shadow-xl hover:bg-amber-700/50"
//             >
//               <FileText className="w-5 h-5 mr-3 text-amber-200" />
//               <span className="text-left">Notes</span>
//             </Button>

//             <Button 
//               variant="ghost" 
//               onClick={() => setActivePopup('treatment')}
//               className="w-full justify-start backdrop-blur-sm bg-amber-800/30 border border-amber-600/40 text-amber-100 hover:bg-amber-700/40 rounded-2xl font-medium shadow-lg p-4 h-auto transition-all duration-300 hover:shadow-xl hover:bg-amber-700/50"
//             >
//               <Activity className="w-5 h-5 mr-3 text-amber-200" />
//               <span className="text-left">Treatments</span>
//             </Button>
            
//           </div>
//         </motion.div>
//       </div>

//       {/* Augmented Reality Popup Cards */}
//       <AnimatePresence>
//         {activePopup && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
//             onClick={() => setActivePopup(null)}
//           >
//             {/* Dialogue Popup */}
//             {activePopup === 'dialogue' && (
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0, y: 50 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.8, opacity: 0, y: 50 }}
//                 transition={{ type: "spring", damping: 20, stiffness: 300 }}
//                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] max-h-[80vh] overflow-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <Card className="backdrop-blur-xl bg-white/90 border border-white/40 shadow-2xl rounded-3xl overflow-hidden">
//                   <CardHeader className="bg-gradient-to-r from-emerald-100/80 to-teal-100/80 relative">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setActivePopup(null)}
//                       className="absolute top-4 right-4 text-stone-600 hover:bg-white/50 rounded-full"
//                     >
//                       <X className="w-5 h-5" />
//                     </Button>
//                     <CardTitle className="flex items-center text-emerald-800 text-xl font-serif">
//                       <Heart className="w-6 h-6 mr-3 text-emerald-600" />
//                       Patient Dialogue & History
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-6 bg-gradient-to-br from-white/95 to-emerald-50/50">
//                     <div className="space-y-6">
//                       <div className="grid grid-cols-3 gap-4">
//                         <div className="backdrop-blur-sm bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/50 shadow-lg">
//                           <h4 className="font-semibold text-emerald-800 mb-3">Timeline</h4>
//                           <div className="space-y-2 text-sm text-emerald-700">
//                             <p>• 2 days ago: Cough started</p>
//                             <p>• Yesterday: Fever began</p>
//                             <p>• This morning: Difficulty breathing</p>
//                           </div>
//                         </div>
//                         <div className="backdrop-blur-sm bg-blue-50/70 p-4 rounded-2xl border border-blue-200/50 shadow-lg">
//                           <h4 className="font-semibold text-blue-800 mb-3">Associated Symptoms</h4>
//                           <div className="space-y-2 text-sm text-blue-700">
//                             <p>• Wheezing sounds</p>
//                             <p>• Chest tightness</p>
//                             <p>• Fatigue</p>
//                           </div>
//                         </div>
//                         <div className="backdrop-blur-sm bg-purple-50/70 p-4 rounded-2xl border border-purple-200/50 shadow-lg">
//                           <h4 className="font-semibold text-purple-800 mb-3">Past Medical</h4>
//                           <div className="space-y-2 text-sm text-purple-700">
//                             <p>• Previous bronchitis</p>
//                             <p>• No known allergies</p>
//                             <p>• Regular checkups</p>
//                           </div>
//                         </div>
//                       </div>
//                       <Button
//                         onClick={() => { handleClinicalDecision({ type: 'history' }); setActivePopup(null); }}
//                         className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl p-3"
//                       >
//                         Complete History Review
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}

//             {/* Physical Examination Popup */}
//             {activePopup === 'physical' && (
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0, y: 50 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.8, opacity: 0, y: 50 }}
//                 transition={{ type: "spring", damping: 20, stiffness: 300 }}
//                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[80vh] overflow-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <Card className="backdrop-blur-xl bg-white/90 border border-white/40 shadow-2xl rounded-3xl overflow-hidden">
//                   <CardHeader className="bg-gradient-to-r from-blue-100/80 to-cyan-100/80 relative">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setActivePopup(null)}
//                       className="absolute top-4 right-4 text-stone-600 hover:bg-white/50 rounded-full"
//                     >
//                       <X className="w-5 h-5" />
//                     </Button>
//                     <CardTitle className="flex items-center text-blue-800 text-xl font-serif">
//                       <Stethoscope className="w-6 h-6 mr-3 text-blue-600" />
//                       Physical Examination
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-6 bg-gradient-to-br from-white/95 to-blue-50/50">
//                     <div className="grid grid-cols-2 gap-4">
//                       {(examinationActions.length > 0
//                         ? examinationActions
//                         : ['Respiratory', 'Cardiovascular', 'Abdominal', 'Neurological'].map(system => ({ id: system, label: `${system} Exam`, system }))
//                       ).map((action) => (
//                         <Button
//                           key={action.id ?? action.label}
//                           variant="outline"
//                           onClick={() => { handleClinicalDecision({ type: 'examination', system: action.system ?? action.label, label: action.label, ...action }); setActivePopup(null); }}
//                           className="p-4 h-auto justify-start backdrop-blur-sm bg-blue-50/50 border border-blue-200/50 text-blue-800 hover:bg-blue-100/60 rounded-2xl shadow-lg transition-all duration-300"
//                         >
//                           <Activity className="w-5 h-5 mr-3 text-blue-600" />
//                           <span>{action.label ?? action.system}</span>
//                         </Button>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}

//             {/* Complementary Examination Popup */}
//             {activePopup === 'complementary' && (
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0, y: 50 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.8, opacity: 0, y: 50 }}
//                 transition={{ type: "spring", damping: 20, stiffness: 300 }}
//                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[80vh] overflow-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <Card className="backdrop-blur-xl bg-white/90 border border-white/40 shadow-2xl rounded-3xl overflow-hidden">
//                   <CardHeader className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 relative">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setActivePopup(null)}
//                       className="absolute top-4 right-4 text-stone-600 hover:bg-white/50 rounded-full"
//                     >
//                       <X className="w-5 h-5" />
//                     </Button>
//                     <CardTitle className="flex items-center text-purple-800 text-xl font-serif">
//                       <TrendingUp className="w-6 h-6 mr-3 text-purple-600" />
//                       Complementary Examinations
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-6 bg-gradient-to-br from-white/95 to-purple-50/50">
//                     <div className="grid grid-cols-2 gap-4">
//                       {(complementaryActions.length > 0
//                         ? complementaryActions
//                         : ['Chest X-Ray', 'Blood Tests', 'Oxygen Saturation', 'Peak Flow'].map(t => ({ id: t, label: t, test: t }))
//                       ).map((action: any) => (
//                         <Button
//                           key={action.id ?? action.label}
//                           variant="outline"
//                           onClick={() => { handleClinicalDecision({ type: 'test', test: action.test ?? action.label, label: action.label, ...action }); setActivePopup(null); }}
//                           className="p-4 h-auto justify-start backdrop-blur-sm bg-purple-50/50 border border-purple-200/50 text-purple-800 hover:bg-purple-100/60 rounded-2xl shadow-lg transition-all duration-300"
//                         >
//                           <Target className="w-5 h-5 mr-3 text-purple-600" />
//                           <span>{action.label ?? action.test}</span>
//                         </Button>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}

//             {/* Treatment Popup */}
//             {activePopup === 'treatment' && (
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0, y: 50 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.8, opacity: 0, y: 50 }}
//                 transition={{ type: "spring", damping: 20, stiffness: 300 }}
//                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[80vh] overflow-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <Card className="backdrop-blur-xl bg-white/90 border border-white/40 shadow-2xl rounded-3xl overflow-hidden">
//                   <CardHeader className="bg-gradient-to-r from-amber-100/80 to-orange-100/80 relative">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setActivePopup(null)}
//                       className="absolute top-4 right-4 text-stone-600 hover:bg-white/50 rounded-full"
//                     >
//                       <X className="w-5 h-5" />
//                     </Button>
//                     <CardTitle className="flex items-center text-amber-800 text-xl font-serif">
//                       <Award className="w-6 h-6 mr-3 text-amber-600" />
//                       Treatments & Interventions
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-6 bg-gradient-to-br from-white/95 to-amber-50/50">
//                     <div className="grid grid-cols-2 gap-4">
//                       {(treatmentActions.length > 0 ? treatmentActions : []).map((action: any) => (
//                         <Button
//                           key={action.id ?? action.label}
//                           variant="outline"
//                           onClick={() => { handleClinicalDecision({ type: 'treatment', treatment: action.label, label: action.label, ...action }); setActivePopup(null); }}
//                           className="p-4 h-auto justify-start backdrop-blur-sm bg-amber-50/50 border border-amber-200/50 text-amber-800 hover:bg-amber-100/60 rounded-2xl shadow-lg transition-all duration-300"
//                         >
//                           <Activity className="w-5 h-5 mr-3 text-amber-600" />
//                           <span>{action.label}</span>
//                         </Button>
//                       ))}
//                       {treatmentActions.length === 0 && (
//                         <p className="col-span-full text-sm text-gray-500">No treatment actions available for this scenario.</p>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}

//             {/* Diagnosis Popup */}
//             {activePopup === 'diagnosis' && (
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0, y: 50 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.8, opacity: 0, y: 50 }}
//                 transition={{ type: "spring", damping: 20, stiffness: 300 }}
//                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[80vh] overflow-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <Card className="backdrop-blur-xl bg-white/90 border border-white/40 shadow-2xl rounded-3xl overflow-hidden">
//                   <CardHeader className="bg-gradient-to-r from-amber-100/80 to-orange-100/80 relative">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setActivePopup(null)}
//                       className="absolute top-4 right-4 text-stone-600 hover:bg-white/50 rounded-full"
//                     >
//                       <X className="w-5 h-5" />
//                     </Button>
//                     <CardTitle className="flex items-center text-amber-800 text-xl font-serif">
//                       <Brain className="w-6 h-6 mr-3 text-amber-600" />
//                       Diagnostic Considerations
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-6 bg-gradient-to-br from-white/95 to-amber-50/50">
//                     <div className="space-y-4">
//                       {['Pediatric Asthma', 'Bronchiolitis', 'Pneumonia', 'Upper Respiratory Infection'].map((diagnosis) => (
//                         <Button
//                           key={diagnosis}
//                           variant="outline"
//                           onClick={() => { handleClinicalDecision({ type: 'diagnosis', diagnosis }); setActivePopup(null); }}
//                           className="w-full p-4 h-auto justify-start backdrop-blur-sm bg-amber-50/50 border border-amber-200/50 text-amber-800 hover:bg-amber-100/60 rounded-2xl shadow-lg transition-all duration-300"
//                         >
//                           <Target className="w-5 h-5 mr-3 text-amber-600" />
//                           <span>{diagnosis}</span>
//                         </Button>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}

//             {/* Notes Popup */}
//             {activePopup === 'notes' && (
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0, y: 50 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.8, opacity: 0, y: 50 }}
//                 transition={{ type: "spring", damping: 20, stiffness: 300 }}
//                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] max-h-[80vh] overflow-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <Card className="backdrop-blur-xl bg-white/90 border border-white/40 shadow-2xl rounded-3xl overflow-hidden">
//                   <CardHeader className="bg-gradient-to-r from-stone-100/80 to-slate-100/80 relative">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setActivePopup(null)}
//                       className="absolute top-4 right-4 text-stone-600 hover:bg-white/50 rounded-full"
//                     >
//                       <X className="w-5 h-5" />
//                     </Button>
//                     <CardTitle className="flex items-center text-stone-800 text-xl font-serif">
//                       <FileText className="w-6 h-6 mr-3 text-stone-600" />
//                       Clinical Notes
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-6 bg-gradient-to-br from-white/95 to-stone-50/50">
//                     <div className="space-y-4">
//                       <textarea
//                         placeholder="Enter your clinical observations and notes..."
//                         className="w-full h-40 p-4 rounded-2xl border border-stone-200 bg-white/80 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-stone-300"
//                       />
//                       <Button
//                         onClick={() => {
//                           handleClinicalDecision({ type: 'notes', content: 'Clinical notes saved' });
//                           setActivePopup(null);
//                         }}
//                         className="w-full bg-gradient-to-r from-stone-500 to-stone-600 hover:from-stone-600 hover:to-stone-700 text-white rounded-2xl p-3"
//                       >
//                         Save Notes
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Floating Action Summaries */}
//       <AnimatePresence>
//         {Object.entries(actionSummaries).map(([action, summary]) => (
//           <motion.div
//             key={action}
//             initial={{ opacity: 0, y: 20, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.9 }}
//             transition={{ type: "spring", damping: 20, stiffness: 300 }}
//             className="fixed bottom-20 left-6 z-40 w-80"
//           >
//             <Card className="backdrop-blur-xl bg-white/90 border border-white/40 shadow-2xl rounded-2xl overflow-hidden">
//               <CardContent className="p-4">
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <h4 className="font-semibold text-stone-800 capitalize">{action} Results</h4>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setActionSummaries(prev => {
//                         const newSummaries = { ...prev };
//                         delete newSummaries[action as keyof typeof prev];
//                         return newSummaries;
//                       })}
//                       className="w-6 h-6 text-stone-500 hover:text-stone-700"
//                     >
//                       <X className="w-4 h-4" />
//                     </Button>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="backdrop-blur-sm bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/50">
//                       <p className="text-sm font-medium text-emerald-800 mb-1">Discovered:</p>
//                       <p className="text-sm text-emerald-700">{summary!.discovered}</p>
//                     </div>
                    
//                     <div className="backdrop-blur-sm bg-blue-50/70 p-3 rounded-xl border border-blue-200/50">
//                       <p className="text-sm font-medium text-blue-800 mb-1">Impact:</p>
//                       <p className="text-sm text-blue-700">{summary!.impact}</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )) as any}
//       </AnimatePresence>

//       {/* Patient interaction overlay */}
//       <div className="absolute inset-0 z-30">
//         <PatientVisualization 
//           patient={simulationData.patient}
//           vitals={simulationData.vitals}
//           onBodyPartClick={handleBodyPartExamination}
//         />
//       </div>

//       {/* Bottom floating controls */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
//         <div className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl shadow-2xl p-4">
//           <div className="flex items-center space-x-6">
//             <div className="flex items-center space-x-3">
//               <div className="backdrop-blur-sm bg-white/30 px-3 py-2 rounded-lg border border-white/40 text-stone-800 text-sm font-medium">
//                 <User className="w-4 h-4 inline mr-2" />
//                 Decisions: {simulationData.decisions.length}
//               </div>
//               <div className="backdrop-blur-sm bg-white/30 px-3 py-2 rounded-lg border border-white/40 text-stone-800 text-sm font-medium">
//                 <Target className="w-4 h-4 inline mr-2" />
//                 Score: {simulationData.score.accuracy}%
//               </div>
//             </div>
            
//             <Button 
//               onClick={handleCompleteCase}
//               className="backdrop-blur-sm bg-emerald-500/80 hover:bg-emerald-600/80 text-white border border-emerald-400/50 shadow-lg rounded-xl px-6 py-3"
//             >
//               <CheckCircle2 className="w-5 h-5 mr-2" />
//               Complete Case
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
// }
//   if (phase === "completed") {
//     return (
//       <div 
//         className="min-h-screen relative"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(76, 89, 63, 0.3), rgba(101, 117, 80, 0.5)),
//             url(${wellnessRetreatInterior})
//           `,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat'
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-stone-50/20 to-green-50/25"></div>
//         {/* Case Completion Screen */}
//         <main className="relative z-10 container mx-auto px-6 py-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="max-w-4xl mx-auto"
//           >
//             <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl mb-8 rounded-3xl overflow-hidden">
//               <CardHeader className="text-center bg-gradient-to-r from-amber-100/20 to-stone-100/20 border-b border-white/10">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.2, type: "spring" }}
//                   className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-white/30"
//                 >
//                   <CheckCircle2 className="w-10 h-10 text-white" />
//                 </motion.div>
//                 <CardTitle className="text-3xl text-stone-800 font-serif">Healing Journey Completed</CardTitle>
//                 <CardDescription className="text-stone-700 text-lg font-medium">
//                   Patient: {simulationData.patient.name} • Duration: {formatTime(simulationData.timeElapsed)}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="bg-gradient-to-br from-white/30 to-emerald-50/30">
//                 <div className="grid md:grid-cols-3 gap-6">
//                   <div className="text-center backdrop-blur-sm bg-emerald-100/30 p-4 rounded-2xl border border-emerald-200/50">
//                     <div className="text-3xl font-bold text-emerald-700">{simulationData.score.accuracy}%</div>
//                     <div className="text-sm text-emerald-600 font-medium">Diagnostic Harmony</div>
//                   </div>
//                   <div className="text-center backdrop-blur-sm bg-amber-100/30 p-4 rounded-2xl border border-amber-200/50">
//                     <div className="text-3xl font-bold text-amber-700">{simulationData.score.efficiency}%</div>
//                     <div className="text-sm text-amber-600 font-medium">Clinical Flow</div>
//                   </div>
//                   <div className="text-center backdrop-blur-sm bg-blue-100/30 p-4 rounded-2xl border border-blue-200/50">
//                     <div className="text-3xl font-bold text-blue-700">{simulationData.score.safety}%</div>
//                     <div className="text-sm text-blue-600 font-medium">Patient Wellness</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="grid md:grid-cols-2 gap-6">
//               <Card className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-3xl overflow-hidden">
//                 <CardHeader className="bg-gradient-to-r from-emerald-100/40 to-teal-100/40">
//                   <CardTitle className="flex items-center text-emerald-800 font-serif">
//                     <Brain className="w-5 h-5 text-emerald-600 mr-2" />
//                     Healing Wisdom Analysis
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4 bg-white/10">
//                   <div className="space-y-3">
//                     <div className="p-3 backdrop-blur-sm bg-emerald-50/30 rounded-xl border border-emerald-200/30">
//                       <div className="flex justify-between text-sm mb-1 text-emerald-800">
//                         <span>Patient Connection</span>
//                         <span className="font-medium">Excellent</span>
//                       </div>
//                       <Progress value={92} className="h-2 bg-emerald-100/50" />
//                     </div>
//                     <div className="p-3 backdrop-blur-sm bg-blue-50/30 rounded-xl border border-blue-200/30">
//                       <div className="flex justify-between text-sm mb-1 text-blue-800">
//                         <span>Physical Attunement</span>
//                         <span className="font-medium">Good</span>
//                       </div>
//                       <Progress value={78} className="h-2 bg-blue-100/50" />
//                     </div>
//                     <div className="p-3 backdrop-blur-sm bg-purple-50/30 rounded-xl border border-purple-200/30">
//                       <div className="flex justify-between text-sm mb-1 text-purple-800">
//                         <span>Intuitive Reasoning</span>
//                         <span className="font-medium">Very Good</span>
//                       </div>
//                       <Progress value={88} className="h-2 bg-purple-100/50" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-3xl overflow-hidden">
//                 <CardHeader className="bg-gradient-to-r from-amber-100/40 to-orange-100/40">
//                   <CardTitle className="flex items-center text-amber-800 font-serif">
//                     <TrendingUp className="w-5 h-5 text-amber-600 mr-2" />
//                     Growth Insights
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="bg-white/10">
//                   <ul className="space-y-3 text-sm">
//                     <li className="flex items-start p-3 backdrop-blur-sm bg-emerald-50/30 rounded-xl border border-emerald-200/30">
//                       <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
//                       <span className="text-emerald-800">Excellent harmony in patient connection</span>
//                     </li>
//                     <li className="flex items-start p-3 backdrop-blur-sm bg-emerald-50/30 rounded-xl border border-emerald-200/30">
//                       <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
//                       <span className="text-emerald-800">Mindful focus on respiratory wellness</span>
//                     </li>
//                     <li className="flex items-start p-3 backdrop-blur-sm bg-amber-50/30 rounded-xl border border-amber-200/30">
//                       <AlertTriangle className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
//                       <span className="text-amber-800">Consider deeper imaging meditation for respiratory flow</span>
//                     </li>
//                     <li className="flex items-start p-3 backdrop-blur-sm bg-amber-50/30 rounded-xl border border-amber-200/30">
//                       <AlertTriangle className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
//                       <span className="text-amber-800">Enhance vital energy monitoring in healing process</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="flex justify-center gap-4 mt-8">
//               <Button 
//                 variant="outline" 
//                 size="lg" 
//                 onClick={onBackToDashboard}
//                 className="backdrop-blur-sm bg-white/30 border border-white/40 text-emerald-800 hover:bg-white/50 shadow-lg rounded-2xl"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Return to Sanctuary
//               </Button>
//               <Button 
//                 variant="default" 
//                 size="lg" 
//                 onClick={() => setPhase("presentation")}
//                 className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg rounded-2xl border-0"
//               >
//                 Begin New Journey
//               </Button>
//             </div>
//           </motion.div>
//         </main>
//       </div>
//     );
//   }
// };

// export default SimulationRun;
// // ...existing code...import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PatientPresentation from "@/components/medical/PatientPresentation";
import PatientVisualization from "@/components/medical/PatientVisualization";
import VitalSignsMonitor from "@/components/medical/VitalSignsMonitor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  User,
  Target,
  Award,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Brain,
  TrendingUp,
  ArrowLeft,
  Loader2,
  Activity,
  X,
  FileText,
  Stethoscope,
} from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useScenarios } from "@/routes/useScenarios";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import patientBedAerial from "@/assets/patient-bed-aerial.jpg";
import wellnessRetreatInterior from "@/assets/wellness-retreat-interior.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useRef, useState } from "react";

type SimulationPhase = "presentation" | "active" | "completed";

interface SimulationData {
  patient: { id: string; name: string; age: string; gender: string };
  vitals: {
    heartRate: number;
    bloodPressure: { systolic: number; diastolic: number };
    respiratory: number;
    temperature: number;
    oxygenSat: number;
    painScore: number;
  };
  condition: "stable" | "uncomfortable" | "distressed" | "critical";
  timeElapsed: number;
  maxTime: number;
  score: { accuracy: number; efficiency: number; safety: number; total: number };
  decisions: any[];
}

interface SimulationRunProps {
  scenario?: { id: number | string; title?: string };
  onBackToDashboard?: () => void;
}

interface PhaseSchema {
  id: number;
  nom_phase?: string | null;
  description?: string | null;
  fin_action?: boolean | null;
  fin_temps?: boolean | null;
  prochaine_phase?: string | null;
  constantes?: any[]; // constantes rows
  examens?: any[]; // examens rows
  traitements?: any[]; // traitements rows
  actions?: any[]; // built actions
  durationSeconds?: number | null; // optional derived duration
}

const DEFAULT_PHASE_DURATION = 90; // seconds fallback

const SimulationRun: React.FC<SimulationRunProps> = ({ scenario, onBackToDashboard }) => {
  const { scenarioId: paramScenarioId } = useParams<{ scenarioId?: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createSession, updateSession, addDecisionToSession } = useUserProgress();
  const { scenarios } = useScenarios();

  const [phase, setPhase] = useState<SimulationPhase>("presentation");
  const [currentScenario, setCurrentScenario] = useState<any | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [phases, setPhases] = useState<PhaseSchema[]>([]);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [phaseTimeElapsed, setPhaseTimeElapsed] = useState<number>(0);
  const [simulationData, setSimulationData] = useState<SimulationData>({
    patient: { id: "PED001", name: "Emma Thompson", age: "7 years old", gender: "Female" },
    vitals: {
      heartRate: 125,
      bloodPressure: { systolic: 95, diastolic: 60 },
      respiratory: 28,
      temperature: 38.9,
      oxygenSat: 94,
      painScore: 4,
    },
    condition: "uncomfortable",
    timeElapsed: 0,
    maxTime: 1800,
    score: { accuracy: 85, efficiency: 78, safety: 92, total: 85 },
    decisions: [],
  });

  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [clinicalActions, setClinicalActions] = useState<any[]>([]);
  const timersRef = useRef<{ simulation?: number; phase?: number }>({});

  useEffect(() => {
    initializeScenario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramScenarioId, scenarios]);

  useEffect(() => {
    if (isSimulationActive && phase === "active") {
      timersRef.current.simulation = window.setInterval(() => {
        setSimulationData((prev) => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
        setPhaseTimeElapsed((t) => t + 1);
      }, 1000);
    } else {
      if (timersRef.current.simulation) {
        clearInterval(timersRef.current.simulation);
        timersRef.current.simulation = undefined;
      }
    }
    return () => {
      if (timersRef.current.simulation) {
        clearInterval(timersRef.current.simulation);
        timersRef.current.simulation = undefined;
      }
    };
  }, [isSimulationActive, phase]);

  useEffect(() => {
    if (!phases || phases.length === 0) return;
    const currentPhase = phases[currentPhaseIndex];
    if (!currentPhase) return;
    const duration = currentPhase.durationSeconds ?? DEFAULT_PHASE_DURATION;
    if (currentPhase.fin_temps) {
      if (phaseTimeElapsed >= duration) {
        advancePhase();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseTimeElapsed]);

  useEffect(() => {
    return () => {
      if (timersRef.current.simulation) clearInterval(timersRef.current.simulation);
      if (timersRef.current.phase) clearInterval(timersRef.current.phase);
    };
  }, []);

  async function initializeScenario() {
    setLoading(true);
    try {
      let selected: any = scenario ?? null;
      if (!selected && paramScenarioId && Array.isArray(scenarios)) {
        selected = scenarios.find((s: any) => String(s.id) === String(paramScenarioId));
      }
      if (!selected && Array.isArray(scenarios) && scenarios.length > 0) {
        selected = scenarios[0];
      }
      setCurrentScenario(selected);

      if (!selected) {
        setPhases([]);
        setClinicalActions([]);
        setLoading(false);
        return;
      }

      const patientName = selected.patient_name ?? selected.scenario_data?.patient?.name ?? simulationData.patient.name;
      const patientAge = selected.patient_age ?? selected.scenario_data?.patient?.age ?? simulationData.patient.age;
      const patientGender = selected.patient_gender ?? selected.scenario_data?.patient?.gender ?? simulationData.patient.gender;
      const maxTime = (selected.duration_minutes ? Number(selected.duration_minutes) * 60 : simulationData.maxTime) ?? simulationData.maxTime;

      setSimulationData((prev) => ({
        ...prev,
        patient: { id: String(selected.id), name: patientName, age: patientAge, gender: patientGender },
        maxTime,
      }));

      const { data: phaseRows, error } = await supabase
        .from("phases")
        .select(
          `
          id,
          nom_phase,
          description,
          fin_action,
          fin_temps,
          prochaine_phase,
          examens(*),
          traitements(*),
          constantes(*)
        `
        )
        .eq("scenario_id", selected.id)
        .order("id", { ascending: true });

      if (error) {
        console.warn("Error loading phases:", error);
      }

      const loadedPhases: PhaseSchema[] = (Array.isArray(phaseRows) ? phaseRows : []).map((p: any) => {
        const phaseObj: PhaseSchema = {
          id: p.id,
          nom_phase: p.nom_phase,
          description: p.description,
          fin_action: p.fin_action,
          fin_temps: p.fin_temps,
          prochaine_phase: p.prochaine_phase,
          examens: Array.isArray(p.examens) ? p.examens : [],
          traitements: Array.isArray(p.traitements) ? p.traitements : [],
          constantes: Array.isArray(p.constantes) ? p.constantes : [],
          actions: [],
        };
        phaseObj.durationSeconds = DEFAULT_PHASE_DURATION;
        return phaseObj;
      });

      const builtPhases = loadedPhases.map((ph) => {
        const actions: any[] = [];

        const storedActions = Array.isArray(selected.scenario_data?.phases)
          ? (selected.scenario_data.phases.find((sp: any) => Number(sp.id) === Number(ph.id))?.actions ?? [])
          : Array.isArray(selected.scenario_data?.clinicalActions)
          ? selected.scenario_data.clinicalActions
          : [];

        if (Array.isArray(storedActions)) {
          storedActions.forEach((a: any, idx: number) =>
            actions.push({ ...a, id: a.id ?? `stored-${ph.id}-${idx}`, source: "scenario_data" })
          );
        }

        (ph.examens || []).forEach((ex: any, exIdx: number) => {
          ["ecg", "bilans", "imagerie", "autres"].forEach((key) => {
            const val = ex?.[key];
            if (val && String(val).trim()) {
              String(val)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .forEach((labelItem: string, subIdx: number) => {
                  actions.push({
                    id: `exam-${ph.id}-${ex?.id ?? exIdx}-${key}-${subIdx}`,
                    label: `${key.toUpperCase()}: ${labelItem}`,
                    type: "examination",
                    meta: { phaseId: ph.id, examId: ex?.id || null, field: key, raw: val },
                    source: "db",
                  });
                });
            }
          });
        });

        (ph.traitements || []).forEach((tr: any, trIdx: number) => {
          ["medicaments", "gestes"].forEach((k) => {
            const val = tr?.[k];
            if (val && String(val).trim()) {
              String(val)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .forEach((labelItem: string, subIdx: number) => {
                  actions.push({
                    id: `treat-${ph.id}-${tr?.id ?? trIdx}-${k}-${subIdx}`,
                    label: `${k === "medicaments" ? "Medication" : "Action"}: ${labelItem}`,
                    type: "treatment",
                    meta: { phaseId: ph.id, treatId: tr?.id || null, field: k, raw: val },
                    source: "db",
                  });
                });
            }
          });
        });

        const deduped = actions.reduce((acc: any[], a) => {
          if (!acc.some((x) => String(x.id) === String(a.id))) acc.push(a);
          return acc;
        }, [] as any[]);

        ph.actions = deduped;
        return ph;
      });

      setPhases(builtPhases);
      setClinicalActions(buildClinicalActionsForAllPhases(builtPhases));
      setCurrentPhaseIndex(0);
      setPhaseTimeElapsed(0);
    } catch (err) {
      console.error("initializeScenario error:", err);
      setPhases([]);
      setClinicalActions([]);
    } finally {
      setLoading(false);
    }
  }

  function buildClinicalActionsForAllPhases(loadedPhases: PhaseSchema[]) {
    const merged: any[] = [];
    loadedPhases.forEach((ph) => {
      if (Array.isArray(ph.actions)) merged.push(...ph.actions.map((a: any) => ({ ...a, phaseId: ph.id })));
    });
    return merged;
  }

  async function advancePhase(nextPhaseId?: number | string | null) {
    let nextIndex = currentPhaseIndex + 1;
    if (nextPhaseId != null) {
      const idx = phases.findIndex((p) => String(p.id) === String(nextPhaseId));
      if (idx >= 0) nextIndex = idx;
    }
    if (nextIndex >= phases.length) {
      setPhase("completed");
      setIsSimulationActive(false);
      if (currentSessionId) {
        await updateSession(currentSessionId, { end_time: new Date().toISOString(), session_completed: true });
      }
      return;
    }
    setCurrentPhaseIndex(nextIndex);
    setPhaseTimeElapsed(0);
  }

  // helper to resolve UUID if available; prevents inserting numeric to uuid column
  const resolveCachedScenarioId = (sc: any): string | null => {
    if (!sc) return null;
    const candidates = [sc.cached_scenario_id, sc.cached_id, sc.cachedId, sc.cachedUuid, sc.id];
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    for (const c of candidates) {
      if (typeof c === "string" && uuidRegex.test(c)) return c;
    }
    return null;
  };

  const handleStartSimulation = async () => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please sign in to start the simulation.", variant: "destructive" });
      return;
    }

    try {
      const cachedScenarioId = resolveCachedScenarioId(currentScenario);
      // Pass UUID (or null) as first arg to createSession; put numeric id in payload as reference
      const session = await createSession(
        cachedScenarioId, // must be UUID or null to satisfy DB uuid column
        {
          patient: simulationData.patient,
          phases,
          scenario_reference_id: currentScenario?.id ?? null,
        }
      );

      if (session) {
        setCurrentSessionId(session.id);
        setPhase("active");
        setIsSimulationActive(true);
        toast({ title: "Simulation started", description: "Good luck." });
      } else {
        throw new Error("Failed to create session");
      }
    } catch (err: any) {
      console.error("Error creating session:", err?.message ?? err);
      toast({ title: "Error starting simulation", description: "Please try again later.", variant: "destructive" });
    }
  };

  const handleClinicalDecision = async (decision: any) => {
    const decisionWithTimestamp = { ...decision, timestamp: simulationData.timeElapsed, phaseId: phases[currentPhaseIndex]?.id ?? null };
    setSimulationData((prev) => ({ ...prev, decisions: [...prev.decisions, decisionWithTimestamp] }));

    if (currentSessionId) {
      await addDecisionToSession(currentSessionId, decisionWithTimestamp);
    }

    if (decision.type === "treatment") {
      setSimulationData((prev) => ({
        ...prev,
        vitals: { ...prev.vitals, oxygenSat: Math.min(100, prev.vitals.oxygenSat + 4) },
      }));
    }

    const currentPh = phases[currentPhaseIndex];
    const shouldAdvanceByAction = Boolean(currentPh?.fin_action);
    const explicitNext = decision.meta?.nextPhase || decision.nextPhase || decision.meta?.phaseNext || null;
    if (explicitNext) {
      await advancePhase(explicitNext);
      return;
    }
    if (shouldAdvanceByAction) {
      if (decision.type === "treatment" || decision.type === "examination" || decision.type === "test") {
        await advancePhase();
      }
    }
  };

  const currentPhase = phases[currentPhaseIndex];
  const phaseActions = Array.isArray(currentPhase?.actions) ? currentPhase.actions : [];

  const examinationActions = phaseActions.filter((a: any) => a.type === "examination");
  const complementaryActions = phaseActions.filter((a: any) => a.type === "test" || a.type === "complementary");
  const treatmentActions = phaseActions.filter((a: any) => a.type === "treatment");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundImage: `linear-gradient(rgba(76,89,63,0.4), rgba(101,117,80,0.6)), url(${wellnessRetreatInterior})`, backgroundSize: "cover" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-green-50/10 to-stone-50/30"></div>
        <div className="relative z-10 text-center">
          <div className="backdrop-blur-xl bg-white/10 p-12 rounded-3xl border border-white/20 shadow-2xl max-w-md mx-auto">
            <Loader2 className="w-12 h-12 animate-spin text-amber-700 mx-auto mb-6" />
            <h3 className="text-2xl font-serif text-stone-800 mb-3">Preparing simulation...</h3>
            <p className="text-stone-700 font-medium opacity-80">Loading scenario data from database.</p>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "presentation") {
    return <PatientPresentation scenarioId={String(currentScenario?.id ?? paramScenarioId ?? "")} onStartSimulation={handleStartSimulation} />;
  }

  if (phase === "active") {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${patientBedAerial})`, filter: "brightness(1.1) contrast(1.05)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

        <header className="absolute top-4 left-4 right-4 z-50 border-none">
          <div className="backdrop-blur-xl bg-white border border-white rounded-2xl shadow-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={onBackToDashboard} className="backdrop-blur-sm bg-white/30 border border-white/40 text-stone-800 hover:bg-white/40 rounded-xl shadow-lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Exit
                </Button>
                <div className="text-stone-800">
                  <h1 className="text-lg font-serif font-bold">{simulationData.patient.name}</h1>
                  <p className="text-sm opacity-80">{simulationData.patient.age} • {simulationData.patient.gender}</p>
                  <p className="text-xs opacity-60">Phase: {currentPhase?.nom_phase ?? `#${currentPhase?.id ?? "?"}`}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className={`backdrop-blur-sm px-3 py-2 rounded-xl text-sm font-semibold border shadow-lg ${simulationData.timeElapsed / simulationData.maxTime > 0.8 ? "bg-red-100/40 text-red-800" : simulationData.timeElapsed / simulationData.maxTime > 0.6 ? "bg-amber-100/40 text-amber-800" : "bg-emerald-100/40 text-emerald-800"}`}>
                  <Clock className="w-4 h-4 inline mr-2" />
                  {formatTime(simulationData.timeElapsed)}
                </div>

                <div className={`backdrop-blur-sm px-3 py-2 rounded-xl text-sm font-semibold border shadow-lg ${simulationData.condition === "stable" ? "bg-emerald-100/40 text-emerald-800" : simulationData.condition === "uncomfortable" ? "bg-amber-100/40 text-amber-800" : "bg-red-100/40 text-red-800"}`}>
                  <Heart className="w-4 h-4 inline mr-2" />
                  {simulationData.condition}
                </div>
              </div>
            </div>
          </div>
        </header>

        <VitalSignsMonitor patient={{ name: simulationData.patient.name, age: simulationData.patient.age, condition: simulationData.condition }} isActive={isSimulationActive} />

        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 w-80 z-40">
          <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} className="backdrop-blur-xl bg-amber-900/25 border border-amber-600/30 shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-emerald-700/80 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-lg font-serif text-white">Clinical Action</h3>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl w-8 h-8"><ArrowLeft className="w-4 h-4" /></Button>
            </div>

            <div className="p-6 space-y-3">
              <Button variant="ghost" onClick={() => setActivePopup("dialogue")} className="w-full justify-start">
                <Heart className="w-5 h-5 mr-3 text-amber-200" />
                <span className="text-left">Dialogue</span>
              </Button>

              <Button variant="ghost" onClick={() => setActivePopup("physical")} className="w-full justify-start">
                <Activity className="w-5 h-5 mr-3 text-amber-200" />
                <span className="text-left">Physical Examination</span>
              </Button>

              <Button variant="ghost" onClick={() => setActivePopup("complementary")} className="w-full justify-start">
                <TrendingUp className="w-5 h-5 mr-3 text-amber-200" />
                <span className="text-left">Complementary Examination</span>
              </Button>

              <Button variant="ghost" onClick={() => setActivePopup("diagnosis")} className="w-full justify-start">
                <Target className="w-5 h-5 mr-3 text-amber-200" />
                <span className="text-left">Diagnosis to be Evoked</span>
              </Button>

              <Button variant="ghost" onClick={() => setActivePopup("notes")} className="w-full justify-start">
                <FileText className="w-5 h-5 mr-3 text-amber-200" />
                <span className="text-left">Notes</span>
              </Button>

              <Button variant="ghost" onClick={() => setActivePopup("treatment")} className="w-full justify-start">
                <Activity className="w-5 h-5 mr-3 text-amber-200" />
                <span className="text-left">Treatments</span>
              </Button>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {activePopup && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={() => setActivePopup(null)}>
              {activePopup === "physical" && (
                <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }} transition={{ type: "spring", damping: 20, stiffness: 300 }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                  <Card>
                    <CardHeader className="bg-gradient-to-r from-blue-100/80 to-cyan-100/80 relative">
                      <Button variant="ghost" size="icon" onClick={() => setActivePopup(null)} className="absolute top-4 right-4"><X className="w-5 h-5" /></Button>
                      <CardTitle className="flex items-center text-blue-800 text-xl font-serif"><Stethoscope className="w-6 h-6 mr-3 text-blue-600" />Physical Examination</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {(examinationActions.length > 0 ? examinationActions : ["Respiratory", "Cardiovascular", "Abdominal", "Neurological"].map((s) => ({ id: s, label: `${s} Exam`, system: s }))).map((action: any) => (
                          <Button key={action.id} variant="outline" onClick={() => { handleClinicalDecision({ type: "examination", label: action.label, ...action }); setActivePopup(null); }} className="p-4">
                            <Activity className="w-5 h-5 mr-3 text-blue-600" />
                            <span>{action.label}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activePopup === "complementary" && (
                <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                  <Card>
                    <CardHeader className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 relative">
                      <Button variant="ghost" size="icon" onClick={() => setActivePopup(null)} className="absolute top-4 right-4"><X className="w-5 h-5" /></Button>
                      <CardTitle className="flex items-center text-purple-800 text-xl font-serif"><TrendingUp className="w-6 h-6 mr-3 text-purple-600" />Complementary Examinations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {(complementaryActions.length > 0 ? complementaryActions : ["Chest X-Ray", "Blood Tests", "Oxygen Saturation", "Peak Flow"].map((t) => ({ id: t, label: t, test: t }))).map((action: any) => (
                          <Button key={action.id} variant="outline" onClick={() => { handleClinicalDecision({ type: "test", label: action.label, ...action }); setActivePopup(null); }} className="p-4">
                            <Target className="w-5 h-5 mr-3 text-purple-600" />
                            <span>{action.label}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activePopup === "treatment" && (
                <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                  <Card>
                    <CardHeader className="bg-gradient-to-r from-amber-100/80 to-orange-100/80 relative">
                      <Button variant="ghost" size="icon" onClick={() => setActivePopup(null)} className="absolute top-4 right-4"><X className="w-5 h-5" /></Button>
                      <CardTitle className="flex items-center text-amber-800 text-xl font-serif"><Award className="w-6 h-6 mr-3 text-amber-600" />Treatments & Interventions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {(treatmentActions.length > 0 ? treatmentActions : []).map((action: any) => (
                          <Button key={action.id} variant="outline" onClick={() => { handleClinicalDecision({ type: "treatment", label: action.label, ...action }); setActivePopup(null); }} className="p-4">
                            <Activity className="w-5 h-5 mr-3 text-amber-600" />
                            <span>{action.label}</span>
                          </Button>
                        ))}
                        {treatmentActions.length === 0 && <p className="col-span-full text-sm text-gray-500">No treatment actions for this phase.</p>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activePopup === "dialogue" && (
                <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Patient Dialogue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={() => { handleClinicalDecision({ type: "history" }); setActivePopup(null); }}>Complete History</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activePopup === "diagnosis" && (
                <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Diagnosis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {["Pediatric Asthma", "Bronchiolitis", "Pneumonia"].map((d) => (
                        <Button key={d} onClick={() => { handleClinicalDecision({ type: "diagnosis", diagnosis: d }); setActivePopup(null); }}>{d}</Button>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activePopup === "notes" && (
                <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <textarea className="w-full h-40 p-4 rounded-2xl" />
                      <Button onClick={() => { handleClinicalDecision({ type: "notes", content: "notes saved" }); setActivePopup(null); }}>Save Notes</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="fixed left-6 bottom-20 z-40 w-80">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-stone-700">Phase time</div>
                  <div className="font-semibold">{formatTime(phaseTimeElapsed)}</div>
                </div>
                <div>
                  <div className="text-sm text-stone-700">Global time</div>
                  <div className="font-semibold">{formatTime(simulationData.timeElapsed)}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button onClick={() => { setIsSimulationActive((v) => !v); }}>{isSimulationActive ? "Pause" : "Resume"}</Button>
                <Button onClick={() => advancePhase()} variant="outline">Skip Phase</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="absolute inset-0 z-30">
          <PatientVisualization patient={simulationData.patient} vitals={simulationData.vitals} onBodyPartClick={(part) => handleClinicalDecision({ type: "examination", label: `${part} Exam`, system: part })} />
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl shadow-2xl p-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="backdrop-blur-sm bg-white/30 px-3 py-2 rounded-lg border border-white/40 text-stone-800 text-sm font-medium">
                  <User className="w-4 h-4 inline mr-2" />
                  Decisions: {simulationData.decisions.length}
                </div>
                <div className="backdrop-blur-sm bg-white/30 px-3 py-2 rounded-lg border border-white/40 text-stone-800 text-sm font-medium">
                  <Target className="w-4 h-4 inline mr-2" />
                  Score: {simulationData.score.accuracy}%
                </div>
              </div>

              <Button onClick={async () => {
                if (currentSessionId && user) {
                  await updateSession(currentSessionId, { end_time: new Date().toISOString(), session_completed: true, accuracy_score: simulationData.score.accuracy });
                }
                setPhase("completed");
                setIsSimulationActive(false);
              }} className="backdrop-blur-sm bg-emerald-500/80 hover:bg-emerald-600/80 text-white border border-emerald-400/50 shadow-lg rounded-xl px-6 py-3">
                <CheckCircle2 className="w-5 h-5 mr-2" /> Complete Case
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "completed") {
    return (
      <div className="min-h-screen relative" style={{ backgroundImage: `linear-gradient(rgba(76,89,63,0.3), rgba(101,117,80,0.5)), url(${wellnessRetreatInterior})`, backgroundSize: "cover" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-stone-50/20 to-green-50/25" />
        <main className="relative z-10 container mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl mb-8 rounded-3xl overflow-hidden">
              <CardHeader className="text-center bg-gradient-to-r from-amber-100/20 to-stone-100/20 border-b border-white/10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-white/30">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <CardTitle className="text-3xl text-stone-800 font-serif">Case Completed</CardTitle>
                <CardContent>
                  <div className="text-stone-700">Patient: {simulationData.patient.name} • Duration: {formatTime(simulationData.timeElapsed)}</div>
                </CardContent>
              </CardHeader>
            </Card>

            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" size="lg" onClick={() =>  navigate("/dashboard")} className="backdrop-blur-sm bg-white/30 border border-white/40 text-emerald-800 hover:bg-white/50 shadow-lg rounded-2xl">
                <ArrowLeft className="w-4 h-4 mr-2" /> Return
              </Button>
              <Button variant="default" size="lg" onClick={() => { setPhase("presentation"); setSimulationData((s) => ({ ...s, timeElapsed: 0, decisions: [] })); }} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                Begin New Journey
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return null;
};

export default SimulationRun;