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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ArrowLeft,
  Heart,
  Star,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";

interface Scenario {
  id: number;
  title: string;
  difficulty: string;
  description: string;
}

interface ScenarioSession {
  id: string;
  scenario_id: number;
  accuracy_score: number | null;
  time_to_diagnosis: number | null;
  session_completed: boolean;
  created_at: string;
  scenario: Scenario | null;
}

export default function YourLastCases() {
  const [sessions, setSessions] = useState<ScenarioSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<ScenarioSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState<any>(null); // Fetch user profile if needed
  const navigate = useNavigate();

  const handleSettingsClick = () => navigate("/settings");
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

useEffect(() => {
    const fetchSessions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
          .from('scenario_sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('session_completed', true)
      .order('end_time', { ascending: false })
      .limit(5)
      .order('created_at', { ascending: false });

      if (error) console.error("Error fetching sessions:", error.message);
      else setSessions(data || []);

      setLoading(false);
    };

    fetchSessions();
  }, []);


  useEffect(() => {
    if (!searchQuery) {
      setFilteredSessions(sessions);
    } else {
      const filtered = sessions.filter((session) =>
        session.scenario?.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredSessions(filtered);
    }
  }, [searchQuery, sessions]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E4EEFC] pt-24">
        <p className="text-lg text-gray-600">Loading cases...</p>
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
            <span className="text-xl font-bold text-gray-900">MedMemic</span>
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
          Your Last Cases ({sessions.length})
        </h2>

        {/* Search Bar */}
        <Input
          placeholder="Search by scenario title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-8 border border-gray-300 bg-white/80"
        />

        <div className="grid gap-6">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => {
              const scenario = session.scenario;
              return (
                <Card
                  key={session.id}
                  className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{scenario?.title || "Unknown Scenario"}</CardTitle>
                        <CardDescription className="text-white/80 text-sm">
                          Difficulty: {scenario?.difficulty || "N/A"} •{" "}
                          {new Date(session.created_at).toLocaleString()}
                        </CardDescription>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      {scenario?.description || "No description available."}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-white/90 mb-4">
                      <p>
                        <strong>Accuracy:</strong>{" "}
                        {session.accuracy_score ?? "N/A"}
                      </p>
                      <p>
                        <strong>Time:</strong>{" "}
                        {session.time_to_diagnosis
                          ? `${session.time_to_diagnosis} sec`
                          : "N/A"}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {session.session_completed ? "Completed" : "In Progress"}
                      </p>
                    </div>
                    <Button className="w-full bg-white/20 text-white border border-white/30 hover:bg-white/30">
                      Resume Case
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No cases match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
