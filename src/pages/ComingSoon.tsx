import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft, Home, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ComingSoon = () => {
  const location = useLocation();
  
  // Get page name from path
  const pageName = location.pathname
    .split('/')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'This Page';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Construction className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">
            Coming Soon
          </h1>
          <p className="text-muted-foreground mb-2">
            <span className="font-medium text-foreground">{pageName}</span> is under construction.
          </p>
          <p className="text-muted-foreground mb-8">
            We're working hard to bring you this feature. Check back soon for updates!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Link to="/">
              <Button className="gap-2 w-full sm:w-auto">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">In the meantime, explore:</p>
            <div className="flex gap-3 justify-center">
              <Link to="/events">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Events
                </Button>
              </Link>
              <Link to="/clubs">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Users className="h-4 w-4" />
                  Clubs
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
