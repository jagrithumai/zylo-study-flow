
import { supabase } from '@/integrations/supabase/client';

export const getLiveKitToken = async (roomName: string, participantName: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('get-livekit-token', {
      body: {
        room: roomName,
        participant: participantName
      }
    });

    if (error) {
      console.error('Error getting LiveKit token:', error);
      throw error;
    }

    return data.token;
  } catch (error) {
    console.error('Failed to get LiveKit token:', error);
    throw error;
  }
};
