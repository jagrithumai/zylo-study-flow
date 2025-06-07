
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  Settings,
  Users,
  PenTool,
  Minimize2,
  Maximize2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const VideoRoom = () => {
  const { roomId } = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWhiteboardMode, setIsWhiteboardMode] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, user: "Alex", message: "Hey everyone! Ready to study?", time: "14:30" },
    { id: 2, user: "Sarah", message: "Yes! Let's start with chapter 5", time: "14:31" }
  ]);

  // Mock participants
  const participants = [
    { id: 1, name: "You", isHost: true, isMuted: isMuted, isVideoOff: isVideoOff },
    { id: 2, name: "Alex", isHost: false, isMuted: false, isVideoOff: false },
    { id: 3, name: "Sarah", isHost: false, isMuted: true, isVideoOff: false }
  ];

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Microphone on" : "Microphone muted",
      description: `You are now ${isMuted ? "unmuted" : "muted"}.`,
    });
  };

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    toast({
      title: isVideoOff ? "Camera on" : "Camera off",
      description: `Your camera is now ${isVideoOff ? "on" : "off"}.`,
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      user: "You",
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setChatMessage("");
  };

  const handleToggleWhiteboard = () => {
    setIsWhiteboardMode(!isWhiteboardMode);
    toast({
      title: isWhiteboardMode ? "Whiteboard closed" : "Whiteboard opened",
      description: isWhiteboardMode 
        ? "Returning to normal video view" 
        : "Videos moved to sidebar. Whiteboard coming soon!",
    });
  };

  useEffect(() => {
    console.log("Joined room:", roomId);
  }, [roomId]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-sm">Z</span>
              </div>
              <span className="font-medium">Zylo-Study</span>
            </Link>
            <div className="text-muted-foreground text-sm">
              Room: {roomId}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              {participants.length}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className={`flex-1 transition-all duration-500 ${isWhiteboardMode ? 'flex' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {isWhiteboardMode && (
            <>
              {/* Whiteboard Area */}
              <div className="flex-1 bg-card border-r border-border flex items-center justify-center">
                <div className="text-center coming-soon relative">
                  <PenTool className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Collaborative Whiteboard</h3>
                  <p className="text-muted-foreground max-w-md">
                    The interactive whiteboard will appear here. Draw, write, and collaborate in real-time.
                  </p>
                </div>
              </div>
              
              {/* Video Sidebar */}
              <div className="w-80 flex flex-col space-y-4 p-4 bg-muted/20">
                {participants.map((participant) => (
                  <Card key={participant.id} className="relative overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-muted flex items-center justify-center relative">
                        {participant.isVideoOff ? (
                          <div className="text-center">
                            <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center mb-2 mx-auto">
                              <span className="text-background font-medium">
                                {participant.name.charAt(0)}
                              </span>
                            </div>
                            <p className="text-sm font-medium">{participant.name}</p>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">Camera feed</span>
                          </div>
                        )}
                        
                        {/* Status indicators */}
                        <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                          {participant.isMuted && (
                            <div className="bg-destructive text-destructive-foreground p-1 rounded">
                              <MicOff className="w-3 h-3" />
                            </div>
                          )}
                          {participant.isHost && (
                            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                              Host
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {!isWhiteboardMode && (
            <>
              {participants.map((participant) => (
                <Card key={participant.id} className="m-4 relative overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted flex items-center justify-center relative">
                      {participant.isVideoOff ? (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mb-3 mx-auto">
                            <span className="text-background font-medium text-xl">
                              {participant.name.charAt(0)}
                            </span>
                          </div>
                          <p className="font-medium">{participant.name}</p>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                          <span className="text-muted-foreground">Camera feed</span>
                        </div>
                      )}
                      
                      {/* Status indicators */}
                      <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                        <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium">
                          {participant.name}
                        </span>
                        {participant.isMuted && (
                          <div className="bg-destructive text-destructive-foreground p-1 rounded">
                            <MicOff className="w-4 h-4" />
                          </div>
                        )}
                        {participant.isHost && (
                          <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                            Host
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Chat Sidebar */}
        {isChatOpen && (
          <div className="w-80 border-l border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium">Chat</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-medium text-sm">{message.user}</span>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  Send
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="lg"
            onClick={handleToggleMute}
            className="rounded-full w-12 h-12"
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
          
          <Button
            variant={isVideoOff ? "destructive" : "outline"}
            size="lg"
            onClick={handleToggleVideo}
            className="rounded-full w-12 h-12"
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleToggleWhiteboard}
            className="rounded-full w-12 h-12"
          >
            {isWhiteboardMode ? <Minimize2 className="w-5 h-5" /> : <PenTool className="w-5 h-5" />}
          </Button>

          <Button
            variant={isChatOpen ? "default" : "outline"}
            size="lg"
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="rounded-full w-12 h-12"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>

          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-12 h-12"
          >
            <PhoneOff className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoRoom;
