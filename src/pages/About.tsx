import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Phone, Mail, Globe, Award, Users, BookOpen } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const About = () => {
  const stats = [
    { icon: Users, value: '5000+', label: 'Students' },
    { icon: BookOpen, value: '15+', label: 'Departments' },
    { icon: Award, value: '50+', label: 'Events/Year' },
    { icon: GraduationCap, value: '95%', label: 'Placement Rate' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              About Saboo Siddik College
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              A premier engineering institution in Mumbai, committed to excellence in technical education since 1935.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-display font-bold text-foreground">Our Legacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Saboo Siddik College of Engineering (SSCE) is one of the oldest and most prestigious engineering colleges in Mumbai, affiliated with the University of Mumbai. Established in 1935, the institution has been at the forefront of technical education for nearly nine decades.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The college offers undergraduate and postgraduate programs in various branches of engineering including Computer Engineering, Information Technology, Electronics & Telecommunication, Mechanical Engineering, and Civil Engineering.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With state-of-the-art laboratories, experienced faculty, and strong industry connections, SSCE continues to produce engineers who excel in their respective fields and contribute to national development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-display font-bold text-foreground">Campus Life</h2>
              <p className="text-muted-foreground leading-relaxed">
                Beyond academics, SSCE offers a vibrant campus life with numerous clubs and committees that organize events throughout the year. From technical symposiums and hackathons to cultural festivals and sports tournaments, there's always something happening on campus.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our student-run committees including IEEE SSEC, ACM SSEC, Programmer's Club, and CSI SSEC provide platforms for students to explore their interests, develop leadership skills, and build lasting connections.
              </p>
              <div className="bg-secondary/50 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      8, Saboo Siddik Polytechnic Road, Byculla, Mumbai - 400008
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">+91 22 2300 1170</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">info@ssec.edu.in</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">www.ssec.edu.in</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
