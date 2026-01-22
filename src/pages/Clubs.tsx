import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Calendar, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockClubs } from '@/lib/mock-data';
import { useState } from 'react';

const Clubs = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClubs = mockClubs.filter(club =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-accent/10 via-background to-primary/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Our Clubs & Committees
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Join vibrant student communities and explore your passions
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club, index) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
                  {/* Logo & Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      {club.logo ? (
                        <img src={club.logo} alt={club.name} className="w-10 h-10 rounded-lg" />
                      ) : (
                        <span className="text-2xl font-bold text-primary">
                          {club.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {club.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
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
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm flex-1 line-clamp-3">
                    {club.description}
                  </p>

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-border flex gap-2">
                    <Link to={`/clubs/${club.id}`} className="flex-1">
                      <Button variant="outline" className="w-full gap-2">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredClubs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No clubs found</h3>
              <p className="text-muted-foreground">Try adjusting your search</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Clubs;
