import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: {
    fullName: string;
    medicalSchool: string;
    yearOfStudy: string;
    specialty: string;
  }) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: userData.fullName,
            medical_school: userData.medicalSchool,
            year_of_study: userData.yearOfStudy,
            specialty_interests: [userData.specialty]
          }
        }
      });

      if (error) throw error;

      // Create user profile after successful signup
      if (data.user) {
        await createUserProfile(data.user.id, userData);
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in with:', { email, passwordLength: password.length });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Sign in error details:', error);
        throw error;
      }
      
      console.log('Sign in successful:', data);
      return { data, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const createUserProfile = async (userId: string, userData: {
    fullName: string;
    medicalSchool: string;
    yearOfStudy: string;
    specialty: string;
  }) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          user_id: userId,
          full_name: userData.fullName,
          medical_school: userData.medicalSchool,
          year_of_study: userData.yearOfStudy,
          specialty_interests: [userData.specialty],
          learning_preferences: {}
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };
};