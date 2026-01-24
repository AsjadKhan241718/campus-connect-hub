import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, HelpCircle, Calendar, Users, CreditCard, User, Settings, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: Calendar,
      title: "Events",
      description: "Finding and registering for events",
      link: "/events",
    },
    {
      icon: Users,
      title: "Clubs",
      description: "Joining and exploring clubs",
      link: "/clubs",
    },
    {
      icon: CreditCard,
      title: "Registration",
      description: "Payment and checkout help",
      link: "/cart",
    },
    {
      icon: User,
      title: "Account",
      description: "Profile and settings",
      link: "/profile",
    },
  ];

  const faqs = [
    {
      category: "Events",
      questions: [
        {
          q: "How do I register for an event?",
          a: "Browse events on the Events page, click 'Add to Cart' on events you want to join, then go to your Cart and proceed to Checkout. You'll need to be logged in to complete registration.",
        },
        {
          q: "Can I register for multiple events at once?",
          a: "Yes! Add all the events you want to your cart and checkout together. You'll even get bulk discounts: 10% off for 3+ events, 15% for 5+, and 25% for 10+ events.",
        },
        {
          q: "How do I know if an event is full?",
          a: "Each event card shows the remaining capacity. If an event is full, the 'Add to Cart' button will be disabled.",
        },
        {
          q: "Can I cancel my registration?",
          a: "Contact the event organizer or reach out through the Contact page. Cancellation policies vary by event.",
        },
      ],
    },
    {
      category: "Clubs",
      questions: [
        {
          q: "How do I join a club?",
          a: "Visit the Clubs page, explore the available clubs, and click on a club to see its details. Most clubs accept new members at the beginning of each semester.",
        },
        {
          q: "What clubs are available at MHSSCE?",
          a: "We have several active clubs including IEEE MHSSCE, ACM MHSSCE, CSI MHSSCE, and the Programmer's Club. Each focuses on different aspects of technology and professional development.",
        },
        {
          q: "Can I be part of multiple clubs?",
          a: "Absolutely! You can join as many clubs as you're interested in. This is a great way to explore different areas and meet more people.",
        },
      ],
    },
    {
      category: "Account",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click 'Sign Up' in the navigation bar, fill in your details (name, email, password), and you're ready to go!",
        },
        {
          q: "I forgot my password. What do I do?",
          a: "On the login page, click 'Forgot Password' and enter your email. You'll receive a link to reset your password.",
        },
        {
          q: "How do I update my profile?",
          a: "Go to your Profile page from the user menu. You can update your name, photo, and other details there.",
        },
      ],
    },
    {
      category: "Payments",
      questions: [
        {
          q: "What payment methods are accepted?",
          a: "We accept various payment methods including UPI, debit/credit cards, and net banking through our secure payment gateway.",
        },
        {
          q: "Are there any discounts available?",
          a: "Yes! We offer bulk discounts when you register for multiple events: 10% off for 3+ events, 15% off for 5+ events, and 25% off for 10+ events.",
        },
        {
          q: "Is my payment information secure?",
          a: "Absolutely. All payments are processed through secure, encrypted channels. We never store your payment details on our servers.",
        },
      ],
    },
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Help Center
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Find answers to common questions about events, clubs, and more
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for help..."
                  className="pl-12 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <Link key={index} to={category.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors text-center"
                  >
                    <category.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>

            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredFaqs.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-4">{category.category}</h3>
                    <Accordion type="single" collapsible className="bg-card rounded-xl border border-border">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`} className="border-b border-border last:border-0">
                          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                            <span className="text-foreground">{faq.q}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Still Need Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-8 bg-primary/5 rounded-2xl text-center border border-primary/10"
            >
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Still need help?
              </h3>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Contact our support team.
              </p>
              <Link to="/contact">
                <Button>Contact Support</Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
