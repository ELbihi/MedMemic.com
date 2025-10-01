// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Heart, Activity, Users, BookOpen, Star, ArrowRight, Stethoscope, Monitor } from "lucide-react";
// import heroImage from "@/assets/hero-medical-students.jpg";

// interface LandingPageProps {
//   onNavigateToAuth: () => void;
// }

// const LandingPage = ({ onNavigateToAuth }: LandingPageProps) => {

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="bg-card border-b shadow-card">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
//                 <Heart className="w-5 h-5 text-primary-foreground" />
//               </div>
//               <span className="text-xl font-bold text-foreground">MedMemic</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={onNavigateToAuth}>Login</Button>
//               <Button className="bg-gradient-primary hover:shadow-warm transition-all duration-300 rounded-xl" onClick={onNavigateToAuth}>Get Started</Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative min-h-screen bg-gradient-confidence overflow-hidden">
//         {/* Warm background elements */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-10 left-10 w-16 h-16 bg-primary rounded-full blur-xl"></div>
//           <div className="absolute top-32 right-20 w-12 h-12 bg-secondary rounded-full blur-lg"></div>
//           <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-primary rounded-full blur-2xl"></div>
//           <div className="absolute bottom-40 right-10 w-14 h-14 bg-secondary rounded-full blur-xl"></div>
//         </div>

//         <div className="container mx-auto px-6 py-20">
//           <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
//             <div className="space-y-8 animate-fade-in z-10">
//               <div className="space-y-6">
//                 <div className="flex items-center space-x-3 mb-4">
//                   <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-warm">
//                     <Stethoscope className="w-6 h-6 text-primary-foreground" />
//                   </div>
//                   <span className="text-2xl font-bold text-primary">MedMemic</span>
//                 </div>
                
//                 <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
//                   Welcome to
//                   <span className="block text-primary">MedMemic</span>
//                 </h1>
                
//                 <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
//                   Experience the future of medical education with AI-powered patient simulations. 
//                   Practice clinical decision-making in realistic scenarios and elevate your medical expertise.
//                 </p>
//               </div>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Button 
//                   size="lg" 
//                   className="group bg-gradient-primary hover:shadow-warm text-primary-foreground border-0 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
//                   onClick={onNavigateToAuth}
//                 >
//                   Begin Your Journey
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//                 <Button 
//                   variant="secondary" 
//                   size="lg"
//                   className="px-8 py-4 text-lg font-semibold rounded-xl"
//                 >
//                   Watch Demo
//                 </Button>
//               </div>

//               {/* Enhanced Stats */}
             
//             </div>

//             {/* Modern Medical Interface Preview */}
//             <div className="relative animate-scale-in lg:ml-8">
//               <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border p-8 shadow-warm">
//                 <div className="space-y-6">
//                   {/* Simulated medical interface */}
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
//                         <Monitor className="w-5 h-5 text-primary-foreground" />
//                       </div>
//                       <div>
//                         <div className="font-semibold text-foreground">Patient Monitor</div>
//                         <div className="text-xs text-muted-foreground">Real-time vitals</div>
//                       </div>
//                     </div>
//                     <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
//                   </div>

//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center p-3 bg-card rounded-xl border border-border">
//                       <span className="text-sm font-medium text-foreground">Heart Rate</span>
//                       <span className="font-bold text-destructive">72 BPM</span>
//                     </div>
//                     <div className="flex justify-between items-center p-3 bg-card rounded-xl border border-border">
//                       <span className="text-sm font-medium text-foreground">Blood Pressure</span>
//                       <span className="font-bold text-primary">120/80</span>
//                     </div>
//                     <div className="flex justify-between items-center p-3 bg-card rounded-xl border border-border">
//                       <span className="text-sm font-medium text-foreground">Temperature</span>
//                       <span className="font-bold text-secondary">98.6°F</span>
//                     </div>
//                   </div>

