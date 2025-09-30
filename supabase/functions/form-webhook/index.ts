// supabase/functions/form-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  try {
    const data = await req.json();

    // 1. إنشاء السيناريو
    const { data: scenario, error: scenarioError } = await supabase
      .from("scenarios")
      .insert([
        {
          title: data.title,
          specialty: data.specialty,
          difficulty: data.difficulty,
          target_learners: data.learners,
          duration_minutes: data.duration,
          patient_name: data.patient,
        },
      ])
      .select()
      .single();

    if (scenarioError) throw scenarioError;

    // 2. إضافة المراحل
    if (data.phases && Array.isArray(data.phases)) {
      for (const p of data.phases) {
        await supabase.from("phases").insert([
          {
            scenario_id: scenario.id,
            nom_phase: p.name,
            description: p.description,
            fin_temps: p.fin_temps || false,
            fin_action: p.fin_action || false,
            prochaine_phase: p.next || null,
          },
        ]);
      }
    }

    // 3. إضافة الأهداف
    if (data.objectifs && Array.isArray(data.objectifs)) {
      for (const obj of data.objectifs) {
        await supabase.from("objectifs").insert([
          {
            scenario_id: scenario.id,
            description: obj.description,
            type: obj.type,
          },
        ]);
      }
    }

    return new Response(
      JSON.stringify({ success: true, scenario_id: scenario.id }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
});
