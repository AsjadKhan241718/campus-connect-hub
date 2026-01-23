import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/dashboard/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockEvents, mockClubs } from '@/lib/mock-data';
import { format } from 'date-fns';

const ClubDashboard = () => {
  const { profile } = useAuth();
  
  // Mock: Get events for the coordinator's club
  const myClub = mockClubs[0]; // IEEE SSEC
  const myEvents = mockEvents.filter(e => e.clubId === myClub.id);
  const pendingEvents = myEvents.filter(e => e.status === 'pending');
  const approvedEvents = myEvents.filter(e => e.status === 'approved');
  const totalRegistrations = myEvents.reduce((acc, e) => acc + e.registeredCount, 0);

  const stats = [
    { title: 'Total Events', value: myEvents.length, icon: Calendar, color: 'primary' as const },
    { title: 'Pending Approval', value: pendingEvents.length, icon: AlertCircle, color: 'warning' as const },
    { title: 'Total Registrations', value: totalRegistrations, icon: Users, color: 'success' as const },
    { title: 'Club Members', value: myClub.memberCount, icon: Users, color: 'accent' as const },
  ];

  const statusColors = {
    draft: 'bg-muted text-muted-foreground',
    pending: 'bg-warning/10 text-warning border-warning/20',
    approved: 'bg-success/10 text-success border-success/20',
    rejected: 'bg-destructive/10 text-destructive border-destructive/20',
    completed: 'bg-secondary text-secondary-foreground',
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                {myClub.name} Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your club events and participants
              </p>
            </div>
            <Link to="/create-event">
              <Button className="gap-2 w-fit">
                <Plus className="h-4 w-4" />
                Create New Event
              </Button>
            </Link>
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
            {/* Events List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-semibold text-foreground">
                    My Events
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Event</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Registrations</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myEvents.map((event) => (
                        <tr key={event.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                          <td className="py-4 px-4">
                            <div className="font-medium text-foreground">{event.title}</div>
                            <div className="text-sm text-muted-foreground">{event.venue.split(',')[0]}</div>
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">
                            {format(new Date(event.date), 'MMM d, yyyy')}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {event.registeredCount}/{event.capacity}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={statusColors[event.status]}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Link to={`/events/${event.id}`}>
                              <Button variant="ghost" size="sm">
                                View <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Club Info */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
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
                <Link to={`/clubs/${myClub.id}`}>
                  <Button variant="outline" className="w-full gap-2">
                    <Settings className="h-4 w-4" />
                    Club Settings
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Event Status Overview
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">Approved</span>
                    </div>
                    <span className="font-medium text-foreground">{approvedEvents.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      <span className="text-sm text-muted-foreground">Pending</span>
                    </div>
                    <span className="font-medium text-foreground">{pendingEvents.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-destructive" />
                      <span className="text-sm text-muted-foreground">Rejected</span>
                    </div>
                    <span className="font-medium text-foreground">0</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Export Participants
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <BarChart3 className="h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClubDashboard;
