
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Copy, Plus, Video } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Session {
  id: string;
  title: string;
  date: string | null;
  time: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sessions:', error);
        toast({
          title: "Error loading sessions",
          description: "Could not load your sessions. Please try again.",
          variant: "destructive",
        });
      } else {
        setSessions(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionTitle) {
      toast({
        title: "Session title required",
        description: "Please enter a title for your study session.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a session.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert([
          {
            title: sessionTitle,
            date: sessionDate || null,
            time: sessionTime || null,
            created_by: user.id,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating session:', error);
        toast({
          title: "Error creating session",
          description: "Could not create session. Please try again.",
          variant: "destructive",
        });
      } else {
        const sessionLink = `${window.location.origin}/room/${data.id}`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(sessionLink);
        
        toast({
          title: "Session created!",
          description: "Link copied to clipboard. Share it with your study partners.",
        });

        // Reset form
        setSessionTitle("");
        setSessionDate("");
        setSessionTime("");

        // Refresh sessions
        fetchSessions();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Unexpected error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSession = (sessionId: string) => {
    navigate(`/room/${sessionId}`);
  };

  const copySessionLink = (sessionId: string) => {
    const sessionLink = `${window.location.origin}/room/${sessionId}`;
    navigator.clipboard.writeText(sessionLink);
    toast({
      title: "Link copied!",
      description: "Session link copied to clipboard.",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (time: string) => {
    return time ? time.substring(0, 5) : '';
  };

  const upcomingSessions = sessions.filter(session => {
    if (!session.date) return false;
    const sessionDate = new Date(session.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return sessionDate >= today;
  });

  const recentSessions = sessions.filter(session => {
    if (!session.date) return true; // Sessions without dates are considered recent
    const sessionDate = new Date(session.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return sessionDate < today;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-lg">Z</span>
              </div>
              <span className="font-semibold text-lg">Zylo-Study</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button variant="ghost" size="sm">
                Profile
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light tracking-tight mb-2">
            Welcome back to <span className="font-medium">Zylo-Study</span>
          </h1>
          <p className="text-muted-foreground">
            Create a new study session or join an existing one.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Session Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Create Session</span>
                </CardTitle>
                <CardDescription>
                  Start a new collaborative study session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateSession} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Session Title</Label>
                    <Input
                      id="title"
                      value={sessionTitle}
                      onChange={(e) => setSessionTitle(e.target.value)}
                      placeholder="e.g., Math Study Group"
                      className="mt-2"
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date (Optional)</Label>
                      <Input
                        id="date"
                        type="date"
                        value={sessionDate}
                        onChange={(e) => setSessionDate(e.target.value)}
                        className="mt-2"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time (Optional)</Label>
                      <Input
                        id="time"
                        type="time"
                        value={sessionTime}
                        onChange={(e) => setSessionTime(e.target.value)}
                        className="mt-2"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating..." : "Create & Copy Link"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sessions Overview */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
                <TabsTrigger value="recent">Recent Sessions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingSessions.length > 0 ? (
                  upcomingSessions.map((session) => (
                    <Card key={session.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-lg mb-2">{session.title}</h3>
                            <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                              {session.date && (
                                <span className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(session.date)}</span>
                                </span>
                              )}
                              {session.time && (
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{formatTime(session.time)}</span>
                                </span>
                              )}
                              <span className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>0 participants</span>
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => copySessionLink(session.id)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleJoinSession(session.id)}
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Join
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">No upcoming sessions</h3>
                      <p className="text-muted-foreground">
                        Create your first study session to get started.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                {recentSessions.length > 0 ? (
                  recentSessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-lg mb-2">{session.title}</h3>
                            <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(session.created_at)}</span>
                              </span>
                              {session.time && (
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{formatTime(session.time)}</span>
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => copySessionLink(session.id)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleJoinSession(session.id)}
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Join
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">No recent sessions</h3>
                      <p className="text-muted-foreground">
                        Your completed sessions will appear here.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
