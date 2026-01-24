import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, Ban, Scale, RefreshCw } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  const sections = [
    {
      icon: CheckCircle,
      title: "Acceptance of Terms",
      content: `By accessing or using the MHSSCE Events platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all users, including students, club coordinators, and administrators.`,
    },
    {
      icon: FileText,
      title: "User Accounts",
      content: `You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information when creating an account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.`,
    },
    {
      icon: Scale,
      title: "Event Registration",
      content: `Event registrations are subject to availability and may have specific eligibility requirements. Payment for paid events must be completed to confirm registration. Bulk discounts are applied automatically based on the number of events in your cart. Registration confirmations will be sent to your registered email address.`,
    },
    {
      icon: RefreshCw,
      title: "Cancellations & Refunds",
      content: `Cancellation policies vary by event and are set by the organizing club. Refund requests should be directed to the event organizer or through the Contact page. Free events can be cancelled without penalty. For paid events, refunds may be subject to processing fees and time limits.`,
    },
    {
      icon: AlertTriangle,
      title: "User Conduct",
      content: `Users must conduct themselves professionally and respectfully. Harassment, discrimination, or inappropriate behavior will not be tolerated. Users may not misuse the platform for unauthorized commercial purposes. Sharing login credentials or impersonating others is prohibited.`,
    },
    {
      icon: Ban,
      title: "Prohibited Activities",
      content: `You may not attempt to gain unauthorized access to our systems. Automated scraping or data collection is prohibited. You may not upload malicious content or viruses. Circumventing security measures or platform restrictions is forbidden.`,
    },
  ];

  const additionalTerms = [
    {
      title: "Intellectual Property",
      content: "All content, logos, and materials on this platform are property of MHSSCE or respective clubs. Users may not reproduce or distribute content without permission.",
    },
    {
      title: "Disclaimer",
      content: "The platform is provided 'as is' without warranties of any kind. We are not liable for any damages arising from the use of our services.",
    },
    {
      title: "Changes to Terms",
      content: "We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of the new terms.",
    },
    {
      title: "Governing Law",
      content: "These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Mumbai, Maharashtra.",
    },
  ];

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
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-muted-foreground">
                Please read these terms carefully before using our platform.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Effective Date: January 2024
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Main Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-display font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Additional Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Additional Terms
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {additionalTerms.map((term, index) => (
                  <div
                    key={index}
                    className="bg-secondary/50 rounded-xl p-6"
                  >
                    <h3 className="font-semibold text-foreground mb-2">{term.title}</h3>
                    <p className="text-sm text-muted-foreground">{term.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12 p-8 bg-primary/5 rounded-2xl text-center border border-primary/10"
            >
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Questions?
              </h3>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <a 
                href="mailto:legal@mhssce.edu.in" 
                className="text-primary hover:underline font-medium"
              >
                legal@mhssce.edu.in
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
