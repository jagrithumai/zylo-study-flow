
import { useEffect, useState, useCallback } from 'react';
import { 
  Room, 
  RoomEvent, 
  ConnectionState,
  DataPacket_Kind,
  Participant,
  Track
} from 'livekit-client';
import { getLiveKitToken } from '@/lib/livekit';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface ChatMessage {
  id: string;
  message: string;
  senderName: string;
  time: number;
}

export const useLiveKit = (roomId: string) => {
  const { user } = useAuth();
  const [room] = useState(() => new Room());
  const [isConnected, setIsConnected] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [localParticipant, setLocalParticipant] = useState<Participant | null>(null);
  const [isLocalAudioEnabled, setIsLocalAudioEnabled] = useState(true);
  const [isLocalVideoEnabled, setIsLocalVideoEnabled] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const updateParticipants = useCallback(() => {
    const allParticipants = Array.from(room.remoteParticipants.values());
    if (room.localParticipant) {
      allParticipants.unshift(room.localParticipant);
    }
    setParticipants(allParticipants);
    setLocalParticipant(room.localParticipant);
  }, [room]);

  const joinRoom = async () => {
    if (!user || isJoining) return;

    setIsJoining(true);
    try {
      const participantName = user.email?.split('@')[0] || 'Anonymous';
      const token = await getLiveKitToken(roomId, participantName);
      
      const url = 'wss://study-xntqydx2.livekit.cloud';
      
      await room.connect(url, token);

      toast({
        title: "Joined room successfully",
        description: `Connected to room ${roomId}`,
      });
    } catch (error) {
      console.error('Failed to join room:', error);
      toast({
        title: "Failed to join room",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  const leaveRoom = async () => {
    try {
      await room.disconnect();
      toast({
        title: "Left room",
        description: "You have left the video call.",
      });
    } catch (error) {
      console.error('Failed to leave room:', error);
    }
  };

  const toggleAudio = async () => {
    if (room.localParticipant) {
      const enabled = !isLocalAudioEnabled;
      await room.localParticipant.setMicrophoneEnabled(enabled);
      setIsLocalAudioEnabled(enabled);
    }
  };

  const toggleVideo = async () => {
    if (room.localParticipant) {
      const enabled = !isLocalVideoEnabled;
      await room.localParticipant.setCameraEnabled(enabled);
      setIsLocalVideoEnabled(enabled);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      const data = JSON.stringify({
        message,
        senderName: user?.email?.split('@')[0] || 'Anonymous',
        time: Date.now(),
        id: Math.random().toString(36).substr(2, 9)
      });

      await room.localParticipant?.publishData(
        new TextEncoder().encode(data),
        DataPacket_Kind.RELIABLE
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Set up room event listeners
    room.on(RoomEvent.Connected, () => {
      console.log('Connected to room');
      setIsConnected(true);
      updateParticipants();
    });

    room.on(RoomEvent.Disconnected, () => {
      console.log('Disconnected from room');
      setIsConnected(false);
      setParticipants([]);
      setLocalParticipant(null);
    });

    room.on(RoomEvent.ParticipantConnected, (participant) => {
      console.log('Participant connected:', participant.identity);
      updateParticipants();
    });

    room.on(RoomEvent.ParticipantDisconnected, (participant) => {
      console.log('Participant disconnected:', participant.identity);
      updateParticipants();
    });

    room.on(RoomEvent.TrackMuted, (track, participant) => {
      if (participant === room.localParticipant) {
        if (track.kind === Track.Kind.Audio) {
          setIsLocalAudioEnabled(false);
        } else if (track.kind === Track.Kind.Video) {
          setIsLocalVideoEnabled(false);
        }
      }
    });

    room.on(RoomEvent.TrackUnmuted, (track, participant) => {
      if (participant === room.localParticipant) {
        if (track.kind === Track.Kind.Audio) {
          setIsLocalAudioEnabled(true);
        } else if (track.kind === Track.Kind.Video) {
          setIsLocalVideoEnabled(true);
        }
      }
    });

    room.on(RoomEvent.DataReceived, (payload, participant) => {
      try {
        const data = JSON.parse(new TextDecoder().decode(payload));
        const newMessage: ChatMessage = {
          id: data.id,
          message: data.message,
          senderName: data.senderName,
          time: data.time
        };
        setMessages(prev => [...prev, newMessage]);
      } catch (error) {
        console.error('Failed to parse message data:', error);
      }
    });

    return () => {
      room.removeAllListeners();
    };
  }, [room, updateParticipants]);

  useEffect(() => {
    if (user && roomId && !isConnected && !isJoining) {
      joinRoom();
    }
  }, [user, roomId, isConnected, isJoining]);

  return {
    isConnected,
    isJoining,
    participants,
    localParticipant,
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    messages,
    joinRoom,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    sendMessage,
  };
};
