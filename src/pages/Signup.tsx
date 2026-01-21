import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, GraduationCap, Mail, Lock, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, AppRole } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<AppRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    const result = await signup(name, email, password, role);
    setIsSubmitting(false);
    
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/');
    } else {
      toast.error(result.error || 'Signup failed');
    }
  };

  const roles = [
    { value: 'student' as AppRole, label: 'Student', description: 'Browse and register for events' },
    { value: 'club_coordinator' as AppRole, label: 'Club Coordinator', description: 'Manage club and organize events' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-accent via-accent/90 to-warning items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg text-center text-accent-foreground space-y-6"
        >
          <div className="w-24 h-24 mx-auto rounded-2xl bg-background/10 backdrop-blur-sm flex items-center justify-center">
            <GraduationCap className="h-12 w-12" />
          </div>
          <h2 className="text-3xl font-display font-bold">
            Join Our Community
          </h2>
          <p className="text-accent-foreground/80 leading-relaxed">
            Create an account to unlock exclusive access to campus events, club memberships, 
            and special discounts on bulk registrations.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-background/10 backdrop-blur-sm text-left">
              <div className="w-10 h-10 rounded-lg bg-background/20 flex items-center justify-center">
                ✨
              </div>
              <div>
                <div className="font-medium">Exclusive Access</div>
                <div className="text-sm text-accent-foreground/70">Early bird registrations</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-background/10 backdrop-blur-sm text-left">
              <div className="w-10 h-10 rounded-lg bg-background/20 flex items-center justify-center">
                💰
              </div>
              <div>
                <div className="font-medium">Bulk Discounts</div>
                <div className="text-sm text-accent-foreground/70">Save up to 25%</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-background/10 backdrop-blur-sm text-left">
              <div className="w-10 h-10 rounded-lg bg-background/20 flex items-center justify-center">
                🔔
              </div>
              <div>
                <div className="font-medium">Instant Notifications</div>
                <div className="text-sm text-accent-foreground/70">Never miss an event</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
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
              Create account
            </h1>
            <p className="text-muted-foreground mt-2">
              Join the campus events community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  disabled={isSubmitting}
                />
              </div>
            </div>

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
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="showPass"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="rounded border-input"
              />
              <label htmlFor="showPass" className="text-sm text-muted-foreground cursor-pointer">
                Show password
              </label>
            </div>

            <div className="space-y-3">
              <Label>I am a</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as AppRole)}>
                {roles.map((r) => (
                  <div
                    key={r.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${
                      role === r.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setRole(r.value)}
                  >
                    <RadioGroupItem value={r.value} id={r.value} disabled={isSubmitting} />
                    <div className="flex-1">
                      <Label htmlFor={r.value} className="font-medium cursor-pointer">
                        {r.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{r.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="rounded border-input" required />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
