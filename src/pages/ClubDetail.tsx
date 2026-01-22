import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  ArrowLeft, 
  MapPin, 
  Clock,
  Mail,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/events/EventCard';
import { mockClubs, mockEvents } from '@/lib/mock-data';
import { useCart } from '@/contexts/CartContext';
import { format } from 'date-fns';

const ClubDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const club = mockClubs.find(c => c.id === id);
  const clubEvents = mockEvents.filter(e => e.clubId === id && e.status === 'approved');

  // Fallback for missing club
  if (!club) {
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
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-3">
              Club Details Coming Soon
            </h1>
            <p className="text-muted-foreground mb-6">
              We're still setting up this club's page. Check back later for more information about events, activities, and membership.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/clubs">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Clubs
                </Button>
              </Link>
              <Link to="/events">
                <Button>Browse Events</Button>
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link to="/clubs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Clubs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start gap-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              {club.logo ? (
                <img src={club.logo} alt={club.name} className="w-16 h-16 md:w-20 md:h-20 rounded-xl" />
              ) : (
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  {club.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {club.name}
              </h1>
              <p className="text-muted-foreground mt-3 text-lg max-w-2xl">
                {club.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Badge variant="secondary" className="gap-1 text-sm py-1 px-3">
                  <Users className="h-4 w-4" />
                  {club.memberCount} Members
                </Badge>
                <Badge variant="secondary" className="gap-1 text-sm py-1 px-3">
                  <Calendar className="h-4 w-4" />
                  {club.eventsCount} Events
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Club Events */}
      <section className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Upcoming Events by {club.name}
            </h2>

            {clubEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <EventCard event={event} onAddToCart={addToCart} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming events</h3>
                <p className="text-muted-foreground mb-4">
                  {club.name} hasn't scheduled any events yet. Check back soon!
                </p>
                <Link to="/events">
                  <Button variant="outline">Browse All Events</Button>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Club Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-6">
                About {club.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">MHSSCE Campus, Mumbai</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Meeting Schedule</p>
                      <p className="text-sm text-muted-foreground">Weekly meetings every Friday</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Contact</p>
                      <p className="text-sm text-muted-foreground">{club.name.toLowerCase().replace(/[^a-z]/g, '')}@mhssce.edu.in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ExternalLink className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Social Media</p>
                      <p className="text-sm text-muted-foreground">Follow us on Instagram & LinkedIn</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClubDetail;
