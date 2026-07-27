import { useEffect, useState } from 'react';

function warmVideo(src, onProgress) {
  return new Promise((resolve) => {
    const video = document.createElement('video'); let settled = false;
    const cleanup = () => ['canplaythrough','loadeddata','progress','error'].forEach(event => video.removeEventListener(event, event === 'progress' ? report : finish));
    let timeout;
    const finish = () => { if (settled) return; settled = true; window.clearTimeout(timeout); cleanup(); resolve(); };
    const report = () => { if (!video.duration || !video.buffered.length) return; onProgress(Math.min(video.buffered.end(video.buffered.length - 1) / video.duration, 1)); if (video.readyState >= 4) finish(); };
    video.muted = true; video.preload = 'auto'; video.playsInline = true;
    video.addEventListener('canplaythrough', finish, { once: true }); video.addEventListener('loadeddata', finish, { once: true }); video.addEventListener('progress', report); video.addEventListener('error', finish, { once: true });
    video.src = src; video.load(); timeout = window.setTimeout(finish, 15000);
  });
}

export function useVideoPreloader(sources) {
  const [ready, setReady] = useState(false); const [progress, setProgress] = useState(0);
  useEffect(() => {
    let active = true;
    const start = async () => {
      if (!sources.length) { setProgress(100); setReady(true); return; }
      await warmVideo(sources[0], value => { if (active) setProgress(Math.round(value * 72)); });
      if (!active) return;
      setProgress(82); setReady(true);
      await Promise.all(sources.slice(1).map(src => warmVideo(src, () => {})));
    };
    start();
    return () => { active = false; };
  }, [sources]);
  return { ready, progress: ready ? 100 : progress };
}
