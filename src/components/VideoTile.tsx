
import { useRef, useEffect } from 'react';
import { useHMSStore, useHMSActions, selectVideoTrackByPeerID, selectAudioTrackByPeerID, HMSPeer } from '@100mslive/react-sdk';
import { Card, CardContent } from '@/components/ui/card';
import { MicOff, Crown } from 'lucide-react';

interface VideoTileProps {
  peer: HMSPeer;
  isLocal?: boolean;
}

const VideoTile = ({ peer, isLocal = false }: VideoTileProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id));
  const audioTrack = useHMSStore(selectAudioTrackByPeerID(peer.id));

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      hmsActions.attachVideo(videoTrack.id, videoRef.current);
    }

    return () => {
      if (videoRef.current && videoTrack) {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    };
  }, [videoTrack, hmsActions]);

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-video bg-muted flex items-center justify-center relative">
          {videoTrack?.enabled ? (
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
                  {peer.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <p className="font-medium">{peer.name || 'Unknown'}</p>
            </div>
          )}
          
          {/* Status indicators */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-2">
            <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium">
              {isLocal ? 'You' : peer.name || 'Unknown'}
            </span>
            {!audioTrack?.enabled && (
              <div className="bg-destructive text-destructive-foreground p-1 rounded">
                <MicOff className="w-4 h-4" />
              </div>
            )}
            {peer.roleName === 'host' && (
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

export default VideoTile;
