import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, GraduationCap, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  const demoAccounts = [
    { email: 'student@ssec.edu', role: 'Student' },
    { email: 'club@ssec.edu', role: 'Club Coordinator' },
    { email: 'admin@ssec.edu', role: 'Admin' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-md">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-foreground">SSEC</span>
              <span className="ml-1 text-muted-foreground">Events</span>
            </div>
          </Link>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Welcome back
            </h1>
            <p className="text-muted-foreground mt-2">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@ssec.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-input" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="space-y-3">
            <p className="text-sm text-center text-muted-foreground">Quick demo access:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {demoAccounts.map((account) => (
                <Button
                  key={account.email}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('demo123');
                  }}
                >
                  {account.role}
                </Button>
              ))}
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/80 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg text-center text-primary-foreground space-y-6"
        >
          <div className="w-24 h-24 mx-auto rounded-2xl bg-background/10 backdrop-blur-sm flex items-center justify-center">
            <GraduationCap className="h-12 w-12" />
          </div>
          <h2 className="text-3xl font-display font-bold">
            Campus Events Hub
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Join thousands of students discovering and participating in exciting campus events. 
            From tech festivals to cultural nights, never miss an opportunity to learn and grow.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-background/10 backdrop-blur-sm">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-primary-foreground/70">Events</div>
            </div>
            <div className="p-4 rounded-xl bg-background/10 backdrop-blur-sm">
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm text-primary-foreground/70">Clubs</div>
            </div>
            <div className="p-4 rounded-xl bg-background/10 backdrop-blur-sm">
              <div className="text-2xl font-bold">5K+</div>
              <div className="text-sm text-primary-foreground/70">Students</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
