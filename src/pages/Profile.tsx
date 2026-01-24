import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Settings,
  Ticket,
  ChevronRight,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

const Profile = () => {
  const { user, profile } = useAuth();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'club_coordinator':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'club_coordinator':
        return 'Club Coordinator';
      default:
        return 'Student';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-display font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl border border-border p-6 md:p-8 mb-6"
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  {profile?.avatarUrl ? (
                    <img src={profile.avatarUrl} alt={profile.fullName} className="w-24 h-24 rounded-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-primary" />
                  )}
                </div>
                <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground">
                      {profile?.fullName || 'User'}
                    </h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <Badge className={`mt-2 ${getRoleBadgeColor(profile?.role || 'student')}`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {getRoleLabel(profile?.role || 'student')}
                    </Badge>
                  </div>
                  <Link to="/settings">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            <Link to={profile?.role === 'admin' ? '/admin' : profile?.role === 'club_coordinator' ? '/club-dashboard' : '/dashboard'} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">My Dashboard</p>
                  <p className="text-sm text-muted-foreground">View your events and registrations</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
            <Link to="/cart" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Ticket className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">My Cart</p>
                  <p className="text-sm text-muted-foreground">View items in your cart</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
            <Link to="/settings" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Settings</p>
                  <p className="text-sm text-muted-foreground">Account preferences and security</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
