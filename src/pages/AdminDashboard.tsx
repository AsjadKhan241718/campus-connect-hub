import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Building2, 
  Percent,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Settings,
  BarChart3,
  Shield,
  Clock,
  TrendingUp,
  Eye,
  UserCheck,
  Activity,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatsGrid from '@/components/dashboard/StatsGrid';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { useAuth } from '@/contexts/AuthContext';
import { mockEvents, mockClubs, mockDiscountRules } from '@/lib/mock-data';
import { format, subHours, subDays } from 'date-fns';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [pendingEvents, setPendingEvents] = useState(mockEvents.filter(e => e.status === 'pending'));
  
  const allEvents = mockEvents;
  const approvedEvents = allEvents.filter(e => e.status === 'approved');
  const totalRegistrations = allEvents.reduce((acc, e) => acc + e.registeredCount, 0);
  const totalRevenue = allEvents.reduce((acc, e) => acc + (e.registeredCount * e.price), 0);

  const stats = [
    { 
      title: 'Total Events', 
      value: allEvents.length, 
      icon: Calendar, 
      color: 'primary' as const,
      trend: { value: 12, isPositive: true }
    },
    { 
      title: 'Active Clubs', 
      value: mockClubs.length, 
      icon: Building2, 
      color: 'accent' as const,
      trend: { value: 2, isPositive: true }
    },
    { 
      title: 'Total Registrations', 
      value: totalRegistrations, 
      icon: Users, 
      color: 'success' as const,
      trend: { value: 25, isPositive: true }
    },
    { 
      title: 'Pending Approvals', 
      value: pendingEvents.length, 
      icon: AlertCircle, 
      color: 'warning' as const 
    },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'pending' as const,
      title: 'New Event Submission',
      description: 'TechFest 2024 awaiting approval',
      timestamp: subHours(new Date(), 1),
    },
    {
      id: '2',
      type: 'registration' as const,
      title: 'Event Approved',
      description: 'Hackathon 2024 is now live',
      timestamp: subHours(new Date(), 3),
    },
    {
      id: '3',
      type: 'member' as const,
      title: 'New Club Coordinator',
      description: 'John Doe joined as IEEE coordinator',
      timestamp: subDays(new Date(), 1),
    },
    {
      id: '4',
      type: 'alert' as const,
      title: 'Capacity Alert',
      description: 'AI Workshop at 90% capacity',
      timestamp: subDays(new Date(), 1),
    },
  ];

  const handleApprove = (eventId: string) => {
    setPendingEvents(prev => prev.filter(e => e.id !== eventId));
    toast.success('Event approved successfully! Students can now register.');
  };

  const handleReject = (eventId: string) => {
    setPendingEvents(prev => prev.filter(e => e.id !== eventId));
    toast.error('Event rejected. Coordinator will be notified.');
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
              userName={profile?.fullName || 'Admin'}
              role="admin"
              subtitle="Manage events, clubs, and monitor system performance from your central dashboard."
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

          {/* Quick Metrics Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
              <Progress value={75} className="mt-3 h-1" />
              <p className="text-xs text-muted-foreground mt-2">75% of monthly target</p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users Today</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Progress value={60} className="mt-3 h-1" />
              <p className="text-xs text-muted-foreground mt-2">+12% from yesterday</p>
            </div>
            
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">System Health</p>
                  <p className="text-2xl font-bold text-foreground">98.5%</p>
                </div>
                <div className="p-3 rounded-xl bg-accent/10">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
              </div>
              <Progress value={98} className="mt-3 h-1" />
              <p className="text-xs text-muted-foreground mt-2">All systems operational</p>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="approvals" className="space-y-6">
                <TabsList className="grid w-full max-w-lg grid-cols-3 bg-secondary/50">
                  <TabsTrigger value="approvals" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <AlertCircle className="h-4 w-4" />
                    Approvals
                    {pendingEvents.length > 0 && (
                      <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                        {pendingEvents.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="clubs" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Building2 className="h-4 w-4" />
                    Clubs
                  </TabsTrigger>
                  <TabsTrigger value="discounts" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Percent className="h-4 w-4" />
                    Discounts
                  </TabsTrigger>
                </TabsList>

                {/* Pending Approvals */}
                <TabsContent value="approvals">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-card rounded-xl border border-border overflow-hidden">
                      <div className="p-6 border-b border-border bg-gradient-to-r from-warning/5 to-transparent">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-warning/10">
                            <Clock className="h-5 w-5 text-warning" />
                          </div>
                          <div>
                            <h2 className="text-xl font-display font-semibold text-foreground">
                              Pending Approvals
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              {pendingEvents.length} event{pendingEvents.length !== 1 ? 's' : ''} awaiting your review
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <AnimatePresence mode="popLayout">
                          {pendingEvents.length > 0 ? (
                            <div className="space-y-4">
                              {pendingEvents.map((event, index) => (
                                <motion.div
                                  key={event.id}
                                  layout
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95, x: -100 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="p-5 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors"
                                >
                                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-warning/20 to-warning/10 flex items-center justify-center flex-shrink-0">
                                      <Clock className="h-8 w-8 text-warning" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-4 mb-2">
                                        <div>
                                          <h3 className="font-semibold text-foreground text-lg">{event.title}</h3>
                                          <p className="text-sm text-muted-foreground">
                                            by <span className="font-medium text-primary">{event.club?.name}</span>
                                          </p>
                                        </div>
                                        <Badge variant="secondary" className="flex-shrink-0">
                                          {event.category}
                                        </Badge>
                                      </div>
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                          <Calendar className="h-4 w-4" />
                                          {format(new Date(event.date), 'MMM d, yyyy')}
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                          <Clock className="h-4 w-4" />
                                          {event.time}
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                          <Users className="h-4 w-4" />
                                          {event.capacity} capacity
                                        </div>
                                        <div className="flex items-center gap-2 font-medium text-foreground">
                                          ₹{event.price}
                                        </div>
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                                        {event.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
                                    <Link to={`/events/${event.id}`}>
                                      <Button variant="ghost" size="sm" className="gap-2">
                                        <Eye className="h-4 w-4" />
                                        Preview
                                      </Button>
                                    </Link>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-destructive hover:text-destructive gap-2"
                                      onClick={() => handleReject(event.id)}
                                    >
                                      <XCircle className="h-4 w-4" />
                                      Reject
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-success hover:bg-success/90 gap-2"
                                      onClick={() => handleApprove(event.id)}
                                    >
                                      <CheckCircle2 className="h-4 w-4" />
                                      Approve
                                    </Button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-center py-16"
                            >
                              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                                <CheckCircle2 className="h-10 w-10 text-success" />
                              </div>
                              <h3 className="text-lg font-semibold text-foreground mb-2">All Caught Up!</h3>
                              <p className="text-muted-foreground">No pending approvals. Great job staying on top of things!</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Clubs Management */}
                <TabsContent value="clubs">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-card rounded-xl border border-border overflow-hidden">
                      <div className="p-6 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h2 className="text-xl font-display font-semibold text-foreground">
                              Manage Clubs
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              {mockClubs.length} active clubs
                            </p>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => toast.success('Feature coming soon!')}>
                          Add New Club
                        </Button>
                      </div>

                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mockClubs.map((club, index) => (
                            <motion.div
                              key={club.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                                  {club.logo ? (
                                    <img src={club.logo} alt={club.name} className="w-8 h-8" />
                                  ) : (
                                    <span className="text-xl font-bold text-primary">{club.name.charAt(0)}</span>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {club.name}
                                  </h3>
                                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Users className="h-3.5 w-3.5" />
                                      {club.memberCount}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3.5 w-3.5" />
                                      {club.eventsCount} events
                                    </span>
                                  </div>
                                </div>
                                <Link to={`/clubs/${club.id}`}>
                                  <Button variant="ghost" size="sm">
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </Link>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Discount Rules */}
                <TabsContent value="discounts">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-card rounded-xl border border-border overflow-hidden">
                      <div className="p-6 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-accent/10">
                            <Percent className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h2 className="text-xl font-display font-semibold text-foreground">
                              Discount Rules
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Configure bulk purchase discounts
                            </p>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => toast.success('Feature coming soon!')}>
                          Add Rule
                        </Button>
                      </div>

                      <div className="p-6 overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Min Quantity</th>
                              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Discount Type</th>
                              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Value</th>
                              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Status</th>
                              <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockDiscountRules.map((rule, index) => (
                              <motion.tr
                                key={rule.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="border-b border-border last:border-0 hover:bg-secondary/30"
                              >
                                <td className="py-4 px-4">
                                  <span className="font-medium text-foreground">{rule.minQuantity}+ items</span>
                                </td>
                                <td className="py-4 px-4 text-muted-foreground capitalize">{rule.discountType}</td>
                                <td className="py-4 px-4">
                                  <span className="font-semibold text-accent">
                                    {rule.discountType === 'percentage' ? `${rule.value}%` : `₹${rule.value}`}
                                  </span>
                                </td>
                                <td className="py-4 px-4">
                                  <Badge className={rule.active ? 'bg-success/10 text-success border-success/20' : 'bg-muted text-muted-foreground'}>
                                    {rule.active ? 'Active' : 'Inactive'}
                                  </Badge>
                                </td>
                                <td className="py-4 px-4 text-right">
                                  <Button variant="ghost" size="sm" onClick={() => toast.success('Edit feature coming soon!')}>
                                    Edit
                                  </Button>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Quick Actions & Activity */}
            <div className="space-y-6">
              {/* Admin Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">Admin Actions</h3>
                </div>
                <div className="space-y-2">
                  <Link to="/analytics" className="block">
                    <Button variant="outline" className="w-full justify-start gap-3 h-12">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <span>View Analytics</span>
                    </Button>
                  </Link>
                  <Link to="/settings" className="block">
                    <Button variant="outline" className="w-full justify-start gap-3 h-12">
                      <Settings className="h-5 w-5 text-accent" />
                      <span>System Settings</span>
                    </Button>
                  </Link>
                  <Link to="/clubs" className="block">
                    <Button variant="outline" className="w-full justify-start gap-3 h-12">
                      <Building2 className="h-5 w-5 text-success" />
                      <span>Manage All Clubs</span>
                    </Button>
                  </Link>
                  <Link to="/events" className="block">
                    <Button variant="outline" className="w-full justify-start gap-3 h-12">
                      <Calendar className="h-5 w-5 text-warning" />
                      <span>View All Events</span>
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ActivityFeed activities={recentActivities} title="System Activity" />
              </motion.div>

              {/* System Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-success" />
                  <h3 className="font-display font-semibold text-foreground">System Status</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Database</span>
                    <Badge className="bg-success/10 text-success">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Authentication</span>
                    <Badge className="bg-success/10 text-success">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Storage</span>
                    <Badge className="bg-success/10 text-success">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Edge Functions</span>
                    <Badge className="bg-success/10 text-success">Operational</Badge>
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

export default AdminDashboard;
