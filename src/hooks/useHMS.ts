import { useEffect, useState } from 'react';
import {
  useHMSStore,
  useHMSActions,
  selectIsConnectedToRoom,
  selectPeers,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectLocalPeer,
  selectMessagesMap,
  HMSMessage
} from '@100mslive/react-sdk';
import { getHMSToken } from '@/lib/hms';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export const useHMS = (roomId: string) => {
  const { user } = useAuth();
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const localPeer = useHMSStore(selectLocalPeer);
  const messagesMap = useHMSStore(selectMessagesMap);
  const [isJoining, setIsJoining] = useState(false);

  // Convert messages map to array
  const messages = Object.values(messagesMap || {}) as HMSMessage[];

  const joinRoom = async () => {
    if (!user || isJoining) return;

    setIsJoining(true);
    try {
      const token = await getHMSToken(roomId, user.id, 'host');
      
      await hmsActions.join({
        userName: user.email?.split('@')[0] || 'Anonymous',
        authToken: token,
      });

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
      await hmsActions.leave();
      toast({
        title: "Left room",
        description: "You have left the video call.",
      });
    } catch (error) {
      console.error('Failed to leave room:', error);
    }
  };

  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };

  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  const sendMessage = async (message: string) => {
    try {
      await hmsActions.sendBroadcastMessage(message);
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
    if (user && roomId && !isConnected && !isJoining) {
      joinRoom();
    }
  }, [user, roomId, isConnected, isJoining]);

  return {
    isConnected,
    isJoining,
    peers,
    localPeer,
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
