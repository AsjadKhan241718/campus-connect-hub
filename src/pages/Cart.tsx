import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, Percent, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { mockDiscountRules } from '@/lib/mock-data';
import { format } from 'date-fns';

const Cart = () => {
  const { user, logout } = useAuth();
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    subtotal, 
    discount, 
    discountRule,
    total, 
    itemCount 
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header 
          user={user} 
          cartItemCount={itemCount} 
          notificationCount={2}
          onLogout={logout}
        />
        
        <main className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-secondary flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any events yet. Start exploring and find something exciting!
            </p>
            <Link to="/events">
              <Button size="lg" className="gap-2">
                Browse Events
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        user={user} 
        cartItemCount={itemCount} 
        notificationCount={2}
        onLogout={logout}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/events">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-2xl font-display font-bold text-foreground mb-6">
                Shopping Cart ({itemCount} items)
              </h1>

              {items.map((item, index) => (
                <motion.div
                  key={item.event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-sm"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      {item.event.poster ? (
                        <img 
                          src={item.event.poster} 
                          alt={item.event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary-foreground/30">
                            {item.event.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div>
                          <Link to={`/events/${item.event.id}`}>
                            <h3 className="font-display font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                              {item.event.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.event.club?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(item.event.date), 'MMM d, yyyy')} • {item.event.time}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.event.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.event.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">₹{item.event.price} × {item.quantity}</p>
                          <p className="text-lg font-bold text-foreground">
                            ₹{item.event.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl border border-border p-6 shadow-card sticky top-20"
              >
                <h2 className="text-lg font-display font-semibold text-foreground mb-4">
                  Order Summary
                </h2>

                {/* Discount Rules Info */}
                <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                    <Percent className="h-4 w-4 text-primary" />
                    Bulk Discount Offers
                  </p>
                  <div className="space-y-1">
                    {mockDiscountRules.filter(r => r.active).map((rule) => (
                      <p 
                        key={rule.id} 
                        className={`text-xs ${
                          discountRule?.id === rule.id 
                            ? 'text-success font-medium' 
                            : 'text-muted-foreground'
                        }`}
                      >
                        {discountRule?.id === rule.id ? '✓ ' : ''}
                        {rule.minQuantity}+ items: {rule.discountType === 'percentage' ? `${rule.value}% off` : `₹${rule.value} off`}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Calculations */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span className="flex items-center gap-1">
                        <Percent className="h-3 w-3" />
                        Bulk Discount ({discountRule?.value}%)
                      </span>
                      <span className="font-medium">-₹{discount.toFixed(0)}</span>
                    </div>
                  )}

                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Total</span>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-2xl font-bold text-foreground">
                          <IndianRupee className="h-5 w-5" />
                          {total.toFixed(0)}
                        </div>
                        {discount > 0 && (
                          <p className="text-xs text-success">You save ₹{discount.toFixed(0)}!</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link to="/checkout" className="block mt-6">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>

                {/* Info */}
                <div className="mt-4 text-xs text-muted-foreground text-center">
                  <p>Secure payment • Instant confirmation</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
