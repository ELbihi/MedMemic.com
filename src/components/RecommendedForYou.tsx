import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ArrowLeft,
  Heart,
  Settings as SettingsIcon,
  LogOut,
  PlayCircle,
} from "lucide-react";

interface Scenario {
  id: number;
  title: string;
  difficulty: string;
  description: string;
}

export default function RecommendedForYou() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  const handleSettingsClick = () => navigate("/settings");
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    const fetchScenarios = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: sessionsData } = await supabase
        .from("scenario_sessions")
        .select("scenario_id")
        .eq("user_id", user.id);

      const completedScenarioIds = sessionsData?.map((s: any) => s.scenario_id) || [];

      const { data, error } = await supabase
        .from("scenarios")
        .select("*")
        .not("id", "in", `(${completedScenarioIds.join(",") || "0"})`)
        .order("difficulty", { ascending: true });

      if (error) console.error("Error fetching recommended scenarios:", error.message);
      else setScenarios(data || []);

      setLoading(false);
    };

    fetchScenarios();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E4EEFC] pt-24">
        <p className="text-lg text-gray-600">Loading recommended scenarios...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E4EEFC] pt-24">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all"
              onClick={() => navigate("/dashboard")}
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

      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Recommended For You ({scenarios.length})
        </h2>

        {scenarios.length > 0 ? (
          <div className="grid gap-6">
            {scenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className="bg-gradient-to-br from-green-500 to-green-700 text-white border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{scenario.title}</CardTitle>
                    <CardDescription className="text-white/80 text-sm">
                      Difficulty: {scenario.difficulty}
                    </CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{scenario.description}</p>
                  <Button
                    className="w-full bg-white/20 text-white border border-white/30 hover:bg-white/30 flex items-center justify-center space-x-2"
                    onClick={() => alert("Start scenario!")}
                  >
                    <PlayCircle className="w-5 h-5" />
                    <span>Start Scenario</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Recommended Scenarios
            </h3>
            <p className="text-gray-600 max-w-md">
              You have completed all available scenarios! Keep up the great work and check back later for new challenges.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
