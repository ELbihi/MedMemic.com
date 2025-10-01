// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { 
//   Heart, 
//   Activity, 
//   BookOpen, 
//   Clock, 
//   Target, 
//   TrendingUp, 
//   Calendar,
//   PlayCircle,
//   Star,
//   Award,
//   Users,
//   Brain,
//   Settings as SettingsIcon,
//   LogOut,
//   Loader2,
//   Plus
// } from "lucide-react";
// import { useUserProfile } from "@/hooks/useUserProfile";
// import { useUserProgress } from "@/hooks/useUserProgress";
// import { useScenarios } from "@/hooks/useScenarios";
// import { useAuth } from "@/hooks/useAuth";
// import { useEffect, useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";

// interface DashboardProps {
//   onStartSimulation?: (scenarioId: string) => void;
//   onOpenScenarioCreator?: () => void;
//   signOut?: () => void;
// }
 

// const Dashboard = ({ onStartSimulation, onOpenScenarioCreator }: DashboardProps) => {
//   const { signOut } = useAuth();
//   const { profile, loading: profileLoading } = useUserProfile();
//   const { progress, recentSessions, loading: progressLoading } = useUserProgress();
//   const { scenarios, getScenariosByDifficulty, incrementScenarioUsage, loading: scenariosLoading } = useScenarios();
//   const [startingScenario, setStartingScenario] = useState<string | null>(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!Users) {
//       navigate("/"); // not logged in, redirect to home
//     }
//   }, [Users, navigate]);

//   const handleStartCase = async (difficulty: string) => {
//     console.log("Start case clicked for difficulty:", difficulty);
//     const scenariosForDifficulty = getScenariosByDifficulty(difficulty);
//     if (scenariosForDifficulty.length === 0) {
//       console.log("No scenarios found for difficulty:", difficulty);
//       return;
//     }

//     const randomScenario = scenariosForDifficulty[Math.floor(Math.random() * scenariosForDifficulty.length)];
//     console.log("Random scenario selected:", randomScenario);

//     setStartingScenario(difficulty);
//     try {
//       await incrementScenarioUsage(randomScenario.id);
//       console.log("Scenario usage incremented");

//       if (onStartSimulation) {
//         console.log("Calling onStartSimulation with id:", randomScenario.id);
//         onStartSimulation(randomScenario.id);
//       } else {
//         console.log("No onStartSimulation prop passed");
//       }
//     } catch (error) {
//       console.error("Error incrementing scenario usage or starting simulation:", error);
//     } finally {
//       setStartingScenario(null);
//     }
//   };

//   const handleSettingsClick = () => {
//     console.log("Navigating to settings");
//     navigate("/settings"); // adjust this path if needed
//   };


//   const formatTimeFromSeconds = (seconds: number | null) => {
//     if (!seconds) return "N/A";
//     const mins = Math.floor(seconds / 60);
//     return `${mins}m`;
//   };

//   const difficultyLevels = [
//     {
//       level: "beginner",
//       displayName: "Beginner",
//       color: "bg-success",
//       textColor: "text-success-foreground",
//       description: "Perfect for starting your medical journey",
//       scenarios: getScenariosByDifficulty("beginner"),
//       icon: BookOpen,
//       gradient: "from-success/20 to-success/5"
//     },
//     {
//       level: "intermediate",
//       displayName: "Intermediate", 
//       color: "bg-warning",
//       textColor: "text-warning-foreground",
//       description: "Build on your foundation knowledge",
//       scenarios: getScenariosByDifficulty("intermediate"),
//       icon: Brain,
//       gradient: "from-warning/20 to-warning/5"
//     },
//     {
//       level: "advanced",
//       displayName: "Advanced",
//       color: "bg-destructive", 
//       textColor: "text-destructive-foreground",
//       description: "Challenge yourself with complex cases",
//       scenarios: getScenariosByDifficulty("advanced"),
//       icon: Target,
//       gradient: "from-destructive/20 to-destructive/5"
//     }
//   ];

//   const weeklyStats = [
//     { 
//       label: "Cases Completed", 
//       value: progress?.completed_sessions?.toString() || "0", 
//       icon: PlayCircle, 
//       change: `${progress?.total_sessions || 0} total sessions` 
//     },
//     { 
//       label: "Avg Accuracy", 
//       value: `${Math.round(progress?.avg_accuracy || 0)}%`, 
//       icon: Target, 
//       change: `Best: ${Math.round(progress?.best_accuracy || 0)}%` 
//     },
//     { 
//       label: "Avg Time", 
//       value: formatTimeFromSeconds(progress?.avg_time_to_diagnosis), 
//       icon: Clock, 
//       change: `Fastest: ${formatTimeFromSeconds(progress?.fastest_diagnosis)}` 
//     },
//     { 
//       label: "Study Streak", 
//       value: `${progress?.current_streak || 0} days`, 
//       icon: Award, 
//       change: `Best: ${progress?.longest_streak || 0} days` 
//     }
//   ];

