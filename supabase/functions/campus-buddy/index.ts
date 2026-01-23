/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  message: string;
  context?: {
    events?: Array<{ title: string; date: string; venue: string; club: string; category: string; price: number }>;
    clubs?: Array<{ name: string; description: string }>;
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context }: RequestBody = await req.json();

    // Build context about events and clubs
    const eventsInfo = context?.events?.map(e => 
      `- ${e.title} (${e.category}) by ${e.club} on ${e.date} at ${e.venue}, Price: ₹${e.price}`
    ).join('\n') || 'No events available';

    const clubsInfo = context?.clubs?.map(c => 
      `- ${c.name}: ${c.description}`
    ).join('\n') || 'No clubs available';

    const systemPrompt = `You are Campus Buddy, a helpful AI assistant for MHSSCE — Saboo Siddik College of Engineering's campus event management system.

Your role is to help students:
1. Find events based on their interests (technical, cultural, sports, seminars, workshops)
2. Learn about student clubs (IEEE MHSSCE, ACM MHSSCE, Programmer's Club, CSI MHSSCE)
3. Understand how to register for events
4. Get information about bulk discounts (10% for 3+ items, 15% for 5+, 25% for 10+)
5. Navigate the platform

Current Events:
${eventsInfo}

Available Clubs:
${clubsInfo}

Guidelines:
- Be friendly, helpful, and concise
- Recommend events based on student interests
- Explain registration process clearly
- Mention bulk discounts when relevant
- If you don't have specific information, guide users to explore the Events or Clubs pages
- Use emojis sparingly to be friendly 🎓
- Keep responses under 150 words unless detailed explanation is needed`;

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("AI Gateway error:", error);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again!";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in campus-buddy function:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        reply: "I'm having trouble right now. Please try again in a moment! 🔄",
        error: errorMessage 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
