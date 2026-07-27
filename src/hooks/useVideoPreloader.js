import { useEffect, useState } from 'react';

function warmVideo(src, onProgress, signal) {
  return new Promise((resolve) => {
    const video = document.createElement('video'); let settled = false;
    let timeout;
    const cleanup = () => {
      window.clearTimeout(timeout);
      video.removeEventListener('canplaythrough', finish);
      video.removeEventListener('loadeddata', finish);
      video.removeEventListener('progress', report);
      video.removeEventListener('error', finish);
      signal.removeEventListener('abort', cancel);
    };
    const finish = () => { if (settled) return; settled = true; cleanup(); resolve(); };
    const report = () => { if (!video.duration || !video.buffered.length) return; onProgress(Math.min(video.buffered.end(video.buffered.length - 1) / video.duration, 1)); if (video.readyState >= 4) finish(); };
    const cancel = () => { video.pause(); video.removeAttribute('src'); video.load(); finish(); };
    if (signal.aborted) { cancel(); return; }
    video.muted = true; video.preload = 'auto'; video.playsInline = true;
    video.addEventListener('canplaythrough', finish, { once: true }); video.addEventListener('loadeddata', finish, { once: true }); video.addEventListener('progress', report); video.addEventListener('error', finish, { once: true });
    signal.addEventListener('abort', cancel, { once: true });
    video.src = src; video.load(); timeout = window.setTimeout(finish, 15000);
  });
}

export function useVideoPreloader(sources) {
  const [ready, setReady] = useState(false); const [progress, setProgress] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const start = async () => {
      if (!sources.length) { setProgress(100); setReady(true); return; }
      await warmVideo(sources[0], value => { if (active) setProgress(Math.round(value * 72)); }, controller.signal);
      if (!active) return;
      setProgress(82); setReady(true);
      await Promise.all(sources.slice(1).map(src => warmVideo(src, () => {}, controller.signal)));
    };
    start();
    return () => { active = false; controller.abort(); };
  }, [sources]);
  return { ready, progress: ready ? 100 : progress };
}
