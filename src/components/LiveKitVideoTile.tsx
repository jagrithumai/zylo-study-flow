
import { useRef, useEffect } from 'react';
import { Participant, Track } from 'livekit-client';
import { Card, CardContent } from '@/components/ui/card';
import { MicOff, Crown } from 'lucide-react';

interface LiveKitVideoTileProps {
  participant: Participant;
  isLocal?: boolean;
}

const LiveKitVideoTile = ({ participant, isLocal = false }: LiveKitVideoTileProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const videoTrack = participant.getTrack(Track.Source.Camera)?.videoTrack;
    const audioTrack = participant.getTrack(Track.Source.Microphone)?.audioTrack;

    if (videoRef.current && videoTrack) {
      videoTrack.attach(videoRef.current);
    }

    if (audioRef.current && audioTrack && !isLocal) {
      audioTrack.attach(audioRef.current);
    }

    return () => {
      videoTrack?.detach();
      audioTrack?.detach();
    };
  }, [participant, isLocal]);

  const videoTrack = participant.getTrack(Track.Source.Camera);
  const audioTrack = participant.getTrack(Track.Source.Microphone);
  const isVideoEnabled = videoTrack && !videoTrack.isMuted;
  const isAudioEnabled = audioTrack && !audioTrack.isMuted;

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-video bg-muted flex items-center justify-center relative">
          {isVideoEnabled ? (
            <video
              ref={videoRef}
              autoPlay
              muted={isLocal}
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-background font-medium text-xl">
                  {participant.identity?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <p className="font-medium">{participant.identity || 'Unknown'}</p>
            </div>
          )}
          
          {/* Audio element for remote participants */}
          {!isLocal && <audio ref={audioRef} autoPlay />}
          
          {/* Status indicators */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-2">
            <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium">
              {isLocal ? 'You' : participant.identity || 'Unknown'}
            </span>
            {!isAudioEnabled && (
              <div className="bg-destructive text-destructive-foreground p-1 rounded">
                <MicOff className="w-4 h-4" />
              </div>
            )}
            {participant.permissions?.canPublish && (
              <div className="bg-primary text-primary-foreground p-1 rounded">
                <Crown className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveKitVideoTile;