//                   <div className="bg-gradient-primary p-4 rounded-xl text-primary-foreground">
//                     <div className="text-sm font-medium mb-1">AI Recommendation</div>
//                     <div className="text-xs opacity-90">Based on symptoms, consider ordering CBC and metabolic panel</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Floating notification */}
//               <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-warm border border-border">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
//                     <Activity className="w-4 h-4 text-success" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-sm text-foreground">Case Progress</div>
//                     <div className="text-xs text-muted-foreground">85% Complete</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-muted/30">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
//               Why Medical Students Choose MedMemic 
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Experience the most advanced medical simulation platform built specifically 
//               for modern medical education.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: BookOpen,
//                 title: "Comprehensive Cases",
//                 description: "From routine check-ups to emergency pediatric scenarios with detailed explanations and learning objectives."
//               },
//               {
//                 icon: Activity,
//                 title: "Real-time Feedback",
//                 description: "Instant assessment of clinical decisions with detailed explanations and improvement suggestions."
//               },
//               {
//                 icon: Star,
//                 title: "Progressive Learning",
//                 description: "Adaptive difficulty levels that grow with your expertise, from beginner to advanced practice."
//               },
//               {
//                 icon: Users,
//                 title: "Peer Collaboration",
//                 description: "Learn with classmates, compare progress, and participate in collaborative case discussions."
//               },
//               {
//                 icon: Heart,
//                 title: "Pediatric Focus",
//                 description: "Specialized in pediatric medicine with age-appropriate scenarios and developmental considerations."
//               },
//               {
//                 icon: Activity,
//                 title: "Performance Analytics",
//                 description: "Detailed progress tracking with insights into strengths, areas for improvement, and learning patterns."
//               }
//             ].map((feature, index) => (
//               <Card key={index} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0">
//                 <CardContent className="p-6">
//                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
//                     <feature.icon className="w-6 h-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
//                   <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-primary">
//         <div className="container mx-auto px-6 text-center">
//           <div className="max-w-3xl mx-auto space-y-8">
//             <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground">
//               Ready to Excel in Medical Practice?
//             </h2>
//             <p className="text-xl text-primary-foreground/90">
//               Join thousands of medical students who are mastering clinical skills 
//               through our advanced simulation platform.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button variant="secondary" size="lg" className="bg-card text-primary hover:shadow-achievement" onClick={onNavigateToAuth}>
//                 Start Free Trial
//               </Button>
//               <Button variant="secondary" size="lg" className="border-primary-foreground text-primary-foreground hover:shadow-achievement">
//                 Schedule Demo
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-card border-t py-12">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="space-y-4">
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
//                   <Heart className="w-5 h-5 text-primary-foreground" />
//                 </div>
//                 <span className="text-xl font-bold text-foreground">MedMemic Pro</span>
//               </div>
//               <p className="text-muted-foreground">
//                 Advancing medical education through innovative simulation technology.
//               </p>
//             </div>
            
//             <div>
//               <h4 className="font-semibold text-foreground mb-4">Platform</h4>
//               <ul className="space-y-2 text-muted-foreground">
//                 <li><a href="#" className="hover:text-primary transition-colors">Cases</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Progress</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="font-semibold text-foreground mb-4">Support</h4>
//               <ul className="space-y-2 text-muted-foreground">
//                 <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="font-semibold text-foreground mb-4">Legal</h4>
//               <ul className="space-y-2 text-muted-foreground">
//                 <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
//             <p>&copy; 2024 MedMemic. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Brain,
//   Activity,
//   Stethoscope,
//   ArrowRight,
//   Menu,
//   X,
// } from "lucide-react";

// const features = [
//   {
//     icon: Brain,
//     title: "AI-Powered Decisions",
//     description:
//       "Get instant clinical support powered by advanced AI algorithms.",
//   },
//   {
//     icon: Activity,
//     title: "Real-time Monitoring",
//     description:
//       "Track patient vitals with real-time updates and alerts.",
//   },
//   {
//     icon: Stethoscope,
//     title: "Clinical Accuracy",
//     description:
//       "Improve diagnostic precision with evidence-based insights.",
//   },
// ];

// export default function LandingPage() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-gray-900">
//       {/* Navbar */}
//       <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200">
//         <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
//           {/* Logo */}
//           <div className="text-2xl font-extrabold text-blue-600">Medmemic</div>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
//             <a href="#features" className="hover:text-blue-600 transition">
//               Features
//             </a>
//             <a href="#demo" className="hover:text-blue-600 transition">
//               Demo
//             </a>
//             <a href="#contact" className="hover:text-blue-600 transition">
//               Contact
//             </a>
//             <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl px-6">
//               Get Started
//             </Button>
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100"
//             onClick={() => setMobileOpen(!mobileOpen)}
//           >
//             {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Nav */}
//         {mobileOpen && (
//           <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
//             <a href="#features" className="block text-gray-700 hover:text-blue-600">
//               Features
//             </a>
//             <a href="#demo" className="block text-gray-700 hover:text-blue-600">
//               Demo
//             </a>
//             <a href="#contact" className="block text-gray-700 hover:text-blue-600">
//               Contact
//             </a>
//             <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl">
//               Get Started
//             </Button>
//           </div>
//         )}
//       </header>

