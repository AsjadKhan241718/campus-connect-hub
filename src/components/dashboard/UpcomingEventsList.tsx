import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ChevronRight, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { Event } from '@/types';

interface UpcomingEventsListProps {
  events: Event[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

const UpcomingEventsList = ({ 
  events, 
  title = "Upcoming Events", 
  showViewAll = true,
  viewAllLink = "/events"
}: UpcomingEventsListProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
        {showViewAll && (
          <Link to={viewAllLink}>
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
      
      <div className="space-y-3">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/events/${event.id}`}
              className="block p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {event.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {event.club?.name}
                    </span>
                  </div>
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(event.date), 'MMM d')}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.venue.split(',')[0]}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-foreground">₹{event.price}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Users className="h-3 w-3" />
                    {event.capacity - event.registeredCount} left
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
        
        {events.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Ticket className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No upcoming events</p>
            <Link to="/events">
              <Button variant="link" className="mt-2">Browse all events</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEventsList;
