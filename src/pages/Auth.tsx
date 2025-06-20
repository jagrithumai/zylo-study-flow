
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Sparkles, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, user } = useAuth();

  // Form animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setFormVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          navigate("/dashboard");
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: "Please check your email for verification.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: "Google sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-foreground/5 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-foreground/3 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-foreground/4 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className={`max-w-md w-full space-y-8 transition-all duration-800 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Logo */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
              <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-background font-bold text-xl">Z</span>
              </div>
              <div className="transition-transform duration-300 group-hover:scale-105">
                <span className="font-semibold text-xl">Zylo-Study</span>
                <p className="text-muted-foreground text-sm flex items-center">
                  by Zylon Labs
                  <Sparkles className="w-3 h-3 ml-1 animate-pulse" />
                </p>
              </div>
            </Link>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-light tracking-tight transition-all duration-500">
                {isLogin ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-muted-foreground mt-2 transition-all duration-500">
                {isLogin 
                  ? "Sign in to your account to continue studying" 
                  : "Join the minimalist study platform"
                }
              </p>
            </div>
          </div>

          {/* Google Auth Button */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button
              type="button"
              variant="outline"
              className="w-full py-6 text-base font-medium group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md"
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <svg className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="relative z-10">Continue with Google</span>
            </Button>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="group">
              <Label htmlFor="email" className="text-sm font-medium group-focus-within:text-foreground transition-colors duration-200">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 py-6 text-base transition-all duration-300 focus:scale-105 focus:shadow-md"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div className="group">
              <Label htmlFor="password" className="text-sm font-medium group-focus-within:text-foreground transition-colors duration-200">
                Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="py-6 text-base pr-12 transition-all duration-300 focus:scale-105 focus:shadow-md"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="group animate-slide-up">
                <Label htmlFor="confirmPassword" className="text-sm font-medium group-focus-within:text-foreground transition-colors duration-200">
                  Confirm Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="py-6 text-base pr-12 transition-all duration-300 focus:scale-105 focus:shadow-md"
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full py-6 text-base font-medium group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg" 
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </span>
            </Button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              disabled={loading}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Enhanced illustration */}
      <div className="hidden lg:flex lg:flex-1 bg-muted/20 items-center justify-center relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-foreground/5 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-foreground/3 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-foreground/4 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-md text-center relative z-10">
          <div className="w-32 h-32 bg-foreground/10 rounded-3xl mx-auto mb-8 flex items-center justify-center animate-float">
            <div className="w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center transition-transform duration-500 hover:scale-110 hover:rotate-12">
              <span className="text-background font-bold text-2xl">Z</span>
            </div>
          </div>
          <h3 className="text-2xl font-light mb-4 animate-fade-in">Focus on what matters</h3>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join thousands of students who have transformed their study sessions with our minimalist approach.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
