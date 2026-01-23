import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Code, 
  Palette, 
  Trophy, 
  Presentation,
  GraduationCap,
  Target,
  Award
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
  filter: string;
}

const categories: Category[] = [
  {
    id: 'trending',
    name: 'Trending',
    icon: Flame,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    description: 'Most popular events',
    filter: 'popular',
  },
  {
    id: 'technical',
    name: 'Technical',
    icon: Code,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    description: 'Workshops & hackathons',
    filter: 'Technology',
  },
  {
    id: 'cultural',
    name: 'Cultural',
    icon: Palette,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    description: 'Art & performances',
    filter: 'Cultural',
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: Trophy,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    description: 'Games & competitions',
    filter: 'Sports',
  },
  {
    id: 'seminars',
    name: 'Seminars',
    icon: Presentation,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    description: 'Expert talks',
    filter: 'Seminar',
  },
  {
    id: 'workshops',
    name: 'Workshops',
    icon: Target,
    color: 'text-teal-600',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    description: 'Hands-on learning',
    filter: 'Workshop',
  },
  {
    id: 'orientation',
    name: 'Orientation',
    icon: GraduationCap,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    description: 'For new students',
    filter: 'Orientation',
  },
  {
    id: 'certifications',
    name: 'Certifications',
    icon: Award,
    color: 'text-rose-600',
    bgColor: 'bg-rose-100 dark:bg-rose-900/30',
    description: 'Get certified',
    filter: 'Workshop',
  },
];

const SmartSuggestions = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-3">
            <Flame className="h-3 w-3 mr-1" />
            Smart Suggestions
          </Badge>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            What are you looking for?
          </h2>
          <p className="text-muted-foreground mt-2">
            Browse events by category or interest
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                to={`/events?category=${category.filter}`}
                className="group flex flex-col items-center p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className={`h-12 w-12 rounded-xl ${category.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground text-center mt-1 line-clamp-1">
                  {category.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartSuggestions;
