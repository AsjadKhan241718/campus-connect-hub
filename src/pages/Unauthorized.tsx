import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldX, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Unauthorized = () => {
  const { profile } = useAuth();

  const getDashboardLink = () => {
    if (!profile) return '/';
    switch (profile.role) {
      case 'admin': return '/admin';
      case 'club_coordinator': return '/club-dashboard';
      default: return '/dashboard';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
          <ShieldX className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Access Denied
        </h1>
        <p className="text-muted-foreground mb-8">
          You don't have permission to access this page. Please contact an administrator if you believe this is a mistake.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={getDashboardLink()}>
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button className="gap-2 w-full sm:w-auto">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
