
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Play, Users, Calendar, MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} duration={3 + Math.random() * 2} />
        ))}
      </div>

      {/* Gradient overlay that follows mouse */}
      <div 
        className="fixed inset-0 -z-10 opacity-30 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.1), transparent 40%)`
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-background font-bold text-lg">Z</span>
              </div>
              <span className="font-semibold text-lg transition-colors duration-300 group-hover:text-foreground/80">Zylo-Study</span>
              <span className="text-muted-foreground text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">by Zylon Labs</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="font-medium hover:bg-muted/50 transition-all duration-300 hover:scale-105">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="font-medium group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-foreground/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-foreground/60 animate-pulse mr-2" />
              <span className="text-sm text-muted-foreground tracking-wider uppercase animate-fade-in">
                Minimalist Study Platform
              </span>
              <Sparkles className="w-6 h-6 text-foreground/60 animate-pulse ml-2" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-6">
              <span className="inline-block animate-slide-up" style={{ animationDelay: '0.2s' }}>Study</span>{' '}
              <span className="font-semibold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent inline-block animate-slide-up" style={{ animationDelay: '0.4s' }}>Together</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 font-light max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
              A minimalist platform for collaborative video sessions that feel less like meetings and more like creative collaboration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <Link to="/auth">
                <Button size="lg" className="px-8 py-3 text-lg font-medium group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <span className="relative z-10 flex items-center">
                    Start Studying
                    <Play className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={scrollToFeatures}
                className="px-8 py-3 text-lg font-medium group hover:bg-muted/50 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center">
                  Learn More
                  <ChevronDown className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-1" />
                </span>
              </Button>
            </div>
          </div>
          
          {/* Enhanced scroll indicator */}
          <div className="mt-20 cursor-pointer group" onClick={scrollToFeatures}>
            <div className="animate-bounce">
              <ChevronDown className="w-6 h-6 mx-auto text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-muted-foreground to-transparent mx-auto mt-2 opacity-50" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-light mb-4">
                Reimagined for <span className="font-semibold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Focus</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every feature designed to eliminate distractions and enhance collaborative learning.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Play,
                title: "Custom Video UI",
                description: "Clean, distraction-free video calls designed specifically for studying and collaboration.",
                delay: "0s"
              },
              {
                icon: MessageSquare,
                title: "Collaborative Whiteboard",
                description: "Seamlessly switch to whiteboard mode where videos slide aside for focused collaboration.",
                delay: "0.1s",
                comingSoon: true
              },
              {
                icon: Users,
                title: "Easy Session Sharing",
                description: "Generate unique links instantly to invite friends to your study sessions.",
                delay: "0.2s"
              },
              {
                icon: Calendar,
                title: "Session Scheduling",
                description: "Plan and organize your study sessions with an intuitive scheduling interface.",
                delay: "0.3s"
              },
              {
                icon: MessageSquare,
                title: "Focus Timer",
                description: "Built-in Pomodoro timer to keep your study sessions productive and structured.",
                delay: "0.4s",
                comingSoon: true
              },
              {
                icon: MessageSquare,
                title: "In-Call Chat",
                description: "Minimalist chat interface for quick communication without interrupting flow.",
                delay: "0.5s"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-slide-up ${feature.comingSoon ? 'coming-soon' : ''}`}
                style={{ animationDelay: feature.delay }}
              >
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-foreground/10 transition-all duration-300">
                  <feature.icon className="w-6 h-6 group-hover:text-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-medium mb-3 group-hover:text-foreground transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-light mb-6">
              Ready to <span className="font-semibold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Transform</span> Your Study Sessions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the minimalist study platform that puts focus first.
            </p>
            <Link to="/auth">
              <Button size="lg" className="px-8 py-3 text-lg font-medium group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                <span className="relative z-10 flex items-center">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0 group">
              <div className="w-6 h-6 bg-foreground rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-background font-bold text-sm">Z</span>
              </div>
              <span className="font-medium transition-colors duration-300 group-hover:text-foreground/80">Zylo-Study</span>
              <span className="text-muted-foreground text-sm">by Zylon Labs</span>
            </div>
            <p className="text-muted-foreground text-sm animate-fade-in">
              © 2024 Zylon Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
