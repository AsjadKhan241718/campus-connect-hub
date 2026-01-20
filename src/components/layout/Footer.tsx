import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display text-lg font-bold">SSEC Events</span>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              Saboo Siddik College of Engineering's centralized platform for managing clubs, events, and student activities.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-sm text-background/70 hover:text-background transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/clubs" className="text-sm text-background/70 hover:text-background transition-colors">
                  Our Clubs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-background/70 hover:text-background transition-colors">
                  About College
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-background/70 hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-display font-semibold mb-4">For Students</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/signup" className="text-sm text-background/70 hover:text-background transition-colors">
                  Register Now
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-background/70 hover:text-background transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-background/70 hover:text-background transition-colors">
                  My Cart
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-background/70 hover:text-background transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sm text-background/70">
                  Saboo Siddik College of Engineering,<br />
                  8, Saboo Siddik Polytechnic Rd,<br />
                  Byculla, Mumbai - 400008
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-background/70">+91 22 2300 1170</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-background/70">events@ssec.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © 2024 Saboo Siddik College of Engineering. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-background/50 hover:text-background/70 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-background/50 hover:text-background/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