//   // Show loading state
//   if (profileLoading || progressLoading || scenariosLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Welcome Header */}
//       <header className="bg-gradient-confidence border-b border-border shadow-warm">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
//                 <Heart className="w-5 h-5 text-primary-foreground" />
//               </div>
//               <span className="text-xl font-bold text-foreground">MedMemic</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Badge variant="outline" className="bg-success/10 text-success border-success/20">
//                 <Star className="w-3 h-3 mr-1" />
//                 {profile?.year_of_study || "Medical Student"}
//               </Badge>
//               <Button 
//                 variant="outline" 
//                 size="sm" 
//                  onClick={() => navigate("/scenario-creator")}
//                 title="Create Scenario"
//                 className="hover:bg-primary hover:text-primary-foreground"
//               >
//                 <Plus className="w-4 h-4 mr-1" />
//                 Create Scenario
//               </Button>
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 title="Settings" 
//                 onClick={handleSettingsClick}
//               >
//                 <SettingsIcon className="w-4 h-4" />
//               </Button>
//               <Button variant="ghost" size="sm" onClick={signOut} title="Logout">
//                 <LogOut className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-6 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-foreground mb-2">
//             Welcome back, {profile?.full_name || "Medical Student"} 👋
//           </h1>
//           <p className="text-muted-foreground">
//             {profile?.medical_school && `${profile.medical_school} • `}
//             Ready to build your confidence with {scenarios.length} available practice scenarios?
//           </p>
//         </div>

