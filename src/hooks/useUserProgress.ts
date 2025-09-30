// import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';
// import { useAuth } from './useAuth';

// interface UserProgress {
//   id: string;
//   user_id: string;
//   specialty: string;
//   total_sessions: number;
//   completed_sessions: number;
//   avg_accuracy: number;
//   avg_time_to_diagnosis: number;
//   best_accuracy: number;
//   fastest_diagnosis: number | null;
//   current_streak: number;
//   longest_streak: number;
//   strengths: string[];
//   improvement_areas: string[];
//   last_session_date: string | null;
//   created_at: string;
//   updated_at: string;
// }

// interface ScenarioSession {
//   scenario: any;
//   id: string;
//   user_id: string;
//   cached_scenario_id: string | null;
//   scenario_data: any;
//   start_time: string;
//   end_time: string | null;
//   final_diagnosis: string | null;
//   correct_diagnosis: string | null;
//   accuracy_score: number | null;
//   time_to_diagnosis: number | null;
//   session_completed: boolean;
//   decisions_made: any;
//   feedback_received: any;
//   created_at: string;
// }

// export const useUserProgress = () => {
//   const { user } = useAuth();
//   const [progress, setProgress] = useState<UserProgress | null>(null);
//   const [recentSessions, setRecentSessions] = useState<ScenarioSession[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       fetchUserProgress();
//       fetchRecentSessions();
//     } else {
//       setProgress(null);
//       setRecentSessions([]);
//       setLoading(false);
//     }
//   }, [user]);

//   const fetchUserProgress = async () => {
//     if (!user) return;

//     try {
//       const { data, error } = await supabase
//         .from('user_progress')
//         .select('*')
//         .eq('user_id', user.id)
//         .eq('specialty', 'pediatrics')
//         .single();

//       if (error && error.code !== 'PGRST116') {
//         throw error;
//       }

//       setProgress(data);
//     } catch (error) {
//       console.error('Error fetching user progress:', error);
//       setProgress(null);
//     }
//   };

//   const fetchRecentSessions = async () => {
//     if (!user) return;

//     try {
//       const { data, error } = await supabase
//         .from('scenario_sessions')
//         .select('*')
//         .eq('user_id', user.id)
//         .eq('session_completed', true)
//         .order('end_time', { ascending: false })
//         .limit(5);

//       if (error) throw error;

//       setRecentSessions(
//         (data || []).map((session: any) => ({
//           scenario: session.scenario ?? null, // or provide a sensible default
//           ...session
//         }))
//       );
//     } catch (error) {
//       console.error('Error fetching recent sessions:', error);
//       setRecentSessions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createSession = async (scenarioId: string | null, scenarioData: any) => {
//     if (!user) return null;

//     try {
//       const { data, error } = await supabase
//         .from('scenario_sessions')
//         .insert({
//           user_id: user.id,
//           cached_scenario_id: scenarioId,
//           scenario_data: scenarioData,
//           start_time: new Date().toISOString(),
//           decisions_made: [],
//           session_completed: false
//         })
//         .select()
//         .single();

//       if (error) throw error;
//       return data;
//     } catch (error) {
//       console.error('Error creating session:', error);
//       return null;
//     }
//   };

//   const updateSession = async (sessionId: string, updates: Partial<ScenarioSession>) => {
//     try {
//       const { data, error } = await supabase
//         .from('scenario_sessions')
//         .update(updates)
//         .eq('id', sessionId)
//         .select()
//         .single();

//       if (error) throw error;
      
//       // Refresh data after session completion
//       if (updates.session_completed) {
//         setTimeout(() => {
//           fetchUserProgress();
//           fetchRecentSessions();
//         }, 1000); // Small delay to allow triggers to run
//       }
      
//       return data;
//     } catch (error) {
//       console.error('Error updating session:', error);
//       return null;
//     }
//   };

//   const addDecisionToSession = async (sessionId: string, decision: any) => {
//     try {
//       // First fetch current decisions
//       const { data: session, error: fetchError } = await supabase
//         .from('scenario_sessions')
//         .select('decisions_made')
//         .eq('id', sessionId)
//         .single();

//       if (fetchError) throw fetchError;

//       const currentDecisions = Array.isArray(session.decisions_made) ? session.decisions_made : [];
//       const updatedDecisions = [...currentDecisions, decision];

//       const { error } = await supabase
//         .from('scenario_sessions')
//         .update({ decisions_made: updatedDecisions })
//         .eq('id', sessionId);

//       if (error) throw error;
//     } catch (error) {
//       console.error('Error adding decision to session:', error);
//     }
//   };

