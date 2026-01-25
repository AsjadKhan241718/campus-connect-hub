import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface Stat {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'primary' | 'accent' | 'success' | 'warning';
}

interface StatsGridProps {
  stats: Stat[];
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      border: 'border-primary/20',
    },
    accent: {
      bg: 'bg-accent/10',
      text: 'text-accent',
      border: 'border-accent/20',
    },
    success: {
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/20',
    },
    warning: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/20',
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colors = colorClasses[stat.color];
        
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden rounded-xl bg-card border ${colors.border} p-6 shadow-sm hover:shadow-lg transition-shadow`}
          >
            {/* Background decoration */}
            <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full ${colors.bg} opacity-50`} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                  <Icon className={`h-5 w-5 ${colors.text}`} />
                </div>
                {stat.trend && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend.isPositive ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.trend.isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.trend.isPositive ? '+' : ''}{stat.trend.value}%
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