//         {/* Progress Overview */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <Card className="bg-gradient-to-r from-green-400 to-green-600 border-0 text-white shadow-achievement">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg flex items-center text-success-foreground">
//                 <TrendingUp className="w-5 h-5 mr-2" />
//                 Total Sessions
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <div className="text-2xl font-bold">{progress?.completed_sessions || 0}</div>
//                 <p className="text-xs opacity-90">
//                   {progress?.total_sessions || 0} total sessions attempted
//                 </p>
//                 <div className="flex items-center text-xs opacity-90">
//                   <PlayCircle className="w-3 h-3 mr-1" />
//                   Keep practicing!
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-secondary border-0 text-secondary-foreground shadow-achievement">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg flex items-center">
//                 <Target className="w-5 h-5 mr-2" />
//                 Average Accuracy
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <div className="text-2xl font-bold">{Math.round(progress?.avg_accuracy || 0)}%</div>
//                 <p className="text-xs opacity-90">
//                   Best accuracy: {Math.round(progress?.best_accuracy || 0)}%
//                 </p>
//                 <div className="flex items-center text-xs opacity-90">
//                   <TrendingUp className="w-3 h-3 mr-1" />
//                   {progress?.avg_accuracy ? "Great progress!" : "Start your journey!"}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-primary border-0 text-primary-foreground shadow-warm">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg flex items-center">
//                 <Calendar className="w-5 h-5 mr-2" />
//                 Study Streak
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <div className="text-2xl font-bold">{progress?.current_streak || 0} days</div>
//                 <p className="text-xs opacity-90">
//                   Longest streak: {progress?.longest_streak || 0} days
//                 </p>
//                 <div className="flex items-center text-xs opacity-90">
//                   <Award className="w-3 h-3 mr-1" />
//                   {progress?.current_streak ? "On fire!" : "Start today!"}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Case Selection by Difficulty */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-foreground mb-6">Case Selection</h2>
//           <div className="grid lg:grid-cols-3 gap-6">
//             {difficultyLevels.map((level, index) => (
//               <Card key={index} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden bg-gradient-card">
//                 <div className={`h-2 bg-gradient-to-r ${level.gradient}`} />
//                 <CardHeader>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className={`w-10 h-10 ${level.color} rounded-lg flex items-center justify-center`}>
//                         <level.icon className={`w-5 h-5 ${level.textColor}`} />
//                       </div>
//                       <div>
//                         <CardTitle className="text-lg">{level.displayName}</CardTitle>
//                         <CardDescription className="text-sm">{level.description}</CardDescription>
//                       </div>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex justify-between text-sm">
//                     <span>Available Cases</span>
//                     <span className="font-medium">{level.scenarios.length} scenarios</span>
//                   </div>
//                   {level.scenarios.length > 0 ? (
//                     <Button 
//                       variant={level.level === "beginner" ? "practice" : level.level === "intermediate" ? "achievement" : "default"}
//                       className="w-full hover:shadow-warm transition-all duration-200 active:scale-95"
//                       onClick={() => navigate("/patient-presentation/${SenarioId}")}
//                       disabled={startingScenario !== null}
//                     >
//                       {startingScenario === level.level ? (
//                         <>  
//                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                           Starting Practice...
//                         </>
//                       ) : (
//                         <>
//                           <PlayCircle className="w-4 h-4 mr-2" />
//                           Start Practice
//                         </>
//                       )}
//                     </Button>
//                   ) : (
//                     <Button variant="outline" className="w-full" disabled>
//                       <Clock className="w-4 h-4 mr-2" />
//                       Coming Soon
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {weeklyStats.map((stat, index) => (
//             <Card key={index} className="bg-gradient-card border-0 shadow-card">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-muted-foreground">{stat.label}</p>
//                     <p className="text-2xl font-bold text-foreground">{stat.value}</p>
//                     <p className="text-xs text-success">{stat.change}</p>
//                   </div>
//                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
//                     <stat.icon className="w-6 h-6 text-primary" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Recent Activity */}
//         <Card className="bg-gradient-card border-0 shadow-card">
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Activity className="w-5 h-5 text-primary mr-2" />
//               Recent Activity
//             </CardTitle>
//             <CardDescription>Your latest medical simulation performances</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentSessions.length > 0 ? (
//                 recentSessions.map((session, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
//                         <Heart className="w-5 h-5 text-primary" />
//                       </div>
//                       <div>
//                         <h4 className="font-medium text-foreground">
//                           {session.scenario_data?.patient?.name || "Medical Case"}
//                         </h4>
//                         <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                           <Badge variant="outline" className="text-xs">
//                             {session.scenario_data?.difficulty || "Unknown"}
//                           </Badge>
//                           <span>•</span>
//                           <span>{formatTimeFromSeconds(session.time_to_diagnosis)}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-lg font-bold text-success">
//                         {Math.round(session.accuracy_score || 0)}%
//                       </div>
//                       <div className="text-xs text-muted-foreground">Score</div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-8 text-muted-foreground">
//                   <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                   <p>No completed sessions yet</p>
//                   <p className="text-sm">Start your first case to see your progress here</p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

// // import React, { useState, useMemo } from "react";
// // import {
// //   Heart,
// //   PlayCircle,
// //   Target,
// //   Activity,
// //   BookOpen,
// //   Brain,
// //   Settings as SettingsIcon,
// //   LogOut,
// //   Plus,
// //   Star,
// //   Home,
// //   ClipboardList,
// //   BarChart3,
// //   Users,
// //   Loader2,
// //   Icon,
// //   Lock,
// // } from "lucide-react";
// // import { useUserProfile } from "@/hooks/useUserProfile";
// // import { useUserProgress } from "@/hooks/useUserProgress";
// // import { useScenarios } from "@/hooks/useScenarios";
// // import { useAuth } from "@/hooks/useAuth";
// // import { Navigate, useNavigate } from "react-router-dom";
// // import { color } from "framer-motion";
// // import { title } from "process";
// // /*********************************
// //  * Minimal UI Primitives
// //  *********************************/
// // const cx = (...parts: Array<string | undefined | false>) => parts.filter(Boolean).join(" ");

// // const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => (
// //   <div className={cx("bg-white border border-gray-200 rounded-2xl shadow-sm", className)} {...rest}>
// //     {children}
// //   </div>
// // );
// // const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => (
// //   <div className={cx("p-6 pb-3", className)} {...rest}>{children}</div>
// // );
// // const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => (
// //   <div className={cx("p-6 pt-0", className)} {...rest}>{children}</div>
// // );
// // const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...rest }) => (
// //   <h3 className={cx("text-lg font-semibold text-gray-900", className)} {...rest}>{children}</h3>
// // );
// // const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...rest }) => (
// //   <p className={cx("text-sm text-gray-500", className)} {...rest}>{children}</p>
// // );

// // const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "ghost" | "outline"; size?: "sm" | "md" | "lg"; }>
// // = ({ className, children, variant = "default", size = "md", ...rest }) => {
// //   const sizes = {
// //     sm: "px-3 py-1.5 text-sm",
// //     md: "px-4 py-2",
// //     lg: "px-5 py-2.5 text-base",
// //   } as const;
// //   const variants = {
// //     default: "bg-blue-600 text-white hover:bg-blue-700",
// //     ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
// //     outline: "border border-gray-300 text-gray-800 hover:bg-gray-50",
// //   } as const;
// //   return (
// //     <button
// //       className={cx(
// //         "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500/40",
// //         sizes[size],
// //         variants[variant],
// //         className
// //       )}
// //       {...rest}
// //     >
// //       {children}
// //     </button>
// //   );
// // };

// // /*******************
// //  * Dashboard component
// //  *******************/
// // interface DashboardProps {
// //   onStartSimulation?: (scenarioId: string) => void;
// // }
// //  const { scenarios, getScenariosByDifficulty, incrementScenarioUsage, loading: scenariosLoading } = useScenarios();
// // const Dashboard: React.FC<DashboardProps> = ({ onStartSimulation }) => {
// //   const [startingDifficulty, setStartingDifficulty] = useState<string | null>(null);

// //    const difficultyLevels = [
// //     {
// //       level: "beginner",
// //       displayName: "Beginner",
// //       color: "bg-success",
// //       textColor: "text-success-foreground",
// //       description: "Perfect for starting your medical journey",
// //       scenarios: getScenariosByDifficulty("beginner"),
// //       icon: BookOpen,
// //       gradient: "from-success/20 to-success/5"
// //     },
// //     {
// //       level: "intermediate",
// //       displayName: "Intermediate", 
// //       color: "bg-warning",
// //       textColor: "text-warning-foreground",
// //       description: "Build on your foundation knowledge",
// //       scenarios: getScenariosByDifficulty("intermediate"),
// //       icon: Brain,
// //       gradient: "from-warning/20 to-warning/5"
// //     },
// //     {
// //       level: "advanced",
// //       displayName: "Advanced",
// //       color: "bg-destructive", 
// //       textColor: "text-destructive-foreground",
// //       description: "Challenge yourself with complex cases",
// //       scenarios: getScenariosByDifficulty("advanced"),
// //       icon: Target,
// //       gradient: "from-destructive/20 to-destructive/5"
// //     }
// //   ];

// //   const sidebarItems = [
// //     { label: "Dashboard", Icon: Home, active: true },
// //     { label: "Cases", Icon: ClipboardList },
// //     { label: "Analytics", Icon: BarChart3 },
// //     { label: "Community", Icon: Users },
// //   ];

// //   return (
// //     <div className="flex min-h-screen bg-gray-50">
// //       {/* Sidebar */}
// //       <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
// //         <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-200">
// //           <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
// //             <Heart className="w-5 h-5 text-white" />
// //           </div>
// //           <span className="text-xl font-bold text-gray-900">MedMemic</span>
// //         </div>
// //         <nav className="flex-1 px-4 py-6 space-y-1">
// //           {sidebarItems.map(({ label, Icon, active }) => (
// //             <button
// //               key={label}
// //               className={cx(
// //                 "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
// //                 active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
// //               )}
// //             >
// //               <Icon className="w-4 h-4" /> {label}
// //             </button>
// //           ))}
// //         </nav>
// //         <div className="p-4 border-t border-gray-200 flex flex-col gap-2">
// //           <Button variant="ghost" size="sm"><SettingsIcon className="w-4 h-4 mr-2" /> Settings</Button>
// //           <Button variant="ghost" size="sm"><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
// //         </div>
// //       </aside>

// //       {/* Main Content */}
// //       <main className="flex-1 px-10 py-8 space-y-10 overflow-y-auto">
// //         {/* Welcome */}
// //         <div>
// //           <h1 className="text-2xl font-bold mb-1 text-gray-900">Welcome back, Student 👋</h1>
// //           <p className="text-gray-500">Campus Health • Ready to practice with 4 cases?</p>
// //         </div>

// //         {/* Progress Overview */}
// //         <div className="grid md:grid-cols-3 gap-6">
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Total Sessions</CardTitle>
// //               <CardDescription>All completed practices</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <p className="text-3xl font-bold text-gray-900">7</p>
// //               <p className="text-sm text-gray-500">10 attempted</p>
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Accuracy</CardTitle>
// //               <CardDescription>Average & best scores</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <p className="text-3xl font-bold text-gray-900">78%</p>
// //               <p className="text-sm text-gray-500">Best 92%</p>
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Study Streak</CardTitle>
// //               <CardDescription>Consistency is key</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <p className="text-3xl font-bold text-gray-900">3 days</p>
// //               <p className="text-sm text-gray-500">Longest 9</p>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Difficulty Selection */}
// //         <section>
// //           <h2 className="text-xl font-semibold mb-4 text-gray-900">Choose Difficulty</h2>
// //           <div className="grid md:grid-cols-3 gap-6">
// //             {difficultyLevels.map((level) => (
// //               <Card key={level.level} className="hover:shadow-md transition">
// //                 <CardHeader>
// //                   <div className="flex items-center gap-3">
// //                     <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center`}>
// //                       <Icon className="w-5 h-5 text-white" iconNode={[]} />
// //                     </div>
// //                     <div>
// //                       <CardTitle>{title}</CardTitle>
// //                       <CardDescription>{level.description}</CardDescription>
// //                     </div>
// //                   </div>
// //                 </CardHeader>
// //                   <CardContent className="space-y-4">
// // //                   <div className="flex justify-between text-sm">
// // //                     <span>Available Cases</span>
// // //                     <span className="font-medium">{level.scenarios.length} scenarios</span>
// // //                   </div>
// // //                   {level.scenarios.length > 0 ? (
// //                     <Button 
// //                       variant="default"
// //                       className="w-full hover:shadow-warm transition-all duration-200 active:scale-95"
// //                       onClick={() => {
// //                         const navigate = useNavigate();
// //                         navigate(`/patient-presentation/`);
// //                       }}
// //                       disabled={startingDifficulty !== null}
// //                     >
// //                       {startingDifficulty === level.level ? (
// //                         <>  
// //                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //                           Starting Practice...
// //                         </>
// //                       ) : (
// //                         <>
// //                           <PlayCircle className="w-4 h-4 mr-2" />
// //                           Start Practice
// //                         </>
// //                       )}
// //                     </Button>
// //                   ) : (
// //                     <Button variant="outline" className="w-full" disabled>
// //                       <Lock className="w-4 h-4 mr-2" />
// //                       Coming Soon
// //                     </Button>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </section>

// //         {/* Recent Activity */}
// //         <section>
// //           <Card>
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <Activity className="w-5 h-5 text-blue-600" /> Recent Activity
// //               </CardTitle>
// //               <CardDescription>Your last practice cases</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-3">
// //                 <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
// //                   <div>
// //                     <p className="font-medium text-gray-900">Amira K.</p>
// //                     <p className="text-sm text-gray-500">Intermediate • 9m</p>
// //                   </div>
// //                   <p className="text-lg font-bold text-emerald-600">82%</p>
// //                 </div>
// //                 <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
// //                   <div>
// //                     <p className="font-medium text-gray-900">John D.</p>
// //                     <p className="text-sm text-gray-500">Beginner • 10m</p>
// //                   </div>
// //                   <p className="text-lg font-bold text-emerald-600">75%</p>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Loader2, Heart, Activity, BookOpen, Clock, Target, Calendar, PlayCircle, Star,User, Award,ArrowRight, Users, CheckCircle, Library,Brain, Settings as SettingsIcon, LogOut, Plus, TrendingUp } from "lucide-react";
// import { useUserProfile } from "@/hooks/useUserProfile";
// import { useUserProgress } from "@/hooks/useUserProgress";
// import { useScenarios } from "@/hooks/useScenarios";
// import { useAuth } from "@/hooks/useAuth";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import doctorHero from "@/assets/hero-medical-students.jpg";
// import React from "react";

  
// interface DashboardProps {
//   onStartSimulation?: (scenarioId: string) => void;
// }

// const Dashboard = ({ onStartSimulation }: DashboardProps) => {
//   const { signOut } = useAuth();

//     const { profile, loading: profileLoading } = useUserProfile();
//     const { progress, recentSessions, loading: progressLoading } = useUserProgress();

//   const { scenarios, getScenariosByDifficulty, incrementScenarioUsage, loading: scenariosLoading } = useScenarios();
//   const [startingScenario, setStartingScenario] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const profileLoading1 = profileLoading;
//   const profile0 = profile;




//   const handleStartCase = async (difficulty: string) => {
//     const scenariosForDifficulty = getScenariosByDifficulty(difficulty);
//     if (scenariosForDifficulty.length === 0) return;
//     const randomScenario = scenariosForDifficulty[Math.floor(Math.random() * scenariosForDifficulty.length)];
//     setStartingScenario(difficulty);
//     try {
//       await incrementScenarioUsage(randomScenario.id);

//       if (onStartSimulation) {
//         onStartSimulation(randomScenario.id);
//       } else {
//         navigate(`/patient-presentation/${randomScenario.id}`);
//       }
//     } catch (error) {
//       console.error("Error incrementing scenario usage:", error);
//     } finally {
//       setStartingScenario(null);
//     }
//   };

//   const handleSettingsClick = () => {
//     navigate("/settings");
//   };

//   const formatTimeFromSeconds = (seconds: number | null) => {
//     if (!seconds) return "N/A";
//     const mins = Math.floor(seconds / 60);
//     return `${mins}m`;
//   };

//   const difficultyLevels = [
//     {
//       level: "beginner",
//       displayName: "Beginner",
//       color: "bg-success",
//       textColor: "text-success-foreground",
//       description: "Perfect for starting your medical journey",
//       scenarios: getScenariosByDifficulty("beginner"),
//       icon: BookOpen,
//       gradient: "from-success/20 to-success/5"
//     },
//     {
//       level: "intermediate",
//       displayName: "Intermediate", 
//       color: "bg-warning",
//       textColor: "text-warning-foreground",
//       description: "Build on your foundation knowledge",
//       scenarios: getScenariosByDifficulty("intermediate"),
//       icon: Brain,
//       gradient: "from-warning/20 to-warning/5"
//     },
//     {
//       level: "advanced",
//       displayName: "Advanced",
//       color: "bg-destructive", 
//       textColor: "text-destructive-foreground",
//       description: "Challenge yourself with complex cases",
//       scenarios: getScenariosByDifficulty("advanced"),
//       icon: Target,
//       gradient: "from-destructive/20 to-destructive/5"
//     }
//   ];

//   const weeklyStats = [
//     { 
//       label: "Cases Completed", 
//       value: progress?.completed_sessions?.toString() || "0", 
//       icon: PlayCircle, 
//       change: `${progress?.total_sessions || 0} total sessions` 
//     },
//     { 
//       label: "Avg Accuracy", 
//       value: `${Math.round(progress?.avg_accuracy || 0)}%`, 
//       icon: Target, 
//       change: `Best: ${Math.round(progress?.best_accuracy || 0)}%` 
//     },
//     { 
//       label: "Avg Time", 
//       value: formatTimeFromSeconds(progress?.avg_time_to_diagnosis), 
//       icon: Clock, 
//       change: `Fastest: ${formatTimeFromSeconds(progress?.fastest_diagnosis)}` 
//     },
//     { 
//       label: "Study Streak", 
//       value: `${progress?.current_streak || 0} days`, 
//       icon: Award, 
//       change: `Best: ${progress?.longest_streak || 0} days` 
//     }
//   ];

//   if (profileLoading || progressLoading || scenariosLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//      <div className="min-h-screen bg-[#E4EEFC]">
//     {/* Header */}
//     <header className="bg-[#4D88F6] text-white shadow-md">
//       <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
//             <Heart className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-xl font-bold">MedMemic</span>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Badge variant="outline" className="bg-white/20 text-white border-white/30">
//             <Star className="w-3 h-3 mr-1" />
//             {profile?.year_of_study || "Medical Student"}
//           </Badge>
//           <Button 
//             variant="outline" 
//             size="sm" 
//             onClick={() => navigate("/scenario-creator")}
//             title="Create Scenario"
//             className="hover:bg-white/20 text-white border-white/30"
//           >
//             <Plus className="w-4 h-4 mr-1" />
//             Create Scenario
//           </Button>
//           <Button variant="ghost" size="sm" title="Settings" onClick={handleSettingsClick} className="text-white hover:bg-white/20">
//             <SettingsIcon className="w-4 h-4" />
//           </Button>
//           <Button variant="ghost" size="sm" onClick={signOut} title="Logout" className="text-white hover:bg-white/20">
//             <LogOut className="w-4 h-4" />
//           </Button>
//         </div>
//       </div>
//     </header>

//       {/* Main */}
//        <main className="container mx-auto px-6 py-8 space-y-8">
//         {/* Welcome */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-foreground mb-2">
//             Welcome back, {profile?.full_name || "Medical Student"} 👋
//           </h1>
//           <p className="text-muted-foreground">
//             {profile?.medical_school && `${profile.medical_school} • `}
//             Ready to build your confidence with {scenarios.length} available practice scenarios?
//           </p>
//         </div>
//         <Card className="bg-gradient-to-r from-blue-600 to-blue-800 border-0 text-white overflow-hidden relative min-h-[280px]">
//           <CardContent className="p-8">
//             <div className="flex items-center justify-between h-full">
//               <div className="flex-1 space-y-6">
//                 <h1 className="text-6xl font-bold leading-tight">Healthcare</h1>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                     <User className="w-5 h-5" />
//                   </div>
//                   <span className="text-xl font-medium text-white/90">{profile?.full_name || "BASSOR Brahim"}</span>
//                 </div>
//                 <Button 
//                   size="lg"
//                   className="bg-white/20 text-white border border-white/30 hover:bg-white/30 px-8 py-3 text-lg"
//                   onClick={() => handleStartCase('beginner')}
//                 >
//                   Check Your Cases
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </Button>
//               </div>
//               <div className="flex-shrink-0">
//                 <img 
//                   src={doctorHero} 
//                   alt="Healthcare Professional" 
//                   className="w-64 h-64 object-cover rounded-2xl shadow-2xl"
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         {/* Case Selection */}

//         {/* <div className="grid lg:grid-cols-3 gap-6 mb-8">
//           {difficultyLevels.map((level) => (
//             <Card key={level.level} className="hover:shadow-warm transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden bg-gradient-card">
//               <div className={`h-2 bg-gradient-to-r ${level.gradient}`} />
//               <CardHeader>
//                 <div className="flex items-center space-x-3">
//                   <div className={`w-10 h-10 ${level.color} rounded-lg flex items-center justify-center`}>
//                     <level.icon className={`w-5 h-5 ${level.textColor}`} />
//                   </div>
//                   <div>
//                     <CardTitle className="text-lg">{level.displayName}</CardTitle>
//                     <CardDescription className="text-sm">{level.description}</CardDescription>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex justify-between text-sm mb-3">
//                   <span>Available Cases</span>
//                   <span className="font-medium">{level.scenarios.length} scenarios</span>
//                 </div>
//                 {level.scenarios.length > 0 ? (
//                   <Button 
//                     variant="default"
//                     className="w-full hover:shadow-warm transition-all duration-200 active:scale-95"
//                     onClick={() => handleStartCase(level.level)}
//                     disabled={startingScenario !== null}
//                   >
//                     {startingScenario === level.level ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Starting Practice...
//                       </>
//                     ) : (
//                       <>
//                         <PlayCircle className="w-4 h-4 mr-2" />
//                         Start Practice
//                       </>
//                     )}
//                   </Button>
//                 ) : (
//                   <Button variant="outline" className="w-full" disabled>
//                     <Clock className="w-4 h-4 mr-2" />
//                     Coming Soon
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div> */}
        


//         <div className="grid md:grid-cols-3 gap-6">
//           <Card className="bg-gradient-to-br from-green-400 to-green-300 border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
//             <CardContent className="p-8 relative z-10">
//               <div className="space-y-4 mb-8">
//                 <h3 className="text-xl font-bold text-white">Your Last Case</h3>
//                 <p className="text-green-100">Continue Previous Session</p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
//                   <CheckCircle className="w-10 h-10 text-white" />
//                 </div>
//                 <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg hover:bg-green-900 transition-colors">
//                   →
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-yellow-400 to-yellow-300 border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
//             <CardContent className="p-8 relative z-10">
//               <div className="space-y-4 mb-8">
//                 <h3 className="text-xl font-bold text-yellow-900">Recommended For You</h3>
//                 <p className="text-yellow-800">Continued Assessments</p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="relative">
//                   <div className="w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center shadow-md">
//                     <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
//                       <div className="text-white text-xs font-bold text-center leading-tight">
//                         RECOM<br/>MENDED
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-10 h-10 bg-yellow-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg hover:bg-yellow-900 transition-colors">
//                   →
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-pink-400 to-pink-300 border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
//             <CardContent className="p-8 relative z-10"  onClick={() => navigate("/case_library")}>
              
//               <div className="space-y-4 mb-8"   onClick={() => navigate("/case_library")} >
//                 <h3 className="text-xl font-bold text-white">Case Library</h3>
//                 <p className="text-pink-100">Explore All Your Scenarios</p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
//                   <Library className="w-10 h-10 text-white" />
//                 </div>
//                 <div className="w-10 h-10 bg-pink-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg hover:bg-pink-900 transition-colors">
//                   →
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Stats */}
//         {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {weeklyStats.map((stat, index) => (
//             <Card key={index} className="bg-gradient-card border-0 shadow-card">
//               <CardContent className="p-6 flex justify-between items-center">
//                 <div>
//                   <p className="text-sm text-muted-foreground">{stat.label}</p>
//                   <p className="text-2xl font-bold text-foreground">{stat.value}</p>
//                   <p className="text-xs text-success">{stat.change}</p>
//                 </div>
//                 <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
//                   <stat.icon className="w-6 h-6 text-primary" />
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div> */}
//          <div className="text-center py-12">
//           <h2 className="text-4xl font-bold text-gray-800 leading-tight">
//             Ready To Build Your Confidence With<br />
//             Our Available Practice Scenarios?
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//   {/* Example: Average Accuracy - spans 2 columns */}
//   <Card className="bg-gradient-to-br from-yellow-400 to-yellow-300 border-0 md:col-span-2 hover:shadow-lg transition-shadow relative overflow-hidden">
//     <CardContent className="p-8">
//       <div className="flex items-center justify-between">
//         <div className="space-y-4 text-white">
//           <h3 className="text-2xl font-bold">{weeklyStats[0]?.label}</h3>
//           <div className="flex items-center space-x-4">
//             <div className="text-6xl font-bold">
//               {weeklyStats[0]?.value}
//             </div>
//             <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
//               {weeklyStats[0].icon && React.createElement(weeklyStats[0].icon, { className: "w-8 h-8 text-white" })}
//             </div>
//           </div>
//           <p className="text-sm text-white/80">{weeklyStats[0]?.change}</p>
//         </div>
//         <div className="w-32 h-32 bg-white/10 rounded-3xl flex items-center justify-center">
//           <div className="text-6xl">📊</div>
//         </div>
//       </div>
//     </CardContent>
//   </Card>

