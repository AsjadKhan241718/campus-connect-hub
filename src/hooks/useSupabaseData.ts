import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Event, Club, Registration } from '@/types';

// Map DB row to our Event type
const mapEvent = (row: any, clubsById?: Record<string, any>): Event => {
  const club = row.clubs || clubsById?.[row.club_id];
  return {
    id: row.id,
    title: row.title,
    description: row.description || '',
    clubId: row.club_id,
    club: club
      ? {
          id: club.id,
          name: club.name,
          description: club.description || '',
          logo: club.logo_url,
          coordinatorId: club.coordinator_id || '',
          memberCount: club.member_count || 0,
          eventsCount: 0,
          createdAt: new Date(club.created_at || Date.now()),
        }
      : undefined,
    date: new Date(row.date),
    time: row.time,
    venue: row.venue,
    price: Number(row.price),
    capacity: row.capacity,
    registeredCount: row.registered_count || 0,
    status: row.status,
    category: row.category,
    poster: row.poster_url || undefined,
    createdAt: new Date(row.created_at),
  };
};

const mapClub = (row: any): Club => ({
  id: row.id,
  name: row.name,
  description: row.description || '',
  logo: row.logo_url,
  coordinatorId: row.coordinator_id || '',
  memberCount: row.member_count || 0,
  eventsCount: 0,
  createdAt: new Date(row.created_at),
});

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*, clubs(*)')
        .order('date', { ascending: true });
      if (error) throw error;
      return (data || []).map((r) => mapEvent(r));
    },
  });
};

export const useClubs = () => {
  return useQuery({
    queryKey: ['clubs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .order('name');
      if (error) throw error;
      return (data || []).map(mapClub);
    },
  });
};

export const useMyRegistrations = (userId?: string) => {
  return useQuery({
    queryKey: ['registrations', userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select('*, events(*, clubs(*))')
        .eq('user_id', userId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map((r: any) => ({
        id: r.id,
        eventId: r.event_id,
        event: r.events ? mapEvent(r.events) : undefined,
        studentId: r.user_id,
        quantity: r.quantity,
        basePrice: Number(r.base_price),
        discountApplied: Number(r.discount_applied || 0),
        finalTotal: Number(r.final_total),
        createdAt: new Date(r.created_at),
      })) as Registration[];
    },
  });
};

export const useMyClub = (coordinatorId?: string) => {
  return useQuery({
    queryKey: ['my-club', coordinatorId],
    enabled: !!coordinatorId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .eq('coordinator_id', coordinatorId!)
        .maybeSingle();
      if (error) throw error;
      return data ? mapClub(data) : null;
    },
  });
};

export const useAllRegistrations = () => {
  return useQuery({
    queryKey: ['all-registrations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select('id, event_id, user_id, final_total, created_at');
      if (error) throw error;
      return data || [];
    },
  });
};
