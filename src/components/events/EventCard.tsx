import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onAddToCart?: (event: Event) => void;
}

const EventCard = ({ event, onAddToCart }: EventCardProps) => {
  const spotsLeft = event.capacity - event.registeredCount;
  const isAlmostFull = spotsLeft < 20 && spotsLeft > 0;
  const isFull = spotsLeft === 0;

  const statusColors = {
    pending: 'status-pending',
    approved: 'status-approved',
    rejected: 'status-rejected',
    draft: 'bg-muted text-muted-foreground',
    completed: 'bg-secondary text-secondary-foreground',
  };

  const categoryColors: Record<string, string> = {
    Technology: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    Cultural: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    Sports: 'bg-green-500/10 text-green-600 border-green-500/20',
    Business: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    Workshop: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        {event.poster ? (
          <img 
            src={event.poster} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <span className="text-4xl font-display font-bold text-primary-foreground/20">
              {event.title.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={categoryColors[event.category] || 'bg-secondary'}>
            {event.category}
          </Badge>
        </div>

        {/* Spots Left */}
        {event.status === 'approved' && (
          <div className="absolute top-3 right-3">
            {isFull ? (
              <Badge className="bg-destructive text-destructive-foreground">Sold Out</Badge>
            ) : isAlmostFull ? (
              <Badge className="bg-warning text-warning-foreground">{spotsLeft} spots left</Badge>
            ) : null}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Club */}
        {event.club && (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
              {event.club.logo ? (
                <img src={event.club.logo} alt={event.club.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs font-medium">{event.club.name.charAt(0)}</span>
              )}
            </div>
            <span className="text-sm text-muted-foreground">{event.club.name}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        {/* Details */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{event.registeredCount}/{event.capacity}</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <IndianRupee className="h-4 w-4 text-primary" />
            <span className="text-xl font-bold text-foreground">{event.price}</span>
          </div>
          <div className="flex gap-2">
            <Link to={`/events/${event.id}`}>
              <Button variant="outline" size="sm">View</Button>
            </Link>
            {!isFull && event.status === 'approved' && (
              <Button size="sm" onClick={() => onAddToCart?.(event)}>
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