//   return {
//     progress,
//     recentSessions,
//     loading,
//     createSession,
//     updateSession,
//     addDecisionToSession,
//     refreshProgress: fetchUserProgress,
//     refreshSessions: fetchRecentSessions
//   };
// };

// import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';
// import { useAuth } from './useAuth';

// interface UserProgress {
//   id: string;
//   user_id: string;
//   specialty: string;
//   total_sessions: number;
//   completed_sessions: number;
//   avg_accuracy: number;
//   avg_time_to_diagnosis: number;
//   best_accuracy: number;
//   fastest_diagnosis: number | null;
//   current_streak: number;
//   longest_streak: number;
//   strengths: string[];
//   improvement_areas: string[];
//   last_session_date: string | null;
//   created_at: string;
//   updated_at: string;
// }

// interface ScenarioSession {
//   scenario: any;
//   id: string;
//   user_id: string;
//   cached_scenario_id: string | null;
//   scenario_data: any;
//   start_time: string;
//   end_time: string | null;
//   final_diagnosis: string | null;
//   correct_diagnosis: string | null;
//   accuracy_score: number | null;
//   time_to_diagnosis: number | null;
//   session_completed: boolean;
//   decisions_made: any;
//   feedback_received: any;
//   created_at: string;
// }

// export const useUserProgress = (specialty?: string) => {
//   const { user } = useAuth();
//   const [progress, setProgress] = useState<UserProgress | null>(null);
//   const [recentSessions, setRecentSessions] = useState<ScenarioSession[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       fetchUserProgress();
//       fetchRecentSessions();
//     } else {
//       setProgress(null);
//       setRecentSessions([]);
//       setLoading(false);
//     }
//   }, [user, specialty]);

//   const fetchUserProgress = async () => {
//   if (!user) return;

//   try {
//     let query = supabase
//       .from('user_progress')
//       .select('*')
//       .eq('user_id', user.id);

//     if (specialty) query = query.filter('specialty', 'eq', specialty);

//     // Use maybeSingle() instead of single() to avoid 406 if no row
//     const { data, error } = await query.maybeSingle();

//     if (error) throw error;

//     setProgress(data);
//   } catch (error) {
//     console.error('Error fetching user progress:', error);
//     setProgress(null);
//   }
// };

//   const fetchRecentSessions = async () => {
//     if (!user) return;

//    let query = supabase
//   .from('scenario_sessions')
//   .select('*')
//   .eq('user_id', user.id)
//   .eq('session_completed', true)
//   .order('end_time', { ascending: false })
//   .limit(5);

// // Apply specialty filter conditionally, without reassigning
// if (specialty) query = query.filter('specialty', 'eq', specialty);

// const { data, error } = await query;
// if (error) throw error;

// setRecentSessions(
//   (data || []).map((session: any) => ({
//     scenario: session.scenario ?? null,
//     ...session
//   }))
// );

//   };

//   const createSession = async (scenarioId: string | null, scenarioData: any) => {
//     if (!user) return null;

//     try {
//       const { data, error } = await supabase
//         .from('scenario_sessions')
//         .insert({
//           user_id: user.id,
//           cached_scenario_id: scenarioId,
//           scenario_data: scenarioData,
//           start_time: new Date().toISOString(),
//           decisions_made: [],
//           session_completed: false
//         })
//         .select()
//         .single();

//       if (error) throw error;
//       return data;
//     } catch (error) {
//       console.error('Error creating session:', error);
//       return null;
//     }
//   };

//   const updateSession = async (sessionId: string, updates: Partial<ScenarioSession>) => {
//     try {
//       const { data, error } = await supabase
//         .from('scenario_sessions')
//         .update(updates)
//         .eq('id', sessionId)
//         .select()
//         .single();

//       if (error) throw error;

//       if (updates.session_completed) {
//         setTimeout(() => {
//           fetchUserProgress();
//           fetchRecentSessions();
//         }, 1000);
//       }

//       return data;
//     } catch (error) {
//       console.error('Error updating session:', error);
//       return null;
//     }
//   };

//   const addDecisionToSession = async (sessionId: string, decision: any) => {
//     try {
//       const { data: session, error: fetchError } = await supabase
//         .from('scenario_sessions')
//         .select('decisions_made')
//         .eq('id', sessionId)
//         .single();

//       if (fetchError) throw fetchError;

//       const currentDecisions = Array.isArray(session.decisions_made) ? session.decisions_made : [];
//       const updatedDecisions = [...currentDecisions, decision];

//       const { error } = await supabase
//         .from('scenario_sessions')
//         .update({ decisions_made: updatedDecisions })
//         .eq('id', sessionId);

