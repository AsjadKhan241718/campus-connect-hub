import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
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
      emoji: '🎓',
    },
    club_coordinator: {
      greeting: 'Good to see you',
      cta: 'Create Event',
      link: '/create-event',
      color: 'from-accent via-warning to-primary',
      emoji: '🚀',
    },
    admin: {
      greeting: 'System Overview',
      cta: 'View Analytics',
      link: '/analytics',
      color: 'from-primary via-accent to-success',
      emoji: '⚡',
    },
  };

  const config = roleConfig[role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${config.color} p-8 md:p-10 text-primary-foreground shadow-xl`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-foreground/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary-foreground/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl" />
      
      {/* Floating stars */}
      <motion.div
        className="absolute top-6 right-6"
        animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Star className="h-6 w-6 text-primary-foreground/20 fill-primary-foreground/10" />
      </motion.div>
      <motion.div
        className="absolute top-16 right-20"
        animate={{ y: [0, -6, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <Sparkles className="h-5 w-5 text-primary-foreground/15" />
      </motion.div>

      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-primary-foreground/70 font-medium mb-1 tracking-wide uppercase"
        >
          {config.greeting}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-display font-extrabold mb-2 tracking-tight"
        >
          {userName}! {config.emoji}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-primary-foreground/70 mb-6 max-w-lg text-sm md:text-base leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to={config.link}>
            <Button
              variant="secondary"
              className="bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground border-primary-foreground/20 backdrop-blur-sm gap-2 rounded-xl shadow-lg"
            >
              {config.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
