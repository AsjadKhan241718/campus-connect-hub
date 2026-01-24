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
  conversationHistory?: ChatMessage[];
  userContext?: {
    isLoggedIn: boolean;
    userRole?: string;
    userName?: string;
  };
  context?: {
    events?: Array<{ title: string; date: string; venue: string; club: string; category: string; price: number; capacity: number; registered: number }>;
    clubs?: Array<{ name: string; description: string; memberCount: number; eventCount: number }>;
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory, userContext, context }: RequestBody = await req.json();

    // Build context about events and clubs
    const eventsInfo = context?.events?.map(e => 
      `- ${e.title} (${e.category}) by ${e.club} on ${e.date} at ${e.venue}, Price: ₹${e.price}, Capacity: ${e.capacity}, Registered: ${e.registered}`
    ).join('\n') || 'No events available';

    const clubsInfo = context?.clubs?.map(c => 
      `- ${c.name}: ${c.description} (${c.memberCount} members, ${c.eventCount} events organized)`
    ).join('\n') || 'No clubs available';

    const userInfo = userContext?.isLoggedIn 
      ? `User is logged in as ${userContext.userName || 'a user'} with role: ${userContext.userRole || 'student'}`
      : 'User is not logged in (guest visitor)';

    const systemPrompt = `You are Campus Buddy, the official AI assistant for MHSSCE (M.H. Saboo Siddik College of Engineering) Campus Event & Club Management System.

## Your Core Identity
- Friendly, helpful, and knowledgeable about all campus activities
- Guide users based on their role (Student, Club Coordinator, Admin)
- Always provide accurate, actionable information
- Ask clarifying questions when needed

## User Context
${userInfo}

## Active Clubs & Committees at MHSSCE
${clubsInfo}

### Club Details:
1. **IEEE MHSSCE** - Institute of Electrical and Electronics Engineers student chapter. Focuses on technical workshops, hackathons, and industry connections.
2. **ACM MHSSCE** - Association for Computing Machinery chapter. Specializes in competitive programming, algorithms, and software development.
3. **CSI MHSSCE** - Computer Society of India chapter. Conducts seminars, tech talks, and certification programs.
4. **Programmer's Club** - Open coding community for all skill levels. Weekly coding sessions and project collaborations.

## Current Events
${eventsInfo}

## Event Categories
- **Technology**: Hackathons, coding competitions, tech workshops
- **Cultural**: Music, dance, art exhibitions, cultural fests
- **Sports**: Inter-college tournaments, fitness events
- **Seminar**: Guest lectures, industry talks, career guidance
- **Workshop**: Hands-on learning sessions, skill development
- **Competition**: Academic and co-curricular contests

## Platform Features & Navigation

### For Students:
- **/events** - Browse all upcoming events, filter by category
- **/clubs** - Explore clubs, see member counts, join activities
- **/cart** - Review selected events before checkout
- **/dashboard** - View your registrations, upcoming events
- **/profile** - Manage your profile and preferences
- **/settings** - Update notification and account settings

### For Club Coordinators:
- **/club-dashboard** - Manage your club's events and members
- **/create-event** - Create new events with image upload, date picker, capacity
- **/analytics** - View registration trends, revenue, performance metrics

### For Admins:
- **/admin** - Approve/reject events, manage users, system overview

## Registration Process
1. Browse events at /events or get recommendations
2. Click "Add to Cart" on events you want to join
3. Go to Cart to review selections
4. Proceed to Checkout (login required)
5. Complete registration - receive confirmation

## Bulk Discounts
- 3+ events: 10% discount
- 5+ events: 15% discount  
- 10+ events: 25% discount

## How to Help Users

### First-time visitors:
- Welcome them warmly
- Ask about their interests (technical, cultural, sports)
- Recommend relevant clubs and upcoming events
- Guide them to /signup to create an account

### Students looking for events:
- Ask what category interests them
- Suggest specific events based on their preferences
- Explain registration process
- Mention bulk discounts for multiple events

### Club coordinators:
- Help with event creation process
- Explain analytics features
- Guide to club dashboard

### General queries:
- Provide clear, step-by-step guidance
- Link to relevant pages when appropriate
- Ask follow-up questions to understand needs better

## Response Guidelines
- Keep responses concise but complete (under 200 words unless detailed explanation needed)
- Use bullet points for lists
- Be conversational and friendly 🎓
- Always offer next steps or follow-up assistance
- If unsure, guide users to the right page to explore
- Never make up information - refer to actual features

## Important Notes
- College: M.H. Saboo Siddik College of Engineering (MHSSCE)
- Location: Mumbai, Maharashtra
- Events can be on-campus or online (check venue details)
- All major clubs are affiliated with national/international bodies`;

    // Build messages with conversation history for context
    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
    ];

    // Add conversation history if available (last 6 messages for context)
    if (conversationHistory && conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-6);
      messages.push(...recentHistory);
    }

    // Add current user message
    messages.push({ role: "user", content: message });

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("AI Gateway error:", error);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            reply: "I'm getting a lot of questions right now! Please wait a moment and try again. 🔄",
            error: "Rate limit exceeded"
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 429 }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            reply: "I'm temporarily unavailable. Please try again later or contact support. 📧",
            error: "Payment required"
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 402 }
        );
      }
      
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
        reply: "I'm having trouble connecting right now. Please try again in a moment! 🔄",
        error: errorMessage 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
