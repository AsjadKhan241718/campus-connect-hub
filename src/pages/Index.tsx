import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Award, 
  Sparkles,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/events/EventCard';
import SmartSuggestions from '@/components/home/SmartSuggestions';
import { mockEvents, mockClubs } from '@/lib/mock-data';
import { useCart } from '@/contexts/CartContext';
import heroImage from '@/assets/hero-event.jpg';

const Index = () => {
  const { addToCart } = useCart();
  
  const featuredEvents = mockEvents.filter(e => e.status === 'approved').slice(0, 3);

  const stats = [
    { value: '50+', label: 'Events/Year', icon: Calendar },
    { value: '15+', label: 'Active Clubs', icon: Users },
    { value: '5000+', label: 'Students', icon: Award },
    { value: '100%', label: 'Satisfaction', icon: Sparkles },
  ];

  const benefits = [
    'Easy event discovery and registration',
    'Bulk purchase discounts for multiple events',
    'Real-time notifications and updates',
    'Digital tickets and confirmations',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Campus Events" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                New: Bulk registration discounts available
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-background leading-tight"
            >
              Your Gateway to{' '}
              <span className="text-primary">Campus Life</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-background/80 leading-relaxed"
            >
              Discover, register, and participate in exciting events organized by student clubs at MHSSCE — Saboo Siddik College of Engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/events">
                <Button variant="hero" size="xl">
                  Explore Events
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="xl" className="bg-background/10 border-background/30 text-background hover:bg-background/20">
                  Get Started
                </Button>
              </Link>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4"
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-background/70">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Suggestions */}
      <SmartSuggestions />

      {/* Featured Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground mt-2">
                Don't miss out on these exciting opportunities
              </p>
            </div>
            <Link to="/events">
              <Button variant="outline" className="gap-2">
                View All Events
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EventCard event={event} onAddToCart={addToCart} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Our Clubs
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Join a community of passionate students and explore your interests
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockClubs.map((club, index) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/clubs/${club.id}`}>
                  <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      {club.logo ? (
                        <img src={club.logo} alt={club.name} className="w-10 h-10 rounded-lg" />
                      ) : (
                        <span className="text-2xl font-bold text-primary">
                          {club.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {club.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {club.description}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {club.memberCount} members
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {club.eventsCount} events
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/clubs">
              <Button variant="outline" className="gap-2">
                View All Clubs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 text-primary-foreground text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Save up to 25% with bulk registrations
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
              Ready to Join the Fun?
            </h2>
            <p className="text-primary-foreground/80">
              Create an account today and start exploring amazing events happening on campus. Register for multiple events and save with our bulk discounts!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="xl" className="bg-background text-primary hover:bg-background/90">
                  Create Account
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Browse Events
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
