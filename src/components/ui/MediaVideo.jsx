import { forwardRef } from 'react';

export const MediaVideo = forwardRef(function MediaVideo({ src, type = 'video/mp4', autoPlay = true, muted = true, playsInline = true, ...props }, ref) {
  return <video ref={ref} autoPlay={autoPlay} muted={muted} playsInline={playsInline} {...props}><source src={src} type={type}/></video>;
});
