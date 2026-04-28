import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Ticket, 
  Bell, 
  Users,
  CheckCircle2,
  ShoppingCart,
  Settings,
  User,
  Sparkles,
  Trophy,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatsGrid from '@/components/dashboard/StatsGrid';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import UpcomingEventsList from '@/components/dashboard/UpcomingEventsList';
import { useAuth } from '@/contexts/AuthContext';
import { useEvents, useClubs, useMyRegistrations } from '@/hooks/useSupabaseData';
import { format, subHours, subDays } from 'date-fns';

const StudentDashboard = () => {
  const { profile, user } = useAuth();
  const { data: events = [] } = useEvents();
  const { data: clubs = [] } = useClubs();
  const { data: registrations = [] } = useMyRegistrations(user?.id);

  const registeredEvents = registrations
    .map((r) => r.event)
    .filter((e): e is NonNullable<typeof e> => !!e)
    .slice(0, 3);
  const upcomingEvents = events.filter((e) => e.status === 'approved').slice(0, 4);

  const stats = [
    { 
      title: 'Registered Events', 
      value: 3, 
      icon: Ticket, 
      color: 'primary' as const,
      trend: { value: 20, isPositive: true }
    },
    { 
      title: 'Upcoming Events', 
      value: upcomingEvents.length, 
      icon: Calendar, 
      color: 'accent' as const,
      trend: { value: 5, isPositive: true }
    },
    { 
      title: 'Clubs Joined', 
      value: 2, 
      icon: Users, 
      color: 'success' as const 
    },
    { 
      title: 'Events Attended', 
      value: 5, 
      icon: CheckCircle2, 
      color: 'warning' as const,
      trend: { value: 15, isPositive: true }
    },
  ];

  const activities = [
    {
      id: '1',
      type: 'registration' as const,
      title: 'Registration Confirmed',
      description: 'TechFest 2024 - IEEE MHSSCE',
      timestamp: subHours(new Date(), 2),
    },
    {
      id: '2',
      type: 'event' as const,
      title: 'New Event Available',
      description: 'Hackathon 2024 is now open for registration',
      timestamp: subHours(new Date(), 5),
    },
    {
      id: '3',
      type: 'achievement' as const,
      title: 'Achievement Unlocked',
      description: 'Attended 5 events this semester!',
      timestamp: subDays(new Date(), 1),
    },
    {
      id: '4',
      type: 'notification' as const,
      title: 'Event Reminder',
      description: 'Workshop starts tomorrow at 10 AM',
      timestamp: subDays(new Date(), 2),
    },
  ];

  const quickActions = [
    {
      icon: Calendar,
      label: 'Browse Events',
      description: 'Discover upcoming campus events',
      link: '/events',
      color: 'primary' as const,
    },
    {
      icon: Users,
      label: 'Explore Clubs',
      description: 'Join clubs matching your interests',
      link: '/clubs',
      color: 'accent' as const,
    },
    {
      icon: ShoppingCart,
      label: 'View Cart',
      description: 'Review your selected events',
      link: '/cart',
      color: 'success' as const,
    },
    {
      icon: Settings,
      label: 'Settings',
      description: 'Manage your preferences',
      link: '/settings',
      color: 'warning' as const,
    },
  ];

  const favoriteClubs = mockClubs.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <WelcomeCard 
              userName={profile?.fullName || 'Student'}
              role="student"
              subtitle="Here's what's happening with your campus activities today."
            />
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <StatsGrid stats={stats} />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Registrations & Events */}
            <div className="lg:col-span-2 space-y-6">
              {/* My Registrations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-display font-semibold text-foreground">
                      My Registrations
                    </h2>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {registeredEvents.length} Active
                  </Badge>
                </div>

                <div className="space-y-3">
                  {registeredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Link
                        to={`/events/${event.id}`}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-secondary/50 to-secondary/30 hover:from-primary/10 hover:to-accent/10 transition-all group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Calendar className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
                            <span>•</span>
                            <span>{event.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {event.venue.split(',')[0]}
                          </p>
                        </div>
                        <Badge className="bg-success/10 text-success border-success/20 flex-shrink-0">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Confirmed
                        </Badge>
                      </Link>
                    </motion.div>
                  ))}

                  {registeredEvents.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Ticket className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <p className="text-lg font-medium mb-2">No registrations yet</p>
                      <p className="text-sm mb-4">Start exploring events and register for the ones you like!</p>
                      <Link to="/events">
                        <Button className="gap-2">
                          <Sparkles className="h-4 w-4" />
                          Browse Events
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <UpcomingEventsList events={upcomingEvents} title="Recommended Events" />
              </motion.div>
            </div>

            {/* Right Column - Quick Actions & Activity */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <QuickActionCard actions={quickActions} />
              </motion.div>

              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ActivityFeed activities={activities} />
              </motion.div>

              {/* Favorite Clubs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-5 w-5 text-accent" />
                  <h3 className="font-display font-semibold text-foreground">Your Clubs</h3>
                </div>
                <div className="space-y-3">
                  {favoriteClubs.map((club) => (
                    <Link
                      key={club.id}
                      to={`/clubs/${club.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        {club.logo ? (
                          <img src={club.logo} alt={club.name} className="w-6 h-6" />
                        ) : (
                          <span className="font-bold text-primary">{club.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{club.name}</p>
                        <p className="text-xs text-muted-foreground">{club.memberCount} members</p>
                      </div>
                    </Link>
                  ))}
                  <Link to="/clubs" className="block">
                    <Button variant="ghost" size="sm" className="w-full text-primary">
                      Explore More Clubs
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
