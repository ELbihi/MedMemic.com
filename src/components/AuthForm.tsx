import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Mail, Lock, User, GraduationCap, Loader2, Stethoscope, Activity } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface AuthFormProps {
  isLogin: boolean;
  onToggle: () => void;
  onSuccess: () => void;
}

const AuthForm = ({ isLogin, onToggle, onSuccess }: AuthFormProps) => {
  const { signIn, signUp } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    medicalSchool: "",
    yearOfStudy: "",
    specialty: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          let errorMessage = error.message;
          
          if (error.message === "Invalid login credentials") {
            errorMessage = "Invalid email or password. If you just signed up, please check your email for a verification link.";
          } else if (error.message === "Email not confirmed") {
            errorMessage = "Please check your email and click the verification link before signing in.";
          }
          
          console.error('Sign in failed:', error);
          toast({
            title: "Sign in failed",
            description: errorMessage,
            variant: "destructive"
          });
          return;
        }

        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your account."
        });
        onSuccess();
      } else {
        const { error } = await signUp(formData.email, formData.password, {
          fullName: formData.fullName,
          medicalSchool: formData.medicalSchool,
          yearOfStudy: formData.yearOfStudy,
          specialty: formData.specialty
        });

        if (error) {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive"
          });
          return;
        }

        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account."
        });
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
  <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50">
    {/* Gradient Blobs */}
    <div 
    className="absolute inset-0 bg-cover bg-center filter blur-sm"
    style={{ backgroundImage: "url('src/assets/gettyimages-1444058709-640x640.jpg')" }}
  ></div>
    <div className="absolute inset-0 -z-10" > 
      <div className="absolute top-10 left-20 w-72 h-72 bg-cyan-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
    </div>

    {/* Medical icons */}
    <div className="absolute inset-0 opacity-10">
      <Stethoscope className="absolute top-1/4 left-1/4 w-12 h-12 text-cyan-400 rotate-12" />
      <Activity className="absolute top-3/4 right-1/4 w-10 h-10 text-blue-400 -rotate-12" />
      <Heart className="absolute bottom-1/4 left-1/3 w-8 h-8 text-cyan-500 rotate-45" />
    </div>

    <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-xl border border-blue-100 relative z-10 rounded-2xl">
      <CardHeader className="text-center space-y-6 pb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <div className="flex items-center space-x-1">
            <Stethoscope className="w-7 h-7 text-white" />
            <span className="text-white font-bold text-lg">AI</span>
          </div>
        </div>
        <div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "Welcome Back!" : "Join MedMemic AI"}
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            {isLogin
              ? "Sign in to continue to your account"
              : "Create your account to start learning"}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="medicalSchool" className="text-sm font-medium">
                  Medical School
                </Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="medicalSchool"
                    type="text"
                    placeholder="Enter your medical school"
                    className="pl-10"
                    value={formData.medicalSchool}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        medicalSchool: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="yearOfStudy"
                    className="text-sm font-medium"
                  >
                    Year of Study
                  </Label>
                  <Select
                    value={formData.yearOfStudy}
                    onValueChange={(value) =>
                      setFormData({ ...formData, yearOfStudy: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ms1">1st Year</SelectItem>
                      <SelectItem value="ms2">2nd Year</SelectItem>
                      <SelectItem value="ms3">3rd Year</SelectItem>
                      <SelectItem value="ms4">4th Year</SelectItem>
                      <SelectItem value="resident">Resident</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty" className="text-sm font-medium">
                    Specialty Interest
                  </Label>
                  <Select
                    value={formData.specialty}
                    onValueChange={(value) =>
                      setFormData({ ...formData, specialty: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Enter your specialty interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="internal">Internal Med</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="family">Family Med</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg text-white transition-all duration-300 rounded-xl font-semibold py-3"
            size="lg"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {isLogin ? "New to MedMemic?" : "Already have an account?"}
            <button
              onClick={onToggle}
              className="ml-1 font-medium text-blue-600 hover:underline"
            >
              {isLogin ? "Create account" : "Sign in instead"}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="text-center">
            <button className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);


  // return (
  //   <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
  //     {/* Warm background elements */}
  //     <div className="absolute inset-0 opacity-10">
  //       <div className="absolute top-10 left-10 w-16 h-16 bg-primary rounded-full blur-xl"></div>
  //       <div className="absolute top-32 right-20 w-12 h-12 bg-secondary rounded-full blur-lg"></div>
  //       <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-primary rounded-full blur-2xl"></div>
  //       <div className="absolute bottom-40 right-10 w-14 h-14 bg-secondary rounded-full blur-xl"></div>
  //     </div>

  //     {/* Medical equipment silhouettes */}
  //     <div className="absolute inset-0 opacity-10">
  //       <Stethoscope className="absolute top-1/4 left-1/4 w-12 h-12 text-primary rotate-12" />
  //       <Activity className="absolute top-3/4 right-1/4 w-10 h-10 text-secondary -rotate-12" />
  //       <Heart className="absolute bottom-1/4 left-1/3 w-8 h-8 text-primary rotate-45" />
  //     </div>

  //     <Card className="w-full max-w-md shadow-medical border-0 bg-blue-100 backdrop-blur-xl border border-border relative z-10">
  //       <CardHeader className="text-center space-y-6 pb-8">
  //         <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-warm">
  //           <div className="flex items-center space-x-1">
  //             <Stethoscope className="w-7 h-7 text-primary-foreground" />
  //             <span className="text-primary-foreground font-bold text-lg">AI</span>
  //           </div>
  //         </div>
  //         <div>
  //           <CardTitle className="text-3xl font-bold text-foreground mb-2">
  //             {isLogin ? "Welcome Back!" : "Join MedMemic AI"}
  //           </CardTitle>
  //           <CardDescription className="text-muted-foreground text-base">
  //             {isLogin 
  //               ? "Sign in to continue to your account"
  //               : "Create your account to start learning"
  //             }
  //           </CardDescription>
  //         </div>
  //       </CardHeader>

  //       <CardContent className="space-y-6">
  //         <form onSubmit={handleSubmit} className="space-y-4">
  //           {!isLogin && (
  //             <div className="space-y-2">
  //               <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
  //               <div className="relative">
  //                 <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
  //                 <Input
  //                   id="fullName"
  //                   type="text"
  //                   placeholder="Enter your full name"
  //                   className="pl-10"
  //                   value={formData.fullName}
  //                   onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
  //                   required
  //                 />
  //               </div>
  //             </div>
  //           )}

  //           <div className="space-y-2">
  //             <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
  //             <div className="relative">
  //               <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
  //               <Input
  //                 id="email"
  //                 type="email"
  //                 placeholder="Enter your email"
  //                 className="pl-10"
  //                 value={formData.email}
  //                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  //                 required
  //               />
  //             </div>
  //           </div>

  //           <div className="space-y-2">
  //             <Label htmlFor="password" className="text-sm font-medium">Password</Label>
  //             <div className="relative">
  //               <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
  //               <Input
  //                 id="password"
  //                 type="password"
  //                 placeholder="Enter your password"
  //                 className="pl-10"
  //                 value={formData.password}
  //                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
  //                 required
  //               />
  //             </div>
  //           </div>

  //           {!isLogin && (
  //             <>
  //               <div className="space-y-2">
  //                 <Label htmlFor="medicalSchool" className="text-sm font-medium">Medical School</Label>
  //                 <div className="relative">
  //                   <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
  //                   <Input
  //                     id="medicalSchool"
  //                     type="text"
  //                     placeholder="Enter your medical school"
  //                     className="pl-10"
  //                     value={formData.medicalSchool}
  //                     onChange={(e) => setFormData({ ...formData, medicalSchool: e.target.value })}
  //                     required
  //                   />
  //                 </div>
  //               </div>

  //               <div className="grid grid-cols-2 gap-4">
  //                 <div className="space-y-2">
  //                   <Label htmlFor="yearOfStudy" className="text-sm font-medium">Year of Study</Label>
  //                   <Select 
  //                     value={formData.yearOfStudy} 
  //                     onValueChange={(value) => setFormData({ ...formData, yearOfStudy: value })}
  //                     required
  //                   >
  //                     <SelectTrigger>
  //                       <SelectValue placeholder="Select your year" />
  //                     </SelectTrigger>
  //                     <SelectContent>
  //                       <SelectItem value="ms1">1st Year</SelectItem>
  //                       <SelectItem value="ms2">2nd Year</SelectItem>
  //                       <SelectItem value="ms3">3rd Year</SelectItem>
  //                       <SelectItem value="ms4">4th Year</SelectItem>
  //                       <SelectItem value="resident">Resident</SelectItem>
  //                     </SelectContent>
  //                   </Select>
  //                 </div>

  //                 <div className="space-y-2">
  //                   <Label htmlFor="specialty" className="text-sm font-medium">Specialty Interest</Label>
  //                   <Select 
  //                     value={formData.specialty} 
  //                     onValueChange={(value) => setFormData({ ...formData, specialty: value })}
  //                     required
  //                   >
  //                     <SelectTrigger>
  //                       <SelectValue placeholder="Enter your specialty interest" />
  //                     </SelectTrigger>
  //                     <SelectContent>
  //                       <SelectItem value="pediatrics">Pediatrics</SelectItem>
  //                       <SelectItem value="internal">Internal Med</SelectItem>
  //                       <SelectItem value="surgery">Surgery</SelectItem>
  //                       <SelectItem value="emergency">Emergency</SelectItem>
  //                       <SelectItem value="family">Family Med</SelectItem>
  //                       <SelectItem value="other">Other</SelectItem>
  //                     </SelectContent>
  //                   </Select>
  //                 </div>
  //               </div>
  //             </>
  //           )}

  //           <Button 
  //             type="submit" 
  //             className="w-full bg-gradient-primary hover:shadow-warm text-primary-foreground border-0 shadow-medical transition-all duration-300 rounded-xl font-semibold" 
  //             size="lg"
  //             disabled={submitting}
  //           >
  //             {submitting ? (
  //               <>
  //                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
  //                 Loading...
  //               </>
  //             ) : (
  //               isLogin ? "Sign In" : "Sign Up"
  //             )}
  //           </Button>
  //         </form>

  //         <div className="text-center pt-4 border-t">
  //           <p className="text-sm text-muted-foreground">
  //             {isLogin ? "New to MedSim Pro?" : "Already have an account?"}
  //             <button 
  //               onClick={onToggle}
  //               className="ml-1 font-medium text-primary hover:underline"
  //             >
  //               {isLogin ? "Create account" : "Sign in instead"}
  //             </button>
  //           </p>
  //         </div>

  //         {isLogin && (
  //           <div className="text-center">
  //             <button className="text-sm text-primary hover:underline">
  //               Forgot your password?
  //             </button>
  //           </div>
  //         )}
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
};

export default AuthForm;