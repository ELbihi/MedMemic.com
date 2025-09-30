// // hooks/useScenarios.ts
// import { useState, useEffect } from "react";
// import axios from "axios";

// export const useScenarios = () => {
//   const [scenarios, setScenarios] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchScenarios = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("/api/scenarios");
//      setScenarios(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching scenarios:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getScenariosByDifficulty = (difficulty: string) =>
//     scenarios.filter((s) => s.difficulty?.toLowerCase() === difficulty.toLowerCase());

//   const incrementScenarioUsage = async (id: number) => {
//     await axios.post(`/api/scenarios/${id}/increment`);
//   };

//   useEffect(() => {
//     fetchScenarios();
//   }, []);

//   return { scenarios, loading, getScenariosByDifficulty, incrementScenarioUsage };
// };
// import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";

// export function useScenarios() {
//   const [scenarios, setScenarios] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   // const filteredScenarios = Array.isArray(scenarios) ? scenarios.filter(/* ... */) : [];

//   useEffect(() => {
//     const fetchScenarios = async () => {
//       setLoading(true);
//       // @ts-expect-error: "scenarios" table is not in the generated types
//       const { data, error } = await supabase.from<any>("scenarios").select("*");
//       if (error) {
//         console.error("Error fetching scenarios:", error);
//       } else {
//          const filteredScenarios = scenarios?.filter((s) => s.title && s.description);
//          setScenarios(filteredScenarios);
//       }
//       setLoading(false);
//     };
//     fetchScenarios();
//   }, []);

//   const getScenariosByDifficulty = (difficulty: string) => {
//     return scenarios.filter((s) => s.difficulty === difficulty);
//   };

//   const incrementScenarioUsage = async (id: number) => {
//     await axios.post(`/api/scenarios/${id}/increment`);
//   };

//   return { scenarios, getScenariosByDifficulty, incrementScenarioUsage, loading };
// }





// import { useState, useEffect } from "react";
// import axios from "axios";

// export const useScenarios = () => {
//   const [scenarios, setScenarios] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchScenarios = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("/api/scenarios");
//       setScenarios(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching scenarios:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ NEW: return ALL scenarios
//   const getAllScenarios = () => scenarios;

//   const getScenariosByDifficulty = (difficulty: string) =>
//     scenarios.filter(
//       (s) => s.difficulty?.toLowerCase() === difficulty.toLowerCase()
//     );

//   const incrementScenarioUsage = async (id: number) => {
//     await axios.post(`/api/scenarios/${id}/increment`);
//   };

//   useEffect(() => {
//     fetchScenarios();
//   }, []);

//   // ✅ Now returning getAllScenarios too
//   return { 
//     loading,
//     scenarios, 
//     getAllScenarios, 
//     getScenariosByDifficulty, 
//     incrementScenarioUsage 
//   };
// };




import { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export function  useScenarios(){
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
useEffect(() => {
const fetchScenarios = async () => {

  
 try {

  
    // const { data, error } = await supabase.from("scenarios").select("*");
type Scenario = Database["public"]["Tables"]["scenarios"]["Row"];
  const { data, error } = await supabase
  .from("scenarios")
  .select("*") as { data: Scenario[] | null, error: any };
  console.log(data, error);
  if (error) {
    console.error("Supabase error:", error);
    setError(error.message);
  } else {
    setScenarios(data || []);
  }
  } catch (err: any) {
        console.error("Unexpected error:", err);
        setError(err.message);
      } finally {
        setLoading(false);  // ✅ stop loading after fetch
      }
};
 
    fetchScenarios();
  }, []);

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
      const scenario = scenarios.find((s) => s.id === scenarioId);
      const newUsageCount = (scenario?.usage_count || 0) + 1;

      // Persister dans Supabase
      const { data, error } = await supabase
  .from("scenarios")
  .update({ usage_count: newUsageCount, last_used: new Date().toISOString() })
  .eq("id", Number(scenarioId));

      if (error) {
        console.error("Error persisting scenario usage increment:", error);
      } else {
        console.log("Scenario usage incremented successfully", data);
      }
    } catch (err) {
      console.error("Unexpected error incrementing scenario usage:", err);
    }
  };
 

  return { scenarios, loading, error,incrementScenarioUsage };
};
function setError(message: string) {
  throw new Error("Function not implemented.");
}