//   {/* Example: Knowledge Card - spans 2 columns */}
//   <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0 text-white md:col-span-2 hover:shadow-lg transition-shadow">
//     <CardContent className="p-8 flex flex-col justify-center h-full">
//       <div className="space-y-6">
//         <h3 className="text-2xl font-bold leading-tight">
//           {weeklyStats[1]?.label}
//         </h3>
//         <Button 
//           size="lg"
//           className="bg-white/20 text-white border border-white/30 hover:bg-white/30 w-fit px-8"
//           onClick={() => handleStartCase('intermediate')}
//         >
//           {weeklyStats[1]?.value}
//           <ArrowRight className="w-5 h-5 ml-2" />
//         </Button>
//       </div>
//     </CardContent>
//   </Card>

//   {/* Example: Total Sessions */}
//   <Card className="bg-gradient-to-br from-green-400 to-green-300 border-0 hover:shadow-lg transition-shadow">
//     <CardContent className="p-8 text-center space-y-4">
//       <div className="text-5xl font-bold text-white">
//         {weeklyStats[2]?.value}
//       </div>
//       <p className="text-lg font-semibold text-green-100">
//         {weeklyStats[2]?.label}
//       </p>
//       <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center">
//         {weeklyStats[2].icon && React.createElement(weeklyStats[2].icon, { className: "w-8 h-8 text-white" })}
//       </div>
//     </CardContent>
//   </Card>

