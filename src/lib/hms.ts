
import { supabase } from '@/integrations/supabase/client';

export const getHMSToken = async (roomId: string, userId: string, role: string = 'host') => {
  try {
    const { data, error } = await supabase.functions.invoke('get-hms-token', {
      body: {
        room_id: roomId,
        user_id: userId,
        role: role
      }
    });

    if (error) {
      console.error('Error getting HMS token:', error);
      throw error;
    }

    return data.token;
  } catch (error) {
    console.error('Failed to get HMS token:', error);
    throw error;
  }
};

export const createHMSRoom = async (roomId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-hms-room', {
      body: {
        name: roomId,
        description: `Study room ${roomId}`
      }
    });

    if (error) {
      console.error('Error creating HMS room:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to create HMS room:', error);
    throw error;
  }
};
