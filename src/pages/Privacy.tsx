import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Bell, UserCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, phone number)",
        "Academic details (department, year of study) for event eligibility",
        "Event registration and participation history",
        "Payment information processed through secure third-party gateways",
        "Device and browser information for improving user experience",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To create and manage your account",
        "To process event registrations and payments",
        "To send event confirmations, reminders, and updates",
        "To personalize your experience with relevant event recommendations",
        "To improve our platform and services",
        "To communicate important announcements about clubs and events",
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "All data is encrypted using industry-standard SSL/TLS protocols",
        "Passwords are hashed and never stored in plain text",
        "Payment processing is handled by PCI-DSS compliant providers",
        "Regular security audits and vulnerability assessments",
        "Access to personal data is restricted to authorized personnel only",
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access your personal data at any time through your profile",
        "Request correction of inaccurate information",
        "Download a copy of your data",
        "Request deletion of your account and associated data",
        "Opt out of promotional communications",
      ],
    },
    {
      icon: Bell,
      title: "Communications",
      content: [
        "Essential notifications about your registrations will always be sent",
        "You can manage promotional email preferences in Settings",
        "We may send important platform updates and security alerts",
        "Club-specific communications based on your memberships",
      ],
    },
    {
      icon: Shield,
      title: "Data Sharing",
      content: [
        "We do not sell your personal information to third parties",
        "Event organizers receive only necessary registration details",
        "Analytics data is anonymized and aggregated",
        "We may share data if required by law or legal process",
        "Third-party services (payment, email) have their own privacy policies",
      ],
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
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Your privacy matters to us. Learn how we collect, use, and protect your information.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: January 2024
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-lg max-w-none mb-12"
            >
              <p className="text-muted-foreground text-lg leading-relaxed">
                MHSSCE Events ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our campus event and club management platform.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-8">
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
                  <ul className="space-y-2">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 p-8 bg-secondary/50 rounded-2xl text-center"
            >
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Questions About Privacy?
              </h3>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <a 
                href="mailto:privacy@mhssce.edu.in" 
                className="text-primary hover:underline font-medium"
              >
                privacy@mhssce.edu.in
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
