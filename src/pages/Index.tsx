
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Play, Users, Calendar, MessageSquare, Sparkles, ArrowRight, Star, Zap, Globe, Shield, Heart, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const FloatingParticle = ({ delay = 0, duration = 4 }: { delay?: number; duration?: number }) => (
    <div 
      className="absolute w-2 h-2 bg-foreground/10 rounded-full animate-pulse"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `translate(${Math.random() * 100}vw, ${Math.random() * 100}vh)`
      }}
    />
  );

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      content: "Zylo-Study transformed how our study group collaborates. The minimalist design keeps us focused!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Medical Student",
      content: "Finally, a platform that doesn't distract from actual studying. The whiteboard feature is incredible.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Engineering Student",
      content: "Clean, fast, and effective. Everything we needed for our group study sessions.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10K+", label: "Study Sessions", icon: Play },
    { number: "50K+", label: "Students", icon: Users },
    { number: "200+", label: "Universities", icon: Globe },
    { number: "99.9%", label: "Uptime", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced animated background particles */}
      <div className="fixed inset-0 -z-10">
        {[...Array(30)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} duration={3 + Math.random() * 4} />
        ))}
      </div>

      {/* Dynamic gradient overlay that follows mouse */}
      <div 
        className="fixed inset-0 -z-10 opacity-20 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.15), transparent 50%)`
        }}
      />

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-lg border-b border-border z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
                <span className="text-background font-bold text-lg">Z</span>
              </div>
              <span className="font-semibold text-lg transition-all duration-300 group-hover:text-foreground/80">Zylo-Study</span>
              <span className="text-muted-foreground text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">by Zylon Labs</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="font-medium hover:bg-muted/50 transition-all duration-300 hover:scale-105 hover:shadow-md">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="font-medium group relative overflow-hidden hover:shadow-xl transition-all duration-300">
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-foreground/60 animate-pulse mr-2" />
              <span className="text-sm text-muted-foreground tracking-wider uppercase animate-fade-in bg-muted/50 px-3 py-1 rounded-full">
                ✨ Minimalist Study Platform
              </span>
              <Sparkles className="w-6 h-6 text-foreground/60 animate-pulse ml-2" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-light tracking-tight mb-6">
              <span className="inline-block animate-slide-up hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>Study</span>{' '}
              <span className="font-semibold bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent inline-block animate-slide-up hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.4s' }}>Together</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 font-light max-w-3xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.6s' }}>
              A minimalist platform for collaborative video sessions that feel less like meetings and more like creative collaboration. Focus first, distractions never.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up mb-12" style={{ animationDelay: '0.8s' }}>
              <Link to="/auth">
                <Button size="lg" className="px-10 py-4 text-lg font-medium group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-110 transform">
                  <span className="relative z-10 flex items-center">
                    Start Studying Now
                    <Rocket className="w-5 h-5 ml-2 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={scrollToFeatures}
                className="px-10 py-4 text-lg font-medium group hover:bg-muted/50 transition-all duration-500 hover:scale-105 hover:shadow-lg"
              >
                <span className="flex items-center">
                  Explore Features
                  <ChevronDown className="w-5 h-5 ml-2 transition-all duration-500 group-hover:translate-y-2 group-hover:scale-110" />
                </span>
              </Button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center group animate-scale-in hover:scale-110 transition-all duration-300"
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  <div className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced scroll indicator with animation */}
          <div className="mt-20 cursor-pointer group" onClick={scrollToFeatures}>
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 mx-auto text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:scale-125" />
            </div>
            <div className="w-px h-20 bg-gradient-to-b from-muted-foreground via-muted-foreground/50 to-transparent mx-auto mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-fade-in">
              <h2 className="text-4xl sm:text-5xl font-light mb-6">
                Reimagined for <span className="font-semibold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Focus</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Every feature designed to eliminate distractions and enhance collaborative learning. Experience the future of study sessions.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Play,
                title: "Custom Video UI",
                description: "Clean, distraction-free video calls designed specifically for studying and collaboration.",
                delay: "0s",
                gradient: "from-blue-500/10 to-purple-500/10"
              },
              {
                icon: MessageSquare,
                title: "Smart Whiteboard",
                description: "Seamlessly switch to whiteboard mode where videos slide aside for focused collaboration.",
                delay: "0.1s",
                comingSoon: true,
                gradient: "from-green-500/10 to-teal-500/10"
              },
              {
                icon: Users,
                title: "Instant Sharing",
                description: "Generate unique links instantly to invite friends to your study sessions with zero hassle.",
                delay: "0.2s",
                gradient: "from-orange-500/10 to-red-500/10"
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Plan and organize your study sessions with an intuitive scheduling interface that just works.",
                delay: "0.3s",
                gradient: "from-purple-500/10 to-pink-500/10"
              },
              {
                icon: Zap,
                title: "Focus Timer",
                description: "Built-in Pomodoro timer to keep your study sessions productive and structured.",
                delay: "0.4s",
                comingSoon: true,
                gradient: "from-yellow-500/10 to-orange-500/10"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "End-to-end encryption ensures your study sessions remain private and secure.",
                delay: "0.5s",
                gradient: "from-indigo-500/10 to-blue-500/10"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 bg-gradient-to-br ${feature.gradient} bg-card/50 backdrop-blur-sm rounded-3xl border border-border hover:shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 animate-slide-up hover:border-foreground/20 ${feature.comingSoon ? 'coming-soon' : ''}`}
                style={{ animationDelay: feature.delay }}
              >
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:bg-foreground/10 transition-all duration-500 group-hover:rotate-6">
                  <feature.icon className="w-7 h-7 group-hover:text-foreground transition-all duration-300" />
                </div>
                <h3 className="text-xl font-medium mb-4 group-hover:text-foreground transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light mb-6 animate-fade-in">
            Loved by <span className="font-semibold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Students</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16 animate-fade-in">
            See what students around the world are saying about Zylo-Study
          </p>
          
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentTestimonial 
                    ? 'opacity-100 transform translate-y-0 scale-100' 
                    : 'opacity-0 transform translate-y-8 scale-95 absolute inset-0'
                }`}
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-500">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl sm:text-2xl font-light mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div>
                    <div className="font-medium text-lg">{testimonial.name}</div>
                    <div className="text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-foreground scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-red-500 animate-pulse mr-2" />
              <span className="text-sm text-muted-foreground tracking-wider uppercase bg-muted/50 px-3 py-1 rounded-full">
                Join the Revolution
              </span>
              <Heart className="w-6 h-6 text-red-500 animate-pulse ml-2" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-light mb-6">
              Ready to <span className="font-semibold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Transform</span> Your Study Sessions?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students who have already discovered the power of focused, collaborative studying.
            </p>
            <Link to="/auth">
              <Button size="lg" className="px-12 py-4 text-xl font-medium group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-110">
                <span className="relative z-10 flex items-center">
                  Start Your Journey Today
                  <ArrowRight className="w-6 h-6 ml-2 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-border py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0 group">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <span className="text-background font-bold text-lg">Z</span>
              </div>
              <span className="font-medium transition-colors duration-300 group-hover:text-foreground/80">Zylo-Study</span>
              <span className="text-muted-foreground text-sm">by Zylon Labs</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-muted-foreground text-sm animate-fade-in">
                © 2024 Zylon Labs. All rights reserved.
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground">Made with</span>
                <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">for students</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