//       if (error) throw error;
//     } catch (error) {
//       console.error('Error adding decision to session:', error);
//     }
//   };

//   return {
//     progress,
//     recentSessions,
//     loading,
//     createSession,
//     updateSession,
//     addDecisionToSession,
//     refreshProgress: fetchUserProgress,
//     refreshSessions: fetchRecentSessions
//   };
// };

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface UserProgress {
  id: string;
  user_id: string;
  specialty: string;
  total_sessions: number;
  completed_sessions: number;
  avg_accuracy: number;
  avg_time_to_diagnosis: number;
  best_accuracy: number;
  fastest_diagnosis: number | null;
  current_streak: number;
  longest_streak: number;
  strengths: string[];
  improvement_areas: string[];
  last_session_date: string | null;
  created_at: string;
  updated_at: string;
}

interface ScenarioSession {
  scenario_reference_id: string;
  score: number;
  decisions: any;
  payload: any;
  duration_seconds: number;
  patient: any;
  scenario: any;
  id: string;
  user_id: string;
  cached_scenario_id: string | null;
  scenario_data: any;
  start_time: string;
  end_time: string | null;
  final_diagnosis: string | null;
  correct_diagnosis: string | null;
  accuracy_score: number | null;
  time_to_diagnosis: number | null;
  session_completed: boolean;
  decisions_made: any[];
  feedback_received: any;
  created_at: string;
}

export const useUserProgress = (specialty?: string) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [recentSessions, setRecentSessions] = useState<ScenarioSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
      fetchRecentSessions();
    } else {
      setProgress(null);
      setRecentSessions([]);
      setLoading(false);
    }
  }, [user, specialty]);

  // Fetch user progress
  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (specialty) query = query.eq('specialty', specialty);

      // maybeSingle() avoids 406 when no row exists
      const { data, error } = await query.maybeSingle();

      if (error) throw error;

      // Ensure specialty exists
      setProgress({
        ...data,
        specialty: data?.specialty || specialty || 'unknown'
      } as UserProgress);
    } catch (error) {
      console.error('Error fetching user progress:', error);
      setProgress(null);
    }
  };

  // Fetch recent sessions
 const fetchRecentSessions = async () => {
  if (!user) return;

  try {
    // Start with base query
    let query: any = supabase
      .from('scenario_sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('session_completed', true)
      .order('end_time', { ascending: false })
      .limit(5);

    // Apply specialty filter if provided
    if (specialty) {
      query = query.eq('specialty', specialty);
    }

    const { data, error } = await query;
    if (error) throw error;

    setRecentSessions(
      (data || []).map((session: any) => ({
        scenario: session.scenario ?? null,
        ...session
      }))
    );
  } catch (error) {
    console.error('Error fetching recent sessions:', error);
    setRecentSessions([]);
  } finally {
    setLoading(false);
  }
};



  // Session helpers
  const createSession = async (scenarioId: string | null, scenarioData: any) => {
    if (!user) return null;
    try {
      const { data, error } = await supabase
        .from('scenario_sessions')
        .insert({
          user_id: user.id,
          cached_scenario_id: scenarioId,
          scenario_data: scenarioData,
          start_time: new Date().toISOString(),
          decisions_made: [],
          session_completed: false
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  };

  const updateSession = async (sessionId: string, updates: Partial<ScenarioSession>) => {
    try {
      const { data, error } = await supabase
        .from('scenario_sessions')
        .update(updates)
        .eq('id', sessionId)
        .select()
        .single();
      if (error) throw error;

      if (updates.session_completed) {
        setTimeout(() => {
          fetchUserProgress();
          fetchRecentSessions();
        }, 1000);
      }

      return data;
    } catch (error) {
      console.error('Error updating session:', error);
      return null;
    }
  };

  const addDecisionToSession = async (sessionId: string, decision: any) => {
    try {
      const { data: session, error: fetchError } = await supabase
        .from('scenario_sessions')
        .select('decisions_made')
        .eq('id', sessionId)
        .single();
      if (fetchError) throw fetchError;

      const currentDecisions = Array.isArray(session.decisions_made) ? session.decisions_made : [];
      const updatedDecisions = [...currentDecisions, decision];

      const { error } = await supabase
        .from('scenario_sessions')
        .update({ decisions_made: updatedDecisions })
        .eq('id', sessionId);

      if (error) throw error;
    } catch (error) {
      console.error('Error adding decision to session:', error);
    }
  };

  return {
    progress,
    recentSessions,
    loading,
    createSession,
    updateSession,
    addDecisionToSession,
    refreshProgress: fetchUserProgress,
    refreshSessions: fetchRecentSessions
  };
};
