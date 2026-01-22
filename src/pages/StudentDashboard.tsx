import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  Bell, 
  User,
  ChevronRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/dashboard/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockEvents } from '@/lib/mock-data';
import { format } from 'date-fns';

const StudentDashboard = () => {
  const { profile } = useAuth();
  
  // Mock registered events (in real app, fetch from database)
  const registeredEvents = mockEvents.slice(0, 3);
  const upcomingEvents = mockEvents.filter(e => e.status === 'approved').slice(0, 4);

  const stats = [
    { title: 'Registered Events', value: 3, icon: Ticket, color: 'primary' as const },
    { title: 'Upcoming Events', value: upcomingEvents.length, icon: Calendar, color: 'accent' as const },
    { title: 'Notifications', value: 2, icon: Bell, color: 'warning' as const },
    { title: 'Attended', value: 5, icon: CheckCircle2, color: 'success' as const },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-display font-bold text-foreground">
              Welcome back, {profile?.fullName || 'Student'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your events
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* My Registrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-semibold text-foreground">
                    My Registrations
                  </h2>
                  <Link to="/events">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {registeredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{event.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(event.date), 'MMM d')} • {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.venue.split(',')[0]}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">
                        Confirmed
                      </Badge>
                    </div>
                  ))}

                  {registeredEvents.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Ticket className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No registrations yet</p>
                      <Link to="/events">
                        <Button variant="link" className="mt-2">Browse Events</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Quick Actions & Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Quick Actions */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-display font-semibold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  <Link to="/events">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Calendar className="h-4 w-4" />
                      Browse Events
                    </Button>
                  </Link>
                  <Link to="/clubs">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <User className="h-4 w-4" />
                      Explore Clubs
                    </Button>
                  </Link>
                  <Link to="/cart">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Ticket className="h-4 w-4" />
                      View Cart
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-display font-semibold text-foreground mb-4">
                  Notifications
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Registration Confirmed</p>
                      <p className="text-xs text-muted-foreground">TechFest 2024 - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <Bell className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">New Event Available</p>
                      <p className="text-xs text-muted-foreground">Hackathon 2024 - 1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold text-foreground">
                  Upcoming Events
                </h2>
                <Link to="/events">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {upcomingEvents.map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`}>
                    <div className="p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all">
                      <div className="text-xs text-primary font-medium mb-2">{event.club?.name}</div>
                      <h3 className="font-medium text-foreground line-clamp-1">{event.title}</h3>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(event.date), 'MMM d, yyyy')}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">₹{event.price}</span>
                        <Badge variant="secondary" className="text-xs">
                          {event.capacity - event.registeredCount} left
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
