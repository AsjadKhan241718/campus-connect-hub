-- Create clubs table
CREATE TABLE public.clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  coordinator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create event status enum
CREATE TYPE public.event_status AS ENUM ('draft', 'pending', 'approved', 'rejected', 'completed');

-- Create event categories
CREATE TYPE public.event_category AS ENUM ('Technology', 'Cultural', 'Sports', 'Business', 'Workshop', 'Seminar', 'Competition');

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  club_id UUID REFERENCES public.clubs(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  venue TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  capacity INTEGER NOT NULL DEFAULT 100,
  registered_count INTEGER DEFAULT 0,
  status event_status NOT NULL DEFAULT 'draft',
  category event_category NOT NULL DEFAULT 'Technology',
  poster_url TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create registrations table
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  base_price DECIMAL(10,2) NOT NULL,
  discount_applied DECIMAL(10,2) DEFAULT 0,
  final_total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  attended BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create discount rules table
CREATE TABLE public.discount_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  min_quantity INTEGER NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'flat')),
  value DECIMAL(10,2) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discount_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Clubs policies
CREATE POLICY "Anyone can view clubs" ON public.clubs FOR SELECT USING (true);
CREATE POLICY "Coordinators can update their club" ON public.clubs FOR UPDATE USING (auth.uid() = coordinator_id);
CREATE POLICY "Admins can manage all clubs" ON public.clubs FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Events policies
CREATE POLICY "Anyone can view approved events" ON public.events FOR SELECT USING (status = 'approved' OR created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Club coordinators can create events" ON public.events FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'club_coordinator') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Creators can update their events" ON public.events FOR UPDATE USING (created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete events" ON public.events FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Registrations policies
CREATE POLICY "Users can view their own registrations" ON public.registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coordinators can view event registrations" ON public.registrations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.events e JOIN public.clubs c ON e.club_id = c.id WHERE e.id = event_id AND c.coordinator_id = auth.uid())
);
CREATE POLICY "Admins can view all registrations" ON public.registrations FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users can register" ON public.registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can cancel their registration" ON public.registrations FOR DELETE USING (auth.uid() = user_id);

-- Discount rules policies
CREATE POLICY "Anyone can view active discount rules" ON public.discount_rules FOR SELECT USING (active = true);
CREATE POLICY "Admins can manage discount rules" ON public.discount_rules FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Notifications policies
CREATE POLICY "Users can view their notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_clubs_updated_at BEFORE UPDATE ON public.clubs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default clubs (IEEE, ACM, Programmer's Club, CSI)
INSERT INTO public.clubs (name, description, member_count) VALUES
  ('IEEE SSEC', 'Institute of Electrical and Electronics Engineers student chapter promoting technical excellence through workshops, hackathons, and industry connections.', 156),
  ('ACM SSEC', 'Association for Computing Machinery chapter fostering computing education and research through coding contests and tech talks.', 134),
  ('Programmer''s Club', 'A community of passionate coders organizing coding challenges, open source contributions, and peer learning sessions.', 189),
  ('CSI SSEC', 'Computer Society of India chapter bridging academia and industry through seminars, certifications, and networking events.', 145),
  ('Cultural Society', 'Celebrating diversity through music, dance, drama, and cultural festivals throughout the academic year.', 234),
  ('Sports Committee', 'Organizing inter-college tournaments and promoting fitness and sportsmanship among students.', 178);

-- Insert default discount rules
INSERT INTO public.discount_rules (min_quantity, discount_type, value) VALUES
  (3, 'percentage', 10),
  (5, 'percentage', 15),
  (10, 'percentage', 25);