//   {/* Example: Happy Customers */}
//   <Card className="bg-gradient-to-br from-pink-400 to-pink-300 border-0 hover:shadow-lg transition-shadow">
//     <CardContent className="p-8 text-center space-y-4">
//       <div className="text-5xl font-bold text-white">
//         {weeklyStats[3]?.value}
//       </div>
//       <p className="text-lg font-semibold text-pink-100">
//         {weeklyStats[3]?.label}
//       </p>
//       <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center">
//         {weeklyStats[3].icon && React.createElement(weeklyStats[3].icon, { className: "w-8 h-8 text-white" })}
//       </div>
//     </CardContent>
//   </Card>
// </div>

//         {/* Recent Activity */}
//         <Card className="bg-gradient-card border-0 shadow-card">
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Activity className="w-5 h-5 text-primary mr-2" />
//               Recent Activity
//             </CardTitle>
//             <CardDescription>Your latest medical simulation performances</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentSessions.length > 0 ? (
//                 recentSessions.map((session, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
//                         <Heart className="w-5 h-5 text-primary" />
//                       </div>
//                       <div>
//                         <h4 className="font-medium text-foreground">
//                           {session.scenario?.title || "Medical Case"}
//                         </h4>
//                         <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                           <Badge variant="outline" className="text-xs">
//                             {session.scenario?.difficulty || "Unknown"}
//                           </Badge>
//                           <span>•</span>
//                           <span>{formatTimeFromSeconds(session.time_to_diagnosis)}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-lg font-bold text-success">
//                         {Math.round(session.accuracy_score || 0)}%
//                       </div>
//                       <div className="text-xs text-muted-foreground">Score</div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-8 text-muted-foreground">
//                   <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                   <p>No completed sessions yet</p>
//                   <p className="text-sm">Start your first case to see your progress here</p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Heart, PlayCircle, Clock, Target, Award, Star, User, CheckCircle, Library, Settings as SettingsIcon, LogOut, Plus, ArrowRight, BookOpen, Activity } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useScenarios } from "@/hooks/useScenarios";
import { useAuth } from "@/hooks/useAuth";
import doctorHero from "@/assets/hero-medical-students.jpg";
import React from "react";
import YourLastCase from "@/components/YourLastCase";

