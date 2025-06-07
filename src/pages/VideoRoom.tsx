
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Minimize2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useHMS } from "@/hooks/useHMS";
import VideoTile from "@/components/VideoTile";
import { HMSRoomProvider } from '@100mslive/react-sdk';

const VideoRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWhiteboardMode, setIsWhiteboardMode] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  if (!roomId) {
    return <div>Invalid room ID</div>;
  }

  return (
    <HMSRoomProvider>
      <VideoRoomContent 
        roomId={roomId}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        isWhiteboardMode={isWhiteboardMode}
        setIsWhiteboardMode={setIsWhiteboardMode}
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        navigate={navigate}
      />
    </HMSRoomProvider>
  );
};

interface VideoRoomContentProps {
  roomId: string;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isWhiteboardMode: boolean;
  setIsWhiteboardMode: (mode: boolean) => void;
  chatMessage: string;
  setChatMessage: (message: string) => void;
  navigate: (path: string) => void;
}

const VideoRoomContent = ({
  roomId,
  isChatOpen,
  setIsChatOpen,
  isWhiteboardMode,
  setIsWhiteboardMode,
  chatMessage,
  setChatMessage,
  navigate
}: VideoRoomContentProps) => {
  const {
    isConnected,
    isJoining,
    peers,
    localPeer,
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    messages,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    sendMessage,
  } = useHMS(roomId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    sendMessage(chatMessage);
    setChatMessage("");
  };

  const handleLeaveRoom = async () => {
    await leaveRoom();
    navigate("/dashboard");
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
    console.log("Connected:", isConnected);
    console.log("Peers:", peers);
  }, [roomId, isConnected, peers]);

  if (isJoining) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-background font-bold text-lg">Z</span>
          </div>
          <p className="text-muted-foreground">Joining room...</p>
        </div>
      </div>
    );
  }

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
            {isConnected && (
              <div className="text-green-600 text-sm">
                ● Connected
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              {peers.length}
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
                {peers.map((peer) => (
                  <VideoTile 
                    key={peer.id} 
                    peer={peer} 
                    isLocal={peer.id === localPeer?.id}
                  />
                ))}
              </div>
            </>
          )}

          {!isWhiteboardMode && (
            <>
              {peers.map((peer) => (
                <div key={peer.id} className="m-4">
                  <VideoTile 
                    peer={peer} 
                    isLocal={peer.id === localPeer?.id}
                  />
                </div>
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
              {Array.isArray(messages) && messages.map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-medium text-sm">{message.senderName}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
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
            variant={!isLocalAudioEnabled ? "destructive" : "outline"}
            size="lg"
            onClick={toggleAudio}
            className="rounded-full w-12 h-12"
          >
            {!isLocalAudioEnabled ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
          
          <Button
            variant={!isLocalVideoEnabled ? "destructive" : "outline"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-12 h-12"
          >
            {!isLocalVideoEnabled ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
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
            onClick={handleLeaveRoom}
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
