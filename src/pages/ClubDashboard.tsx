import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Clock, 
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Download,
  Settings,
  BarChart3,
  Eye,
  TrendingUp,
  Ticket,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatsGrid from '@/components/dashboard/StatsGrid';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { useAuth } from '@/contexts/AuthContext';
import { mockEvents, mockClubs } from '@/lib/mock-data';
import { format, subHours, subDays } from 'date-fns';
import { toast } from 'sonner';

const ClubDashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  // Mock: Get events for the coordinator's club
  const myClub = mockClubs[0]; // IEEE MHSSCE
  const myEvents = mockEvents.filter(e => e.clubId === myClub.id);
  const pendingEvents = myEvents.filter(e => e.status === 'pending');
  const approvedEvents = myEvents.filter(e => e.status === 'approved');
  const totalRegistrations = myEvents.reduce((acc, e) => acc + e.registeredCount, 0);
  const totalRevenue = myEvents.reduce((acc, e) => acc + (e.registeredCount * e.price), 0);

  const stats = [
    { 
      title: 'Total Events', 
      value: myEvents.length, 
      icon: Calendar, 
      color: 'primary' as const,
      trend: { value: 15, isPositive: true }
    },
    { 
      title: 'Pending Approval', 
      value: pendingEvents.length, 
      icon: AlertCircle, 
      color: 'warning' as const 
    },
    { 
      title: 'Total Registrations', 
      value: totalRegistrations, 
      icon: Ticket, 
      color: 'success' as const,
      trend: { value: 20, isPositive: true }
    },
    { 
      title: 'Club Members', 
      value: myClub.memberCount, 
      icon: Users, 
      color: 'accent' as const,
      trend: { value: 5, isPositive: true }
    },
  ];

  const activities = [
    {
      id: '1',
      type: 'registration' as const,
      title: 'New Registration',
      description: 'John Doe registered for TechFest 2024',
      timestamp: subHours(new Date(), 1),
    },
    {
      id: '2',
      type: 'pending' as const,
      title: 'Event Submitted',
      description: 'Hackathon 2024 awaiting approval',
      timestamp: subHours(new Date(), 3),
    },
    {
      id: '3',
      type: 'event' as const,
      title: 'Event Approved',
      description: 'AI Workshop is now live',
      timestamp: subDays(new Date(), 1),
    },
    {
      id: '4',
      type: 'member' as const,
      title: 'New Member',
      description: 'Sarah joined the club',
      timestamp: subDays(new Date(), 2),
    },
  ];

  const statusColors = {
    draft: 'bg-muted text-muted-foreground',
    pending: 'bg-warning/10 text-warning border border-warning/20',
    approved: 'bg-success/10 text-success border border-success/20',
    rejected: 'bg-destructive/10 text-destructive border border-destructive/20',
    completed: 'bg-secondary text-secondary-foreground',
  };

  const handleExport = () => {
    toast.success('Exporting participant data...');
    setTimeout(() => {
      toast.success('Export complete! Check your downloads folder.');
    }, 1500);
  };

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
              userName={profile?.fullName || 'Coordinator'}
              role="club_coordinator"
              subtitle={`Managing ${myClub.name} - ${myEvents.length} events, ${totalRegistrations} registrations`}
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

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">65% of semester target</p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">Registration Rate</p>
                  <p className="text-2xl font-bold text-foreground">78%</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Average across all events</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Events List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground">
                        My Events
                      </h2>
                      <p className="text-sm text-muted-foreground">{myEvents.length} total events</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                    <Link to="/create-event">
                      <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Event
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30">
                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Event</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Registrations</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myEvents.map((event, index) => (
                        <motion.tr 
                          key={event.id} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Calendar className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{event.title}</p>
                                <p className="text-sm text-muted-foreground">{event.venue.split(',')[0]}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {format(new Date(event.date), 'MMM d, yyyy')}
                              </p>
                              <p className="text-xs text-muted-foreground">{event.time}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={(event.registeredCount / event.capacity) * 100} 
                                  className="w-20 h-2"
                                />
                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                  {event.registeredCount}/{event.capacity}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                ₹{event.registeredCount * event.price} revenue
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={statusColors[event.status]}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <Link to={`/events/${event.id}`}>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                            </Link>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Club Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    {myClub.logo ? (
                      <img src={myClub.logo} alt={myClub.name} className="w-10 h-10" />
                    ) : (
                      <span className="text-2xl font-bold text-primary">{myClub.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{myClub.name}</h3>
                    <p className="text-sm text-muted-foreground">{myClub.memberCount} members</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Link to={`/clubs/${myClub.id}`} className="block">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Settings className="h-4 w-4" />
                      Club Settings
                    </Button>
                  </Link>
                  <Link to="/analytics" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <BarChart3 className="h-4 w-4" />
                      View Analytics
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ActivityFeed activities={activities} title="Recent Activity" />
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Event Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-sm text-muted-foreground">Approved</span>
                    </div>
                    <span className="font-semibold text-foreground">{approvedEvents.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-warning" />
                      <span className="text-sm text-muted-foreground">Pending</span>
                    </div>
                    <span className="font-semibold text-foreground">{pendingEvents.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                      <span className="text-sm text-muted-foreground">Rejected</span>
                    </div>
                    <span className="font-semibold text-foreground">0</span>
                  </div>
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

export default ClubDashboard;
