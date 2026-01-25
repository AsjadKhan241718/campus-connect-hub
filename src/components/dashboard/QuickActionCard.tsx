import { motion } from 'framer-motion';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickAction {
  icon: LucideIcon;
  label: string;
  description: string;
  link: string;
  color: 'primary' | 'accent' | 'success' | 'warning';
}

interface QuickActionCardProps {
  actions: QuickAction[];
  title?: string;
}

const QuickActionCard = ({ actions, title = "Quick Actions" }: QuickActionCardProps) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary hover:bg-primary/20',
    accent: 'bg-accent/10 text-accent hover:bg-accent/20',
    success: 'bg-success/10 text-success hover:bg-success/20',
    warning: 'bg-warning/10 text-warning hover:bg-warning/20',
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-display font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={action.link}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${colorClasses[action.color]}`}
              >
                <div className="flex-shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActionCard;
