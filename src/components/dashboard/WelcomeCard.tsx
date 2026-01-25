import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface WelcomeCardProps {
  userName: string;
  role: 'student' | 'club_coordinator' | 'admin';
  subtitle?: string;
}

const WelcomeCard = ({ userName, role, subtitle }: WelcomeCardProps) => {
  const roleConfig = {
    student: {
      greeting: 'Welcome back',
      cta: 'Explore Events',
      link: '/events',
      color: 'from-primary via-primary/80 to-accent',
    },
    club_coordinator: {
      greeting: 'Good to see you',
      cta: 'Create Event',
      link: '/create-event',
      color: 'from-accent via-warning to-primary',
    },
    admin: {
      greeting: 'System Overview',
      cta: 'View Analytics',
      link: '/analytics',
      color: 'from-primary via-accent to-success',
    },
  };

  const config = roleConfig[role];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${config.color} p-8 text-white shadow-xl`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-8 w-8 text-white/30" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <p className="text-sm text-white/80 font-medium mb-1">{config.greeting}</p>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
          {userName}! 👋
        </h1>
        {subtitle && (
          <p className="text-white/80 mb-6 max-w-md">
            {subtitle}
          </p>
        )}
        <Link to={config.link}>
          <Button 
            variant="secondary" 
            className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm gap-2"
          >
            {config.cta}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
