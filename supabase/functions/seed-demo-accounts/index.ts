import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const accounts = [
      { email: "student@mhssce.edu", password: "student123", name: "Rahul Sharma", role: "student" },
      { email: "admin@mhssce.edu", password: "admin123", name: "Dr. Priya Mehta", role: "admin" },
      { email: "coordinator@mhssce.edu", password: "coordinator123", name: "Amit Patel", role: "club_coordinator" },
    ];

    const results = [];

    for (const account of accounts) {
      // Check if user already exists
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const exists = existingUsers?.users?.find((u: any) => u.email === account.email);
      
      if (exists) {
        results.push({ email: account.email, status: "already exists" });
        continue;
      }

      const { data, error } = await supabase.auth.admin.createUser({
        email: account.email,
        password: account.password,
        email_confirm: true,
        user_metadata: {
          full_name: account.name,
          role: account.role,
        },
      });

      if (error) {
        results.push({ email: account.email, status: "error", message: error.message });
      } else {
        results.push({ email: account.email, status: "created", userId: data.user?.id });
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
