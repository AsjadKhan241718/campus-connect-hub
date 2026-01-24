import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/dashboard/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockEvents, mockClubs, mockDiscountRules } from '@/lib/mock-data';
import { format } from 'date-fns';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [pendingEvents, setPendingEvents] = useState(mockEvents.filter(e => e.status === 'pending'));
  
  const allEvents = mockEvents;
  const approvedEvents = allEvents.filter(e => e.status === 'approved');
  const totalRegistrations = allEvents.reduce((acc, e) => acc + e.registeredCount, 0);

  const stats = [
    { title: 'Total Events', value: allEvents.length, icon: Calendar, color: 'primary' as const },
    { title: 'Active Clubs', value: mockClubs.length, icon: Building2, color: 'accent' as const },
    { title: 'Total Registrations', value: totalRegistrations, icon: Users, color: 'success' as const },
    { title: 'Pending Approvals', value: pendingEvents.length, icon: AlertCircle, color: 'warning' as const },
  ];

  const handleApprove = (eventId: string) => {
    setPendingEvents(prev => prev.filter(e => e.id !== eventId));
    toast.success('Event approved successfully');
  };

  const handleReject = (eventId: string) => {
    setPendingEvents(prev => prev.filter(e => e.id !== eventId));
    toast.success('Event rejected');
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
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Admin Panel</span>
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                System Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage events, clubs, and system settings
              </p>
            </div>
            <Link to="/settings">
              <Button variant="outline" className="gap-2 w-fit">
                <Settings className="h-4 w-4" />
                System Settings
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

          {/* Tabs */}
          <Tabs defaultValue="approvals" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="approvals" className="gap-2">
                <AlertCircle className="h-4 w-4" />
                Approvals
              </TabsTrigger>
              <TabsTrigger value="clubs" className="gap-2">
                <Building2 className="h-4 w-4" />
                Clubs
              </TabsTrigger>
              <TabsTrigger value="discounts" className="gap-2">
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
                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                    Pending Event Approvals ({pendingEvents.length})
                  </h2>

                  {pendingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {pendingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-start gap-4 p-4 rounded-lg border border-border bg-secondary/30"
                        >
                          <div className="w-16 h-16 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                            <Clock className="h-8 w-8 text-warning" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-medium text-foreground">{event.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Organized by <span className="font-medium">{event.club?.name}</span>
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                  <span>{format(new Date(event.date), 'MMM d, yyyy')} • {event.time}</span>
                                  <span>₹{event.price}</span>
                                  <span>Capacity: {event.capacity}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                  {event.description}
                                </p>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:text-destructive gap-1"
                                  onClick={() => handleReject(event.id)}
                                >
                                  <XCircle className="h-4 w-4" />
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-success hover:bg-success/90 gap-1"
                                  onClick={() => handleApprove(event.id)}
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                  Approve
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-success" />
                      <p>All caught up! No pending approvals.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </TabsContent>

            {/* Clubs Management */}
            <TabsContent value="clubs">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-display font-semibold text-foreground">
                      Manage Clubs ({mockClubs.length})
                    </h2>
                    <Button size="sm" onClick={() => toast.success('Feature coming soon!')}>Add New Club</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockClubs.map((club) => (
                      <div
                        key={club.id}
                        className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            {club.logo ? (
                              <img src={club.logo} alt={club.name} className="w-8 h-8" />
                            ) : (
                              <span className="font-bold text-primary">{club.name.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{club.name}</h3>
                            <p className="text-xs text-muted-foreground">{club.memberCount} members</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{club.eventsCount} events</span>
                          <Link to={`/clubs/${club.id}`}>
                            <Button variant="ghost" size="sm">
                              Manage <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
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
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground">
                        Discount Rules
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Configure bulk purchase discounts
                      </p>
                    </div>
                    <Button size="sm" onClick={() => toast.success('Feature coming soon!')}>Add Rule</Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Min Quantity</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Discount Type</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Value</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockDiscountRules.map((rule) => (
                          <tr key={rule.id} className="border-b border-border last:border-0">
                            <td className="py-4 px-4 font-medium text-foreground">{rule.minQuantity}+ items</td>
                            <td className="py-4 px-4 text-muted-foreground capitalize">{rule.discountType}</td>
                            <td className="py-4 px-4 text-foreground">
                              {rule.discountType === 'percentage' ? `${rule.value}%` : `₹${rule.value}`}
                            </td>
                            <td className="py-4 px-4">
                              <Badge className={rule.active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}>
                                {rule.active ? 'Active' : 'Inactive'}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <Button variant="ghost" size="sm" onClick={() => toast.success('Edit feature coming soon!')}>Edit</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
