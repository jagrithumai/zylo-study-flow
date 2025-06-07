
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Play, Users, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-lg">Z</span>
              </div>
              <span className="font-semibold text-lg">Zylo-Study</span>
              <span className="text-muted-foreground text-sm">by Zylon Labs</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="font-medium">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-6">
              Study <span className="font-semibold">Together</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 font-light max-w-2xl mx-auto">
              A minimalist platform for collaborative video sessions that feel less like meetings and more like creative collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" className="px-8 py-3 text-lg font-medium">
                  Start Studying
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={scrollToFeatures}
                className="px-8 py-3 text-lg font-medium"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="mt-20 animate-bounce cursor-pointer" onClick={scrollToFeatures}>
            <ChevronDown className="w-6 h-6 mx-auto text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light mb-4">
              Reimagined for <span className="font-semibold">Focus</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature designed to eliminate distractions and enhance collaborative learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Custom Video UI</h3>
              <p className="text-muted-foreground">
                Clean, distraction-free video calls designed specifically for studying and collaboration.
              </p>
            </div>

            <div className="group p-8 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300 coming-soon">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Collaborative Whiteboard</h3>
              <p className="text-muted-foreground">
                Seamlessly switch to whiteboard mode where videos slide aside for focused collaboration.
              </p>
            </div>

            <div className="group p-8 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Easy Session Sharing</h3>
              <p className="text-muted-foreground">
                Generate unique links instantly to invite friends to your study sessions.
              </p>
            </div>

            <div className="group p-8 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Session Scheduling</h3>
              <p className="text-muted-foreground">
                Plan and organize your study sessions with an intuitive scheduling interface.
              </p>
            </div>

            <div className="group p-8 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300 coming-soon">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Focus Timer</h3>
              <p className="text-muted-foreground">
                Built-in Pomodoro timer to keep your study sessions productive and structured.
              </p>
            </div>

            <div className="group p-8 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">In-Call Chat</h3>
              <p className="text-muted-foreground">
                Minimalist chat interface for quick communication without interrupting flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6">
            Ready to <span className="font-semibold">Transform</span> Your Study Sessions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the minimalist study platform that puts focus first.
          </p>
          <Link to="/auth">
            <Button size="lg" className="px-8 py-3 text-lg font-medium">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-sm">Z</span>
              </div>
              <span className="font-medium">Zylo-Study</span>
              <span className="text-muted-foreground text-sm">by Zylon Labs</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 Zylon Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
