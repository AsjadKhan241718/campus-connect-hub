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
      gradient: 'from-primary/5 to-transparent',
    },
    accent: {
      bg: 'bg-accent/10',
      text: 'text-accent',
      border: 'border-accent/20',
      gradient: 'from-accent/5 to-transparent',
    },
    success: {
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/20',
      gradient: 'from-success/5 to-transparent',
    },
    warning: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/20',
      gradient: 'from-warning/5 to-transparent',
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.08, type: 'spring', stiffness: 200 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden rounded-2xl bg-card border ${colors.border} p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-default`}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-60`} />
            {/* Corner decoration */}
            <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${colors.bg} opacity-40 blur-xl`} />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`p-3 rounded-xl ${colors.bg}`}
                >
                  <Icon className={`h-5 w-5 ${colors.text}`} />
                </motion.div>
                {stat.trend && (
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.trend.isPositive
                      ? 'bg-success/10 text-success'
                      : 'bg-destructive/10 text-destructive'
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
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{stat.title}</p>
              <p className="text-3xl font-display font-extrabold text-foreground tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