interface DashboardProps {
  onStartSimulation?: (scenarioId: string) => void;
}

const Dashboard = ({ onStartSimulation }: DashboardProps) => {
  const { signOut } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const { progress, recentSessions, loading: progressLoading } = useUserProgress();
  const { scenarios, getScenariosByDifficulty, incrementScenarioUsage, loading: scenariosLoading } = useScenarios();
  const [startingScenario, setStartingScenario] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStartCase = async (difficulty: string) => {
    const scenariosForDifficulty = getScenariosByDifficulty(difficulty);
    if (scenariosForDifficulty.length === 0) return;
    const randomScenario = scenariosForDifficulty[Math.floor(Math.random() * scenariosForDifficulty.length)];
    setStartingScenario(difficulty);
    try {
      await incrementScenarioUsage(randomScenario.id);
      if (onStartSimulation) {
        onStartSimulation(randomScenario.id);
      } else {
        navigate(`/patient-presentation/${randomScenario.id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setStartingScenario(null);
    }
  };

  const handleSettingsClick = () => navigate("/settings");

  const formatTimeFromSeconds = (seconds: number | null) => {
    if (!seconds) return "N/A";
    const mins = Math.floor(seconds / 60);
    return `${mins}m`;
  };

 const weeklyStats = [
    { label: "Cas terminés", value: progress?.completed_sessions?.toString() || "0", icon: PlayCircle, change: `${progress?.total_sessions || 0} sessions au total` },
    { label: "Précision moyenne", value: `${Math.round(progress?.avg_accuracy || 0)}%`, icon: Target, change: `Meilleur : ${Math.round(progress?.best_accuracy || 0)}%` },
    { label: "Temps moyen", value: formatTimeFromSeconds(progress?.avg_time_to_diagnosis), icon: Clock, change: `Plus rapide : ${formatTimeFromSeconds(progress?.fastest_diagnosis)}` },
    { label: "Série d’étude", value: `${progress?.current_streak || 0} jours`, icon: Award, change: `Meilleur : ${progress?.longest_streak || 0} jours` }
  ];

  if (profileLoading || progressLoading || scenariosLoading) {
    return (
      <div className="min-h-screen bg-[#E4EEFC] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E4EEFC] pt-24">
      {/* En-tête */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MedMemic</span>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-white/30 text-gray-900 border-white/30">
              <Star className="w-3 h-3 mr-1" />
              {profile?.year_of_study || "Étudiant en médecine"}
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

      {/* Hero / Welcome Section */}
       <section className="container mx-auto px-6 py-10 space-y-10">
        <Card className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 rounded-3xl shadow-2xl overflow-hidden min-h-[280px]">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 space-y-6">
              <h1 className="text-5xl font-extrabold">Bon retour, {profile?.full_name || "Étudiant en médecine"} 👋</h1>
              <p className="text-white/90">
                {profile?.medical_school && `${profile.medical_school} • `}
                Prêt à renforcer votre confiance avec {scenarios.length} scénarios pratiques ?
              </p>
              <Button
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300"
                onClick={() => navigate("/case_library")}
              >
                Voir vos cas <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="flex-shrink-0 mt-6 md:mt-0">
              <img src={doctorHero} alt="Professionnel de santé" className="w-64 h-64 md:w-72 md:h-72 rounded-3xl shadow-2xl object-cover" />
            </div>
          </CardContent>
        </Card>
     
        {/* <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-cyan-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl" />
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4">
          Welcome back, {profile?.full_name || "Medical Student"} 👋
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-10">
          Ready to build your confidence with {scenarios.length} available practice scenarios?
        </p>

        <div className="flex justify-center gap-6">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
            onClick={() => handleStartCase("beginner")}
          >
            Begin Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg rounded-2xl border-2 border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-white transition-all duration-300"
            onClick={() => navigate("/case_library")}
          >
            Case Library
          </Button>
        </div> */}
      </section>

      {/* Cards / Stats Section */}
         <main className="container mx-auto px-6 py-8 space-y-8">

        {/* Dernier cas / Recommandé / Bibliothèque */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-400 to-yellow-300 border-0 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-8 relative z-10"  onClick={() => navigate("/your-last-case")}>
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white">Votre dernier cas</h3>
                <p className="text-green-100">Continuer la session précédente</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-300 to-red-600 border-0 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-8 relative z-10"  onClick={() => navigate("/recommended")}>
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white">Recommandé pour vous</h3>
                <p className="text-white">Évaluations continues</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center">
                  <div className="text-white text-xs font-bold text-center leading-tight">RECOMMANDÉ</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-400 to-pink-300 border-0 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-8 relative z-10" onClick={() => navigate("/case_library")}>
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white">Bibliothèque de Scenarios</h3>
                <p className="text-pink-100">Explorer tous vos scénarios</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Library className="w-10 h-10 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activité récente */}
        <Card className="mt-10 bg-white/30 backdrop-blur-md border-0 shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900"><Activity className="w-5 h-5 mr-2 text-blue-600" /> Activité récente</CardTitle>
            <CardDescription>Vos dernières performances en simulation</CardDescription>
          </CardHeader>
          <CardContent>
            {recentSessions.length > 0 ? (
              recentSessions.map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/10 rounded-xl mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600">{session.scenario?.title || "Cas médical"}</h4>
                      <div className="flex items-center space-x-2 text-sm text-blue-600/80">
                        <Badge variant="outline" className="text-xs">{session.scenario?.difficulty || "Inconnu"}</Badge>
                        <span>•</span>
                        <span>{formatTimeFromSeconds(session.time_to_diagnosis)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-blue-600">
                    <div className="text-lg font-bold">{Math.round(session.accuracy_score || 0)}%</div>
                    <div className="text-xs text-blue-600">Score</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-blue-600/50">
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <p>Aucune session terminée pour l’instant</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
