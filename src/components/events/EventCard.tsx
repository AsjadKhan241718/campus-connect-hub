import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, IndianRupee, ArrowUpRight } from 'lucide-react';
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
  const fillPercent = Math.round((event.registeredCount / event.capacity) * 100);

  const categoryColors: Record<string, string> = {
    Technology: 'bg-primary/10 text-primary border-primary/20',
    Cultural: 'bg-accent/10 text-accent border-accent/20',
    Sports: 'bg-success/10 text-success border-success/20',
    Business: 'bg-warning/10 text-warning border-warning/20',
    Workshop: 'bg-destructive/10 text-destructive border-destructive/20',
    Seminar: 'bg-primary/10 text-primary border-primary/20',
    Competition: 'bg-accent/10 text-accent border-accent/20',
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {event.poster ? (
          <img
            src={event.poster}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center">
            <span className="text-5xl font-display font-bold text-primary-foreground/20">
              {event.title.charAt(0)}
            </span>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${categoryColors[event.category] || 'bg-secondary'} backdrop-blur-sm text-xs font-semibold`}>
            {event.category}
          </Badge>
        </div>

        {/* Spots indicator */}
        {event.status === 'approved' && (
          <div className="absolute top-3 right-3">
            {isFull ? (
              <Badge className="bg-destructive text-destructive-foreground shadow-lg">Sold Out</Badge>
            ) : isAlmostFull ? (
              <Badge className="bg-warning text-warning-foreground shadow-lg animate-pulse">{spotsLeft} left!</Badge>
            ) : null}
          </div>
        )}

        {/* Hover quick view */}
        <Link
          to={`/events/${event.id}`}
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
        >
          <Button size="sm" className="rounded-full shadow-lg gap-1 text-xs">
            Quick View <ArrowUpRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Club */}
        {event.club && (
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center overflow-hidden ring-1 ring-border">
              {event.club.logo ? (
                <img src={event.club.logo} alt={event.club.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-[10px] font-bold text-muted-foreground">{event.club.name.charAt(0)}</span>
              )}
            </div>
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              {event.club.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-lg font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {event.title}
        </h3>

        {/* Details Row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {format(new Date(event.date), 'MMM d')}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate max-w-[100px]">{event.venue.split(',')[0]}</span>
          </span>
        </div>

        {/* Capacity bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {event.registeredCount}/{event.capacity}
            </span>
            <span className={`font-semibold ${fillPercent > 80 ? 'text-warning' : 'text-muted-foreground'}`}>
              {fillPercent}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${fillPercent}%` }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                fillPercent > 80 ? 'bg-warning' : 'bg-primary'
              }`}
            />
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-baseline gap-0.5">
            <span className="text-xs text-muted-foreground">₹</span>
            <span className="text-2xl font-display font-bold text-foreground">{event.price}</span>
          </div>
          <div className="flex gap-2">
            <Link to={`/events/${event.id}`}>
              <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">
                Details
              </Button>
            </Link>
            {!isFull && event.status === 'approved' && (
              <Button
                size="sm"
                className="rounded-lg text-xs h-8"
                onClick={() => onAddToCart?.(event)}
              >
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
