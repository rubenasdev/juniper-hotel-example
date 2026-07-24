import { useCallback, useEffect, useRef, useState } from '/src/vendor/react.bundle.mjs';

function warmVideo(src, onProgress) {
  return new Promise((resolve) => {
    const video = document.createElement('video'); let settled = false;
    const cleanup = () => ['canplaythrough','loadeddata','progress','error'].forEach(event => video.removeEventListener(event, event === 'progress' ? report : finish));
    const finish = () => { if (settled) return; settled = true; cleanup(); resolve(); };
    const report = () => { if (!video.duration || !video.buffered.length) return; onProgress(Math.min(video.buffered.end(video.buffered.length - 1) / video.duration, 1)); if (video.readyState >= 4) finish(); };
    video.muted = true; video.preload = 'auto'; video.playsInline = true;
    video.addEventListener('canplaythrough', finish, { once: true }); video.addEventListener('loadeddata', finish, { once: true }); video.addEventListener('progress', report); video.addEventListener('error', finish, { once: true });
    video.src = src; video.load(); window.setTimeout(finish, 15000);
  });
}

export function useVideoPreloader(sources) {
  const [ready, setReady] = useState(false); const [progress, setProgress] = useState(0); const started = useRef(false);
  const start = useCallback(async () => {
    if (started.current) return; started.current = true;
    await warmVideo(sources[0], value => setProgress(Math.round(value * 72)));
    setProgress(82); setReady(true);
    for (let index = 1; index < sources.length; index += 1) await warmVideo(sources[index], () => {});
  }, [sources]);
  useEffect(() => { start(); }, [start]);
  return { ready, progress: ready ? 100 : progress };
}
