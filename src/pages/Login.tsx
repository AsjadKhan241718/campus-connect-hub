import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, GraduationCap, Mail, Lock, Loader2, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const DEMO_ACCOUNTS = [
  { role: 'Student', email: 'student@mhssce.edu', password: 'student123', icon: '🎓' },
  { role: 'Admin', email: 'admin@mhssce.edu', password: 'admin123', icon: '⚡' },
  { role: 'Club Coordinator', email: 'coordinator@mhssce.edu', password: 'coordinator123', icon: '🚀' },
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (result.success) {
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  const fillDemo = (account: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md space-y-8"
        >
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: -6, scale: 1.05 }}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20"
            >
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </motion.div>
            <div>
              <span className="font-display text-xl font-extrabold text-foreground tracking-tight">MHSSCE</span>
              <span className="ml-1.5 text-xs text-muted-foreground tracking-wider uppercase font-medium">Events</span>
            </div>
          </Link>

          <div>
            <h1 className="text-3xl font-display font-extrabold text-foreground tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground mt-2 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Demo Credentials */}
          <div className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
              <Info className="h-3.5 w-3.5" />
              Demo Accounts
            </div>
            <div className="grid gap-2">
              {DEMO_ACCOUNTS.map((account) => (
                <motion.button
                  key={account.role}
                  type="button"
                  onClick={() => fillDemo(account)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-3 text-left text-sm hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{account.icon}</span>
                    <div>
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{account.role}</span>
                      <span className="block text-xs text-muted-foreground">{account.email}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@mhssce.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 rounded-xl border-border/60 focus:border-primary"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 rounded-xl border-border/60 focus:border-primary"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 rounded-xl shadow-md shadow-primary/20" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/70" />
        
        {/* Decorative shapes */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-20 w-32 h-32 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10"
          />
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-32 left-16 w-24 h-24 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl"
          />
        </div>

        <div className="relative flex items-center justify-center p-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-md text-center text-primary-foreground space-y-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 mx-auto rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/10"
            >
              <GraduationCap className="h-10 w-10" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-display font-extrabold tracking-tight">Campus Events Hub</h2>
              <p className="text-primary-foreground/70 leading-relaxed mt-3 text-sm">
                Join thousands of students discovering and participating in exciting campus events.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '50+', label: 'Events' },
                { value: '15+', label: 'Clubs' },
                { value: '5K+', label: 'Students' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10"
                >
                  <div className="text-2xl font-display font-extrabold">{stat.value}</div>
                  <div className="text-xs text-primary-foreground/60 font-medium mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
