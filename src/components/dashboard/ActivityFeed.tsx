import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Calendar, 
  Bell, 
  UserPlus, 
  Award,
  Clock,
  AlertCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'registration' | 'event' | 'notification' | 'member' | 'achievement' | 'pending' | 'alert';
  title: string;
  description: string;
  timestamp: Date;
}

interface ActivityFeedProps {
  activities: Activity[];
  title?: string;
}

const ActivityFeed = ({ activities, title = "Recent Activity" }: ActivityFeedProps) => {
  const iconMap = {
    registration: { icon: CheckCircle2, color: 'text-success bg-success/10' },
    event: { icon: Calendar, color: 'text-primary bg-primary/10' },
    notification: { icon: Bell, color: 'text-accent bg-accent/10' },
    member: { icon: UserPlus, color: 'text-primary bg-primary/10' },
    achievement: { icon: Award, color: 'text-accent bg-accent/10' },
    pending: { icon: Clock, color: 'text-warning bg-warning/10' },
    alert: { icon: AlertCircle, color: 'text-destructive bg-destructive/10' },
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-display font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const { icon: Icon, color } = iconMap[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className={`p-2 rounded-lg ${color} flex-shrink-0`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
            </motion.div>
          );
        })}
        {activities.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recent activity
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
