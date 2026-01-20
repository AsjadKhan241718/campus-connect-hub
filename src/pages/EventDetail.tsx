import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  IndianRupee, 
  Share2,
  Heart,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockEvents } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'sonner';

const EventDetail = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const { addToCart, itemCount } = useCart();
  const [quantity, setQuantity] = useState(1);

  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link to="/events">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const spotsLeft = event.capacity - event.registeredCount;
  const isFull = spotsLeft === 0;

  const handleAddToCart = () => {
    addToCart(event, quantity);
    setQuantity(1);
  };

  const categoryColors: Record<string, string> = {
    Technology: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    Cultural: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    Sports: 'bg-green-500/10 text-green-600 border-green-500/20',
    Business: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    Workshop: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        user={user} 
        cartItemCount={itemCount} 
        notificationCount={2}
        onLogout={logout}
      />

      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          {event.poster ? (
            <img 
              src={event.poster} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <Link to="/events">
              <Button variant="secondary" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-card"
              >
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className={categoryColors[event.category] || 'bg-secondary'}>
                      {event.category}
                    </Badge>
                    {event.status === 'approved' && !isFull && spotsLeft < 20 && (
                      <Badge className="bg-warning text-warning-foreground">
                        {spotsLeft} spots left
                      </Badge>
                    )}
                    {isFull && (
                      <Badge className="bg-destructive text-destructive-foreground">
                        Sold Out
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    {event.title}
                  </h1>

                  {/* Club */}
                  {event.club && (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                        {event.club.logo ? (
                          <img src={event.club.logo} alt={event.club.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-sm font-medium">{event.club.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{event.club.name}</p>
                        <p className="text-sm text-muted-foreground">{event.club.memberCount} members</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-border my-6">
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <Calendar className="h-5 w-5 mx-auto text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{format(new Date(event.date), 'MMM d, yyyy')}</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <Clock className="h-5 w-5 mx-auto text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <MapPin className="h-5 w-5 mx-auto text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Venue</p>
                    <p className="font-medium">{event.venue}</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <Users className="h-5 w-5 mx-auto text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{event.registeredCount}/{event.capacity}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-slate max-w-none">
                  <h3 className="text-lg font-display font-semibold mb-3">About this event</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 shadow-card sticky top-20"
              >
                {/* Price */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Price per person</p>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-5 w-5 text-primary" />
                      <span className="text-3xl font-display font-bold text-foreground">
                        {event.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Quantity Selector */}
                {!isFull && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Quantity</p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(spotsLeft, quantity + 1))}
                        disabled={quantity >= spotsLeft}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Subtotal */}
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal</span>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      <span className="text-xl font-semibold">{event.price * quantity}</span>
                    </div>
                  </div>
                  <p className="text-sm text-success mt-2">
                    💡 Register for 3+ events to get bulk discounts!
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  {isFull ? (
                    <Button disabled className="w-full" size="lg">
                      Sold Out
                    </Button>
                  ) : (
                    <>
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                      <Link to="/cart" className="block">
                        <Button variant="outline" className="w-full" size="lg">
                          View Cart
                        </Button>
                      </Link>
                    </>
                  )}
                </div>

                {/* Info */}
                <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground">
                  <p>✓ Instant confirmation</p>
                  <p>✓ Mobile ticket</p>
                  <p>✓ Free cancellation up to 24h before</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default EventDetail;