//       {/* Hero Section */}
//    <section className="relative overflow-hidden px-6 pt-48 pb-32 text-center bg-gray-50">
//   {/* Background Image */}
//   <div className="absolute inset-0 -z-20">
//     <img
//       src="/images/medical-bg.jpg"
//       alt="Medical Simulation"
//       className="w-full h-full object-cover opacity-20"
//     />
//   </div>

//   {/* Gradient Blobs */}
//   <div className="absolute inset-0 -z-10">
//     <div className="absolute top-10 left-20 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl" />
//     <div className="absolute bottom-20 right-20 w-[28rem] h-[28rem] bg-yellow-300/25 rounded-full blur-3xl" />
//   </div>

//   <motion.h1
//     initial={{ opacity: 0, y: -40 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.8 }}
//     className="text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl leading-tight"
//   >
//     AI-Powered Clinical Decisions
//   </motion.h1>

//   <p className="mx-auto mt-8 max-w-3xl text-xl text-gray-700">
//     Revolutionize healthcare training with intelligent simulations,
//     real-time monitoring, and decision support.
//   </p>

//   <div className="mt-12 flex justify-center gap-6">
//     <Button
//       size="lg"
//       className="group bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 text-white px-10 py-5 text-xl font-semibold rounded-2xl transition-all duration-300"
//     >
//       Begin Your Journey
//       <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
//     </Button>
//     <Button
//       variant="outline"
//       size="lg"
//       className="px-10 py-5 text-xl rounded-2xl border-2 border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-white transition-all duration-300"
//     >
//       Watch Demo
//     </Button>
//   </div>
// </section>

//       {/* Features Section */}
//       <section id="features" className="relative px-6 py-20 bg-white/70 backdrop-blur-lg">
//         <div className="mx-auto max-w-6xl text-center">
//           <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//             Why Choose <span className="text-blue-600">Medmemic</span>?
//           </h2>
//           <p className="mt-4 text-gray-600">
//             Unlock the future of clinical training with intelligent technology.
//           </p>
//         </div>

//         <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map((feature, index) => (
//             <Card
//               key={index}
//               className="group bg-white/80 backdrop-blur-xl border border-blue-100 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-200/50 transition-all duration-300 rounded-2xl"
//             >
//               <CardContent className="p-6">
//                 <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-4">
//                   <feature.icon className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                   {feature.title}
//                 </h3>
//                 <p className="mt-2 text-gray-600">{feature.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section id="demo" className="relative px-6 py-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
//         <div className="mx-auto max-w-4xl text-center">
//           <h2 className="text-3xl font-extrabold sm:text-4xl">
//             Ready to Transform Clinical Training?
//           </h2>
//           <p className="mt-4 text-lg text-blue-100">
//             Experience the next generation of medical simulation today.
//           </p>
//           <div className="mt-8 flex justify-center gap-6">
//             <Button
//               size="lg"
//               className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-2xl font-semibold transition-all duration-300"
//             >
//               Get Started
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-blue-900 px-8 py-4 text-lg rounded-2xl transition-all duration-300"
//             >
//               Schedule Demo
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer id="contact" className="bg-[#0F172A] text-gray-400 py-10">
//         <div className="mx-auto max-w-6xl flex flex-col items-center gap-4">
//           <p>© 2025 Medmemic. All rights reserved.</p>
//           <div className="flex gap-6">
//             <a href="#" className="hover:text-cyan-400 transition">
//               LinkedIn
//             </a>
//             <a href="#" className="hover:text-cyan-400 transition">
//               Twitter
//             </a>
//             <a href="#" className="hover:text-cyan-400 transition">
//               YouTube
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Activity, Users, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Heart, Activity, Users, BookOpen, Star, ArrowRight, Stethoscope, Monitor } from "lucide-react";
import heroImage from "@/assets/hero-medical-students.jpg";

interface LandingPageProps {
  onNavigateToAuth: () => void;
}

