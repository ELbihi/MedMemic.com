// import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';

// interface CachedScenario {
//   id: string;
//   scenario_data: any;
//   age_group: string | null;
//   difficulty: string;
//   specialty: string;
//   last_used: string;
//   created_at: string;
//   is_template: boolean;
//   quality_score: number;
//   usage_count: number;
// }

// export const useScenarios = () => {
//   const [scenarios, setScenarios] = useState<CachedScenario[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchScenarios();
//   }, []);

//   const fetchScenarios = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const { data, error: fetchError } = await supabase
//         .from('cached_scenarios')
//         .select('*')
//         .order('quality_score', { ascending: false });

//       if (fetchError) throw fetchError;

//       setScenarios(data || []);
//     } catch (err: any) {
//       console.error('Error fetching scenarios:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getScenariosByDifficulty = (difficulty: string) => {
//     return scenarios.filter(scenario => 
//       scenario.difficulty.toLowerCase() === difficulty.toLowerCase()
//     );
//   };

//   const incrementScenarioUsage = async (scenarioId: string) => {
//     try {
//       // First get current usage count
//       const { data: currentScenario } = await supabase
//         .from('cached_scenarios')
//         .select('usage_count')
//         .eq('id', scenarioId)
//         .single();

//       const { error } = await supabase
//         .from('cached_scenarios')
//         .update({ 
//           usage_count: (currentScenario?.usage_count || 0) + 1,
//           last_used: new Date().toISOString()
//         })
//         .eq('id', scenarioId);

//       if (error) throw error;

//       // Update local state
//       setScenarios(prev => prev.map(scenario => 
//         scenario.id === scenarioId 
//           ? { ...scenario, usage_count: scenario.usage_count + 1, last_used: new Date().toISOString() }
//           : scenario
//       ));
//     } catch (err: any) {
//       console.error('Error incrementing scenario usage:', err);
//     }
//   };

//   return {
//     scenarios,
//     loading,
//     error,
//     getScenariosByDifficulty,
//     incrementScenarioUsage,
//     refreshScenarios: fetchScenarios
//   };
// };
// hooks/useScenarios.ts
// import { supabase } from "@/lib/supabaseClient";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export const useScenarios = () => {
// const [scenarios, setScenarios] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchScenarios = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("/api/scenarios");
//       setScenarios(data);
//     } catch (err) {
//       console.error("Error fetching scenarios:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
// function getScenariosByDifficulty(difficulty: string) {
//   if (!Array.isArray(scenarios)) return [];
//   return scenarios.filter(s => s.difficulty === difficulty);
// }

// async function incrementScenarioUsage(scenarioId: string) {
//   // Placeholder: Implement API call or local update logic as needed
//   setScenarios(prev =>
//     prev.map(s =>
//       s.id === scenarioId
//         ? { ...s, usage_count: (s.usage_count || 0) + 1, last_used: new Date().toISOString() }
//         : s
//     )
//   );
//   // Optionally, add an API call here to persist the change
// }


//   useEffect(() => {
//     fetchScenarios();
//   }, []);

//   return { scenarios, loading, getScenariosByDifficulty, incrementScenarioUsage };
// };
// import { useState, useEffect } from "react";
// import axios from "axios";


// export const useScenarios = () => {
//   const [scenarios, setScenarios] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchScenarios = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const { data } = await axios.get("/api/scenarios");
//       setScenarios(data || []);
//     } catch (err: any) {
//       console.error("Error fetching scenarios:", err);
//       setError(err.message || "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getScenariosByDifficulty = (difficulty: string) => {
//     if (!Array.isArray(scenarios)) return [];
//     return scenarios.filter(
//       (s) => s.difficulty.toLowerCase() === difficulty.toLowerCase()
//     );
//   };

//   const incrementScenarioUsage = async (scenarioId: string) => {
//     setScenarios((prev) =>
//       prev.map((s) =>
//         s.id === scenarioId
//           ? { ...s, usage_count: (s.usage_count || 0) + 1, last_used: new Date().toISOString() }
//           : s
//       )
//     );
//     const incrementScenarioUsage = async (scenarioId: string) => {
//   // Update local state immediately
//   setScenarios(prev =>
//     prev.map(s =>
//       s.id === scenarioId
//         ? { ...s, usage_count: (s.usage_count || 0) + 1, last_used: new Date().toISOString() }
//         : s
//     )
//   );

//   try {
//     // Persist increment on the server
//     await axios.post(`/api/scenarios/${scenarioId}/increment`);
//   } catch (err) {
//     console.error("Error persisting scenario usage increment:", err);
//   }
// };
//   };

//   useEffect(() => {
//     fetchScenarios();
//   }, []);

//   return {
//     scenarios,
//     loading,
//     error,
//     getScenariosByDifficulty,
//     incrementScenarioUsage,
//     refreshScenarios: fetchScenarios,
//   };

// };



import { useState, useEffect } from "react";
import axios from "axios";
import { useUserProfile } from "./useUserProfile";

export const useScenarios = () => {
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile, loading: profileLoading } = useUserProfile();

  // Fetch all scenarios from the backend
  const fetchScenarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("/api/scenarios");
    
       const b=Array.isArray(data) ? data : [];
       console.log("Scenarios data (after fetch):", b);

      setScenarios(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("Error fetching scenarios:", err);
      setError(err.message || "Unknown error");
      setScenarios([]);
    } finally {
      setLoading(false);
    }
    

  };

  // Filter scenarios by difficulty
  const getScenariosByDifficulty = (difficulty: string) => {
    if (!Array.isArray(scenarios)) return [];
    return scenarios.filter(
      (s) => s.difficulty?.toLowerCase() === difficulty.toLowerCase()
    );
  };

  // Increment scenario usage locally and on the server
  const incrementScenarioUsage = async (scenarioId: string) => {
    // Update local state immediately
    setScenarios((prev) =>
      prev.map((s) =>
        s.id === scenarioId
          ? {
              ...s,
              usage_count: (s.usage_count || 0) + 1,
              last_used: new Date().toISOString(),
            }
          : s
      )
    );

    try {
      // Persist increment on the server
      await axios.post(`/api/scenarios/${scenarioId}/increment`);
    } catch (err) {
      console.error("Error persisting scenario usage increment:", err);
    }
  };

  useEffect(() => {
    fetchScenarios();
  }, []);

  return {
    scenarios,
    loading,
    error,
    getScenariosByDifficulty,
    incrementScenarioUsage,
    refreshScenarios: fetchScenarios,
  };
};