const LandingPage = ({ onNavigateToAuth }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-extrabold text-blue-600"
          >
            Medmemic
          </motion.h1>

          <ul className="hidden md:flex gap-8 font-medium text-gray-700">

          </ul>

          <Button className="bg-blue-600 text-white rounded-xl px-6 py-2"  onClick={onNavigateToAuth}>
            Commencer
          </Button>
        </nav>
      </header>

      {/* ================= HERO SECTION ================= */}
<section className="relative overflow-hidden px-6 pt-48 pb-32 text-center bg-gray-50">
  {/* Background Image */}
  <div className="absolute inset-0 -z-20">
    <img
      src="https://img.freepik.com/free-photo/hand-in-medical-glove-pointing-to-virtual-screen-medical-technology_1150-17975.jpg"
      alt="Medical AI Interaction"
      className="w-full h-full object-cover opacity-20"
    />
  </div>

  {/* Gradient Blobs */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-10 left-20 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl" />
    <div className="absolute bottom-20 right-20 w-[28rem] h-[28rem] bg-yellow-300/25 rounded-full blur-3xl" />
  </div>

  <motion.h1
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl leading-tight"
  >
 Le pont entre vos cours et vos premiers patients.
   </motion.h1>

  <p className="mx-auto mt-8 max-w-3xl text-xl text-gray-700">
Simulez des cas réels, testez vos conduites à tenir et entraînez-vous jusqu’à la maîtrise,
 sans jamais risquer la sécurité d’un vrai patient.
  </p>

  <div className="mt-12 flex justify-center gap-6">
    <Button
      size="lg"
      className="group bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 text-white px-10 py-5 text-xl font-semibold rounded-2xl transition-all duration-300"
    onClick={onNavigateToAuth}>
      Vivre ton premier scénario  
      <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
    </Button>
    <Button
      variant="outline"
      size="lg"
      className="px-10 py-5 text-xl rounded-2xl border-2 border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-white transition-all duration-300"
    >
      Voir comment ça marche
    </Button>
  </div>
</section>
<section id="problems" className="py-24 bg-gradient-to-br from-cyan-50 to-blue-50 text-center">
  <div className="max-w-6xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-gray-900"
    >
      Les Défis des Étudiants en Médecine
    </motion.h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Découvrez les principaux obstacles auxquels les étudiants et jeunes médecins sont confrontés.
    </p>

    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      {[
        "Le premier patient ne devrait pas être un test.",
        "Peur de se tromper devant un patient.",
        "Peu d’occasions de répéter.",
        "Inégalités d’exposition clinique.",
        "Stress des premiers stages.",
        "Difficulté à passer à l’action.",
        "Feedback rare et tardif."
      ].map((problem, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          viewport={{ once: true }}
          className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 flex items-start"
        >
          <span className="text-red-500 text-xl mr-3">❌</span>
          <h3 className="text-xl font-semibold text-gray-900">{problem}</h3>
        </motion.div>
      ))}
    </div>
  </div>
</section>
<section id="solutions" className="py-24 bg-white text-center">
  <div className="max-w-6xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-gray-900"
    >
      Comment MedMemic Vous Aide
    </motion.h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Notre application fournit des solutions concrètes pour chaque défi rencontré.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
      {[
        { title: "Simulation Réaliste", desc: "Pratiquez vos premiers patients sans stress et améliorez vos compétences avant les stages réels.", icon: "🩺" },
        { title: "Répétition Facile", desc: "Plusieurs cas disponibles pour répéter et renforcer vos connaissances cliniques.", icon: "🔁" },
        { title: "Feedback Immédiat", desc: "Recevez des retours détaillés après chaque simulation pour progresser rapidement.", icon: "💡" },
        { title: "Égalité d’Exposition", desc: "Accédez à une variété de scénarios cliniques pour compenser les différences de stages.", icon: "⚖️" },
        { title: "Confiance en Soi", desc: "Gérez le stress des premiers cas et passez à l’action en toute confiance.", icon: "💪" },
        { title: "Collaboration", desc: "Travaillez en équipe et partagez vos progrès avec vos collègues.", icon: "🤝" },
        { title: "Suivi de Progression", desc: "Suivez votre performance et améliorez vos points faibles avec des statistiques détaillées.", icon: "📊" }
      ].map((solution, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          viewport={{ once: true }}
          className="p-6 bg-gray-50 rounded-2xl shadow-md border border-gray-200 flex items-start space-x-4"
        >
          <div className="text-2xl">{solution.icon}</div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
            <p className="text-gray-700">{solution.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      {/* ================= FEATURES ================= */}
      {/* <section className="py-24 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-900">Key Features</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Everything you need to train, monitor, and make better clinical decisions.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { icon: Brain, title: "AI Simulations", desc: "Experience lifelike patient scenarios powered by advanced AI." },
            { icon: Activity, title: "Real-Time Monitoring", desc: "Track vitals, conditions, and alerts instantly." },
            { icon: Users, title: "Collaborative Training", desc: "Engage teams in interactive, decision-based learning." },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl shadow-lg hover:shadow-xl transition bg-gradient-to-br from-white to-gray-50"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* ================= DEMO / SHOWCASE ================= */}
      {/* <section className="py-24 bg-gradient-to-r from-cyan-50 to-blue-50 text-center">
        <h2 className="text-4xl font-bold text-gray-900">See It In Action</h2>
        <p className="mt-4 text-gray-600">
          Watch how our platform transforms medical training into an immersive experience.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto"
        >
        </motion.div>
      </section> */}

      {/* ================= STATS ================= */}
      <section className="py-24 bg-gray-50 text-center">
         <h2 className="text-4xl font-bold text-gray-900">See It In Action</h2>
         <p className="mt-4 text-gray-600">
          Watch how our platform transforms medical training into an immersive experience.
        </p>
        <br />
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
         
        
          {[
            { number: "10K+", label: "Students Trained" },
            { number: "500+", label: "Medical Scenarios" },
            { number: "95%", label: "Success Rate" },
            { number: "50+", label: "Partner Universities" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-blue-600">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
  {/* <section id="pricing" className="py-24 bg-white text-center">
      <div className="max-w-6xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-gray-900"
    >
      Choose Your Plan
    </motion.h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Flexible pricing plans designed for individuals, teams, and institutions.
    </p>

    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        {
          name: "Basic",
          price: "$19/mo",
          features: ["Access to 50 simulations", "Real-time monitoring", "Basic analytics"],
          highlight: false
        },
        {
          name: "Pro",
          price: "$49/mo",
          features: ["Access to 200 simulations", "Advanced analytics", "AI recommendations", "Collaborative training"],
          highlight: true
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Unlimited simulations", "Full analytics dashboard", "Team management", "Dedicated support"],
          highlight: false
        }
      ].map((plan, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          viewport={{ once: true }}
          className={`p-8 rounded-3xl shadow-lg border ${
            plan.highlight ? "border-blue-600 bg-blue-50" : "border-gray-200"
          }`}
        >
          <h3 className={`text-2xl font-bold mb-4 ${plan.highlight ? "text-blue-600" : "text-gray-900"}`}>{plan.name}</h3>
          <p className={`text-3xl font-extrabold mb-6 ${plan.highlight ? "text-blue-600" : "text-gray-900"}`}>{plan.price}</p>
          <ul className="mb-6 text-gray-700 space-y-3">
            {plan.features.map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>
          <Button
            size="lg"
            className={`w-full ${
              plan.highlight
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100"
            } rounded-2xl px-6 py-4 font-semibold transition`}
          >
            {plan.highlight ? "Get Started" : "Select Plan"}
          </Button>
        </motion.div>
      ))}
    </div>
  </div>
</section> */}
{/* ================= FAQ ================= */}

{/* Problems Section */}


{/* Solutions Section */}


      {/* ================= CTA / IMAGE DE PRÉSENTATION ================= */}
      <section
        className="relative py-32 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1584982751621-6e34d4aab3db?auto=format&fit=crop&w=1200&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-white -z-10"></div>
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-black"
        >
          Prêt à transformer la formation médicale ?
        </motion.h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-black/90">
          Rejoignez des milliers d’étudiants et de professionnels qui utilisent déjà MedSim.
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <Button size="lg" className="bg-blue-600 text-white rounded-2xl px-8 py-4 text-lg font-semibold hover:bg-orange-500">
            Commencer
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 rounded-2xl px-8 py-4 text-lg font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Nous contacter
          </Button>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
<section id="newsletter" className="py-24 bg-blue-600 text-white text-center">
  <div className="max-w-3xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl font-bold"
    >
      Restez informé
    </motion.h2>
    <p className="mt-4 text-lg opacity-90">
      Abonnez-vous à notre newsletter pour recevoir les dernières actualités et conseils sur la simulation médicale.
    </p>

    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
      <input
        type="email"
        placeholder="Entrez votre email"
        className="px-6 py-4 rounded-2xl text-gray-900 w-full sm:w-auto flex-1"
      />
      <Button size="lg" className="bg-white text-blue-600 rounded-2xl px-6 py-4 font-semibold hover:bg-gray-100">
        S’abonner
      </Button>
    </div>
  </div>
</section>

      {/* ================= PIED DE PAGE ================= */}
      <footer className="py-10 bg-gray-900 text-gray-400 text-center">
        <p>© 2025 MedSim. Tous droits réservés.</p>
      </footer>
    </div>
  );

}
 export default LandingPage;
